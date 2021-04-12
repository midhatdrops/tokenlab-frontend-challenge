/* eslint-disable react/jsx-key */
import { Box, Button, Grid } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { EventCard } from '../components/EventCard';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { Event } from '../handlers/eventsHandler';
import { TokenHandler } from '../handlers/tokenHandler';
import { AxiosRequest } from '../utils/axiosRequests';
import { LoadingState } from '../utils/enumLoading';

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
    motion: {
      width: '100%',
    },
  })
);

export const DashBoard = () => {
  const [loadingState, setLoadingState] = useState(LoadingState.LOADING);
  const [events, setEvents] = useState<Event[]>();
  const [exibMonth, setExibMonth] = useState<number>(new Date().getMonth());
  const classes = useStyles();

  async function eventMonthHandler(month: number) {
    const newEvents = await AxiosRequest.getByMonth(month);
    setEvents(newEvents);
    setExibMonth(month);
  }
  useEffect(() => {
    setTimeout(async () => {
      const newEvents = await AxiosRequest.getByMonth();
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
                  <MenuItem value={0}>Jan</MenuItem>
                  <MenuItem value={1}>Fev</MenuItem>
                  <MenuItem value={2}>Mar</MenuItem>
                  <MenuItem value={3}>Abr</MenuItem>
                  <MenuItem value={4}>Mai</MenuItem>
                  <MenuItem value={5}>Jun</MenuItem>
                  <MenuItem value={6}>Jul</MenuItem>
                  <MenuItem value={7}>Ago</MenuItem>
                  <MenuItem value={8}>Set</MenuItem>
                  <MenuItem value={9}>Out</MenuItem>
                  <MenuItem value={10}>Nov</MenuItem>
                  <MenuItem value={11}>Dez</MenuItem>
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
