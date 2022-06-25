import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { AppStackList } from '../types/route';
import WelcomeScreen from '../screens/Welcome';
import MainTab from './mainTab';
import LoginStack from './loginStack';
import ChargeStack from './chargeStack';

const AppStackNavigator = createNativeStackNavigator<AppStackList>();

export default function Navigator() {
  return (
    <NavigationContainer>
      <AppStackNavigator.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}>
        <AppStackNavigator.Screen name="Welcome" component={WelcomeScreen} />
        <AppStackNavigator.Screen name="LoginStack" component={LoginStack} />
        <AppStackNavigator.Screen name="MainTab" component={MainTab} />
        <AppStackNavigator.Screen name="ChargeStack" component={ChargeStack} />
      </AppStackNavigator.Navigator>
    </NavigationContainer>
  );
}
