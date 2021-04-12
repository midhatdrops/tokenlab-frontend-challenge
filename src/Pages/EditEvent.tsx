import { Box, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Header } from '../components/Header';
import { TokenHandler } from '../handlers/tokenHandler';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

interface IEditEventForm {
  initDate: Date;
  month: number;
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
  month: number;
}

const schema = yup.object().shape({
  description: yup
    .string()
    .required()
    .min(2),
  initDate: yup.date().required(),
  initTime: yup.date().required(),
  finishDate: yup.date().required(),
  finishTime: yup.date().required(),
});

export const EditEventForm = () => {
  const [initDate, setInitDate] = useState<Date | null>(new Date());
  const [initTime, setInitTime] = useState<Date | null>(new Date());
  const [finishDate, setFinishDate] = useState<Date | null>(new Date());
  const [finishTime, setFinishTime] = useState<Date | null>(new Date());
  const [description, setDescription] = useState<string>();
  const [id, SetId] = useState<number>(1);
  async function retriveInfos() {
    const id = window.location.href.split('=')[1];
    const token = TokenHandler.getToken();
    const response = await axios
      .get<Event>(`http://localhost:3010/api/events/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
    return response;
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IEditEventForm>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setTimeout(async () => {
      const response = await retriveInfos();
      setInitDate(response.initTime);
      setInitTime(response.initTime);
      setDescription(response.description);
      setFinishTime(response.finishTime);
      setFinishDate(response.finishTime);
      SetId(response.id);
      reset({
        description: response.description,
        finishDate: response.finishTime,
        finishTime: response.finishTime,
        id: response.id,
        initDate: response.initTime,
        initTime: response.initTime,
        month: response.month,
      });
    });
  }, [reset]);

  const onSubmit: SubmitHandler<IEditEventForm> = async (
    data: IEditEventForm,
    e
  ) => {
    e?.preventDefault();
    data.id = id;
    const month = data.initDate.getMonth() + 1;
    const initDate = new Date(data.initDate).toISOString().split('T')[0];
    const initTime = new Date(data.initTime).toISOString().split('T')[1];
    const DateTime = new Date(`${initDate} ${initTime}`);

    const finishDate = new Date(data.finishDate).toISOString().split('T')[0];
    const finishTime = new Date(data.finishTime).toISOString().split('T')[1];
    const FinishTime = new Date(`${finishDate} ${finishTime}`);

    if (
      DateTime.getTime() == FinishTime.getTime() ||
      DateTime.getTime() >= FinishTime.getTime()
    ) {
      return alert(
        'Data de fim deve ser maior ou diferente do que a de início '
      );
    }

    const token = TokenHandler.getToken();
    const responseStatus = await axios
      .put(
        `http://localhost:3010/api/events/${data.id}`,
        {
          description: data.description,
          initTime: DateTime.toISOString(),
          finishTime: FinishTime.toISOString(),
          month,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.status);
    if (responseStatus === 200) {
      alert('evento Modificado');
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
            defaultValue={description}
            render={({ field }) => (
              <TextField
                onChange={(text) => {
                  field.onChange(text);
                }}
                rows={2}
                error={errors.description?.message ? true : false}
                helperText={errors.description?.message}
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
                  {...field}
                  disableToolbar
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  error={errors.initDate?.message ? true : false}
                  helperText={errors.initDate?.message}
                  label=" Init Date Picker"
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
                  {...field}
                  margin="normal"
                  label="Init Time picker"
                  value={initTime}
                  error={errors.initTime?.message ? true : false}
                  helperText={errors.initTime?.message}
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
                  error={errors.finishDate?.message ? true : false}
                  helperText={errors.finishDate?.message}
                  label=" Finish Date Picker"
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
                  label="Finish Time picker"
                  value={finishTime}
                  error={errors.finishTime?.message ? true : false}
                  helperText={errors.finishTime?.message}
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
            Edit
          </Button>
        </form>
      </Box>
      <Footer />
    </Box>
  );
};
