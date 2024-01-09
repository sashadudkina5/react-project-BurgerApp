import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    CONSTRUCTOR_REORDER,
    CLEAN_CONSTRUCTOR
  } from "../../redux_services/types-of-actions";

  import {IIngredients, IIngredientCard, IAllIngredientsConstructor} from "../../utils/types";

  import {TBurgerConstructorActions} from "./actions"
  
  // Исходное состояние

  type TConstructorState = {
    constructorIngredients: IAllIngredientsConstructor;
    bun: IIngredientCard | null;
  }
  
  const initialState: TConstructorState = {
    constructorIngredients: [],
    bun: null,
  };

  
  export const constructorReducer = (state = initialState, action: TBurgerConstructorActions): TConstructorState => {
    switch (action.type) {
  
      case ADD_INGREDIENT: {
          if (action.payload.ingredientObj.type === "bun") {
              return {...state, bun: action.payload.ingredientObj }
          }
  
        return {
          ...state,
          constructorIngredients: [
            ...state.constructorIngredients,
            action.payload,
          ],
        };
      }
  
      case DELETE_INGREDIENT: {
        return {
          ...state,
          constructorIngredients: state.constructorIngredients.filter(
            ({ uniqID }) => uniqID !== action.ingredientObj
          ),
        };
      }
  
      case CONSTRUCTOR_REORDER: {
        const constructorIngredients = [...state.constructorIngredients];
        const movedIngredient = constructorIngredients.splice(action.payload.from, 1)[0];
        constructorIngredients.splice(action.payload.to, 0, movedIngredient);
      
        return {
          ...state,
          constructorIngredients,
        };
      }

      case CLEAN_CONSTRUCTOR: {
        return {
          ...state,
          constructorIngredients: [],
          bun: null,
        };
      }
  
      // Реакция на прочие типы экшенов
      default:
        return state;
    }
  };
  