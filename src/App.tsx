import * as React from 'react';
import Navigator from './router';
import { createTheme, ThemeProvider } from '@rneui/themed';
import { RecoilRoot } from 'recoil';
import AppConfig from './config/setting';

const theme = createTheme(AppConfig.Theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Navigator />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
