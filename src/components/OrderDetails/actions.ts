import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  CLEAN_ORDER_ID
} from "../../redux_services/types-of-actions";

export type TCreateOrderActions =
  | ICreateOrderRequest
  | ICreateOrderSuccess
  | ICleanOrderID
  | ICreateOrderFailure;

export interface ICreateOrderRequest {
  readonly type: typeof CREATE_ORDER_REQUEST;
}

export const createOrderRequest = (): ICreateOrderRequest => ({
  type: CREATE_ORDER_REQUEST,
});

export interface ICleanOrderID {
  readonly type: typeof CLEAN_ORDER_ID;
}

export const cleanOrderID = (): ICleanOrderID => ({
  type: CLEAN_ORDER_ID,
});

export interface ICreateOrderSuccess {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly orderNumber: number | null
}

export const createOrderSuccess = (orderNumber: number | null): ICreateOrderSuccess => ({
  type: CREATE_ORDER_SUCCESS,
  orderNumber
});

export interface ICreateOrderFailure {
  readonly type: typeof CREATE_ORDER_FAILURE;
  readonly errorMessage: string;
}

export const createOrderFailure = (error: any): ICreateOrderFailure => ({
  type: CREATE_ORDER_FAILURE,
  errorMessage: error.message,
});
