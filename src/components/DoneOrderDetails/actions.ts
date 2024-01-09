import {
    SHOW_ORDER_DETAILS,
    HIDE_ORDER_DETAILS,
    REOPEN_ORDER_DETAILS,
  } from "../../redux_services/types-of-actions";

  import {TOrder} from "../../utils/types";
  
  export type TDoneOrderDetailsActions =
  | { type: typeof SHOW_ORDER_DETAILS; selectedOrder: TOrder }
  | { type: typeof HIDE_ORDER_DETAILS }
  | { type: typeof REOPEN_ORDER_DETAILS; selectedOrder: TOrder };

export interface IShowOrderDetails {
  readonly type: typeof SHOW_ORDER_DETAILS;
  readonly selectedOrder: TOrder;
}

export const showDoneOrderDetails = (
    selectedOrder: TOrder
): IShowOrderDetails => ({
  type: SHOW_ORDER_DETAILS,
  selectedOrder,
});

export interface IHideOrderDetails {
  readonly type: typeof HIDE_ORDER_DETAILS;
}

export const hideDoneOrderDetails = (): IHideOrderDetails => ({
  type: HIDE_ORDER_DETAILS,
});

export interface IReopenOrderDetails {
  readonly type: typeof REOPEN_ORDER_DETAILS;
  readonly selectedOrder: TOrder;
}

export const reopenDoneOrderDetails = (
    selectedOrder: TOrder
): IReopenOrderDetails => ({
  type: REOPEN_ORDER_DETAILS,
  selectedOrder,
});