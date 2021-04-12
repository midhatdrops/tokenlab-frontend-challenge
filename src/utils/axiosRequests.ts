import axios from 'axios';
import { TokenHandler } from '../handlers/tokenHandler';
import { Event } from './eventInterface';

const token = TokenHandler.getToken();
const BASE_URL = `http://localhost:3010`;
const actualMonth = new Date().getMonth().valueOf();
export const AxiosRequest = {
  post: async (event: Event) => {
    const status = await axios
      .post(
        `${BASE_URL}/api/events`,
        {
          description: event.description,
          initTime: event.initTime,
          finishTime: event.finishTime,
          month: event.month,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.status);
    return status;
  },
  put: async (event: Event, id: number) => {
    const status = await axios
      .put(
        `${BASE_URL}/api/events/${id}`,
        {
          description: event.description,
          initTime: event.initTime,
          finishTime: event.finishTime,
          month: event.month,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.status);
    return status;
  },
  delete: async (id: number) => {
    const response = await axios
      .delete(`${BASE_URL}/api/events/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.status);
    return response;
  },
  getByMonth: async (month: number = actualMonth) => {
    const events = await axios
      .get<Event[]>(`${BASE_URL}/api/events/user/${month}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
    return events;
  },
  getEvent: async (id: string) => {
    const event = await axios
      .get<Event>(`${BASE_URL}/api/events/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
    return event;
  },
};
