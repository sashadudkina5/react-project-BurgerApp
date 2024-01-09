import React from "react";
import { useParams } from "react-router-dom";
import { getSelectedOrder } from "../redux_services/selectors";
import DoneOrderDetails from "../components/DoneOrderDetails/DoneOrderDetails";
import { useAppSelector, useAppDispatch } from "../hooks/dispatch-selectos";
import { useEffect } from "react";
import {
  connect as OrdersConnect,
  disconnected as OrdersDisconnect,
} from "../redux_services/web-socket-actions";
import { WS_URL } from "../utils/ApiConfig";
import styles from "./styles/pages.module.css";
import { getOrderDetailsThunk } from "../redux_services/thunk-functions/GetOrderDetails";

interface OrderDetailPageOpenedProps {
  path: string;
}

function OrderDetailPageOpened({ path }: OrderDetailPageOpenedProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const connect = () => {
      dispatch(OrdersConnect(WS_URL));
    };

    connect();
    return () => {
      dispatch(OrdersDisconnect());
    };
  }, [dispatch]);

  const { id } = useParams();

  const matchingOrder = useAppSelector(getSelectedOrder);
  console.log(matchingOrder)

  useEffect(() => {
    if (id) {
      dispatch(getOrderDetailsThunk(id));
    }
  }, [dispatch, id]);

  localStorage.setItem("currentRoute", path);


  if (!matchingOrder) return <p>Order not found</p>;

  return (
    <div className={styles.order_details_wrapper}>
      <DoneOrderDetails matchingOrder={matchingOrder} />
    </div>
  );
}

export default OrderDetailPageOpened;
