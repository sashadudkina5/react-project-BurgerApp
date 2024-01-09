import styles from "./UserOrderItem.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    getAllCreatedOrders,
  getListOfIngredients,
} from "../../redux_services/selectors";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatch-selectos";
import moment from "moment";
import "moment/locale/ru";
import { TOrder } from "../../utils/types";
import React, { MouseEvent } from "react";
import { showDoneOrderDetails } from "../DoneOrderDetails/actions";
import { Link, useLocation } from "react-router-dom";
import {statusTexts} from "../../utils/order-statuses";

const UserOrderItem = () => {
  let location = useLocation();
  const dispatch = useAppDispatch();
  const allCreatedOrders = useAppSelector(getAllCreatedOrders);
  const allIngredients = useAppSelector(getListOfIngredients);

   //if there are no orders

   if (!allCreatedOrders || allCreatedOrders.length === 0) {
    return (
      <p className="text text_type_main-default">
        No orders yet
      </p>
    );
  }

    //Opens the modal with order info 

  const handleClick = (
    event: MouseEvent<HTMLLIElement>,
    selectedOrder: TOrder
  ) => {
    dispatch(showDoneOrderDetails(selectedOrder));
  };


    //Counts total price of the order

  const ingredientPricesMap = allIngredients.ingredientsData.data
    .filter((ingredient) => ingredient.price !== undefined)
    .map(
      (ingredient) => [ingredient._id, ingredient.price] as [string, number]
    );

  const ordersWithTotalPrice = allCreatedOrders.map((order) => {
    const totalPrice = order.ingredients.reduce((sum, ingredientId) => {
      const ingredientPrice = ingredientPricesMap.find(
        ([_id]) => _id === ingredientId
      )?.[1];

      if (ingredientPrice !== undefined) {
        return sum + ingredientPrice;
      } else {
        console.warn(`Price not found for ingredient with ID ${ingredientId}`);
        return sum;
      }
    }, 0);

    return {
      order,
      totalPrice,
    };
  });

    //shows ingredients images

  const imageMap = allIngredients.ingredientsData.data.reduce(
    (map, ingredient) => {
      map[ingredient._id as string] = ingredient.image;
      return map;
    },
    {} as Record<string, string | undefined>
  );

  const ordersWithImages = allCreatedOrders.map((order) => {
    const images = order.ingredients.map(
      (ingredientId: string) => imageMap[ingredientId]
    );

    return {
      order,
      images,
    };
  });

  //sorts by creation date
  const sortedOrders = ordersWithTotalPrice.sort((a, b) =>
  moment(b.order.createdAt).diff(moment(a.order.createdAt))
);


  return (
    <>
      {sortedOrders.map(({ order, totalPrice }) => (
        <Link
          to={`/profile/order/${order._id}`}
          state={{ backgroundLocation: location }}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
          key={order._id}
        >
          <li
            className={styles.user_orders_section_item}
            key={order.number}
            onClick={(event) => handleClick(event, order)}
          >
            <div className={styles.order_info_wrapper}>
              <p className="text text_type_main-default">{`#${order.number}`}</p>
              <p className="text text_type_main-default text_color_inactive">
                <time dateTime={moment(order.createdAt).format()}>
                  {moment(order.createdAt).calendar(null, {
                    sameDay: "[Сегодня], LT",
                    lastDay: "[Вчера], LT",
                    lastWeek: "DD.MM.YYYY, LT",
                    sameElse: "DD.MM.YYYY, LT",
                  })}
                </time>
              </p>
            </div>
            <h2 className="text text_type_main-medium">{order.name}</h2>
            <p className="text text_type_main-default">
              {statusTexts[order.status]}
            </p>
            <div className={styles.order_info_wrapper}>
              <div className={styles.images_container}>
                {ordersWithImages
                  .find((item) => item.order === order)
                  ?.images.map((imageUrl, index) => (
                    <div
                    className={styles.imageWrapper}
                    key={index}
                    style={{
                      left: `${index * 15}px`,
                      zIndex: ordersWithImages.length + index,
                    }}
                  >
                      {imageUrl && (
                        <img
                          className={styles.ingredient_image}
                          src={imageUrl}
                          alt={`Ingredient ${index}`}
                        />
                      )}
                    </div>
                  ))}
              </div>
              <div className={styles.order_info_wrapper}>
                <p className="text text_type_digits-default">{totalPrice}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </li>
        </Link>
      ))}
    </>
  );
};

export default UserOrderItem;
