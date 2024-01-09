import { getCookie, fetchWithRefresh } from "../../utils/api";
import { getLoginSuccess } from "../UserData/actions";
import { BASE_URL } from "../../utils/ApiConfig";
import {AppDispatch, ChangeProfileThunk} from "../../utils/types"

interface IСhangedData {
  email: string;
  password: string | number;
  name: string;
}

export const changeUserInfoThunk  =
  (changedData: IСhangedData):ChangeProfileThunk => async (dispatch: AppDispatch) => {
    try {
      const accessToken = getCookie("accessToken");

      if (!accessToken) {
        console.error("AccessToken is missing");
        return null;
      }

      const response = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changedData),
      });
  
      if (response.success) {
        const userInfo = response.user;
        const userEmail: string = userInfo.email;
        const userName: string = userInfo.name;
        const loginData = {
          email: userEmail,
          name: userName,
        };
        dispatch(getLoginSuccess(loginData));
      } else {
        console.error('Error:', response.message || 'Unknown error');
      }
    } catch (error: any) {
      console.error('Network error:', error.message || 'Unknown error');
    }
  };
