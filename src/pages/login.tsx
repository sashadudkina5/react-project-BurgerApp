import React from "react";
import styles from "./styles/pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { loginThunk } from "../redux_services/thunk-functions/OnLogin";
import { getUserError, getLoggedInStatus } from "../redux_services/selectors";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router";
import { TSubmitHandler } from "../utils/types";
import { useForm } from "../hooks/useForm";
import { useAppSelector, useAppDispatch } from "../hooks/dispatch-selectos";

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(getLoggedInStatus);
  const registerError = useAppSelector(getUserError);

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

  const handleFormSubmit: TSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginThunk(values));
  };

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.window}>
        <h1 className={`text text_type_main-medium ${styles.title}`}>Вход</h1>
        <form onSubmit={handleFormSubmit}>
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
            Войти
          </Button>
        </form>

        {isLoggedIn && navigate("/")}

        {registerError && <p>{registerError.message}</p>}

        <div className={`mt-20 ${styles.wrapper}`}>
          <p className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </p>
          <Link to="/register">
            <p className="text text_type_main-default">Зарегистрироваться</p>
          </Link>
        </div>

        <div className={`mt-4 ${styles.wrapper}`}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <Link to="/forgot-password">
            <p className="text text_type_main-default">Восстановить пароль</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
