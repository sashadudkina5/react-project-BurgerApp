import {
  SHOW_INGREDIENT_DETAILS,
  HIDE_INGREDIENT_DETAILS,
  REOPEN_INGREDIENT_DETAILS,
} from "../../redux_services/types-of-actions";

import { IIngredientCard} from "../../utils/types";

export type TIngredientDetailsActions =
  | IShowIngredientDetails
  | IHideIngredientDetails
  | IReopenIngredientDetails;

export interface IShowIngredientDetails {
  readonly type: typeof SHOW_INGREDIENT_DETAILS;
  readonly selectedIngredient: IIngredientCard;
}

export const showIngredientDetails = (
  selectedIngredient: IIngredientCard
): IShowIngredientDetails => ({
  type: SHOW_INGREDIENT_DETAILS,
  selectedIngredient,
});

export interface IHideIngredientDetails {
  readonly type: typeof HIDE_INGREDIENT_DETAILS;
}

export const hideIngredientDetails = (): IHideIngredientDetails => ({
  type: HIDE_INGREDIENT_DETAILS,
});

export interface IReopenIngredientDetails {
  readonly type: typeof REOPEN_INGREDIENT_DETAILS;
  readonly ingredient: IIngredientCard;
}

export const reopenIngredientDetails = (
  ingredient: IIngredientCard
): IReopenIngredientDetails => ({
  type: REOPEN_INGREDIENT_DETAILS,
  ingredient,
});
