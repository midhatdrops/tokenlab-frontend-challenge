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
import { parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import React, { useEffect, useState } from 'react';
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

interface IEditEventForm {
  initDate: Date;
  month: number;
  initTime: Date;
  finishDate: Date;
  finishTime: Date;
  description: string;
  id: number;
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
  const [initDate, setInitDate] = useState<Date>(new Date());
  const [initTime, setInitTime] = useState<Date>(new Date());
  const [finishDate, setFinishDate] = useState<Date>(new Date());
  const [finishTime, setFinishTime] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>();
  const [id, SetId] = useState<number>(1);

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
      const id = window.location.href.split('=')[1];
      const response = await AxiosRequest.getEvent(id);
      setInitDate(response.initTime);
      setInitTime(response.initTime);
      setDescription(response.description);
      setFinishTime(response.finishTime);
      setFinishDate(response.finishTime);
      SetId(response.id as number);
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
    const month = data.initDate.getMonth();
    const InitDateTime = new GeneratorFormatDate(
      data.initDate,
      data.initTime
    ).execute();
    const FinishDateTime = new GeneratorFormatDate(
      data.finishDate,
      data.finishTime
    ).execute();
    const validation = validateDate(InitDateTime, FinishDateTime);
    if (!validation) {
      return (window.location.href = `http://localhost:3000/events/edit?id=${data.id}`);
    }
    const responseStatus = await AxiosRequest.put(
      {
        description: data.description,
        initTime: InitDateTime,
        finishTime: FinishDateTime,
        month,
        id: data.id,
      },
      data.id
    );
    if (responseStatus === 200) {
      alert('evento Modificado');
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
                    value={parseISO(new Date(initDate).toISOString())}
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
                    value={parseISO(new Date(initTime).toISOString())}
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
                    value={parseISO(new Date(finishDate).toISOString())}
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
                    value={parseISO(new Date(finishTime).toISOString())}
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
              Edit
            </Button>
          </form>
        </Box>
        <Footer />
      </Box>
    </>
  );
};
