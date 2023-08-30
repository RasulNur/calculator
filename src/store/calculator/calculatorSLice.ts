import { createSlice } from "@reduxjs/toolkit";

export interface ICalculatorState {
    theme: number;
    inputValue: string;
    operator: string;
}

const initialState: ICalculatorState = {
    theme: 1,
    inputValue: "",
    operator: "",
};

export const calculatorSlice = createSlice({
    name: "calculator",
    initialState,
    reducers: {
        switchTheme: (state, { payload }) => {
            state.theme = payload;
        },
        setInputValue: (state, { payload }) => {
            state.inputValue = payload;
        },
    },
});

export const { switchTheme, setInputValue } = calculatorSlice.actions;
export default calculatorSlice.reducer;
