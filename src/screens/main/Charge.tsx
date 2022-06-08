import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabList } from '../../types/route';

import * as React from 'react';
import { View, Text, Button } from 'react-native';

type ChargeScreenProp = BottomTabScreenProps<MainTabList, 'Charge'>;

export default function ChargeScreen({ navigation }: ChargeScreenProp) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Charge Screen</Text>
    </View>
  );
}
