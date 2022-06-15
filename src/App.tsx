import * as React from 'react';
import Navigator from './router';
import { createTheme, ThemeProvider } from '@rneui/themed';
import { lightColors } from './styles/theme';
import { RecoilRoot } from 'recoil';

const theme = createTheme({
  lightColors,
});

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Navigator />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
