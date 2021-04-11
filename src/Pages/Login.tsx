import { Box, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Header } from '../components/Header';
import { loginHandler } from '../handlers/loginHandler';
import { useHistory } from 'react-router';
import { TokenHandler } from '../handlers/tokenHandler';

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
      textAlign: 'center',
    },
  })
);

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const history = useHistory();
  const { control, handleSubmit } = useForm<ILoginForm>();
  const onSubmit: SubmitHandler<ILoginForm> = async (data: ILoginForm, e) => {
    e?.preventDefault();
    const { email, password } = data;
    const validate = await loginHandler(email, password);
    if (validate === false) {
      return history.push('/');
    }
    return history.push('/dashboard');
  };
  const classes = useStyles();
  return (
    <>
      {TokenHandler.tokenValidation() ? useHistory().push('/dashboard') : false}
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.formControl}
            method="POST"
          >
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
                  type="password"
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
    </>
  );
};
