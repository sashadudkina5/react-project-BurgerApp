import {
  getRegistrationRequest,
  getRegistrationSuccess,
  getRegistrationFailed,
} from "../UserData/actions";
import { setCookie } from "../../utils/api";
import { BASE_URL } from "../../utils/ApiConfig";
import { checkResponse } from "../../utils/api";
import {AppDispatch, AppThunk} from "../../utils/types"

interface IregistrationData {
  password: string;
  email: string;
  name: string;
}

export const registerThunk =
  (registrationData: IregistrationData): AppThunk => async (dispatch: AppDispatch) => {
    try {
      dispatch(getRegistrationRequest());

      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(registrationData),
      });

      const data = await checkResponse(response);
      
      dispatch(getRegistrationSuccess(data.user));
      setCookie("accessToken", data.accessToken);
      setCookie("refreshToken", data.refreshToken);
    } catch (error) {
      dispatch(
        getRegistrationFailed(
          "An error occurred while processing your request."
        )
      );
    }
  };
