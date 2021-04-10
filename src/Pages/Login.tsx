import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Header } from '../components/Header';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      textAlign: 'center',
      width: '100%',
      paddgin: '0',
    },
    formControl: {
      width: '100',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    formButton: {
      marginTop: '1rem',
    },
    formInput: {
      marginTop: '1rem',
    },
  })
);

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { control, handleSubmit } = useForm<ILoginForm>();
  const onSubmit = (data: ILoginForm) => console.log(data);
  const classes = useStyles();
  return (
    <Box width="100vw" height="100vh">
      <Grid container className={classes.root}>
        <Header />
      </Grid>
      <Box
        width="100%"
        height="500px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <form onSubmit={handleSubmit(onSubmit)} className={classes.formControl}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                className={classes.formInput}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                className={classes.formInput}
              />
            )}
          />
          <br />
          <Button
            variant="outlined"
            type="submit"
            className={classes.formButton}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};
