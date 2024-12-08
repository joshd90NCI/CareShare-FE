// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D6B3C',
    },
    secondary: {
      main: '#26A69A',
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
