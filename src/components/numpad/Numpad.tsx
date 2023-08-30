import { FC, MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import "./numpad.scss";
import { setValue } from "../../store/calculator/calculatorSLice";

const Numpad: FC = () => {
    const dispatch = useAppDispatch();
    const [buttonTarget, setButtonTarget] = useState<EventTarget>();
    const { theme, value } = useAppSelector((state) => state.calculator);
    const operatorsArr = ["+", "-", "*", "/", "=", "."];
    const numpadData = [
        { id: "7", keycode: [103, 55], value: 7 },
        { id: "8", keycode: [104, 56], value: 8 },
        { id: "9", keycode: [105, 57], value: 9 },
        { id: "del", keycode: [8], value: "delete" },
        { id: "4", keycode: [100, 52], value: 4 },
        { id: "5", keycode: [101, 53], value: 5 },
        { id: "6", keycode: [102, 54], value: 6 },
        { id: "+", keycode: [107], value: "operator" },
        { id: "1", keycode: [97, 49], value: 1 },
        { id: "2", keycode: [98, 50], value: 2 },
        { id: "3", keycode: [99, 51], value: 3 },
        { id: "-", keycode: [109], value: "operator" },
        { id: ".", keycode: [110, 190], value: "operator" },
        { id: "0", keycode: [96, 48], value: 0 },
        { id: "/", keycode: [111], value: "operator" },
        { id: "×", keycode: [106], value: "operator" },

        { id: "reset", keycode: [46], value: "reset" },
        { id: "=", keycode: [13], value: "operator" },
    ];

    const handleClick = (
        e: MouseEvent<HTMLButtonElement>,
        id: string,
        keycode: number[],
        elValue: string | number
    ) => {
        // if (elValue === "reset") dispatch(setValue(""));
        // if (elValue === "") {}
        // if (typeof elValue === "string") {
        // }
        dispatch(setValue(Number(value) + Number(id)));
        // setButtonTarget(e.currentTarget);
    };

    const handleMouseEventButton = (
        e: MouseEvent<HTMLButtonElement>,
        mouseEventName: string
    ) => {
        if (document.body.offsetWidth > 600) {
            if (mouseEventName === "down") {
                e.currentTarget.style.height = "64px";
                return e.currentTarget.classList.toggle("shadow");
            }
            if (mouseEventName === "up") {
                e.currentTarget.style.height = "59px";
                return e.currentTarget.classList.add("shadow");
            }
        }
    };

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
                            onMouseDown={(e) => {
                                handleMouseEventButton(e, "down");
                            }}
                            onMouseUp={(e) => {
                                handleMouseEventButton(e, "up");
                            }}
                            key={el.id}
                            className="numpad__btn shadow"
                            onClick={(e) =>
                                handleClick(e, el.id, el.keycode, el.value)
                            }>
                            {el.id}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Numpad;
