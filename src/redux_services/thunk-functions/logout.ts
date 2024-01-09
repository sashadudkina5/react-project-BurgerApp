import { getCookie, deleteCookie } from "../../utils/api";
import { getLogOutSuccess } from "../UserData/actions";
import { BASE_URL } from "../../utils/ApiConfig";
import { checkResponse } from "../../utils/api";
import {AppDispatch, AppThunk} from "../../utils/types"

export const logoutThunk = (): AppThunk => async (dispatch: AppDispatch) => {
  const refreshConfig = {
    token: getCookie("refreshToken"),
  };

  try {
    const accessToken = getCookie("accessToken");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (accessToken) {
      headers.Authorization = accessToken;
    }

    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(refreshConfig),
    });

    await checkResponse(response);
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    dispatch(getLogOutSuccess());

  } catch (error) {
      console.error("Network error during logout:", error);
    }
  }
