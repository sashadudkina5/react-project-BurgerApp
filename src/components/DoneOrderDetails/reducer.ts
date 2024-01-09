import {
    SHOW_ORDER_DETAILS,
    HIDE_ORDER_DETAILS,
    REOPEN_ORDER_DETAILS,
  } from "../../redux_services/types-of-actions";

import {TDoneOrderDetailsActions} from "./actions";
import {TOrder} from "../../utils/types";
  

  // Исходное состояние

  type TDoneOrderDetailsState = {
    orderDetails: TOrder | null;
    isDoneOrderDetailModalOpen: boolean;
  }

const initialState: TDoneOrderDetailsState = {
    orderDetails: null,
    isDoneOrderDetailModalOpen: false
  };
  
  export const doneOrderDetailsReducer = (state = initialState, action: TDoneOrderDetailsActions):TDoneOrderDetailsState => {
    switch (action.type) {
  
      case SHOW_ORDER_DETAILS: {
        return {
          ...state,
          orderDetails: action.selectedOrder,
          isDoneOrderDetailModalOpen: true
        };
      }
  
      case HIDE_ORDER_DETAILS: {
        return { ...state, orderDetails: null, isDoneOrderDetailModalOpen: false };
      }

      case REOPEN_ORDER_DETAILS: {
        return {
          ...state,
          orderDetails: action.selectedOrder,
          isDoneOrderDetailModalOpen: true
        };
      }
  
      // Реакция на прочие типы экшенов
      default:
        return state;
    }
  };
  