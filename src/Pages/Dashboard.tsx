/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Typography, Button } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { TokenHandler } from '../handlers/tokenHandler';
import { useHistory } from 'react-router-dom';
import { Header } from '../components/Header';
import { Link } from 'react-router-dom';
import { LoadingState } from '../utils/enumLoading';

import { EventCard } from '../components/EventCard';
import { Loading } from '../components/Loading';

import { months } from '../utils/dateConverter';

import { EventsHandler, Event } from '../handlers/eventsHandler';
import axios from 'axios';

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
      fontSize: '1.1rem',
      padding: '0.3rem',
      '&:hover': {
        cursor: 'pointer',
      },
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
  const [loadingState, setLoadingState] = useState(LoadingState.LOADING);
  const [events, setEvents] = useState<Event[]>();
  const BASE_URL = 'http://localhost:3010';
  const month = new Date().getMonth().valueOf();
  const classes = useStyles();
  async function eventHandler() {
    const newEvents = await axios
      .get<Event[]>(`${BASE_URL}/api/events/user`, {
        headers: {
          authorization: `Bearer ${TokenHandler.getToken()}`,
        },
      })
      .then((res) => res.data);
    return newEvents;
  }
  //prettier-ignore
  useEffect(() => {
    setTimeout(async () => {
      const newEvents = await eventHandler()
      setEvents(newEvents)
      setLoadingState(LoadingState.LOADED)
    },1000)
  },[]);
  return (
    <>
      {TokenHandler.tokenValidation() ? true : useHistory().push('/')}
      {loadingState === LoadingState.LOADING && <Loading />}
      {loadingState === LoadingState.LOADED && (
        <>
          <div className={classes.root}>
            <Header />
            <Box width="100vw" height="calc(100vh-45px)" overflow="hidden">
              <Box className={classes.header} display="flex">
                <Typography className={classes.month}>
                  {months[month]}
                </Typography>
                <Box display="flex" flexGrow="1" />
                <Link
                  component={Button}
                  to="/createEvent"
                  className={classes.Button}
                >
                  +
                </Link>
              </Box>
              <Grid container direction="row" alignItems="center">
                {events?.map((e) => (
                  <EventCard
                    description={e.description}
                    initTime={e.initTime}
                    finishTime={e.finishTime}
                  />
                ))}
              </Grid>
            </Box>
          </div>
        </>
      )}
    </>
  );
};
