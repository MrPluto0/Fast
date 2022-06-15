import { atom } from 'recoil';

enum UserType {
  VISITOR = 'VISITOR',
  REGULAR = 'REGULAR',
  MANAGER = 'MANAGER',
}

const userState = atom({
  key: 'userState',
  default: {
    type: UserType.VISITOR,
    username: 'Visitor',
  },
});

export { userState, UserType };
