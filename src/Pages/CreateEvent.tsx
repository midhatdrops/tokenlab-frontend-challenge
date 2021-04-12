import { Box, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Header } from '../components/Header';
import { TokenHandler } from '../handlers/tokenHandler';
// import { registerHandler } from '../handlers/registerHandler';
// import { useHistory } from 'react-router';

import DateFnsUtils from '@date-io/date-fns';
import axios from 'axios';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Footer } from '../components/Footer';

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
      marginBottom: '1rem',
      textAlign: 'center',
      width: '100%',
    },
    formDate: {
      marginTop: '1rem',
      // overflow: 'hidden',
    },
  })
);

interface ICreateEventForm {
  initDate: Date;
  initTime: Date;
  finishDate: Date;
  finishTime: Date;
  description: string;
  id: number;
}

interface Event {
  id: number;
  description: string;
  initTime: Date;
  finishTime: Date;
}

export const CreateEventForm = () => {
  const [initDate, setInitDate] = useState<Date | null>(new Date());
  const [initTime, setInitTime] = useState<Date | null>(new Date());
  const [finishDate, setFinishDate] = useState<Date | null>(new Date());
  const [finishTime, setFinishTime] = useState<Date | null>(new Date());
  const [description, setDescription] = useState<string>();
  const [id, SetId] = useState<number>(1);
  const { control, handleSubmit } = useForm<ICreateEventForm>();
  const onSubmit: SubmitHandler<ICreateEventForm> = async (
    data: ICreateEventForm,
    e
  ) => {
    e?.preventDefault();
    data.id = id;
    const token = TokenHandler.getToken();
    const initDate = data.initDate.toISOString().split('T')[0];
    const initTime = data.initTime.toISOString().split('T')[1];
    const InitDateTime = new Date(`${initDate} ${initTime}`);

    const finishDate = data.initDate.toISOString().split('T')[0];
    const finishTime = data.initTime.toISOString().split('T')[1];
    const InitFinishTime = new Date(`${finishDate} ${finishTime}`);

    if (
      InitDateTime.getTime() == InitFinishTime.getTime() ||
      InitDateTime.getTime() >= InitFinishTime.getTime()
    ) {
      return alert(
        'Data de fim deve ser maior ou diferente do que a de início '
      );
    }

    const responseStatus = await axios
      .post(
        `http://localhost:3010/api/events`,
        {
          description: data.description,
          initTime: InitDateTime.toISOString(),
          finishTime: InitFinishTime.toISOString(),
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.status);
    if (responseStatus === 201) {
      alert('Evento Criado');
      window.location.href = 'http://localhost:3000/dashboard';
    } else {
      alert('Erro');
    }
  };
  const classes = useStyles();
  return (
    <Box width="100vw" height="100vh" overflow="hidden">
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
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                onChange={(text) => {
                  field.onChange(text);
                }}
                rows={2}
                multiline
                rowsMax={5}
                label="Description"
                className={classes.formInput}
                placeholder={description as string}
              />
            )}
          />
          <Controller
            name="initDate"
            control={control}
            defaultValue={initDate}
            rules={{ required: true }}
            render={({ field }) => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  // {...field}
                  disableToolbar
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  label="Init Date Picker"
                  className={classes.formDate}
                  value={initDate}
                  onChange={(date) => {
                    setInitDate(date);
                    field.onChange(date);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            )}
          />
          <Controller
            name="initTime"
            control={control}
            defaultValue={initTime}
            rules={{ required: true }}
            render={({ field }) => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  // {...field}
                  margin="normal"
                  label=" Init Time picker"
                  value={initTime}
                  className={classes.formDate}
                  onChange={(date) => {
                    setInitTime(date);
                    field.onChange(date);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            )}
          />
          <Controller
            name="finishDate"
            control={control}
            defaultValue={finishDate}
            rules={{ required: true }}
            render={({ field }) => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  // {...field}
                  disableToolbar
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  label="Finish Date Picker"
                  className={classes.formDate}
                  value={finishDate}
                  onChange={(date) => {
                    setFinishDate(date);
                    field.onChange(date);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            )}
          />
          <Controller
            name="finishTime"
            control={control}
            defaultValue={finishTime}
            rules={{ required: true }}
            render={({ field }) => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  // {...field}
                  margin="normal"
                  label=" Finish Time picker"
                  value={finishTime}
                  className={classes.formDate}
                  onChange={(date) => {
                    setFinishTime(date);
                    field.onChange(date);
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            )}
          />
          <br />
          <Button
            variant="outlined"
            type="submit"
            className={classes.formButton}
          >
            Create
          </Button>
        </form>
      </Box>
      <Footer />
    </Box>
  );
};
