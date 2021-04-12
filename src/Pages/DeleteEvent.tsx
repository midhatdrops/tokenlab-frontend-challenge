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
import { useHistory } from 'react-router-dom';

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
  useEffect(() => {
    setTimeout(async () => {
      const response = await retriveInfos();
      setSelectDate(response.initTime);
      setSelectTime(response.initTime);
      setDescription(response.description);
      console.log(response.description);
      SetId(response.id);
      setFinishTime(new Date(response.finishTime));
    });
  }, []);

  const { control, handleSubmit } = useForm<IEditEventForm>();
  const onSubmit: SubmitHandler<IEditEventForm> = async (
    data: IEditEventForm,
    e
  ) => {
    e?.preventDefault();
    const token = TokenHandler.getToken();
    const responseStatus = await axios
      .delete(`http://localhost:3010/api/events/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.status);
    if (responseStatus !== 200) {
      alert('Error');
    }
    alert('Evento Deletado!');
    window.location.href = 'http://localhost:3000/dashboard';
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
                  // {...field}
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
                  // {...field}
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
  );
};
