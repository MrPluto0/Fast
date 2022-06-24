import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Overlay, Card } from '@rneui/base';
import { useRecoilState } from 'recoil';
import { ChargeMode, userState } from '../../../store/user';

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
  const [cost, setCost] = React.useState(0);

  const cancelCharge = React.useCallback(() => {}, []);

  return (
    <View style={styles.screen}>
      <Card>
        <Card.Title>充电信息</Card.Title>
        <Card.Divider />
        <View style={{ alignItems: 'center' }}>
          <Text>充电量：{user.chargeCapacity}</Text>
          <Text>
            充电模式：{user.chargeMode === ChargeMode.QUICK ? '快充' : '慢充'}
          </Text>
          <Text>费用统计：{cost}</Text>
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
