import React, { useEffect } from 'react';
import { Container, Box, Grid, Typography, Button } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { TokenHandler } from '../handlers/tokenHandler';
import { useHistory } from 'react-router-dom';
import { Header } from '../components/Header';
import { Link } from 'react-router-dom';

import { EventCard } from '../components/EventCard';

import { months } from '../utils/monthConverter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      overflowX: 'hidden',
    },
    header: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    month: {
      marginLeft: '1rem',
      fontSize: '1.5rem',
    },
    Button: {
      marginRight: '1rem',
      border: '1px solid #fff',
      borderRadius: '4px',
      padding: '0.3rem',
    },
    typo: {
      marginTop: '1rem',
    },
    subTitle: {
      fontWeight: 300,
      fontSize: '0.8rem',
    },
    GridArea: {
      width: '90%',
    },
  })
);

export const DashBoard = () => {
  const month = new Date().getMonth().valueOf();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {TokenHandler.tokenValidation(useHistory)}
      <Header />
      <Box width="100vw" height="calc(100vh-45px)" overflow="hidden">
        <Box className={classes.header} display="flex">
          <Typography className={classes.month}>{months[month]}</Typography>
          <Box display="flex" flexGrow="1" />
          <Link component={Button} to="/createEvent" className={classes.Button}>
            +
          </Link>
        </Box>
        <Grid container direction="row" alignItems="center">
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </Grid>
      </Box>
    </div>
  );
};
