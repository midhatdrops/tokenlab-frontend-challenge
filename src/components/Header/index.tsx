import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navbar: {
      width: '100%',
      borderBottom: `1px solid #fff`,
      marginBottom: '1rem',
    },
    typo: {
      fontFamily: 'Ubuntu',
      fontSize: '2rem',
      lineHeight: '28px',
      marginBottom: '0.5rem',
      marginTop: '0.5rem',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      '&:visited': {
        color: '#fff',
      },
    },
  })
);

export const Header = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      alignItems="center"
      direction="row"
      justify="center"
      className={classes.navbar}
    >
      <Typography variant="h2" align="center" className={classes.typo}>
        <Link to="/dashboard" className={classes.link}>
          Calendar APP
        </Link>
      </Typography>
    </Grid>
  );
};
