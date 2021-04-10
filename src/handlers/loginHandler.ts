import Axios from 'axios';
import { TokenHandler } from './tokenHandler';

const BASE_URL = 'http://localhost:3010';

export async function loginHandler(email: string, password: string) {
  const data = await Axios.post(`${BASE_URL}/api/login`, { email, password })
    .then((res) => res.data as string)
    .catch((error) => console.log(error.response.data.message));
  if (data) {
    TokenHandler.storeToken(data);
    return true;
  } else {
    return false;
  }
}
