import { Box, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Header } from '../components/Header';
import { loginHandler } from '../handlers/loginHandler';
import { useHistory } from 'react-router';
import { TokenHandler } from '../handlers/tokenHandler';
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
    link: {
      color: '#fff',
      textDecoration: 'none',
      '&:visited': {
        color: '#fff',
      },
    },
  })
);

interface ILoginForm {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required('O campo email é obrigatório!')
    .email('Por favor insira um email válido!'),
  password: yup
    .string()
    .required('O campo password é obrigatório!')
    .min(2),
});

export const LoginForm = () => {
  const history = useHistory();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({ resolver: yupResolver(schema) });
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
              rules={{}}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={errors.email?.message ? true : false}
                  label="Email"
                  className={classes.formInput}
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
                  type="password"
                  helperText={errors.password?.message}
                  error={errors.password?.message ? true : false}
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
          <Link to="/user/register" className={classes.link}>
            <Button
              variant="outlined"
              type="submit"
              className={classes.formButton}
            >
              Registrar
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};
