import { FC, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import toast from "react-hot-toast";

import "./numpad.scss";
import { setInputValue } from "../../store/calculator/calculatorSLice";

const Numpad: FC = () => {
    const notify = (msg: string) =>
        toast.error(msg, {
            duration: 2500,
            position: "top-right",
            style: { background: "#e1e5e7" },
        });

    const dispatch = useAppDispatch();
    const { theme, inputValue } = useAppSelector((state) => state.calculator);

    const ops = ["+", "-", "*", "/", "."];

    const numpadData = [
        { id: "7", keycode: [103, 55], value: 7 },
        { id: "8", keycode: [104, 56], value: 8 },
        { id: "9", keycode: [105, 57], value: 9 },
        { id: "del", keycode: [8], value: "delete" },
        { id: "4", keycode: [100, 52], value: 4 },
        { id: "5", keycode: [101, 53], value: 5 },
        { id: "6", keycode: [102, 54], value: 6 },
        { id: "+", keycode: [107], value: "+" },
        { id: "1", keycode: [97, 49], value: 1 },
        { id: "2", keycode: [98, 50], value: 2 },
        { id: "3", keycode: [99, 51], value: 3 },
        { id: "-", keycode: [109], value: "-" },
        { id: ".", keycode: [110, 190], value: "." },
        { id: "0", keycode: [96, 48], value: 0 },
        { id: "/", keycode: [111], value: "/" },
        { id: "×", keycode: [106], value: "*" },
        { id: "reset", keycode: [46], value: "reset" },
        { id: "=", keycode: [13], value: "=" },
    ];

    const handleClick = (elId: string, elValue: string | number) => {
        if (elId === "del") {
            dispatch(setInputValue(inputValue.slice(0, -1)));
        }
        if (elId === "reset") {
            dispatch(setInputValue(""));
        }
        if (elId === "=" && inputValue.length !== 0) {
            try {
                dispatch(setInputValue(String(eval(inputValue))));
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (
                    error.message ==
                    "Octal literals are not allowed in strict mode."
                ) {
                    notify("Remove the zeros before the number");
                }
                if (error.message == "Unexpected end of input") {
                    notify("Remove operand or write number after operand");
                }
            }
        }
        if (elId !== "=" && elId !== "reset" && elId !== "del") {
            if (
                (ops.includes(elId) && inputValue === "") ||
                (ops.includes(elId) && ops.includes(inputValue.slice(-1)))
            ) {
                return;
            }

            dispatch(setInputValue(inputValue.replace(/^0+/, "") + elValue));
        }
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
                            onClick={() => handleClick(el.id, el.value)}>
                            {el.id}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Numpad;
