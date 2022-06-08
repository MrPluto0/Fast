import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginStackList } from '../types/route';
import LoginScreen from '../screens/login/Login';
import RegisterScreen from '../screens/login/Register';

const LoginStackNavigator = createNativeStackNavigator<LoginStackList>();

export default function LoginStack() {
  return (
    <LoginStackNavigator.Navigator initialRouteName="Login">
      <LoginStackNavigator.Screen name="Login" component={LoginScreen} />
      <LoginStackNavigator.Screen name="Register" component={RegisterScreen} />
    </LoginStackNavigator.Navigator>
  );
}
