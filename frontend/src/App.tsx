import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import AccountsTable from './features/Table/AccountsTable';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { fetchAccounts } from './features/Table/tableAPI'
import { AppDispatch, RootState } from './app/store'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchAccounts())
  }, []) // empty array to run only once

  const isLoading = useSelector((state: RootState) => state.bankAccountsList.loading)
  const accounts = useSelector((state: RootState) => state.bankAccountsList.accounts)
  if (isLoading) return <p>Loading...</p>
  return (
    <div className="App">
      <header className="App-header">
        <AccountsTable accounts={accounts} loading={isLoading} />
      </header>
    </div>
  );
}

export default App;
