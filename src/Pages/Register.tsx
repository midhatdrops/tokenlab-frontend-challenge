import { Box, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Header } from '../components/Header';
import { registerHandler } from '../handlers/registerHandler';
import { useHistory } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

interface IRegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required()
    .min(10),
  email: yup
    .string()
    .required()
    .email(),
  password: yup
    .string()
    .required()
    .min(2),
  confirmPassword: yup
    .string()
    .required()
    .min(2),
});

export const RegisterForm = () => {
  const history = useHistory();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<IRegisterForm> = async (
    data: IRegisterForm,
    e
  ) => {
    e?.preventDefault();
    const { email, password, fullName, confirmPassword } = data;
    if (confirmPassword !== password) return history.push('/register');
    const validate = await registerHandler(
      fullName,
      email,
      password,
      confirmPassword
    );
    if (validate === false) {
      return history.push('/');
    }
    return history.push('/dashboard');
  };
  const classes = useStyles();
  return (
    <Box width="100vw" height="100vh">
      <Grid container className={classes.root}>
        <Header />
      </Grid>
      <Box
        width="100%"
        height="calc(100vh - 45px)"
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
            name="fullName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Full Name"
                className={classes.formInput}
                error={errors.fullName?.message ? true : false}
                helperText={errors.fullName?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                className={classes.formInput}
                error={errors.email?.message ? true : false}
                helperText={errors.email?.message}
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
                error={errors.password?.message ? true : false}
                helperText={errors.password?.message}
                type="password"
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password"
                className={classes.formInput}
                error={errors.confirmPassword?.message ? true : false}
                helperText={errors.confirmPassword?.message}
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
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};
