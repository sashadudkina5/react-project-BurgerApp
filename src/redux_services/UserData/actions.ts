import {
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
  GET_REGISTRATION_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  GET_LOGIN_OUT_SUCCESS,
} from "../types-of-actions";

import { IregistrationData } from "../../utils/types";

export type TUserDataActions =
  | IGetRegistrationRequest
  | IGetRegistrationSuccess
  | IGetRegistrationFailed
  | IGetLoginRequest
  | IGetLoginSuccess
  | IGetLoginFailed
  | IGetLogOutSuccess;

export interface IGetRegistrationRequest {
  readonly type: typeof GET_REGISTRATION_REQUEST;
}

export const getRegistrationRequest = (): IGetRegistrationRequest => ({
  type: GET_REGISTRATION_REQUEST,
});

export interface IGetRegistrationSuccess {
  readonly type: typeof GET_REGISTRATION_SUCCESS;
  readonly registrationData: IregistrationData;
}

export const getRegistrationSuccess = (
  registrationData: IregistrationData
): IGetRegistrationSuccess => ({
  type: GET_REGISTRATION_SUCCESS,
  registrationData,
});

export interface IGetRegistrationFailed {
  readonly type: typeof GET_REGISTRATION_FAILED;
  readonly errorMessage: string;
}

export const getRegistrationFailed = (error: any): IGetRegistrationFailed => ({
  type: GET_REGISTRATION_FAILED,
  errorMessage: error.message,
});

export interface IGetLoginRequest {
  readonly type: typeof GET_LOGIN_REQUEST;
}

export const getLoginRequest = (): IGetLoginRequest => ({
  type: GET_LOGIN_REQUEST,
});

export interface IGetLoginSuccess {
  readonly type: typeof GET_LOGIN_SUCCESS;
  readonly loginData: IregistrationData;
}

export const getLoginSuccess = (
  loginData: IregistrationData
): IGetLoginSuccess => ({
  type: GET_LOGIN_SUCCESS,
  loginData,
});

export interface IGetLoginFailed {
  readonly type: typeof GET_LOGIN_FAILED;
  readonly errorMessage: string;
}

export const getLoginFailed = (error: any): IGetLoginFailed => ({
  type: GET_LOGIN_FAILED,
  errorMessage: error.message,
});

export interface IGetLogOutSuccess {
  readonly type: typeof GET_LOGIN_OUT_SUCCESS;
}

export const getLogOutSuccess = (): IGetLogOutSuccess => ({
  type: GET_LOGIN_OUT_SUCCESS,
});
