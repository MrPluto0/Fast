export type AppStackList = {
  Welcome: undefined;
  LoginStack: undefined;
  MainTab: undefined;
};

export type LoginStackList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabList = {
  Home: undefined;
  Charge: undefined;
  Profile: {
    screen?: keyof ProfileStackList;
  };
};

export type ProfileStackList = {
  Index: undefined;
  ChargePile: undefined;
};
