import { createReducer } from "@reduxjs/toolkit";
import {
  disconnected,
  connected,
  connect,
  connectError,
  getMessage,
} from "./web-socket-actions";

import {TOrder} from "../utils/types"

export type GetMessagePayload = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};

type TWSState = {
  wsConnected: boolean;
  wsConnectingLoading: boolean;
  getData: GetMessagePayload;
  error: string;
};

const initialState: TWSState = {
  wsConnected: false,
  error: "",
  wsConnectingLoading: false,
  getData: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

export const wsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(connect, (state) => {
      state.wsConnectingLoading = true;
    })
    .addCase(connected, (state) => {
      state.wsConnected = true;
      state.wsConnectingLoading = false;
      state.error = "";
    })
    .addCase(disconnected, (state) => {
      state.wsConnected = false;
      state.wsConnectingLoading = false;
    })
    .addCase(connectError, (state, action) => {
      state.wsConnected = false;
      state.wsConnectingLoading = false;
      state.error = action.payload;
    })
    .addCase(getMessage, (state, action) => {
      const { success, orders, total, totalToday } = action.payload;

      state.getData = {
        success,
        orders,
        total,
        totalToday,
      };
      state.error = "";
      state.wsConnected = true;
      state.wsConnectingLoading = false;
    });
});
