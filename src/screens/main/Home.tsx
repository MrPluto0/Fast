import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { AppStackList, MainTabList } from '../../types/route';

import * as React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Icon, Text, Button, SpeedDial } from '@rneui/base';
import { useTheme } from '@rneui/themed';
import { useRecoilValue } from 'recoil';
import { userState, UserType } from '../../store/user';

type HomeScreenProp = BottomTabScreenProps<MainTabList & AppStackList, 'Home'>;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleText: {
    fontSize: 25,
  },
});

export default function HomeScreen({ navigation }: HomeScreenProp) {
  const { theme } = useTheme();
  const user = useRecoilValue(userState);
  const [open, setOpen] = React.useState(false);

  return (
    <View style={styles.screen}>
      <View>
        <Text style={{ ...styles.titleText }}>智能充电桩调度计费系统</Text>
      </View>
      <Button
        icon={<Icon name="bolt" color={theme.colors.white} />}
        title="充电吧，少年"
        onPress={() => navigation.navigate('Charge')}
      />
      <SpeedDial
        isOpen={open}
        icon={{ name: 'add', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}>
        <SpeedDial.Action
          icon={{ name: 'account-circle', color: '#fff' }}
          title={user.type === UserType.VISITOR ? '登录' : '登出'}
          onPress={() => navigation.navigate('LoginStack')}
        />
        <SpeedDial.Action
          icon={{ name: 'build', color: '#fff' }}
          title="报修"
          onPress={() => Alert.alert('QQ群:123456789')}
        />
        <SpeedDial.Action
          icon={{ name: 'contact-support', color: '#fff' }}
          title="联系"
          onPress={() => Alert.alert('QQ群:123456789')}
        />
      </SpeedDial>
    </View>
  );
}
