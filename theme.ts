// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#335343',
    },
    secondary: {
      main: '#809173',
    },
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: '#DC2626',
        },
      },
    },
  },
});

export default theme;
