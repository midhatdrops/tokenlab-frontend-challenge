import React from 'react';

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

export const IndividualCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.Card}>
      <CardHeader title="Dia 01" />
      <CardContent className={classes.CardContent}>
        <Typography className={classes.subTitle} align="center">
          Descrição
        </Typography>
        <Typography variant="body1" align="center" className={classes.typo}>
          Horário de Início / Horário de Término
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Link component={Button} className={classes.Button} to="/editEvents">
          Editar
        </Link>
        <Link component={Button} className={classes.Button} to="/excludeEvents">
          Excluir
        </Link>
      </CardActions>
    </Card>
  );
};
