import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

export const Loading = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <CircularProgress color="secondary" />
    </Box>
  );
};
