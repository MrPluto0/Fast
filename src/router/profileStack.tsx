import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProfileStackList } from '../types/route';
import { ChargePile } from '../screens/main/profile/ChargePile';
import ProfileScreen from '../screens/main/profile/Profile';

const ProfileStackNavigator = createNativeStackNavigator<ProfileStackList>();

export default function LoginStack() {
  return (
    <ProfileStackNavigator.Navigator
      initialRouteName="Index"
      screenOptions={{ headerShown: false }}>
      <ProfileStackNavigator.Screen name="Index" component={ProfileScreen} />
      <ProfileStackNavigator.Screen name="ChargePile" component={ChargePile} />
    </ProfileStackNavigator.Navigator>
  );
}
