import React, { useState, useEffect } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrder, IIngredients } from "../../utils/types";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatch-selectos";
import {
  getAllCreatedOrders,
  isWSLoading,
  getListOfIngredientsArray,
} from "../../redux_services/selectors";
import { reopenDoneOrderDetails } from "./actions";
import moment from "moment";
import "moment/locale/ru";
import DoneOrderDetailsStyles from "./DoneOrderDetails.module.css";
import {statusTexts} from "../../utils/order-statuses"

interface DoneOrderDetailsProps {
  matchingOrder: TOrder | null;
}

function DoneOrderDetails({ matchingOrder }: DoneOrderDetailsProps) {


  const routeParams = useParams();
  const readyOrders = useAppSelector(getAllCreatedOrders);
  const dispatch = useAppDispatch();

  const WSLoading = useAppSelector(isWSLoading);
  const allIngredients = useAppSelector(getListOfIngredientsArray);



  //provides the modal displayed when page refreshing

  React.useEffect(() => {
    if (!matchingOrder && !WSLoading) {
      const filteredArray = readyOrders.filter(
        (obj) => obj._id === routeParams.id
      );

      if (filteredArray.length > 0) {
        dispatch(reopenDoneOrderDetails(filteredArray[0]));
      } else {
      }
    }
  }, [dispatch, routeParams, readyOrders, WSLoading, matchingOrder]);

  // finds and returns ingredients from the selected order

  function getMatchingIngredients(
    matchingOrder: TOrder | null,
    allIngredients: IIngredients | null
  ) {
    return (
      allIngredients?.filter((ingredient) =>
        matchingOrder?.ingredients.includes(ingredient._id!)
      ) || []
    );
  }
  const matchingIngredients = getMatchingIngredients(
    matchingOrder,
    allIngredients
  );

  // finds and returns array of ordered ingredients' count and all the info

  const [orderedIngredients, setOrderedIngredients] = useState<IIngredients>(
    []
  );

  useEffect(() => {
    function getCountOfIngredients(
      matchingOrder: TOrder | null,
      matchingIngredients: IIngredients | null
    ) {
      if (!matchingOrder || !matchingIngredients) {
        return [];
      }
      const orderIngredientsIDs = matchingOrder.ingredients;

      const ingredientCounts = orderIngredientsIDs.reduce((counts, id) => {
        counts[id] = (counts[id] || 0) + 1;
        return counts;
      }, {} as Record<string, number>);

      const orderIngredients: IIngredients = [];

      for (const id in ingredientCounts) {
        const count = ingredientCounts[id];
        const matchingIngredient = matchingIngredients.find(
          (ingredient) => ingredient._id === id
        );

        if (matchingIngredient) {
          orderIngredients.push({ ...matchingIngredient, count });
        }
      }
      setOrderedIngredients(orderIngredients);
    }

    getCountOfIngredients(matchingOrder, matchingIngredients);
  }, [matchingOrder]);

  // counts total price of the order

  function calculateTotalPrice(orderedIngredients: IIngredients | null) {
    let totalPrice = 0;
    if (orderedIngredients) {
      for (const ingredient of orderedIngredients) {
        totalPrice += ingredient.price! * ingredient.count!;
      }
    }
    return totalPrice;
  }

  // Get the total price
  const totalOrderPrice = calculateTotalPrice(orderedIngredients);

  // order statuses
 
  const statusText = matchingOrder && statusTexts[matchingOrder.status];

  if (WSLoading || !matchingOrder) {
    return <p>Loading...</p>;
  }

  if (WSLoading) return <p>Loading...</p>;

  if (!matchingOrder && !WSLoading) return <p>Order not found</p>;

  return (
    <section className={DoneOrderDetailsStyles.wrapper}>
      <p
        className={`text text_type_digits-default mb-10 ${DoneOrderDetailsStyles.order_number}`}
      >
        #{matchingOrder!.number}
      </p>
      <h1 className="text text_type_main-medium mb-3" style={{ textAlign: "left" }}>{matchingOrder!.name}</h1>
      <p className="text text_type_main-small mb-3" style={{ textAlign: "left" }}>
        {statusText && <span>{statusText}</span>}
      </p>
      <p className="text text_type_main-medium mb-6" style={{ textAlign: "left" }}>Состав: </p>
      <ul className={`mb-10 ${DoneOrderDetailsStyles.ingredients_list}`}>
        {orderedIngredients.map((ingredient) => (
          <li
            key={ingredient._id}
            className={DoneOrderDetailsStyles.ingredient_info}
          >
            <img
              src={ingredient.image}
              alt={ingredient.name}
              className={DoneOrderDetailsStyles.image}
            />
            <p
              className={`text text_type_main-default ${DoneOrderDetailsStyles.ingredient_name}`}
            >
              {ingredient.name}
            </p>
            <div className={DoneOrderDetailsStyles.price_wrapper}>
              <p className="text text_type_digits-default">
                {ingredient.count}x{ingredient.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={DoneOrderDetailsStyles.total_info_wrapper}>
        <p className="text text_type_main-default text_color_inactive">
          <time dateTime={moment(matchingOrder!.createdAt).format()}>
            {moment(matchingOrder!.createdAt).calendar(null, {
              sameDay: "[Сегодня], LT",
              lastDay: "[Вчера], LT",
              lastWeek: "DD.MM.YYYY, LT",
              sameElse: "DD.MM.YYYY, LT",
            })}
          </time>
        </p>
        <div className={DoneOrderDetailsStyles.total_price_wrapper}>
          <p className="text text_type_digits-default">{totalOrderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
}

export default DoneOrderDetails;
