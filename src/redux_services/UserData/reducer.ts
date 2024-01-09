import {
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
  GET_REGISTRATION_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  GET_LOGIN_OUT_SUCCESS
} from "../types-of-actions";

import {TUserDataActions} from "./actions"

// Исходное состояние
type TUserData = {
  email: string | undefined;
  name: string | undefined;
}

type TAppState = {
  userData: TUserData;
  isLoading: boolean;
  error: null | any;
  isLoggedIn: boolean;
}

const initialState: TAppState = {
  userData: {
    email: "",
    name: "",
  },
  isLoading: true,
  error: null,
  isLoggedIn: false,
};

export const userDataReducer = (state = initialState, action: TUserDataActions): TAppState => {
  switch (action.type) {
    case GET_REGISTRATION_REQUEST: {
      return { ...state, isLoading: true };
    }

    case GET_REGISTRATION_SUCCESS: {
      return {
        ...state,
        userData: {
          email: action.registrationData.email,
          name: action.registrationData.name,
        },
        isLoading: false,
        error: null,
      };
    }

    case GET_REGISTRATION_FAILED: {
      return {
        ...state,
        userData: { email: "", name: "" },
        isLoading: false,
        error: action.errorMessage,
      };
    }

    case GET_LOGIN_REQUEST: {
        return { ...state, isLoading: true };
      }
  
      case GET_LOGIN_SUCCESS: {
        return {
          ...state,
          userData: {
            email: action.loginData.email,
            name: action.loginData.name,
          },
          isLoading: false,
          isLoggedIn: true,
          error: null,
        };
      }
  
      case GET_LOGIN_FAILED: {
        return {
          ...state,
          userData: { email: "", name: "" },
          isLoading: false,
          error: action.errorMessage,
        };
      }

      case GET_LOGIN_OUT_SUCCESS: {
        return {
          ...state,
          userData: { email: "", name: "" },
          isLoggedIn: false,
      }
    };

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};
