import React from "react";
import styles from "./styles/pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { getLoggedInStatus } from "../redux_services/selectors";
import { resetPasswordThunk } from "../redux_services/thunk-functions/reset-password";
import { TSubmitHandler } from "../utils/types";
import { useForm } from "../hooks/useForm";
import { useAppSelector, useAppDispatch } from "../hooks/dispatch-selectos";

export const ResetPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const inputRefPassword = React.useRef<HTMLInputElement>(null);
  const onIconClickPassword = () => {
    setTimeout(() => inputRefPassword.current?.focus(), 0);
  };

  const inputRefToken = React.useRef<HTMLInputElement>(null);
  const onIconClickToken = () => {
    setTimeout(() => inputRefToken.current?.focus(), 0);
  };

  const { values, handleChange } = useForm();

  const isLoggedIn = useAppSelector(getLoggedInStatus);
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleFormSubmit: TSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await dispatch(resetPasswordThunk(values));
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.window}>
        <h1 className={`text text_type_main-medium ${styles.title}`}>
          Восстановление пароля
        </h1>
        <form onSubmit={handleFormSubmit}>
          <Input
            type={"password"}
            placeholder={"Введите новый пароль"}
            onChange={handleChange}
            icon={"ShowIcon"}
            value={values.password}
            name={"password"}
            error={false}
            ref={inputRefPassword}
            onIconClick={onIconClickPassword}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />

          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handleChange}
            value={values.token}
            name={"token"}
            error={false}
            ref={inputRefToken}
            onIconClick={onIconClickToken}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />

          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </form>

        <div className={`mt-20 ${styles.wrapper}`}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link to="/login">
            <p className="text text_type_main-default">Войти</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
