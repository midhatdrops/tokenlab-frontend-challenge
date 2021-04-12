import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      width: '100%',
      height: '30px',
      borderTop: '1px solid #fff',
      position: 'fixed',
      bottom: '0',
      display: 'flex',
      alignItems: 'center',
      marginTop: '1.5rem',
    },
    link: {
      fontSize: '1rem',
      color: '#fff',
      textDecoration: 'none',
      '&:visited': {
        color: '#fff',
      },
      marginRight: '1rem',
    },
    typo: {
      fontSize: '1rem',
      color: '#fff',
      marginLeft: '0.5rem',
    },
  })
);

export const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.typo}>🖥️ Bruno R.N</Typography>
      <Box flexGrow={1} />{' '}
      <Link to="/logout" className={classes.link}>
        Logout
      </Link>
    </Box>
  );
};
