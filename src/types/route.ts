export type AppStackList = {
  Welcome: undefined;
  LoginStack: undefined;
  MainTab: undefined;
  ChargeStack: {
    screen?: keyof ChargeStackList;
  };
};

export type LoginStackList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabList = {
  Home: undefined;
  Charge: undefined;
  Profile: undefined;
};

export type ChargeStackList = {
  ChargePile: undefined;
  ChargeRecord: undefined;
  ChargeReport: undefined;
};
