import type { LoginStackList } from '../../types/route';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as React from 'react';
import { View, Text, Button } from 'react-native';

type LoginScreenProp = NativeStackNavigationProp<LoginStackList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProp) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen</Text>
    </View>
  );
}
