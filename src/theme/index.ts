import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: ['Ubuntu', 'Roboto', 'sans-serif'].join(','),
  },
});
