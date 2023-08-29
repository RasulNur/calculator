import { FC, MouseEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import "./numpad.scss";

const Numpad: FC = () => {
    const dispatch = useAppDispatch();
    const [buttonTarget, setButtonTarget] = useState<EventTarget>();
    const { theme, value } = useAppSelector((state) => state.calculator);

    const numpadData = [
        { id: "7", keycode: [103, 55], value: 7 },
        { id: "8", keycode: [104, 56], value: 8 },
        { id: "9", keycode: [105, 57], value: 9 },
        { id: "del", keycode: [8], value: "backspace" },
        { id: "4", keycode: [100, 52], value: 4 },
        { id: "5", keycode: [101, 53], value: 5 },
        { id: "6", keycode: [102, 54], value: 6 },
        { id: "+", keycode: [107], value: "operand" },
        { id: "1", keycode: [97, 49], value: 1 },
        { id: "2", keycode: [98, 50], value: 2 },
        { id: "3", keycode: [99, 51], value: 3 },
        { id: "-", keycode: [109], value: "operand" },
        { id: ".", keycode: [110, 190], value: "decimal" },
        { id: "0", keycode: [96, 48], value: 0 },
        { id: "/", keycode: [111], value: "operand" },
        { id: "×", keycode: [106], value: "operand" },

        { id: "reset", keycode: [46], value: "delete" },
        { id: "=", keycode: [13], value: "equal" },
    ];

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        setButtonTarget(e.currentTarget);
    };

    useEffect(() => {
        document.onmousedown = (e) => {
            if (e.target == buttonTarget) {
                console.log("click");
            }
        };
        // document.onmouseup = (e) => {
        //     if (e.target.classList.contains("numpad__btn")) {
        //         e.target.classList.add("shadow");
        //     }
        // };
    }, [buttonTarget]);

    return (
        <div
            className={`numpad ${
                theme === 1
                    ? "numpad-theme1"
                    : theme === 2
                    ? "numpad-theme2"
                    : "numpad-theme3"
            }`}>
            <div className="numpad__row">
                {numpadData.map((el) => {
                    return (
                        <button
                            key={el.id}
                            className="numpad__btn shadow"
                            onClick={(e) => handleClick(e)}>
                            {el.id}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Numpad;