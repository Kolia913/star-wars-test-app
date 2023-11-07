import {MD3LightTheme} from 'react-native-paper';
export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
  },
};

export type AppTheme = typeof theme;
