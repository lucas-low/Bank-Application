import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {RowData} from '../types';

// Define a type for the slice state
export interface BankAccountsListState {
    loading: boolean;
    accounts: RowData[];
    error: string | undefined;
}

// Define the initial state using that type
const initialState: BankAccountsListState = {
    loading: true,
    accounts: [],
    error: '',
}

// Define a thunk that dispatches those action creators
export const fetchBankAccountsList = createAsyncThunk(
    'bankAccountsList/fetchBankAccountsList',
    async () => {
        const response = await fetch('/api/bank');
        const data = await response.json();
        const {accounts} = JSON.parse(data);
        return accounts;
    }
);

// Define a slice of state and reducers that can be used to retrieve and update the state
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

export const {
    // modifier actions
} = bankAccountsListSlice.actions;

// Export the actions and reducer 
export default bankAccountsListSlice;
