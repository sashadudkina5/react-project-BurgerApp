import { nanoid } from "@reduxjs/toolkit";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  CLEAN_CONSTRUCTOR,
  CONSTRUCTOR_REORDER
} from "../../redux_services/types-of-actions";

import { IIngredientCard } from "../../utils/types";

export type TBurgerConstructorActions =
  | IAddIngredient
  | IDeleteIngredient
  | ICleanConstructor
  | IConstructorReorder;

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: {
    ingredientObj: IIngredientCard;
    uniqID: string;
  };
}

export const addIngredient = (
  ingredientObj: IIngredientCard
): IAddIngredient => ({
  type: ADD_INGREDIENT,
  payload: { ingredientObj, uniqID: nanoid()},
});

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly ingredientObj: string;
}

export const deleteIngredient = (
  ingredientObj: string
): IDeleteIngredient => ({
  type: DELETE_INGREDIENT,
  ingredientObj,
});

export interface ICleanConstructor {
  readonly type: typeof CLEAN_CONSTRUCTOR;
}

export const cleanConstructor = (): ICleanConstructor => ({
  type: CLEAN_CONSTRUCTOR,
});

export interface IConstructorReorder {
  readonly type: typeof CONSTRUCTOR_REORDER;
  readonly payload: {
    from: number;
    to: number;
  };
}

export const constructorReorder = (payload: {
  from: number;
  to: number;
}): IConstructorReorder => ({
  type: CONSTRUCTOR_REORDER,
  payload,
});
