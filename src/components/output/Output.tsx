import { FC } from "react";

import "./output.scss";
import { useAppSelector } from "../../hooks/reduxHooks";

const Output: FC = () => {
    const { theme, inputValue } = useAppSelector((state) => state.calculator);

    return (
        <div
            className={`output ${
                theme === 1
                    ? "output-theme1"
                    : theme === 2
                    ? "output-theme2"
                    : "output-theme3"
            }`}>
            <input
                className="output__input"
                type="text"
                readOnly
                value={inputValue || "0"}
            />
        </div>
    );
};

export default Output;
