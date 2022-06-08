import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { AppStackList, MainTabList } from '../../types/route';

import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@rneui/base';

type ProfileScreenProp = BottomTabScreenProps<
  MainTabList & AppStackList,
  'Profile'
>;

export default function ProfileScreen({ navigation }: ProfileScreenProp) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('LoginStack')}
      />
    </View>
  );
}
