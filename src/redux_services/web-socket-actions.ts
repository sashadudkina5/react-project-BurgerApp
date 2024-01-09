import { createAction } from "@reduxjs/toolkit";
import {
  WS_CONNECTION_START,
  WS_GET_MESSAGE,
  WS_CONNECTION_REQUEST,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
} from "./types-of-actions";

import { GetMessagePayload } from "./web-socket-reducer";

export type TWSActions =
  | ReturnType<typeof connected>
  | ReturnType<typeof connect>
  | ReturnType<typeof connectError>
  | ReturnType<typeof disconnected>
  | ReturnType<typeof getMessage>
  | ReturnType<typeof connecting>;

export const connect = createAction<string, typeof WS_CONNECTION_START>(
  WS_CONNECTION_START
);

export const connecting = createAction<typeof WS_CONNECTION_REQUEST>(
  WS_CONNECTION_REQUEST
);

export const connected = createAction(
  WS_CONNECTION_SUCCESS
);

export const connectError = createAction<string, typeof WS_CONNECTION_ERROR>(
  WS_CONNECTION_ERROR
);

export const getMessage = createAction<
  GetMessagePayload,
  typeof WS_GET_MESSAGE
>(WS_GET_MESSAGE);

export const disconnected = createAction(WS_CONNECTION_CLOSED);
