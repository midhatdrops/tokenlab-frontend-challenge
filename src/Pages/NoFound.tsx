import classes from '*.module.css';
import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100vw',
      height: '100vh',
      backgroundColor: theme.palette.background.default,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    title: {
      fontWeight: 500,
      letterSpacing: '0.5rem',
      marginBottom: '1rem',
    },
  })
);

export const NoFoundPage = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Header />
      <Box className={classes.root}>
        <Typography variant="h3" className={classes.title}>
          404 No Found
        </Typography>
        Por favor retorne para a DashBoard clicando no logo.
      </Box>
      <Footer />
    </Box>
  );
};
