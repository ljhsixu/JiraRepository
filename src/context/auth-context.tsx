import React, { ReactNode, useEffect, useState } from "react";
import * as auth from "auth-provider";
import { User } from "../screens/project-list/Search-panel";
import * as http from "http";
import { request } from "../utils/http";
interface AuthForm {
  username: string;
  password: string;
}

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (from: AuthForm) => Promise<void>;
      login: (from: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";
// 初始化user
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await request("me", { token });
    user = data.user;
  }
  return user;
};
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: AuthForm) =>
    auth.register(form).then((user) => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));
  useEffect(() => {
    bootstrapUser().then((res) => {
      setUser(res);
    });
  }, []);
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    ></AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  console.log(context);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
