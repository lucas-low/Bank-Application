import React from 'react'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import AccountsListTable from "./accountsListTable";

// interface arg to check valid TS syntax 

const App = () => {
  return (
    <div>
      <AccountsListTable accounts={accounts} loading={isLoading} />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />)