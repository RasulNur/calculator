import { FC, MouseEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import toast from "react-hot-toast";

import "./numpad.scss";
import { setInputValue } from "../../store/calculator/calculatorSLice";

interface IKey {
    value: string;
    type: string;
    key: string;
}

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
    const numpadData: IKey[] = [
        { value: "7", type: "number", key: "7" },
        { value: "8", type: "number", key: "8" },
        { value: "9", type: "number", key: "9" },
        { value: "del", type: "action", key: "Backspace" },
        { value: "4", type: "number", key: "4" },
        { value: "5", type: "number", key: "5" },
        { value: "6", type: "number", key: "6" },
        { value: "+", type: "operand", key: "+" },
        { value: "1", type: "number", key: "1" },
        { value: "2", type: "number", key: "2" },
        { value: "3", type: "number", key: "3" },
        { value: "-", type: "operand", key: "-" },
        { value: ".", type: "operand", key: "." },
        { value: "0", type: "number", key: "0" },
        { value: "/", type: "operand", key: "/" },
        { value: "*", type: "operand", key: "*" },
        { value: "reset", type: "action", key: "Delete" },
        { value: "=", type: "action", key: "Enter" },
    ];

    useEffect(() => {}, [inputValue]);
    const handleClick = (el: IKey) => {
        if (el.key === "Backspace") {
            dispatch(setInputValue(inputValue.slice(0, -1)));
        }
        if (el.key === "Delete") {
            dispatch(setInputValue(""));
        }
        if (el.key === "Enter" && inputValue.length !== 0) {
            try {
                let res = eval(inputValue);

                if (String(res).split(".")[1]?.length > 5) {
                    res = res.toFixed(5);
                }
                dispatch(setInputValue(String(res)));
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                notify("Erorr");
                dispatch(setInputValue("Error!"));
            }
        }
        if (
            el.key !== "Enter" &&
            el.key !== "Delete" &&
            el.key !== "Backspace"
        ) {
            if (
                (ops.includes(el.value) && inputValue === "") ||
                (ops.includes(el.value) && ops.includes(inputValue.slice(-1)))
            ) {
                return;
            }

            dispatch(setInputValue(inputValue.replace(/^0+/, "") + el.value));
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

    useEffect(() => {
        const keyDownHandler = (e: KeyboardEvent) => {
            const key = numpadData.filter((el) => el.key === e.key);
            if (key[0]) {
                e.preventDefault();
                handleClick(key[0]);
            }
        };
        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    });

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
                            key={el.value}
                            className="numpad__btn shadow"
                            onClick={() => handleClick(el)}>
                            {el.value}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Numpad;
