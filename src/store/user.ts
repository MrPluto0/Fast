import { atom } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERKEY = 'user';

enum UserType {
  VISITOR,
  REGULAR,
  MANAGER,
}

enum UserStatus {
  FREE = 'FREE',
  WAITING = 'WAITING',
  CHARGING = 'CHARGING',
}

enum ChargeMode {
  NONE,
  SLOW,
  QUICK,
}

type IUser = {
  userId: number;
  username: string;
  type: UserType;
  status: UserStatus;
  chargeMode: ChargeMode;
  chargeCapacity: number;
};

const userState = atom<IUser>({
  key: 'userState',
  default: {
    userId: -1,
    username: 'Visitor',
    type: UserType.VISITOR,
    status: UserStatus.FREE,
    chargeMode: ChargeMode.NONE,
    chargeCapacity: 0,
  },
  effects_UNSTABLE: [
    // 本地持久化
    ({ onSet, setSelf }) => {
      AsyncStorage.getItem(USERKEY).then(user => {
        if (user) {
          setSelf(JSON.parse(user));
        }
      });
      onSet(newUser => {
        AsyncStorage.setItem(USERKEY, JSON.stringify(newUser));
      });
    },
  ],
});

export { userState, UserType, UserStatus, ChargeMode };
