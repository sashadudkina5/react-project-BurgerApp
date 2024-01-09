import styles from "./styles/user-ordes.module.css";
import {
  disconnected as OrdersDisconnect,
} from "../redux_services/web-socket-actions";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/dispatch-selectos";
import { getUserOrders } from "../redux_services/thunk-functions/GetUserOrders";
import UserOrderItem from "../components/UserOrderItem/UserOrderItem";

import UserProfileMenu from "../components/UserProfileMenu/UserProfileMenu";

function UserOrdersPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
    return () => {
      dispatch(OrdersDisconnect());
    };
  }, [dispatch]);

  return (
    <section className={styles.page_wrapper}>
      <UserProfileMenu />
      <div className={styles.wrapper_orders}>
        <ul className={styles.orders_list}>
          <UserOrderItem />
        </ul>
      </div>
    </section>
  );
}

export default UserOrdersPage;
