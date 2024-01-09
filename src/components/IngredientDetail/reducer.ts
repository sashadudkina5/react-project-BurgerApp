import {
    SHOW_INGREDIENT_DETAILS,
    HIDE_INGREDIENT_DETAILS,
    REOPEN_INGREDIENT_DETAILS
  } from "../../redux_services/types-of-actions";

import {TIngredientDetailsActions} from "./actions";
import { IIngredientCard} from "../../utils/types";
  

  // Исходное состояние

  type TIngredietnDetailsState = {
    ingredientDetails: IIngredientCard | null;
    isIngredientDetailModalOpen: boolean;
  }

const initialState: TIngredietnDetailsState = {
    ingredientDetails: null,
    isIngredientDetailModalOpen: false
  };
  
  export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions):TIngredietnDetailsState => {
    switch (action.type) {
  
      case SHOW_INGREDIENT_DETAILS: {
        return {
          ...state,
          ingredientDetails: action.selectedIngredient,
          isIngredientDetailModalOpen: true
        };
      }
  
      case HIDE_INGREDIENT_DETAILS: {
        return { ...state, ingredientDetails: null, isIngredientDetailModalOpen: false };
      }

      case REOPEN_INGREDIENT_DETAILS: {
        return {
          ...state,
          ingredientDetails: action.ingredient,
          isIngredientDetailModalOpen: true
        };
      }
  
      // Реакция на прочие типы экшенов
      default:
        return state;
    }
  };
  