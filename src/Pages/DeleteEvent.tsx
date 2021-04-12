import DateFnsUtils from '@date-io/date-fns';
import { Box, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { TokenHandler } from '../handlers/tokenHandler';
import { AxiosRequest } from '../utils/axiosRequests';

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
    },
  })
);

interface IEditEventForm {
  id: number;
  description: string;
  initDate: Date;
  initTime: Date;
}

interface Event {
  id: number;
  description: string;
  initTime: Date;
  finishTime: Date;
}

export const DeleteEventForm = () => {
  const [selectDate, setSelectDate] = useState<Date | null>(new Date());
  const [selectTime, setSelectTime] = useState<Date | null>(new Date());
  const [description, setDescription] = useState<string>();
  const [finishTime, setFinishTime] = useState<Date>(new Date());
  const [id, SetId] = useState<number>(1);

  useEffect(() => {
    setTimeout(async () => {
      const id = window.location.href.split('=')[1];
      const response = await AxiosRequest.getEvent(id);
      setSelectDate(response.initTime);
      setSelectTime(response.initTime);
      setDescription(response.description);
      SetId(response.id as number);
      setFinishTime(new Date(response.finishTime));
    });
  }, []);

  const { control, handleSubmit } = useForm<IEditEventForm>();
  const onSubmit: SubmitHandler<IEditEventForm> = async (
    data: IEditEventForm,
    e
  ) => {
    e?.preventDefault();
    const responseStatus = await AxiosRequest.delete(id);
    if (responseStatus !== 200) {
      alert('Error');
    }
    alert('Evento Deletado!');
    window.location.href = 'http://localhost:3000/dashboard';
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
              render={({ field }) => (
                <TextField
                  onChange={(text) => {
                    field.onChange(text);
                  }}
                  rows={2}
                  multiline
                  inputProps={{
                    readOnly: true,
                  }}
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
              defaultValue={selectDate}
              rules={{ required: true }}
              render={({ field }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    label="Date picker inline"
                    className={classes.formDate}
                    value={selectDate}
                    onChange={(date) => {
                      setSelectDate(date);
                      field.onChange(date);
                    }}
                    disabled
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
              defaultValue={selectTime}
              rules={{ required: true }}
              render={({ field }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    margin="normal"
                    label="Time picker"
                    value={selectTime}
                    className={classes.formDate}
                    onChange={(date) => {
                      setSelectTime(date);
                      field.onChange(date);
                    }}
                    disabled
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
              Delete
            </Button>
          </form>
        </Box>
        <Footer />
      </Box>
    </>
  );
};
