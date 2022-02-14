import React, { useEffect, useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authorization } from "../../redux/actions/fetchActions";
import styles from "./styles.module.css";
import "./styles.css";
import TextField from "@mui/material/TextField";
import {Helmet} from "react-helmet";
export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();
  const loginRef = useRef()
  const handleLogin = async () => {
    loginRef.current.disabled = true
    dispatch(
      authorization({ type: "logIn", email: `${email}`, password: `${pass}` })
    );
    setTimeout(() => {
      loginRef.current.disabled = false
    }, 1000);
  };
  const user = useSelector((data) => data.loginUser);
  return (
    <div className={styles.mainCont}>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className={styles.regCont} id="inputs-mui">
        <h1 className={styles.title}>login</h1>

        <TextField
          error={user?.error?.includes("mail")}
          label="Email"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          helperText={
            user?.error?.includes("user") || user?.error?.includes("email")&& (
              <p style={{ width: "15rem" }}>{user.error}</p>
            )
          }
        />
        <TextField
          error={user?.error?.includes("password")}
          label="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type={"password"}
          helperText={
            user?.error?.includes("password") && (
              <p style={{ width: "15rem" }}>{user.error}</p>
            )
          }
        />

        <button onClick={handleLogin} ref={loginRef} className={styles.authButton}>
          login
        </button>
      </div>
    </div>
  );
}
