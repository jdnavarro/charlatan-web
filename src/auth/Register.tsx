import React from "react";

import { TextField, Button } from "@material-ui/core";

import * as api from "./api";

interface Props {
  path: string;
}

export const Register = (props: Props) => {
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
    api.register(email, password);
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
        Sign Up
      </Button>
    </form>
  );
};
