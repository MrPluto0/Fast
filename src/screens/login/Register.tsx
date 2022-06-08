import type { LoginStackList } from '../../types/route';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as React from 'react';
import { View, Text, Button } from 'react-native';

type RegisterScreenProp = NativeStackNavigationProp<LoginStackList, 'Register'>;

export default function RegisterScreen({ navigation }: RegisterScreenProp) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Register Screen</Text>
    </View>
  );
}
