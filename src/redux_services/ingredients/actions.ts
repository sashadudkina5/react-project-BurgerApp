
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from "../../redux_services/types-of-actions";

import {IIngredients} from "../../utils/types";

export type TGetIngredientsActions =
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed;

export interface IGetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
  }

export const getIngredientsRequest = (): IGetIngredientsRequest => ({
    type: GET_INGREDIENTS_REQUEST,
});

export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredientsData: {data: IIngredients}
  }
  
export const getIngredientsSuccess = (ingredientsData: {data: IIngredients}) => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredientsData
});

export interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
    readonly errorMessage: string
  }
  
export const getIngredientsFailed = (error: any): IGetIngredientsFailed => ({
    type: GET_INGREDIENTS_FAILED,
    errorMessage: error.message,
});