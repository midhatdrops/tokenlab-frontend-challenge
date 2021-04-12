/* eslint-disable react/prop-types */
import React from 'react';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import EventIcon from '@material-ui/icons/Event';

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
import { Event } from '../../handlers/eventsHandler';
import { motion } from 'framer-motion';

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
      webkitBoxShadow: '8px 13px 5px 0px rgba(0,0,0,0.51)',
      mozBoxShadow: '8px 13px 5px 0px rgba(0,0,0,0.51)',
      boxShadow: '8px 13px 5px 0px rgba(0,0,0,0.51)',
    },
    CardHead: {
      fontSize: '1rem',
    },
    CardContent: {
      width: '100%',
      display: 'flex',
      fontSize: '1rem',
      fontFamily: 'Oswald',
      fontWeight: 300,
      flexDirection: 'column',
      alignItems: 'center',
      letterSpacing: '0.2rem',
    },
    typo: {
      width: '80%',
      border: '1px solid #fff',
      borderRadius: '4px',
      marginTop: '1rem',
      letterSpacing: '0.1rem',
      transition: '0.7s',
      '&:hover': {
        opacity: '0.6',
      },
    },
    subTitle: {
      width: '80%',
      fontWeight: 300,
      fontSize: '0.8rem',
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
      letterSpacing: '0.1rem',
      border: '1px solid #fff',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: '0.5s',
      '&:hover': {
        border: `1px solid ${theme.palette.secondary.dark}`,
      },
    },
    cardActions: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      '&visited': {
        color: '#fff',
      },
    },
    motion: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

export const IndividualCard: React.FC<Event> = ({
  description,
  finishTime,
  initTime,
  id,
}) => {
  const treatedInitTime = new Date(initTime);
  const treatedFinishTime = new Date(finishTime);
  const classes = useStyles();
  return (
    <motion.div
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      transition={{ ease: 'easeInOut', duration: 1 }}
      className={classes.motion}
    >
      <Card className={classes.Card}>
        <CardHeader
          title={`Dia ${treatedInitTime.toString().split(' ')[2]} ${
            treatedFinishTime.toString().split(' ')[2] ===
            treatedInitTime.toString().split(' ')[2]
              ? ''
              : '-> ' + treatedFinishTime.toString().split(' ')[2]
          }`}
          avatar={<EventIcon />}
          className={classes.CardHead}
        />
        <CardContent className={classes.CardContent}>
          <i>Descrição:</i>
          <Typography className={classes.subTitle} align="justify">
            {description}
          </Typography>
          <i>Início / Fim</i>
          <Typography variant="body1" align="center" className={classes.typo}>
            {` ${treatedInitTime.getHours()}:${
              treatedInitTime.getMinutes() === 0
                ? '00'
                : treatedInitTime.getMinutes()
            } / 
          ${treatedFinishTime.getHours()}:${
              treatedFinishTime.getMinutes() === 0
                ? '00'
                : treatedFinishTime.getMinutes()
            } `}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Link to={`/events/edit?id=${id}`} className={classes.link}>
            <Button variant="outlined" startIcon={<CreateIcon />}>
              Editar
            </Button>
          </Link>
          <Link to={`/events/delete?id=${id}`} className={classes.link}>
            <Button startIcon={<DeleteIcon />} variant="outlined">
              Excluir
            </Button>
          </Link>
        </CardActions>
      </Card>
    </motion.div>
  );
};
