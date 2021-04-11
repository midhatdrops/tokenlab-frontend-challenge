import { useHistory } from 'react-router-dom';

const secret = process.env.AUTH_SECRET;
export class TokenHandler {
  static storeToken(token: string) {
    window.localStorage.setItem('token', token);
  }
  static getToken() {
    return window.localStorage.getItem('token');
  }

  static tokenValidation() {
    const token = this.getToken();
    if (!token) {
      alert('Must Login First!');
      return false;
    }
    return true;
  }
}
