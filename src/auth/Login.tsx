import React from "react";
import { Link as RouterLink } from "@reach/router";

import { TextField, Button, Link } from "@material-ui/core";

import * as api from "./api";

interface Props {
  path: string;
}

export const Login = (props: Props) => {
  const path = props;

  const [email, updateEmail] = React.useState("");

  const [password, updatePassword] = React.useState("");

  const handleUserChange = (e: any) => {
    updateEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    updatePassword(e.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    api.login(email, password);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={handleUserChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={handlePasswordChange}
      />
      <Button type="submit" fullWidth variant="contained" color="primary">
        Sign In
      </Button>
      <RegisterLink to="/register">{"Sign Up"}</RegisterLink>
    </form>
  );
};

const RegisterLink: React.FC<{ to: string }> = (props) => {
  const { to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<any, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <Link component={renderLink} variant="body2">
      {"Don't have an account? Sign Up"}
    </Link>
  );
};
