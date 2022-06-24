import type { LoginStackList } from '../../types/route';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@rneui/themed';
import { useRecoilState } from 'recoil';
import { userState, UserType } from '../../store/user';
import { Icon, Input, Button, CheckBox } from '@rneui/base';
import { RadioView } from '../../components/radioView';
import { RegisterUser } from '../../apis/user';
import { AccountValidator } from '../../utils/validator';

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
  const [userType, setUserType] = React.useState(UserType.VISITOR);
  const { theme } = useTheme();
  const [, setUser] = useRecoilState(userState);

  const handleRegister = React.useCallback(async () => {
    if (!AccountValidator(username) || !AccountValidator(password)) {
      Alert.alert('用户名或密码格式不符合');
      return;
    }
    if (password !== password2) {
      Alert.alert('两次输入密码不同');
      return;
    }
    if (userType === UserType.VISITOR) {
      Alert.alert('请选择用户类型');
      return;
    }
    let res = await RegisterUser({
      userName: username,
      userPassword: password,
      userType,
    });
    if (res.status === 200) {
      setUser(user => ({
        ...user,
        type: UserType.REGULAR,
        username,
      }));
      navigation.navigate('Home');
    } else {
      Alert.alert('用户名已存在');
    }
  }, [username, password, password2, userType, setUser, navigation]);

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
          errorMessage="a-z A-Z 0-9 _"
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
        <RadioView checklist={checkBoxes} onChecked={setUserType} />
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
