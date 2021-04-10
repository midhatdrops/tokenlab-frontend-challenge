import { useHistory } from 'react-router-dom';

export class TokenHandler {
  static storeToken(token: string) {
    window.localStorage.setItem('token', token);
  }
  static getToken() {
    return window.localStorage.getItem('token');
  }

  static tokenValidation(historyParam: typeof useHistory) {
    const history = historyParam();
    const token = this.getToken();
    if (!token) {
      alert('Must Login First!');
      history.push('/');
    }
    return true;
  }
}
