import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackList } from '../types/route';

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text } from '@rneui/themed';
import { Button } from '@rneui/base';

type WelcomeScreenProp = NativeStackScreenProps<AppStackList, 'Welcome'>;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 35,
    fontStyle: 'italic',
    letterSpacing: 4,
  },
  button: {
    width: 100,
    borderRadius: 30,
  },
});

export default function WelcomeScreen({ navigation }: WelcomeScreenProp) {
  const { theme } = useTheme();

  return (
    <View
      style={{ ...styles.screen, backgroundColor: theme.colors.background }}>
      <View>
        <Text style={{ ...styles.title, color: theme.colors.primary }}>
          Fast Charge
        </Text>
        <Text style={{ textAlign: 'center', color: theme.colors.black }}>
          智能充电桩调度计费系统
        </Text>
      </View>
      <Button
        containerStyle={styles.button}
        title="Enter"
        onPress={() => navigation.navigate('MainTab')}
      />
    </View>
  );
}
