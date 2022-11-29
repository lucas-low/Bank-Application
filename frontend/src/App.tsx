import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import AccountsTable from './features/Table/AccountsTable';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { fetchAccounts } from './features/Table/tableAPI'
import { AppDispatch, RootState } from './app/store'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <AccountsTable />
      </header>
    </div>
  );
}

export default App;
