'use client';
import { getUser } from '@/lib/leonardo';
import { User } from '@/lib/types';
import React from 'react';

type Auth = {
  user: User | null;
};
type Props = React.PropsWithChildren<{}>;

const auth = React.createContext<Auth>({ user: null });

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    getUser().then((u) => {
      if (!u) {
        throw new Error(`can't get user details`);
      }
      setUser(u);
    });
  }, []);
  return <auth.Provider value={{ user }}>{children}</auth.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  const value = React.useContext(auth);
  return value;
};
