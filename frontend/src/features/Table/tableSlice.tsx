import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RowData } from "../types";
import { fetchAccounts } from './tableAPI'

export interface BankAccountsListState {
    loading: boolean;
    accounts: RowData[];
    error: string | undefined;
}

const initialState: BankAccountsListState = {
    loading: true,
    accounts: [],
    error: '',
}
export const fetchBankAccountsList = createAsyncThunk(
    'bankAccountsList/fetchBankAccountsList',
    async () => {
        const response = await fetchAccounts();
        const data = await response.json();
        const { accounts } = JSON.parse(data);
        return accounts;
    }
);
export const bankAccountsListSlice = createSlice({
    name: 'bankAccountsList',
    initialState,
    reducers: {//modifier to POST, PUT, DELETE, or PATCH data to the backend server
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBankAccountsList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchBankAccountsList.fulfilled, (state, action) => {
            state.loading = false;
            state.accounts = action.payload; //API call response payload data
            state.error = '';
        });
        builder.addCase(fetchBankAccountsList.rejected, (state, action) => {
            state.loading = false;
            state.accounts = []; //clear the accounts array
            state.error = action.error.message;
        });
    },
});
export default bankAccountsListSlice