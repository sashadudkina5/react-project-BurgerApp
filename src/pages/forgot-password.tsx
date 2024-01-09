import React from "react";
import styles from "./styles/pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { forgotPasswordThunk } from "../redux_services/thunk-functions/forgot-password";
import { Navigate } from "react-router";
import { getLoggedInStatus } from "../redux_services/selectors";
import { useNavigate } from "react-router-dom";
import { TSubmitHandler } from "../utils/types";
import { useAppSelector, useAppDispatch } from "../hooks/dispatch-selectos";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  interface IEmailInfo {
    email: string;
  }

  const emailInfo: IEmailInfo = {
    email: value,
  };

  const isLoggedIn = useAppSelector(getLoggedInStatus);
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleFormSubmit: TSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await dispatch(forgotPasswordThunk(emailInfo));
      navigate("/reset-password");
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
            type={"text"}
            placeholder={"Укажите e-mail"}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />

          <Button htmlType="submit" type="primary" size="large">
            Восстановить
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
}

export default ForgotPasswordPage;
