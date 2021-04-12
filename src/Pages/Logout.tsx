import { Box, Button, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { TokenHandler } from '../handlers/tokenHandler';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100vw',
      height: '100vh',
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
    },
    box: {
      marginTop: '1.5rem',
    },
    link: {
      fontSize: '1rem',
      color: '#fff',
      textDecoration: 'none',
      '&:visited': {
        color: '#fff',
      },
      marginTop: '1rem',
    },
    button: {
      marginRight: '2rem',
    },
  })
);

export const Logout = () => {
  const classes = useStyles();
  function logoutHandler() {
    TokenHandler.removeToken();
  }
  return (
    <Box className={classes.root}>
      <Grid container>
        <Header />
        <Box
          display="flex"
          width="100%"
          height="calc(100vh - 45px)"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h3" align="center">
            Deseja realmente deslogar ?
          </Typography>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            className={classes.box}
          >
            <Link
              to="/"
              onClick={() => logoutHandler()}
              className={classes.link}
            >
              <Button variant="outlined" className={classes.button}>
                Sim
              </Button>
            </Link>{' '}
            <Link to="/dashboard" className={classes.link}>
              <Button variant="outlined">Não</Button>
            </Link>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
