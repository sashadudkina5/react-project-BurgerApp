import React from "react";
import styles from "./styles/pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {
  getLoggedInStatus,
  getResetPasswordError,
} from "../redux_services/selectors";
import { resetPasswordThunk } from "../redux_services/thunk-functions/reset-password";
import { TSubmitHandler } from "../utils/types";
import { useForm } from "../hooks/useForm";
import { useAppSelector, useAppDispatch } from "../hooks/dispatch-selectos";

/**
 * Page to proceed password recovery process.
 * Users are required to enter new password and code from email.
 *
 * This component checks if the user is already logged in and redirects to the homepage if true.
 * It uses the `resetPasswordThunk` function to fetch user data to the server.
 * Navigates to the homepage and loggs in the user after seccessful response
 *
 * @component
 * @example
 * return <ResetPasswordPage />;
 */
export const ResetPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const resetError = useAppSelector(getResetPasswordError);

  //For changing password visibility
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  /**
   * Changes password visibility
   */
  const onIconClickPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputRefPassword = React.useRef<HTMLInputElement>(null);

  const inputRefToken = React.useRef<HTMLInputElement>(null);
  const onIconClickToken = () => {
    setTimeout(() => inputRefToken.current?.focus(), 0);
  };

  const { values, handleChange } = useForm();

    /**
   * checks if the user is logged in.
   * If true, redirects to the homepage 
   */
  const isLoggedIn = useAppSelector(getLoggedInStatus);
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

      /**
   * Event handler for form submission.
   * Dispatches the resetPasswordThunk action with the new password and code from email.
   * Navigates to the homepage after form submission
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleFormSubmit: TSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await dispatch(resetPasswordThunk(values));
      navigate("/");
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
            type={isPasswordVisible ? "text" : "password"}
            placeholder={"Введите новый пароль"}
            onChange={handleChange}
            icon={isPasswordVisible ? "HideIcon" : "ShowIcon"}
            value={values.newPassword}
            name={"newPassword"}
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

          {resetError?.includes("Invalid credentials provided") &&
            values.token &&
            values.newPassword && (
              <p className="text text_type_main-default mb-8">
                Неверный код из письма
              </p>
            )}

          {resetError?.includes("Unexpected token") &&
            values.token &&
            values.newPassword && (
              <p className="text text_type_main-default mb-8">
                Ошибка сети. Повторите попытку позже
              </p>
            )}

          <Button
            htmlType="submit"
            type="primary"
            size="large"
            disabled={!values.token && !values.newPassword}
          >
            Сохранить
          </Button>
        </form>

        <div className={`mt-20 ${styles.wrapper}`}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link to="/login" className={styles.link}>
            <p className="text text_type_main-default">Войти</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
