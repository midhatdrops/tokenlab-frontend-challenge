/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { loginHandler } from './loginHandler';

const BASE_URL = 'http://localhost:3010';

export async function registerHandler(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  if (confirmPassword !== password) {
    return false;
  }
  const response = await axios
    .post(`${BASE_URL}/api/users`, {
      name,
      email,
      password,
    })
    .then((res) => res.data)
    .catch((err) => console.log(err.response.data.message));
  if (response) {
    const login = await loginHandler(email, password);
    if (!login) return false;
    return true;
  } else {
    return false;
  }
}
