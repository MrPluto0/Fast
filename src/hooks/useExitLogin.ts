import * as React from 'react';
import { Alert } from 'react-native';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { LogoutUser } from '../apis/user';
import { userState } from '../store/user';

export default function () {
  const [user, setUser] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const exitLogin = React.useCallback(() => {
    const confirm = async () => {
      LogoutUser({
        userId: user.userId,
      });
      resetUser();
    };
    Alert.alert('提示', '是否确认退出登录', [
      {
        text: '确定',
        onPress: confirm,
      },
      {
        text: '取消',
        style: 'cancel',
      },
    ]);
  }, [resetUser, user.userId]);
  return exitLogin;
}
