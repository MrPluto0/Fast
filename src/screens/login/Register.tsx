import type { LoginStackList } from '../../types/route';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';
import { useRecoilState } from 'recoil';
import { userState, UserType } from '../../store/user';
import { Icon, Input, Button, CheckBox } from '@rneui/base';

type RegisterScreenProp = NativeStackNavigationProp<LoginStackList, 'Register'>;

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
  checkboxWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
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

const checkBoxes = [
  {
    checked: true,
    label: '普通用户',
    value: UserType.REGULAR,
  },
  {
    checked: false,
    label: '管理员',
    value: UserType.MANAGER,
  },
];

// @ts-ignore
export default function RegisterScreen({ navigation }: RegisterScreenProp) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [userType, setUserType] = React.useState(UserType.REGULAR);
  const [checklist, setChecklist] = React.useState(checkBoxes);
  const { theme } = useTheme();
  const [, setUser] = useRecoilState(userState);

  const handleRegister = React.useCallback(() => {
    if (username && password) {
      console.log(`username: ${username}`);
      console.log(`password: ${password}`);
      setUser(user => ({
        type: UserType.REGULAR,
        username,
      }));
      // navigation.navigate('Home');
    }
  }, [username, password, setUser]);

  const handleRadio = React.useCallback((index: number) => {
    setChecklist(checks =>
      checks.map((item, i) => {
        if (i === index) {
          item.checked = true;
        } else {
          item.checked = false;
        }
        return item;
      }),
    );
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.titleWrapper}>
        <Text style={{ fontSize: 20 }}>欢迎注册</Text>
      </View>
      <View style={styles.inputWrapper}>
        <Input
          selectionColor={theme.colors.primary}
          placeholder="输入您的用户名"
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
        <Input
          selectionColor={theme.colors.primary}
          placeholder="再次确认您的密码"
          value={password2}
          onChangeText={setPassword2}
          leftIcon={<Icon name="lock" />}
          containerStyle={styles.inputContainer}
        />
        <View style={styles.checkboxWrapper}>
          {checklist.map((item, index) => (
            <CheckBox
              containerStyle={{ backgroundColor: 'transparent' }}
              title={item.label}
              checked={item.checked}
              onPress={() => handleRadio(index)}
            />
          ))}
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          containerStyle={styles.buttonContainer}
          title="注册"
          onPress={handleRegister}
        />
      </View>
    </View>
  );
}
