import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { AppStackList, MainTabList } from '../../types/route';

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, Button } from '@rneui/base';
import { useRecoilValue } from 'recoil';
import { userState, UserType } from '../../store/user';

type ProfileScreenProp = BottomTabScreenProps<
  MainTabList & AppStackList,
  'Profile'
>;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  mainWrapper: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default function ProfileScreen({ navigation }: ProfileScreenProp) {
  const user = useRecoilValue(userState);

  return (
    <View style={styles.screen}>
      {user.type === UserType.VISITOR && (
        <View style={{ justifyContent: 'center', height: '100%' }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 15 }}>你的身份: {user.username}</Text>
          </View>
          <Button
            style={{ marginTop: 100 }}
            title="登录一下"
            onPress={() => navigation.navigate('LoginStack')}
          />
        </View>
      )}
      {user.type !== UserType.VISITOR && (
        <View style={styles.mainWrapper}>
          <Avatar
            size={64}
            rounded
            icon={{ name: 'extension', type: 'material' }}
            containerStyle={{ backgroundColor: '#6733b9' }}
          />
          <Text>{user.username}</Text>
        </View>
      )}
    </View>
  );
}
