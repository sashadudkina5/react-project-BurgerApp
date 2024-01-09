import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from "../types-of-actions";

import {IIngredientCard} from "../../utils/types";

import {TGetIngredientsActions} from "./actions"

// Исходное состояние
type TIngredientsData = {
  data: IIngredientCard[];
}

type TGetIngredientsState = {
  ingredientsData: TIngredientsData;
  isLoading: boolean;
  error: null | any;
}

const initialState: TGetIngredientsState = {
  ingredientsData: {
    data: [],
  },
  isLoading: false,
  error: null,
};

export const ingredientsReducer = (state = initialState, action: TGetIngredientsActions): TGetIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, isLoading: true };
    }

    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsData: {
          ...state.ingredientsData,
          data: action.ingredientsData.data,
        },
        isLoading: false,
      };
    }

    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsData: { data: [] },
        isLoading: false,
        error: action.errorMessage,
      };
    }

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};
