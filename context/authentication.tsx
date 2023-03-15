/* eslint-disable consistent-return */
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

import { getToken, removeToken, setToken } from '#/helpers';
import useToast from '#/helpers/notify';
import { createUserAPI, getUserDetailsAPI, loginUserAPI } from '#/lib/apiCalls';
import type { User } from '#/lib/types';

interface AuthContextProps {
  router: any;
  userInfo: User;
  loading: boolean;
  isAuthenticated: boolean | null;
  setUserInfo: (user: User) => void;
  setLoading: (loading: boolean) => void;
  VerifyUser: () => Promise<void>;
  LoginToAccount: (body: any) => Promise<void>;
  CreateAccount: (body: any) => Promise<void>;
  LogoutUser: () => void;
}

interface AuthStateProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

const AuthState = ({ children }: AuthStateProps) => {
  const { success, error } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  const [userInfo, setUserInfo] = useState<User>({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    username: '',
  });

  const LoginToAccount = async (body: any) => {
    const [data, err] = await loginUserAPI(body);
    if (data?.success === true) {
      console.log('Succesfully Login');
      setIsAuthenticated(true);
      setUserInfo(data?.data);
      setToken(data?.token);
      success('Succesfully Login');
      router.push('/');
      return null;
    }
    if (err) {
      console.log(err?.message);
      error(err?.message);
      return err;
    }
  };

  const CreateAccount = async (body: any) => {
    const [data, err] = await createUserAPI(body);
    if (data?.success === true) {
      console.log('Account Created Succesfully!');
      router.push('/login');
      success('Account Created Succesfully!');
      return null;
    }
    if (err) {
      console.log(err?.message);
      error(err?.message);
      return err;
    }
  };

  const LogoutUser = () => {
    setIsAuthenticated(false);
    setUserInfo({
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      username: '',
    });
    removeToken();
  };

  const VerifyUser = async () => {
    if (!getToken()) {
      setIsAuthenticated(false);
      return;
    }
    const [data, err] = await getUserDetailsAPI();
    if (data?.success === true) {
      setIsAuthenticated(true);
      console.log(data.data);
      setUserInfo(data?.data);
    } else if (err) {
      console.log(err?.message);
      error(err?.message);
      LogoutUser();
    }
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      LogoutUser();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    VerifyUser();
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        router,
        userInfo,
        loading,
        setLoading,
        isAuthenticated,
        setUserInfo,
        VerifyUser,
        LoginToAccount,
        CreateAccount,
        LogoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
