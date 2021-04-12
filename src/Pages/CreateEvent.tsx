import DateFnsUtils from '@date-io/date-fns';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { utcToZonedTime } from 'date-fns-tz';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { TokenHandler } from '../handlers/tokenHandler';
import { AxiosRequest } from '../utils/axiosRequests';
import {
  GeneratorFormatDate,
  validateDate,
} from '../utils/dateGeneratorAndValidator';

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

export const CreateEventForm = () => {
  const [initDate, setInitDate] = useState<Date>(new Date());
  const [initTime, setInitTime] = useState<Date>(new Date());
  const [finishDate, setFinishDate] = useState<Date>(new Date());
  const [finishTime, setFinishTime] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateEventForm>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<ICreateEventForm> = async (
    data: ICreateEventForm,
    e
  ) => {
    e?.preventDefault();
    const month = data.initDate.getMonth();
    const initDateTime = new GeneratorFormatDate(
      data.initDate,
      data.initTime
    ).execute();
    const FinishDateTime = new GeneratorFormatDate(
      data.finishDate,
      data.finishTime
    ).execute();
    const validate = validateDate(initDateTime, FinishDateTime);
    if (!validate) {
      return (window.location.href = 'http://localhost:3000/events/create');
    }
    const responseStatus = await AxiosRequest.post({
      description: data.description,
      initTime: initDateTime,
      finishTime: FinishDateTime,
      month,
    });
    if (responseStatus === 201) {
      alert('Evento Criado');
      window.location.href = 'http://localhost:3000/dashboard';
    } else {
      alert('Erro');
    }
  };
  const classes = useStyles();
  return (
    <>
      {TokenHandler.tokenValidation() ? true : useHistory().push('/')}
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
                    setDescription(text.target.value);
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
                    error={errors.initDate?.message ? true : false}
                    helperText={errors.initDate?.message}
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
              rules={{ required: true }}
              render={({ field }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    // {...field}
                    margin="normal"
                    label=" Init Time picker"
                    value={initTime}
                    error={errors.initTime?.message ? true : false}
                    helperText={errors.initTime?.message}
                    className={classes.formDate}
                    ampm={false}
                    onChange={(date) => {
                      const timezone = 'America/Sao_Paulo';
                      const zoneDate = utcToZonedTime(date, timezone);
                      setInitTime(zoneDate);
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
                    error={errors.finishDate?.message ? true : false}
                    helperText={errors.finishDate?.message}
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
              rules={{ required: true }}
              render={({ field }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    // {...field}
                    margin="normal"
                    label=" Finish Time picker"
                    value={finishTime}
                    error={errors.finishTime?.message ? true : false}
                    helperText={errors.finishTime?.message}
                    className={classes.formDate}
                    ampm={false}
                    onChange={(date) => {
                      const timezone = 'America/Sao_Paulo';
                      const zoneDate = utcToZonedTime(date, timezone);
                      setFinishTime(zoneDate);
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
    </>
  );
};
