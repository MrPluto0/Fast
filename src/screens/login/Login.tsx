import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { LoginStackList } from '../../types/route';

import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text, Icon } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { useRecoilState } from 'recoil';
import { userState, UserType } from '../../store/user';

type LoginScreenProp = NativeStackNavigationProp<LoginStackList, 'Login'>;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleWrapper: {},
  inputWrapper: {
    alignItems: 'center',
    width: '100%',
  },
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputContainer: {
    width: '90%',
  },
  buttonContainer: {
    width: 100,
  },
});

// @ts-ignore
export default function LoginScreen({ navigation }: LoginScreenProp) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { theme } = useTheme();
  const [, setUser] = useRecoilState(userState);

  const handleLogin = React.useCallback(() => {
    if (username && password) {
      console.log(`username: ${username}`);
      console.log(`password: ${password}`);
      setUser(user => ({
        type: UserType.REGULAR,
        username,
      }));
      navigation.navigate('Home');
    }
  }, [username, password, setUser, navigation]);

  return (
    <View style={styles.screen}>
      <View style={styles.titleWrapper}>
        <Text style={{ fontSize: 20 }}>欢迎登录</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Input
          selectionColor={theme.colors.primary}
          placeholder="输入您的账号"
          value={username}
          onChangeText={setUsername}
          leftIcon={<Icon name="account-circle" />}
          containerStyle={styles.inputContainer}
        />
        <Input
          selectionColor={theme.colors.primary}
          placeholder="输入您的密码"
          value={password}
          onChangeText={setPassword}
          leftIcon={<Icon name="lock" />}
          containerStyle={styles.inputContainer}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          containerStyle={styles.buttonContainer}
          title="登录"
          onPress={handleLogin}
        />
        <Button
          containerStyle={styles.buttonContainer}
          title="注册"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );
}
