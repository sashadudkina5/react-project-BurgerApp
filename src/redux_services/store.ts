import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./ingredients/reducer";
import { orderReducer } from "../components/OrderDetails/reducer";
import {constructorReducer} from "../components/BurgerConstructor/reducer";
import {ingredientDetailsReducer} from "../components/IngredientDetail/reducer";
import { userDataReducer } from "./UserData/reducer";
import {wsReducer} from "./web-socket-reducer";
import {doneOrderDetailsReducer} from "../components/DoneOrderDetails/reducer"
import {socketMiddleware} from "./thunk-functions/socketMiddleware";
import {
  disconnected as OrdersDisconnected,
  connected as OrdersConnected,
  connect as OrdersConnect,
  connectError as OrdersConnectError,
  getMessage as OrdersGetMessage,
} from "./web-socket-actions";

const wsActionsMiddleware = {
  disconnected: OrdersDisconnected,
  connected: OrdersConnected,
  connect: OrdersConnect,
  connectError: OrdersConnectError,
  getMessage: OrdersGetMessage
}

export const rootReducer = combineReducers({
  ingredientsStore: ingredientsReducer,
  orderStore: orderReducer,
  constructorStore: constructorReducer,
  ingredientDetailsStore: ingredientDetailsReducer,
  userDataStore: userDataReducer,
  webSocketStore: wsReducer,
  doneOrderDetailsStore: doneOrderDetailsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(wsActionsMiddleware)),
});
