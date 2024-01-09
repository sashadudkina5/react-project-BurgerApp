import { BASE_URL } from "../../utils/ApiConfig";
import { checkResponse } from "../../utils/api";
import {AppDispatch, ForgotPasswordThunk} from "../../utils/types"

interface IEmailInfo {
  email: string;
}

export const forgotPasswordThunk =
  (emailData: IEmailInfo): ForgotPasswordThunk => async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/password-reset`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(emailData),
      });
      await checkResponse(response);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject("Network error");
    }
  };
