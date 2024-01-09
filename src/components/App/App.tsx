import { useState, useEffect } from "react";
import React from "react";
import appStyles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetail from "../IngredientDetail/IngredientDetail";
import {
  showIngredientDetails,
  hideIngredientDetails,
} from "../IngredientDetail/actions";
import {
  getListOfIngredients,
  getIngredientDetails,
} from "../../redux_services/selectors";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { createOrderThunk } from "../../redux_services/thunk-functions/SendNewOrder";
import {
  getConstructorIngredients,
  getBunData,
  getLoggedInStatus,
  getSelectedOrder,
} from "../../redux_services/selectors";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ResetPasswordPage from "../../pages/reset-password";
import ForgotPasswordPage from "../../pages/forgot-password";
import ProfilePage from "../../pages/profile";
import OrderFeed from "../../pages/order-feed";
import ProtectedRouteElement from "../ProtectedRouteElement";
import { getUserInfoThunk } from "../../redux_services/thunk-functions/GetUserInfo";
import IngredientDetailPageOpened from "../../pages/ingredients-id";
import { IIngredientCard, IAllIngredientsConstructor } from "../../utils/types";
import { fetchIngredients } from "../../redux_services/thunk-functions/FetchIngredients";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatch-selectos";
import { cleanConstructor } from "../BurgerConstructor/actions";
import DoneOrderDetails from "../DoneOrderDetails/DoneOrderDetails";
import OrderDetailPageOpened from "../../pages/feed-order-details-id";
import { hideDoneOrderDetails } from "../DoneOrderDetails/actions";
import UserOrdersPage from "../../pages/user-orders";
import {cleanOrderID} from '../OrderDetails/actions'

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const state = location.state || {};
  const backgroundLocation = state.backgroundLocation;
  const navigate = useNavigate();

  function onDismissIngredientDetails() {
    navigate(-1);
    dispatch(hideIngredientDetails());
  }

  function onDismissDoneOrderDetails() {
    navigate(-1);
    dispatch(hideDoneOrderDetails());
  }

  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);

  const ingredientsState = useAppSelector(getListOfIngredients);
  const { ingredientsData, isLoading, error } = ingredientsState;

  const data: IAllIngredientsConstructor = useAppSelector(
    getConstructorIngredients
  );
  const bunData = useAppSelector(getBunData);
  const selectedIngredient = useAppSelector(getIngredientDetails);

  const selectedOrder = useAppSelector(getSelectedOrder);

  const getIngredientIDs = () => {
    const innerIngredientIDs =
      data.map((item) => item.ingredientObj!._id) || [];
    const idValue = bunData?._id;
    const bunIDs = [idValue];
    const ingredientIDs = innerIngredientIDs.concat(bunIDs, bunIDs);
    console.log(innerIngredientIDs);

    return {
      ingredients: ingredientIDs,
    };
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const isAuth = useAppSelector(getLoggedInStatus);

  const openOrderDetailsModal = () => {
    if (data && data && data.length > 0 && bunData !== null && isAuth) {
      setIsOrderDetailsModalOpen(true);
      dispatch(createOrderThunk(getIngredientIDs()));
    } else if (!isAuth) {
      navigate("/login");
    } else {
      return null;
    }
  };

  const closeOrderDetailsModal = () => {
    setIsOrderDetailsModalOpen(false);
    dispatch(cleanConstructor());
    dispatch(cleanOrderID())
  };

  const openIngredientDetailModal = (ingredient: IIngredientCard) => {
    dispatch(showIngredientDetails(ingredient));
  };

  useEffect(() => {
    dispatch(getUserInfoThunk());
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Произошла ошибка: {error}</p>;
  }

  return (
    <div className={appStyles.App}>
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/feed" element={<OrderFeed />} />
          <Route
            path="/profile/orders"
            element={
              <ProtectedRouteElement>
                <UserOrdersPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/profile/order/:id"
            element={
              <ProtectedRouteElement>
                <OrderDetailPageOpened path="/profile/order/:id" />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/ingredients/:id"
            element={<IngredientDetailPageOpened />}
          />
          <Route
            path="/feed/:id"
            element={<OrderDetailPageOpened path="/feed/:id" />}
          />

          <Route
            path="/profile"
            element={
              <ProtectedRouteElement>
                <ProfilePage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/"
            element={
              <main className={appStyles.mainWrapper}>
                <>
                  <BurgerIngredients
                    ingredients={ingredientsData.data}
                    onClick={openIngredientDetailModal}
                  />
                  <BurgerConstructor onClick={openOrderDetailsModal} />

                  {isOrderDetailsModalOpen && (
                    <Modal title={""} onClose={closeOrderDetailsModal}>
                      <OrderDetails />
                    </Modal>
                  )}
                </>
              </main>
            }
          />
        </Routes>

        {state?.backgroundLocation && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal
                  title={"Детали ингредиента"}
                  onClose={onDismissIngredientDetails}
                >
                  <IngredientDetail selectedIngredient={selectedIngredient} />
                </Modal>
              }
            />

            <Route
              path="/feed/:id"
              element={
                <Modal title={""} onClose={onDismissDoneOrderDetails}>
                  <DoneOrderDetails matchingOrder={selectedOrder} />
                </Modal>
              }
            />

            <Route
              path="/profile/order/:id"
              element={
                <Modal title={""} onClose={onDismissDoneOrderDetails}>
                  <DoneOrderDetails matchingOrder={selectedOrder} />
                </Modal>
              }
            />
          </Routes>
        )}
      </DndProvider>
    </div>
  );
}

export default App;
