import React from "react";

interface Prop {
  token: string;
  setToken: (t: string) => void;
}

const noop = () => void {};

export const AuthContext = React.createContext<Prop>({
  token: "",
  setToken: noop,
});
