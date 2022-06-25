import { CreateThemeOptions } from '@rneui/themed';

const theme: CreateThemeOptions = {
  lightColors: {
    primary: '#2089dc',
    secondary: '#B069E5',
    background: '#f2f2f2',
  },
  darkColors: {
    background: '#1A1A1B',
  },
  // mode: 'dark',
};

const AppConfig = {
  ServerHost: 'http://82.156.172.158:8080/', // 后端IP，具体接口需修改API
  PollingTime: 500, // 轮询时间：500ms
  Theme: theme,
};

export default AppConfig;
