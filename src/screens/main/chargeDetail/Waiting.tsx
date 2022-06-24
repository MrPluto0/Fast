import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card, Dialog, Icon } from '@rneui/base';
import { useRecoilState } from 'recoil';
import { ChargeMode, userState, UserStatus } from '../../../store/user';
import { Input, useTheme } from '@rneui/themed';
import { RadioView } from '../../../components/radioView';
import { CheckChargeBegin, CheckChargePool } from '../../../apis/charge';

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
  const [queueNo, setQueueNo] = React.useState('001');
  const [queueLen, setQueueLen] = React.useState(3);
  const [chargeCapacity, setChargeCapacity] = React.useState('');
  const [chargeMode, setChargeMode] = React.useState<ChargeMode>(
    ChargeMode.QUICK,
  );
  const [showDialog1, setShowDialog1] = React.useState(false);
  const [showDialog2, setShowDialog2] = React.useState(false);

  const updateChargeCapacity = React.useCallback(() => {
    setUser(u => ({
      ...u,
      chargeCapacity: parseFloat(chargeCapacity),
    }));
    setShowDialog1(false);
  }, [chargeCapacity, setUser]);

  const updateChargeMode = React.useCallback(() => {
    setUser(u => ({
      ...u,
      chargeMode,
    }));
    setShowDialog2(false);
  }, [chargeMode, setUser]);

  const cancelCharge = React.useCallback(() => {
    setUser(u => ({
      ...u,
      status: UserStatus.CHARGING,
    }));
  }, [setUser]);

  React.useEffect(() => {
    // eslint-disable-next-line no-new
    new Promise(resolve => {
      let timer = setInterval(async () => {
        let res = await CheckChargePool({
          userId: user.userId,
        });
        if (res.status === 200) {
          clearInterval(timer);
          resolve(0);
        }
      }, 500);
    }).then(() => {
      let timer = setInterval(async () => {
        let res = await CheckChargeBegin({
          userId: user.userId,
        });
        if (res.status === 200) {
          clearInterval(timer);
          setUser(u => ({
            ...u,
            status: UserStatus.CHARGING,
          }));
        }
      }, 500);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.screen}>
      <Card>
        <Card.Title>排队信息</Card.Title>
        <Card.Divider />
        <View style={{ alignItems: 'center' }}>
          <Text>排队号码：{queueNo}</Text>
          <Text>排队长度：{queueLen}</Text>
        </View>
      </Card>
      <Card>
        <Card.Title>充电信息</Card.Title>
        <Card.Divider />
        <View style={{ alignItems: 'center' }}>
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
