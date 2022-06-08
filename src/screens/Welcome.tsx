import type { AppStackList } from '../types/route';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@rneui/base';

type WelcomeScreenProp = NativeStackScreenProps<AppStackList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: WelcomeScreenProp) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome Screen</Text>
      <Button title="Start" onPress={() => navigation.navigate('MainTab')} />
    </View>
  );
}
