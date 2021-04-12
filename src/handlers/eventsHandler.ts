import axios from 'axios';
import { TokenHandler } from '../handlers/tokenHandler';

const BASE_URL = 'http://localhost:3010';

export interface Event {
  description: string;
  initTime: Date;
  finishTime: Date;
  id: number;
}

export class EventsHandler {
  static async getEvents() {
    const events = await axios
      .get<Event[]>(`${BASE_URL}/api/events/user`, {
        headers: {
          authorization: `Bearer ${TokenHandler.getToken()}`,
        },
      })
      .then((res) => res.data);
    return events;
  }
}
