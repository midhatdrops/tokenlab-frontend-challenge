/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Typography, Button } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { TokenHandler } from '../handlers/tokenHandler';
import { useHistory } from 'react-router-dom';
import { Header } from '../components/Header';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { Link } from 'react-router-dom';
import { LoadingState } from '../utils/enumLoading';

import { EventCard } from '../components/EventCard';
import { Loading } from '../components/Loading';

import { months } from '../utils/dateConverter';

import { EventsHandler, Event } from '../handlers/eventsHandler';
import axios from 'axios';
import { Footer } from '../components/Footer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      overflowX: 'hidden',
      marginBottom: '3rem',
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
    calendar: {
      marginLeft: '0.3rem',
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
    formMonth: {
      marginLeft: '0.5rem',
    },
  })
);

export const DashBoard = () => {
  const [loadingState, setLoadingState] = useState(LoadingState.LOADING);
  const [events, setEvents] = useState<Event[]>();
  const [exibMonth, setExibMonth] = useState<number>(new Date().getMonth() + 1);
  const BASE_URL = 'http://localhost:3010';
  const actualMonth = new Date().getMonth().valueOf();
  const classes = useStyles();

  async function eventHandler(month: number = actualMonth + 1) {
    const newEvents = await axios
      .get<Event[]>(`${BASE_URL}/api/events/user/${month}`, {
        headers: {
          authorization: `Bearer ${TokenHandler.getToken()}`,
        },
      })
      .then((res) => res.data);
    return newEvents;
  }
  async function eventMonthHandler(month: number = actualMonth + 1) {
    const newEvents = await eventHandler(month);
    setEvents(newEvents);
    setExibMonth(month);
  }
  useEffect(() => {
    setTimeout(async () => {
      const newEvents = await eventHandler();
      setEvents(newEvents);
      setLoadingState(LoadingState.LOADED);
    }, 1000);
  }, []);
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
                <CalendarTodayIcon className={classes.calendar} />
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={exibMonth}
                  onChange={(e) => eventMonthHandler(e.target.value as number)}
                  className={classes.formMonth}
                >
                  <MenuItem value={1}>Jan</MenuItem>
                  <MenuItem value={2}>Fev</MenuItem>
                  <MenuItem value={3}>Mar</MenuItem>
                  <MenuItem value={4}>Abr</MenuItem>
                  <MenuItem value={5}>Mai</MenuItem>
                  <MenuItem value={6}>Jun</MenuItem>
                  <MenuItem value={7}>Jul</MenuItem>
                  <MenuItem value={8}>Ago</MenuItem>
                  <MenuItem value={9}>Set</MenuItem>
                  <MenuItem value={10}>Out</MenuItem>
                  <MenuItem value={11}>Nov</MenuItem>
                  <MenuItem value={12}>Dez</MenuItem>
                </Select>
                <Box display="flex" flexGrow="1" />
                <Link
                  component={Button}
                  to="/events/create"
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
                    id={e.id}
                    key={e.id}
                  />
                ))}
              </Grid>
            </Box>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
