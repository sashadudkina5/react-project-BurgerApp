import { getIngredientsSuccess, getIngredientsFailed, getIngredientsRequest } from  "../ingredients/actions"; 
import { getIngredients } from "../../utils/burger-api";
import {AppDispatch, AppThunk} from "../../utils/types";


/**
 * It dispatches a request action before making the API call. Upon successful data retrieval,
 * it dispatches a success action with the fetched ingredients data. In case of an error,
 * it dispatches a failure action and logs the error.
 * @example
 * dispatch(fetchIngredients());
 */
export const fetchIngredients = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequest())
  try {
    const ingredientsData = await getIngredients();
    dispatch(getIngredientsSuccess({ data: [...ingredientsData] }));
  } catch (error: any) {
    console.error(error);
    dispatch(getIngredientsFailed(error.message));
  }
};
