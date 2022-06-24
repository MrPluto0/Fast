import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabList } from '../../types/route';

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { BallView } from '../../components/ballView';
import { useRecoilState } from 'recoil';
import { userState, UserStatus } from '../../store/user';
import Free from './chargeDetail/Free';
import { Waiting } from './chargeDetail/Waiting';
import { Charging } from './chargeDetail/Charging';

type ChargeScreenProp = BottomTabScreenProps<MainTabList, 'Charge'>;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
});

export default function ChargeScreen({ navigation }: ChargeScreenProp) {
  const [restTime, setRestTime] = React.useState('未充电');
  const [user] = useRecoilState(userState);

  React.useEffect(() => {
    if (user.status === UserStatus.WAITING) {
      setRestTime('等待中');
    } else if (user.status === UserStatus.CHARGING) {
      setRestTime('充电中: 10');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.screen}>
      <View style={{ marginTop: 30 }}>
        <BallView title={restTime} />
      </View>
      <View style={{ width: '100%', marginTop: 30 }}>
        {user.status === UserStatus.FREE && <Free />}
        {user.status === UserStatus.WAITING && <Waiting />}
        {user.status === UserStatus.CHARGING && <Charging />}
      </View>
    </View>
  );
}
