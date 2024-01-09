import { getIngredientsSuccess, getIngredientsFailed } from  "../ingredients/actions"; 
import { getIngredients } from "../../utils/burger-api";
import {AppDispatch, AppThunk} from "../../utils/types";

export const fetchIngredients = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const ingredientsData = await getIngredients();
    dispatch(getIngredientsSuccess({ data: [...ingredientsData] }));
  } catch (error: any) {
    console.error(error);
    dispatch(getIngredientsFailed(error.message));
  }
};
