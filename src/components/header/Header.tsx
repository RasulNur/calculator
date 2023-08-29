import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import "./header.scss";
import { switchTheme } from "../../store/calculator/calculatorSLice";

const Header: FC = () => {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector((state) => state.calculator);
    useEffect(() => {
        if (theme === 1) {
            document.body.classList.value = "body-theme1";
        }
        if (theme === 2) {
            document.body.classList.value = "body-theme2";
        }
        if (theme === 3) {
            document.body.classList.value = "body-theme3";
        }
    }, [theme]);

    const handleSwitchTheme = () => {
        if (theme === 1) {
            dispatch(switchTheme(2));
        }
        if (theme === 2) {
            dispatch(switchTheme(3));
        }
        if (theme === 3) {
            dispatch(switchTheme(1));
        }
    };

    return (
        <header
            className={`header ${
                theme === 1
                    ? "header-theme1"
                    : theme === 2
                    ? "header-theme2"
                    : "header-theme3"
            }`}>
            <h3 className="header__heading">calc</h3>
            <div className="header__theme-toggler theme-toggler">
                <div></div>
                <ul className="theme-toggler__list">
                    <li className="theme-toggler__list-item">1</li>
                    <li className="theme-toggler__list-item">2</li>
                    <li className="theme-toggler__list-item">3</li>
                </ul>

                <h5 className="theme-toggler__heading">theme</h5>
                <button
                    className="theme-toggler__btn"
                    onClick={() => handleSwitchTheme()}>
                    <span className="theme-toggler__btn-circle"></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
