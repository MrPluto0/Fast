import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { AppStackList, MainTabList } from '../../types/route';

import * as React from 'react';
import { View, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { Avatar, Text, Button, ListItem, Icon } from '@rneui/base';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState, UserType } from '../../store/user';
import { useTheme, useThemeMode } from '@rneui/themed';
import useExitLogin from '../../hooks/useExitLogin';

type ProfileScreenProp = BottomTabScreenProps<
  MainTabList & AppStackList,
  'Profile'
>;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainWrapper: {
    marginTop: 10,
    alignItems: 'center',
  },
  listWrapper: {
    width: '100%',
  },
});

export default function ProfileScreen({ navigation }: ProfileScreenProp) {
  const [user, setUser] = useRecoilState(userState);
  const { theme } = useTheme();
  const { mode, setMode } = useThemeMode();
  const exitLogin = useExitLogin();

  const list = [
    {
      title: '查看充电详单',
      show: [UserType.REGULAR],
      icon: 'bolt',
      onPress: () =>
        navigation.navigate('ChargeStack', { screen: 'ChargeRecord' }),
    },
    {
      title: '查看报表',
      show: [UserType.MANAGER],
      icon: 'analytics',
      onPress: () =>
        navigation.navigate('ChargeStack', { screen: 'ChargeReport' }),
    },
    {
      title: '查看充电桩',
      show: [UserType.MANAGER],
      icon: 'list',
      onPress: () =>
        navigation.navigate('ChargeStack', { screen: 'ChargePile' }),
    },
    {
      title: '主题模式',
      show: [UserType.MANAGER, UserType.REGULAR],
      icon: 'nightlight-round',
      onPress: () => setMode(mode === 'light' ? 'dark' : 'light'),
    },
    {
      title: '联系我们',
      show: [UserType.MANAGER, UserType.REGULAR],
      icon: 'contact-support',
      onPress: () => Alert.alert('QQ群:123456789'),
    },
    {
      title: '退出登录',
      show: [UserType.MANAGER, UserType.REGULAR],
      icon: 'exit-to-app',
      onPress: exitLogin,
    },
  ];

  return (
    <View
      style={{ ...styles.screen, backgroundColor: theme.colors.background }}>
      {user.type === UserType.VISITOR && (
        <View style={{ justifyContent: 'center', height: '100%' }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 15, color: theme.colors.black }}>
              你的身份: {user.username}
            </Text>
          </View>
          <Button
            style={{ marginTop: 100 }}
            title="登录一下"
            onPress={() => navigation.navigate('LoginStack')}
          />
        </View>
      )}
      {user.type !== UserType.VISITOR && (
        <React.Fragment>
          <View style={styles.mainWrapper}>
            <Avatar
              size={64}
              rounded
              icon={{ name: 'android', type: 'material' }}
              containerStyle={{ backgroundColor: '#6733b9' }}
            />
            <Text style={{ color: theme.colors.black }}>{user.username}</Text>
          </View>
          <View style={styles.listWrapper}>
            {list.map(
              (item, index) =>
                item.show.includes(user.type) && (
                  <ListItem bottomDivider key={index}>
                    <Icon name={item.icon} />
                    <ListItem.Content>
                      <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron onPress={item.onPress} />
                  </ListItem>
                ),
            )}
          </View>
        </React.Fragment>
      )}
    </View>
  );
}
