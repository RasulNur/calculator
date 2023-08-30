import { createSlice } from "@reduxjs/toolkit";

export interface ICalculatorState {
    theme: number;
    value: string;
    operator: string;
}

const initialState: ICalculatorState = {
    theme: 1,
    value: "0",
    operator: "",
};

export const calculatorSlice = createSlice({
    name: "calculator",
    initialState,
    reducers: {
        switchTheme: (state, { payload }) => {
            state.theme = payload;
        },
        setValue: (state, { payload }) => {
            state.value = payload;
        },
        setOperator: (state, { payload }) => {
            state.operator = payload;
        },
    },
});

export const { switchTheme, setValue } = calculatorSlice.actions;
export default calculatorSlice.reducer;
