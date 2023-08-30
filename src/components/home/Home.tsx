import { FC } from "react";
import { Toaster } from "react-hot-toast";
import "./home.scss";
import Header from "../header/Header";
import Output from "../output/Output";
import Numpad from "../numpad/Numpad";

const Home: FC = () => {
    return (
        <div className="home">
            <Toaster
                toastOptions={{
                    style: {
                        fontSize: "16px",
                        padding: "16px",
                    },
                }}
            />
            <div className="container">
                <Header />
                <Output />
                <Numpad />
            </div>
        </div>
    );
};

export default Home;
