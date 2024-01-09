import { BASE_URL } from "../../utils/ApiConfig";
import { checkResponse } from "../../utils/api";
import {AppDispatch, ForgotPasswordThunk} from "../../utils/types"

interface InewPasswordData {
  password: string | number;
  token: string | number;
}

export const resetPasswordThunk =
  (newPasswordData: InewPasswordData): ForgotPasswordThunk => async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/password-reset/reset`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(newPasswordData),
      });

      await checkResponse(response);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject("Network error");
    }
  };
