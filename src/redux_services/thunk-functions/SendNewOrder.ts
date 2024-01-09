import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
} from "../../components/OrderDetails/actions";
import { BASE_URL } from "../../utils/ApiConfig";
import { checkResponse } from "../../utils/api";
import {AppDispatch, AppThunk} from "../../utils/types";
import { getCookie } from "../../utils/api";

export const createOrderThunk = (ingredientIDs: { ingredients: (string | undefined)[]; }): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(createOrderRequest());
    const accessToken = getCookie("accessToken");

    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `${accessToken}` : "", // Send token without "Bearer" prefix
      },
      body: JSON.stringify(ingredientIDs),
    });
    const data = await checkResponse(response);
    dispatch(createOrderSuccess(data.order.number));
    console.log(ingredientIDs)
  } catch (error) {
    dispatch(
      createOrderFailure("An error occurred while processing your request.")
    );
    console.log(error)
  }
};
