import type { Middleware } from "redux";
import type { RootState } from "../../utils/types";
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";

export type WSActionTypes = {
  disconnected: ActionCreatorWithoutPayload;
  connect: ActionCreatorWithPayload<string>;
  connecting?: ActionCreatorWithoutPayload;
  connected: ActionCreatorWithoutPayload;
  connectError: ActionCreatorWithPayload<string>;
  getMessage: ActionCreatorWithPayload<any>;
  sendMessage?: ActionCreatorWithPayload<any>
};

export const socketMiddleware = (
  wsActions: WSActionTypes
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let url = "";

    return (next) => (action) => {
      const { dispatch } = store;
      const {
        disconnected,
        connect,
        connected,
        connectError,
        getMessage,
        sendMessage,
      } = wsActions;
      if (connect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(connected());
        };

        socket.onerror = (event) => {
          dispatch(connectError(event.type));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch(getMessage(parsedData));
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            dispatch(connectError(event.code.toString()));
          }
          dispatch(disconnected());
        };

        if (sendMessage?.match(action)) {
          const payload = action.payload;
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
