import * as React from 'react';
import Navigator from './router';
import { createTheme, ThemeProvider } from '@rneui/themed';
import { lightColors } from './styles/theme';

const theme = createTheme({
  lightColors,
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navigator />
    </ThemeProvider>
  );
}

export default App;
