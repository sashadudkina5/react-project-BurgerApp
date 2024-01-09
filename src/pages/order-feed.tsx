import styles from "./styles/order-feed.module.css";
import OrderFeedItem from "../components/OderFeedItem/OrderFeedItem";
import { connect as OrdersConnect, disconnected as OrdersDisconnect} from "../redux_services/web-socket-actions";
import { WS_URL } from "../utils/ApiConfig";
import { useAppSelector, useAppDispatch } from "../hooks/dispatch-selectos";
import { useEffect } from "react";
import {getTotalOrders, getTotalTodatOrders, getAllCreatedOrders} from "../redux_services/selectors";

function OrderFeed() {
  const dispatch = useAppDispatch();
  const totalTodayOrders: number = useAppSelector(getTotalTodatOrders)
  const totalOrders: number = useAppSelector(getTotalOrders)
  const allCreatedOrders = useAppSelector(getAllCreatedOrders)

  useEffect(() => {
    const connect = () => {
      dispatch(OrdersConnect(`${WS_URL}/orders/all`));
    };

    connect();
    return () => {
        dispatch(OrdersDisconnect());
      };
  }, [dispatch]);


  // most recent 10 ready orders

  const filteredReadyOrders = allCreatedOrders
    .filter(order => order.status === "done")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const lastTenReadyOrders = filteredReadyOrders.slice(0, 10);
const readyOrderNumbers = lastTenReadyOrders.map(order => order.number);

  // most recent 10 orders in process

  const filteredOrdersInProcess = allCreatedOrders
    .filter(order => order.status === "pending")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const lastTenOrdersInProcess = filteredOrdersInProcess.slice(0, 10);
const orderNumbersInProcess = lastTenOrdersInProcess.map(order => order.number);


  return (
    <section className={styles.feed_section}>
      <div className={styles.feed_section_wrapper_orders}>
        <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
        <ul className={styles.feed_section_list}>
        <OrderFeedItem />
        </ul>
      </div>

      <div className={styles.feed_section_wrapper_orders_numbersr}>
        <div className={styles.orders_status}>
          <div className={styles.top_left}>
            <p className="text text_type_main-medium mb-6">Готовы:</p>
            <ul className={styles.orders_list}>
              {readyOrderNumbers.map((orderId, _id) => (
                <li key={_id} className="mb-2">
                  <p className="text text_type_digits-default">{orderId}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.top_right}>
            <p className="text text_type_main-medium mb-6">В работе:</p>
            <ul className={styles.orders_list}>
              {orderNumbersInProcess.map((orderId, _id) => (
                <li key={_id} className="mb-2">
                  <p className="text text_type_digits-default">{orderId}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.full_width}>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className="text text_type_digits-large">{totalOrders}</p>
          </div>
          <div className={styles.full_width}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">{totalTodayOrders}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderFeed;
