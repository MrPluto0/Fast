import * as React from 'react';
import { Alert, ToastAndroid } from 'react-native';
import { useRecoilState } from 'recoil';
import { ChargeTerminate } from '../apis/charge';
import { userState, UserStatus } from '../store/user';

export default function () {
  const [user, setUser] = useRecoilState(userState);
  const cancelCharge = React.useCallback(async () => {
    let res = await ChargeTerminate({
      userId: user.userId,
    });
    if (res.status === 200) {
      ToastAndroid.show('已停止充电', ToastAndroid.SHORT);
      setUser(u => ({
        ...u,
        status: UserStatus.FREE,
      }));
    } else {
      Alert.alert('出错咯！');
    }
  }, [setUser, user.userId]);
  return cancelCharge;
}
