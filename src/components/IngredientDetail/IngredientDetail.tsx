import ingredientDetailStyles from "./IngredientDetail.module.css";
import React from "react";
import { useParams } from "react-router-dom";
import { getListOfIngredientsArray } from "../../redux_services/selectors";
import { reopenIngredientDetails } from "../IngredientDetail/actions";
import {IIngredients, IIngredientCard} from "../../utils/types";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatch-selectos"

interface IIngredientDetailProps {
  selectedIngredient: IIngredientCard | null;
}

function IngredientDetail({ selectedIngredient }: IIngredientDetailProps) {
  const dispatch = useAppDispatch();
  const routeParams = useParams();
  const data: IIngredients = useAppSelector(getListOfIngredientsArray);

  React.useEffect(() => {
    if (routeParams && data) {
      const filteredArray = data.filter((obj) => obj._id === routeParams.id);
      dispatch(reopenIngredientDetails(filteredArray[0]));
    }
  }, [dispatch, routeParams, data]);

  if (!selectedIngredient) {
    return null;
  }

  return (
    <div className={ingredientDetailStyles.wrapper}>
      <img
        className={ingredientDetailStyles.image}
        src={selectedIngredient.image}
        alt={selectedIngredient.name}
      />
      <p className={ingredientDetailStyles.name}>{selectedIngredient.name}</p>
      <div className={ingredientDetailStyles.details}>
        <ul className={ingredientDetailStyles.detailsList}>
          <li className={ingredientDetailStyles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {selectedIngredient.calories}
            </p>
          </li>
          <li className={ingredientDetailStyles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {selectedIngredient.proteins}
            </p>
          </li>
          <li className={ingredientDetailStyles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {selectedIngredient.fat}
            </p>
          </li>
          <li className={ingredientDetailStyles.detailsItem}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_main-default text_color_inactive">
              {selectedIngredient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default IngredientDetail;
