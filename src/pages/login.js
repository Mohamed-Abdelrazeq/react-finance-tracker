import React, { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export default function Login() {
  const { user, updateUser } = useContext(AuthContext);
  return <div>login {user}</div>;
}
