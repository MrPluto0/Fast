import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabList } from '../../types/route';

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { Icon } from '@rneui/base';

type HomeScreenProp = BottomTabScreenProps<MainTabList, 'Home'>;

export default function HomeScreen({ navigation }: HomeScreenProp) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Charge"
        onPress={() => navigation.navigate('Charge')}
      />
    </View>
  );
}
