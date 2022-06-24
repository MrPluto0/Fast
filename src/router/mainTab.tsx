import * as React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import ProfileStack from './profileStack';
import HomeScreen from '../screens/main/Home';
import ChargeScreen from '../screens/main/Charge';
import tabIcon from '../components/tabIcon';
import { useTheme } from '@rneui/themed';
import { MainTabList } from '../types/route';

const MainTabNavigator = createBottomTabNavigator<MainTabList>();

interface Props {
  focused: boolean;
  color: string;
  size: number;
}

function chargeIcon(props: Props) {}

export default function MainTab() {
  const { theme } = useTheme();
  const screenOptions: BottomTabNavigationOptions = {
    headerTitle: 'Fast',
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitleAlign: 'center',
    tabBarLabelStyle: {
      fontSize: 13,
    },
    tabBarItemStyle: {
      borderRadius: 50,
    },
    tabBarActiveBackgroundColor: theme.colors.primary,
    tabBarActiveTintColor: theme.colors.white,
  };
  return (
    <MainTabNavigator.Navigator
      initialRouteName="Home"
      screenOptions={screenOptions}>
      <MainTabNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '家',
          tabBarIcon: tabIcon('home'),
        }}
      />
      <MainTabNavigator.Screen
        name="Charge"
        component={ChargeScreen}
        options={{
          tabBarLabel: '冲',
          tabBarIcon: tabIcon('bolt'),
        }}
      />
      <MainTabNavigator.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: '我',
          tabBarIcon: tabIcon('face'),
        }}
      />
    </MainTabNavigator.Navigator>
  );
}
