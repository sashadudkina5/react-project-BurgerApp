import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  CLEAN_ORDER_ID,
} from "../../redux_services/types-of-actions";

import { TCreateOrderActions } from "./actions";

type TCreateOrderState = {
  orderNumber: number | null;
  loading: boolean;
  error: null | any;
};

const initialState: TCreateOrderState = {
  orderNumber: null,
  loading: false,
  error: null,
};

export const orderReducer = (
  state = initialState,
  action: TCreateOrderActions
): TCreateOrderState => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, orderNumber: action.orderNumber };

    case CREATE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.errorMessage };

    case CLEAN_ORDER_ID:
      return { ...state, loading: false, orderNumber: null };

    default:
      return state;
  }
};
