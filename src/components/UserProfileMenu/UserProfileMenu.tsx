import UserProfileMenuStyles from "./UserProfileMenu.module.css";
import {logoutThunk} from "../../redux_services/thunk-functions/logout";
import { useAppDispatch } from "../../hooks/dispatch-selectos";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function UserProfileMenu() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = (e: React.SyntheticEvent) => {
        dispatch(logoutThunk());
        navigate("/login");
      };


  return (
      <div className={UserProfileMenuStyles.menu}>
        <ul className={UserProfileMenuStyles.menuList}>
          <li className={UserProfileMenuStyles.item}>
            <p className="text text_type_main-medium">Профиль</p>
          </li>

          <NavLink
          to={"/profile/orders"}
          end
        >
          <li className={UserProfileMenuStyles.item}>
            <p className="text text_type_main-medium">История заказов</p>
          </li>

          </NavLink>

          <li className={UserProfileMenuStyles.item}>
            <button type="button" onClick={handleLogout}>
              <p className="text text_type_main-medium">Выход</p>
            </button>
          </li>
        </ul>

        <p
          className="text text_type_main-default text_color_inactive"
          style={{ textAlign: "left" }}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
  );
}

export default UserProfileMenu;
