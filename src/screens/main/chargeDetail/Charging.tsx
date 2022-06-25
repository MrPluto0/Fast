import * as React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, Overlay, Card } from '@rneui/base';
import { useRecoilState } from 'recoil';
import { ChargeMode, userState, UserStatus } from '../../../store/user';
import AppConfig from '../../../config/setting';
import { CheckChargeExit } from '../../../apis/charge';
import useCancelCharge from '../../../hooks/useCancelCharge';
import { GetChargeInfo } from '../../../apis/data';

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

export function Charging() {
  const [user, setUser] = useRecoilState(userState);
  const [fee, setFee] = React.useState(0);
  const [capacity, setCapacity] = React.useState(0);
  const cancelCharge = useCancelCharge();

  React.useEffect(() => {
    const timer1 = setInterval(async () => {
      let res = await GetChargeInfo({
        userId: user.userId,
      });
      setCapacity(res.chargeCapacity);
      setFee(res.chargeFee);
    }, AppConfig.PollingTime);

    const timer2 = setInterval(async () => {
      let res = await CheckChargeExit({
        userId: user.userId,
      });
      if (res.status === 200) {
        Alert.alert('充电完成!');
        setUser(u => ({
          ...u,
          status: UserStatus.FREE,
        }));
        clearInterval(timer1);
        clearInterval(timer2);
      }
      if (res.status === 400 && res.data.cause === 4) {
        Alert.alert('充电桩故障，重新进入等候区');
        setUser(u => ({
          ...u,
          status: UserStatus.WAITING,
        }));
        clearInterval(timer1);
        clearInterval(timer2);
      }
    }, AppConfig.PollingTime);
    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
    };
  }, [capacity]);

  return (
    <View style={styles.screen}>
      <Card>
        <Card.Title>充电信息</Card.Title>
        <Card.Divider />
        <View>
          <Text>
            充电模式：{user.chargeMode === ChargeMode.QUICK ? '快充' : '慢充'}
          </Text>
          <Text>充电量：{capacity.toFixed(2)}</Text>
          <Text>充电费用：{fee.toFixed(2)}</Text>
        </View>
      </Card>
      <View style={styles.buttons}>
        <Button onPress={cancelCharge} color="secondary">
          停止充电
        </Button>
      </View>
      <Overlay
        overlayStyle={{ backgroundColor: 'white' }}
        isVisible={false}
        onBackdropPress={() => console.log('??')}>
        <Text>Welcome to React Native </Text>
      </Overlay>
    </View>
  );
}
