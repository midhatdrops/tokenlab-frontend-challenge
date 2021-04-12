/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import React from 'react';
import { IndividualCard } from '../EventCard/card';
import { Event } from '../../handlers/eventsHandler';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardGrid: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    Button: {
      marginRight: '0.6rem',
      border: '1px solid #fff',
      borderRadius: '4px',
      padding: '0.3rem',
    },
    Card: {
      width: '90%',
      marginTop: '1rem',
    },
    CardContent: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    typo: {
      marginTop: '1rem',
    },
    subTitle: {
      fontWeight: 300,
      fontSize: '0.8rem',
    },
    cardActions: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

export const EventCard: React.FC<Event> = ({
  description,
  finishTime,
  initTime,
  id,
}) => {
  const classes = useStyles();
  return (
    <Grid item sm={12} md={6} lg={4} className={classes.cardGrid}>
      <IndividualCard
        description={description}
        initTime={initTime}
        finishTime={finishTime}
        id={id}
      />
    </Grid>
  );
};
