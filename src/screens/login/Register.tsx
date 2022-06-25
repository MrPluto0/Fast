import type { LoginStackList } from '../../types/route';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as React from 'react';
import { View, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { useTheme } from '@rneui/themed';
import { UserType } from '../../store/user';
import { Icon, Input, Button, Text } from '@rneui/base';
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
  const [username, setUsername] = React.useState('mxl123');
  const [password, setPassword] = React.useState('mxl123');
  const [password2, setPassword2] = React.useState('mxl123');
  const [userType, setUserType] = React.useState(UserType.VISITOR);
  const [errorMsg1, setErrorMsg1] = React.useState('');
  const [errorMsg2, setErrorMsg2] = React.useState('');
  const [errorMsg3, setErrorMsg3] = React.useState('');
  const { theme } = useTheme();

  const validate = React.useCallback(() => {
    if (!AccountValidator(username)) {
      setErrorMsg1('用户名或密码格式不符合,5-15位数字字母下划线');
      return false;
    }
    if (!AccountValidator(password)) {
      setErrorMsg2('用户名或密码格式不符合,5-15位数字字母下划线');
      return false;
    }
    if (password !== password2) {
      setErrorMsg3('两次输入密码不一致');
      return false;
    }
    if (userType === UserType.VISITOR) {
      Alert.alert('请选择用户类型');
      return false;
    }
    setErrorMsg1('');
    setErrorMsg2('');
    setErrorMsg3('');
    return true;
  }, [password, password2, userType, username]);

  const handleRegister = React.useCallback(async () => {
    if (!validate()) {
      return;
    }
    let res = await RegisterUser({
      userName: username,
      userPassword: password,
      userType,
    });
    if (res.status === 200) {
      ToastAndroid.show('注册成功，请重新登录!', ToastAndroid.SHORT);
      navigation.navigate('Login');
    } else {
      Alert.alert('用户名已存在');
    }
  }, [validate, username, password, userType, navigation]);

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
          errorMessage={errorMsg1}
        />
        <Input
          selectionColor={theme.colors.primary}
          placeholder="输入您的密码"
          value={password}
          onChangeText={setPassword}
          leftIcon={<Icon name="lock" />}
          containerStyle={styles.inputContainer}
          errorMessage={errorMsg2}
        />
        <Input
          selectionColor={theme.colors.primary}
          placeholder="再次确认您的密码"
          value={password2}
          onChangeText={setPassword2}
          leftIcon={<Icon name="lock" />}
          containerStyle={styles.inputContainer}
          errorMessage={errorMsg3}
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
