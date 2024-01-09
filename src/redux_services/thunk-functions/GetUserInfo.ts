import { getCookie, fetchWithRefresh } from "../../utils/api";
import { getLoginSuccess, getLoginRequest, getLoginFailed } from "../UserData/actions";
import { BASE_URL } from "../../utils/ApiConfig";
import {IregistrationData} from "../../utils/types";
import {AppDispatch, GetUserInfoThunk} from "../../utils/types"


export const getUserInfoThunk = (): GetUserInfoThunk => async (
  dispatch: AppDispatch
) => {
  try {
    dispatch(getLoginRequest());
    const accessToken = getCookie('accessToken');

    if (!accessToken) {
      console.error('AccessToken is missing');
      dispatch(getLoginFailed(Error));
      return null;
    }

    const response = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    });

    // cant use CheckResponse here as response is not json type
    if (response.success) {
      const userInfo: IregistrationData = response.user;
      const userEmail: string | undefined = userInfo.email;
      const userName: string | undefined = userInfo.name;
      const loginData = {
        email: userEmail,
        name: userName,
      };
      dispatch(getLoginSuccess(loginData));
      return userInfo;
    } else {
      console.error('Error getting user information');
      return null;
    }
  } catch (err: any) {
    console.error('An unexpected error occurred:', err.message);
    dispatch(getLoginFailed(err));
    return null;
  }
};