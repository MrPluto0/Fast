import * as React from 'react';
import { View, StyleSheet, ToastAndroid, Alert } from 'react-native';
import { Text, Button, Card, Dialog, Icon } from '@rneui/base';
import { useRecoilState } from 'recoil';
import { ChargeMode, userState, UserStatus } from '../../../store/user';
import { Input, useTheme } from '@rneui/themed';
import { RadioView } from '../../../components/radioView';
import {
  ChargeChange,
  ChargeTerminate,
  CheckChargeBegin,
  CheckChargePool,
} from '../../../apis/charge';
import AppConfig from '../../../config/setting';
import useCancelCharge from '../../../hooks/useCancelCharge';
import { GetWaitingNo, GetWaitingRest } from '../../../apis/data';

const styles = StyleSheet.create({
  screen: {
    width: '100%',
  },
  buttons: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const checklist = [
  {
    label: '快充',
    value: ChargeMode.QUICK,
  },
  {
    label: '慢充',
    value: ChargeMode.SLOW,
  },
];

export function Waiting() {
  const { theme } = useTheme();
  const [user, setUser] = useRecoilState(userState);
  const [queueNo, setQueueNo] = React.useState(0);
  const [queueLen, setQueueLen] = React.useState(3);
  const [chargeCapacity, setChargeCapacity] = React.useState('');
  const [chargeMode, setChargeMode] = React.useState<ChargeMode>(
    ChargeMode.NONE,
  );
  const [showDialog1, setShowDialog1] = React.useState(false);
  const [showDialog2, setShowDialog2] = React.useState(false);

  const cancelCharge = useCancelCharge();

  const updateChargeCapacity = React.useCallback(async () => {
    let res = await ChargeChange({
      userId: user.userId,
      chargeCapacity: parseFloat(chargeCapacity),
    });
    if (res.status === 200) {
      setUser(u => ({
        ...u,
        chargeCapacity: parseFloat(chargeCapacity),
      }));
      setShowDialog1(false);
    }
  }, [chargeCapacity, setUser, user.userId]);

  const updateChargeMode = React.useCallback(async () => {
    let res = await ChargeChange({
      userId: user.userId,
      chargeRule: chargeMode,
    });
    if (res.status === 200) {
      setUser(u => ({
        ...u,
        chargeMode,
      }));
      setShowDialog2(false);
    }
  }, [chargeMode, setUser, user.userId]);

  React.useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let timer3: NodeJS.Timeout;
    new Promise((resolve, reject) => {
      timer1 = setTimeout(async () => {
        let res1 = await GetWaitingNo({
          userId: user.userId,
        });
        setQueueNo(res1);
        let res2 = await GetWaitingRest({
          userId: user.userId,
        });
        setQueueLen(res2);
      }, AppConfig.PollingTime * 2);
      timer2 = setInterval(async () => {
        let res = await CheckChargePool({
          userId: user.userId,
        });
        if (res.status === 200) {
          clearInterval(timer1);
          clearInterval(timer2);
          resolve(0);
        }
        if (res.status === 400 && res.data.cause === 2) {
          Alert.alert('等候区满，不管你了');
          clearInterval(timer1);
          clearInterval(timer2);
          reject(0);
        }
        if (res.status === 0 || (res.status === 400 && res.data.cause)) {
          clearInterval(timer1);
          clearInterval(timer2);
          reject(0);
        }
      }, AppConfig.PollingTime);
    })
      .then(() => {
        timer3 = setInterval(async () => {
          let res = await CheckChargeBegin({
            userId: user.userId,
          });
          if (res.status === 200) {
            ToastAndroid.show('正式开始充电', ToastAndroid.SHORT);
            clearInterval(timer3);
            setUser(u => ({
              ...u,
              status: UserStatus.CHARGING,
            }));
          }
          if (res.status === 0 || (res.status === 400 && res.data.cause)) {
            clearInterval(timer3);
            throw 'Exception';
          }
        }, AppConfig.PollingTime);
      })
      .catch(() => {
        setUser(u => ({
          ...u,
          status: UserStatus.FREE,
        }));
      });
    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
      clearInterval(timer3);
    };
  }, []);

  return (
    <View style={styles.screen}>
      <Card>
        <Card.Title>排队信息</Card.Title>
        <Card.Divider />
        <View>
          <Text>排队号码：{queueNo}</Text>
          <Text>排队长度：{queueLen}</Text>
        </View>
      </Card>
      <Card>
        <Card.Title>充电信息</Card.Title>
        <Card.Divider />
        <View>
          <Text>充电量：{user.chargeCapacity}</Text>
          <Text>
            充电模式：{user.chargeMode === ChargeMode.QUICK ? '快充' : '慢充'}
          </Text>
        </View>
      </Card>
      <View style={styles.buttons}>
        <Button onPress={() => setShowDialog1(true)}>修改充电量</Button>
        <Button onPress={() => setShowDialog2(true)}>修改充电模式</Button>
        <Button onPress={cancelCharge} color="secondary">
          停止充电
        </Button>
      </View>
      <Dialog
        isVisible={showDialog1}
        overlayStyle={{ backgroundColor: theme.colors.background }}
        onBackdropPress={() => setShowDialog1(false)}>
        <Dialog.Title title="输入新的充电量" />
        <Input
          selectionColor={theme.colors.primary}
          placeholder="输入充电量"
          value={chargeCapacity}
          onChangeText={setChargeCapacity}
          leftIcon={<Icon name="bolt" />}
        />
        <Dialog.Actions>
          <Dialog.Button title="确定" onPress={updateChargeCapacity} />
        </Dialog.Actions>
      </Dialog>
      <Dialog
        isVisible={showDialog2}
        overlayStyle={{ backgroundColor: theme.colors.background }}
        onBackdropPress={() => setShowDialog2(false)}>
        <Dialog.Title title="选择新的模式" />
        <RadioView checklist={checklist} onChecked={setChargeMode} />
        <Dialog.Actions>
          <Dialog.Button title="确定" onPress={updateChargeMode} />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
