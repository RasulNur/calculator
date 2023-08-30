import { FC } from "react";

import "./output.scss";
import { useAppSelector } from "../../hooks/reduxHooks";

const Output: FC = () => {
    const { theme, value } = useAppSelector((state) => state.calculator);

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
                // onChange={(e) => setValue(e.target.value)}
                value={Number(value).toLocaleString("en-US")}
            />
        </div>
    );
};

export default Output;
