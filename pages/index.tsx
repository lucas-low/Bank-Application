import Head from 'next/head'
import { useState, useEffect } from 'react'
import AccountsListTable from '../features/AccountsListTable/AccountsListTable'//split into components
import type { NextPage } from "next";
import { useSelector, useDispatch } from 'react-redux'
import { fetchBankAccountsList } from '../features/reducers'
import { AppDispatch, RootState } from '../features/store'

const Home: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  
  useEffect(() => {
    dispatch(fetchBankAccountsList())
  }, []) // empty array to run only once

  const isLoading = useSelector((state: RootState) => state.bankAccountsList.loading)
  const accounts = useSelector((state: RootState) => state.bankAccountsList.accounts)
  if (isLoading) return <p>Loading...</p>
  return (
    <div>
      <Head>
        <title>Fazz-Xfers-App</title>
        <meta name="description" content="next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
      <AccountsListTable accounts={accounts} loading={isLoading}/>
      </>
    </div>
  )
}

export default Home