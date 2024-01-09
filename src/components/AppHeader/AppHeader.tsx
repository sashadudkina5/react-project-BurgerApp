import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./AppHeader.module.css";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

function AppHeader() {
  return (
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.navBar}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${appHeaderStyles.link} ${
              isActive ? appHeaderStyles.link_active : ""
            }`
          }
          end
        >
          <BurgerIcon type="secondary" />
          <p
            className={`text text_type_main-default text_color_inactive ${appHeaderStyles.linkText}`}
          >
            Конструктор
          </p>
        </NavLink>

        <NavLink
          to={"/feed"}
          className={({ isActive }) =>
            `${appHeaderStyles.link} ${
              isActive ? appHeaderStyles.link_active : ""
            }`
          }
          end
        >
          <ListIcon type="secondary" />
          <p
            className={`text text_type_main-default text_color_inactive ${appHeaderStyles.linkText}`}
          >
            Лента заказов
          </p>
        </NavLink>
      </div>
      <NavLink to="/" end>
        <Logo />
      </NavLink>

      <NavLink
        to={"/profile"}
        className={({ isActive }) =>
          `${appHeaderStyles.link} ${
            isActive ? appHeaderStyles.link_active : ""
          }`
        }
        end
      >
        <ProfileIcon type="secondary" />
        <p
          className={`text text_type_main-default text_color_inactive ${appHeaderStyles.linkText}`}
        >
          Личный кабинет
        </p>
      </NavLink>
    </header>
  );
}

export default AppHeader;
