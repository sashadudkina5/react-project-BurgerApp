import { ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TUserDataActions} from "../redux_services/UserData/actions"
import {TGetIngredientsActions} from "../redux_services/ingredients/actions"
import {TCreateOrderActions} from "../components/OrderDetails/actions"
import {TIngredientDetailsActions} from "../components/IngredientDetail/actions"
import {TBurgerConstructorActions} from "../components/BurgerConstructor/actions"
import {rootReducer} from "../redux_services/store"
import {TWSActions} from "../redux_services/web-socket-actions"
import {TDoneOrderDetailsActions} from "../components/DoneOrderDetails/actions"

export interface IIngredientCard {
  type?: string;
  name?: string | undefined;
  price?: number;
  _id?: string;
  image?: string | undefined;
  uniqID?: string | undefined;
  index?: number;
  calories?: number;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  count?: number;
}


export interface IIngredientCardConstructor {
  ingredientObj?: IIngredientCard;
  uniqID?: string | undefined;
  index?: number;
}


export interface IAllIngredientsConstructor extends Array<IIngredientCardConstructor> {}

export interface IIngredients extends Array<IIngredientCard> {}

export type TSubmitHandler = React.FormEventHandler<HTMLFormElement>;

export interface IregistrationData {
  password?: string | undefined;
  email?: string | undefined;
  name?: string | undefined;
}

//redux types

export type TApplicationActions = 
| TUserDataActions
| TGetIngredientsActions
| TCreateOrderActions
| TIngredientDetailsActions
| TBurgerConstructorActions
| TWSActions
| TDoneOrderDetailsActions

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;

export type AppThunk = ThunkAction<void, RootState, unknown, TApplicationActions>
export type ChangeProfileThunk = ThunkAction<Promise<null | undefined>, RootState, unknown, TApplicationActions>
export type ForgotPasswordThunk = ThunkAction<Promise<void>, RootState, unknown, TApplicationActions>
export type GetUserInfoThunk = ThunkAction<Promise<IregistrationData | null>, RootState, unknown, TApplicationActions>
export type GetUserOrdersThunk = ThunkAction<Promise<void | null>, RootState, unknown, TApplicationActions>;

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINVE',
  OFFLINE = 'OFFLINE'
}

export type TOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string
};