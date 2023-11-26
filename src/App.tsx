import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import AppHeader from "./components/AppHeader/appHeader";
import BurgerIngredients from "./components/BurgerIngredients/burgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor/burgerConstructor";
import Modal from "./components/Modal/modal";
import OrderDetails from "./components/OrderDetails/orderDetails";
import IngredientDetail from "./components/IngredientDetail/ingredientDetail";
import { getIngredients } from "./utils/burger-api";
import {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
} from "./redux_services/ingredients/actions";
import {
  showIngredientDetails,
  hideIngredientDetails,
} from "./components/IngredientDetail/actions";
import { useDispatch, useSelector } from "react-redux";
import { getListOfIngredients } from "./redux_services/selectors";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { createOrder } from "./components/OrderDetails/thunk";
import {
  getConstructorIngredients,
  getBunData,
  getLoggedInStatus,
} from "./redux_services/selectors";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ResetPasswordPage from "./pages/reset-password";
import ForgotPasswordPage from "./pages/forgot-password";
import ProfilePage from "./pages/profile";
import ProtectedRouteElement from "./components/ProtectedRouteElement";
import { getUserInfo } from "./utils/getUserInfo";
import IngredientDetailPageOpened from "./pages/ingredients-id";
import { Navigate } from "react-router";

interface IIngredientCard {
  type?: string;
  name: string;
  price: number;
  _id: number;
  image: string;
}

interface IIngredients {
  ingredients: IIngredientCard[];
}

function App() {
  let location = useLocation();

  let state = location.state || {};
  let backgroundLocation = state.backgroundLocation;

  const dispatch = useDispatch();

  let navigate = useNavigate();

  function onDismiss() {
    navigate(-1);
    dispatch(hideIngredientDetails());
  }

  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);

  const ingredientsState = useSelector(getListOfIngredients);
  const { ingredientsData, isLoading, error } = ingredientsState;

  const data: IIngredients = useSelector(getConstructorIngredients);
  const bunData = useSelector(getBunData);

  const getIngredientIDs = () => {
    const innerIngredientIDs = data?.ingredients?.map((item) => item._id) || [];
    const idValue = bunData._id;
    const bunIDs = [idValue];
    const ingredientIDs = innerIngredientIDs.concat(bunIDs, bunIDs);

    return {
      ingredients: ingredientIDs,
    };
  };

  useEffect(() => {
    dispatch(getIngredientsRequest());

    getIngredients()
      .then((ingredientsData) => {
        dispatch(getIngredientsSuccess(ingredientsData));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getIngredientsFailed(error.message));
      });
  }, [dispatch]);

  const isAuth = useSelector(getLoggedInStatus);

  const openOrderDetailsModal = () => {
    if (
      data &&
      data.ingredients &&
      data.ingredients.length > 0 &&
      bunData !== null &&
      isAuth
    ) {
      setIsOrderDetailsModalOpen(true);
      createOrder(getIngredientIDs());
    } else if (!isAuth) {
      createOrder(getIngredientIDs());
      navigate("/login");
    } else {
      return null;
    }
  };

  const closeOrderDetailsModal = () => {
    setIsOrderDetailsModalOpen(false);
  };

  const openIngredientDetailModal = (ingredient: IIngredientCard) => {
    dispatch(showIngredientDetails(ingredient));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Произошла ошибка: {error}</p>;
  }

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/ingredients/:id"
            element={<IngredientDetailPageOpened />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement>
                {" "}
                <ProfilePage />{" "}
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/"
            element={
              <main className="mainWrapper">
                <>
                  <BurgerIngredients
                    ingredients={ingredientsData.data}
                    onClick={openIngredientDetailModal}
                  />
                  <BurgerConstructor
                    onClick={openOrderDetailsModal}
                  />

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
                <Modal title={"Детали ингредиента"} onClose={onDismiss}>
                  <IngredientDetail />
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