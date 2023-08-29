import { FC } from "react";

import "./home.scss";
import Header from "../header/Header";
import Output from "../output/Output";
import Numpad from "../numpad/Numpad";

const Home: FC = () => {
    return (
        <div className="home">
            <div className="container">
                <Header />
                <Output />
                <Numpad />
            </div>
        </div>
    );
};

export default Home;
