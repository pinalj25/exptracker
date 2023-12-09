import React from 'react';
import Balance from './Balance';
import AddTransaction from './AddTransaction';
import TransactionList from './TranscationList';
import './Header.css'
import IncomeExpense from './IncomeExpense';

export default function Header() {
  return (
    <div className='cont'>
      <h2>MoneyMinder</h2>
        <div className=''>
          <Balance/>
          <AddTransaction/>
          <IncomeExpense/>
          <TransactionList/>
        </div>
       
       
    </div>
  )
}
