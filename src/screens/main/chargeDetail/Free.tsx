import * as React from 'react';
import { View, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { Icon, Button } from '@rneui/base';
import { Input, useTheme } from '@rneui/themed';
import { useRecoilState } from 'recoil';
import {
  ChargeMode,
  userState,
  UserStatus,
  UserType,
} from '../../../store/user';
import { RadioView } from '../../../components/radioView';
import { NumValidator } from '../../../utils/validator';
import { ChargeRequest } from '../../../apis/charge';

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    alignItems: 'center',
  },
  form: {
    width: '90%',
  },
});

const checklist = [
  {
    label: '快充',
    value: ChargeMode.QUICK,
  },
  {
    label: '慢充',
    value: ChargeMode.SLOW,
  },
];

export default function Free({}) {
  const { theme } = useTheme();
  const [user, setUser] = useRecoilState(userState);
  const [chargeCapacity, setChargeCapacity] = React.useState('');
  const [chargeMode, setChargeMode] = React.useState<ChargeMode>();

  const requestCharge = React.useCallback(async () => {
    if (user.type === UserType.VISITOR) {
      Alert.alert('请先登录');
      return;
    }
    if (!NumValidator(chargeCapacity)) {
      Alert.alert('请输入正确的充电量');
      return;
    }
    if (!chargeMode) {
      Alert.alert('选择正确的充电模式');
      return;
    }
    let res = await ChargeRequest({
      userId: user.userId,
      chargeCapacity: parseFloat(chargeCapacity),
      chargeRule: chargeMode,
    });
    if (res.status === 200) {
      ToastAndroid.show('充电请求成功，进入等候区', ToastAndroid.SHORT);
      setUser(u => ({
        ...u,
        status: UserStatus.WAITING,
        chargeMode,
        chargeCapacity: parseFloat(chargeCapacity),
      }));
    } else {
      ToastAndroid.show('充电请求失败', ToastAndroid.SHORT);
    }
  }, [chargeCapacity, chargeMode, setUser, user.type, user.userId]);

  return (
    <View style={styles.screen}>
      <View style={styles.form}>
        <Input
          selectionColor={theme.colors.primary}
          placeholder="输入充电量"
          value={chargeCapacity}
          onChangeText={setChargeCapacity}
          leftIcon={<Icon name="bolt" color={theme.colors.black} />}
        />
        <RadioView checklist={checklist} onChecked={setChargeMode} />
      </View>
      <Button
        containerStyle={{ marginTop: 20, width: '85%' }}
        title="发起充电"
        onPress={requestCharge}
      />
    </View>
  );
}
