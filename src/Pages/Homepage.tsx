import React, { useEffect, useState } from 'react';

import { Loading } from '../components/Loading';
import { LoadingState } from '../utils/enumLoading';
import { LoginForm } from '../Pages/Login';

export const Homepage = () => {
  const [loadingState, setLoadingState] = useState(LoadingState.LOADING);
  useEffect(() => {
    setTimeout(() => {
      setLoadingState(LoadingState.LOADED);
    }, 2500);
  });
  return (
    <>
      {loadingState === LoadingState.LOADING && <Loading />}
      {loadingState === LoadingState.LOADED && <LoginForm />}
    </>
  );
};
