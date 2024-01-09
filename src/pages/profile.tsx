import React from "react";
import styles from "./styles/pages.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserData } from "../redux_services/selectors";
import { useState } from "react";
import { changeUserInfoThunk } from "../redux_services/thunk-functions/change-profile-info";
import { logoutThunk } from "../redux_services/thunk-functions/logout";
import { useNavigate } from "react-router-dom";
import { TSubmitHandler } from "../utils/types";
import { useAppSelector, useAppDispatch } from "../hooks/dispatch-selectos";
import UserProfileMenu from "../components/UserProfileMenu/UserProfileMenu"

function ProfilePage() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = (e: React.SyntheticEvent) => {
    dispatch(logoutThunk());
    navigate("/login");
  };

  const userData = useAppSelector(getUserData);
  const userName: string = userData.name!;
  const userEmail: string = userData.email!;

  const [emailValue, setEmailValue] = React.useState<string>(userEmail);
  const inputEmailRef = React.useRef<HTMLInputElement>(null);
  const onIconClickEmail = () => {
    setTimeout(() => inputEmailRef.current?.focus(), 0);
  };
  const [isEmailEditing, setIsEmailEditing] = useState<boolean>(false);

  const [nameValue, setNameValue] = React.useState<string>(userName);
  const inputNameRef = React.useRef<HTMLInputElement>(null);
  const onIconClickName = () => {
    setTimeout(() => inputNameRef.current?.focus(), 0);
  };
  const [isNameEditing, setIsNameEditing] = useState<boolean>(false);

  const [passwordValue, setPasswordValue] = React.useState<string>("*****");
  const inputPasswordRef = React.useRef<HTMLInputElement>(null);
  const onIconClickPassword = () => {
    setTimeout(() => inputPasswordRef.current?.focus(), 0);
  };
  const [isPasswordEditing, setIsPasswordEditing] = useState<boolean>(false);

  interface IСhangedData {
    email: string;
    password: string | number;
    name: string;
  }

  const changedData: IСhangedData = {
    email: emailValue,
    password: passwordValue,
    name: nameValue,
  };

  const handleFormSubmit: TSubmitHandler = (e) => {
    e.preventDefault();
    setIsEmailEditing(false);
    setIsNameEditing(false);
    setIsPasswordEditing(false);
    dispatch(changeUserInfoThunk(changedData));
  };

  const handleCancel = () => {
    setEmailValue(userEmail);
    setNameValue(userName);
    setPasswordValue("*****");

    setIsEmailEditing(false);
    setIsNameEditing(false);
    setIsPasswordEditing(false);
  };

  return (
    <div className={styles.profileWrapper}>
      <UserProfileMenu />

      <form onSubmit={handleFormSubmit}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNameValue(e.target.value);
            setIsNameEditing(true);
          }}
          icon={"EditIcon"}
          value={nameValue}
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
          placeholder={"Логин"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmailValue(e.target.value);
            setIsEmailEditing(true);
          }}
          icon={"EditIcon"}
          value={emailValue}
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordValue(e.target.value);
            setIsPasswordEditing(true);
          }}
          onIconClick={onIconClickPassword}
          icon={"EditIcon"}
          value={passwordValue}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        {(isEmailEditing || isNameEditing || isPasswordEditing) && (
          <div className={styles.buttonsWrapper}>
            <Button type="primary" size="medium" htmlType="submit">
              Сохранить
            </Button>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={handleCancel}
            >
              Отмена
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ProfilePage;
