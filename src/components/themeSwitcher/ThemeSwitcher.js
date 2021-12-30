import React from "react";
import sprite from "../../images/sprite.svg";
import { ThemeBtn, ThemeIcon } from "./ThemeSwitcher.styled";

const ThemeSwitcher = ({ onBtnClick, currentTheme }) => {
  return (
    <ThemeBtn type="button" onClick={onBtnClick}>
      <ThemeIcon>
        <use
          href={`${sprite}#${
            currentTheme === "light" ? "icon-sun" : "icon-moon"
          }`}
        ></use>
      </ThemeIcon>
    </ThemeBtn>
  );
};

export default ThemeSwitcher;
