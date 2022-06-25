import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ChargeStackList } from '../types/route';
import { ChargeReport } from '../screens/charge/ChargeReport';
import { ChargeRecord } from '../screens/charge/ChargeRecord';
import { ChargePile } from '../screens/charge/ChargePile';

const ChargeStackNavigation = createNativeStackNavigator<ChargeStackList>();

export default function LoginStack() {
  return (
    <ChargeStackNavigation.Navigator>
      <ChargeStackNavigation.Screen
        name="ChargeRecord"
        component={ChargeRecord}
      />
      <ChargeStackNavigation.Screen name="ChargePile" component={ChargePile} />
      <ChargeStackNavigation.Screen
        name="ChargeReport"
        component={ChargeReport}
      />
    </ChargeStackNavigation.Navigator>
  );
}
