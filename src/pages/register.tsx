import React from "react";
import styles from "./styles/pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { registerThunk } from "../redux_services/thunk-functions/registration";
import { useNavigate } from "react-router-dom";
import {
  getUserEmail,
  getUserError,
  getLoggedInStatus,
} from "../redux_services/selectors";
import { Navigate } from "react-router";
import { TSubmitHandler } from "../utils/types";
import { useForm } from "../hooks/useForm";
import { useAppSelector, useAppDispatch } from "../hooks/dispatch-selectos";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isRegistered = useAppSelector(getUserEmail);
  const registerError = useAppSelector(getUserError);

  const inputNameRef = React.useRef<HTMLInputElement>(null);
  const onIconClickName = () => {
    setTimeout(() => inputNameRef.current?.focus(), 0);
    alert("Icon Click Callback");
  };

  const inputEmailRef = React.useRef<HTMLInputElement>(null);
  const onIconClickEmail = () => {
    setTimeout(() => inputEmailRef.current?.focus(), 0);
    alert("Icon Click Callback");
  };

  const inputPasswordRef = React.useRef<HTMLInputElement>(null);
  const onIconClickPassword = () => {
    setTimeout(() => inputPasswordRef.current?.focus(), 0);
    alert("Icon Click Callback");
  };

  const { values, handleChange } = useForm();

  const isLoggedIn = useAppSelector(getLoggedInStatus);
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleFormSubmit: TSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerThunk(values));
  };

  return (
    <div className={styles.page}>
      <div className={styles.window}>
        <h1 className={`text text_type_main-medium ${styles.title}`}>
          Регистрация
        </h1>
        <form onSubmit={handleFormSubmit}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            value={values.name}
            name={"name"}
            error={false}
            ref={inputNameRef}
            onIconClick={onIconClickName}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <Input
            type={"text"}
            placeholder={"E-mail"}
            onChange={handleChange}
            value={values.email}
            name={"email"}
            error={false}
            ref={inputEmailRef}
            onIconClick={onIconClickEmail}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />

          <Input
            type={"text"}
            placeholder={"Пароль"}
            onChange={handleChange}
            icon={"ShowIcon"}
            value={values.password}
            name={"password"}
            error={false}
            ref={inputPasswordRef}
            onIconClick={onIconClickPassword}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />

          <Button htmlType="submit" type="primary" size="large">
            Зарегистрироваться
          </Button>
        </form>

        {isRegistered && navigate("/")}

        {registerError && <p>{registerError}</p>}

        <div className={`mt-20 ${styles.wrapper}`}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </p>
          <Link to="/login">
            <p className="text text_type_main-default">Войти</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
