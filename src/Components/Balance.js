
import React, { useState, useEffect } from 'react';

import AddTransaction from './AddTransaction';
import TranscationList from './TranscationList';
import IncomeExpense from './IncomeExpense';

export default function Balance() {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(5000); // Initial budget set to 5000
  const [totalAmount, setTotalAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  useEffect(() => {
    // Update balance on initial render and whenever income, expense, or transactions change
    const newBalance = 5000 + income - expense;
    setBalance(newBalance);

    // Calculate the total amount based on the updated income and expense
    const updatedTotalAmount = income - expense;
    setTotalAmount(updatedTotalAmount);
  }, [income, expense, transactions]);

  const updateIncome = (amount) => {
    setIncome((prevIncome) => prevIncome + amount);
  };

  const updateExpense = (amount) => {
    setExpense((prevExpense) => prevExpense + amount);
  };

  const addTransaction = (transactionData) => {
    console.log('Adding transaction:', transactionData);

    // Update the transactions state
    setTransactions((prevTransactions) => [...prevTransactions, transactionData]);

    // Update income and expense based on transaction type
    if (transactionData.transactionType === 'Income') {
      updateIncome(transactionData.amount);
    } else if (transactionData.transactionType === 'Expense') {
      updateExpense(transactionData.amount);
    }

    // Close the modal after handling the transaction
    setShowAddTransaction(false);
  };

  const deleteTransaction = (index) => {
    const deletedTransaction = transactions[index];

    // Update income and expense based on the deleted transaction type
    if (deletedTransaction.transactionType === 'Income') {
      updateIncome(-deletedTransaction.amount);
    } else if (deletedTransaction.transactionType === 'Expense') {
      updateExpense(-deletedTransaction.amount);
    }

    // Update the transactions state
    setTransactions((prevTransactions) =>
      prevTransactions.filter((_, i) => i !== index)
    );
  };

  const editTransaction = (data) => {
    const oldTransaction = transactions[data.index];

    // Update income and expense based on the old transaction type
    if (oldTransaction.transactionType === 'Income') {
      updateIncome(-oldTransaction.amount);
    } else if (oldTransaction.transactionType === 'Expense') {
      updateExpense(-oldTransaction.amount);
    }

    // Update the transactions state
    setTransactions((prevTransactions) => {
      const updatedTransactions = [...prevTransactions];
      updatedTransactions[data.index] = data.data;
      return updatedTransactions;
    });

    // Update income and expense based on the edited transaction type
    if (data.data.transactionType === 'Income') {
      updateIncome(data.data.amount);
    } else if (data.data.transactionType === 'Expense') {
      updateExpense(data.data.amount);
    }
  };

  return (
    <>
      <div className='balance'>
        <div className='card1'>
          <h4>Your Balance</h4>
          <h1 id='balance'>₹{balance.toLocaleString()}</h1>
          <p>Total Amount Added: ₹{totalAmount.toLocaleString()}</p>
        </div>
        <div className='card2'>
          <button className='btn' onClick={() => setShowAddTransaction(true)}>
            Add
          </button>
        </div>
      </div>

      <IncomeExpense
        transactions={transactions}
        updateIncome={updateIncome}
        updateExpense={updateExpense}
      />

      <TranscationList
        transactions={transactions}
        onDelete={deleteTransaction}
        onEdit={(index) => {
          setTransactionToEdit({ ...transactions[index], index });
          setShowAddTransaction(true);
        }}
      />

      {showAddTransaction && (
        <AddTransaction
          isVisible={showAddTransaction}
          onClose={() => {
            setShowAddTransaction(false);
            setTransactionToEdit(null);
          }}
          addTransaction={addTransaction}
          editTransaction={editTransaction}
          transactionToEdit={transactionToEdit}
        />
      )}
    </>
  );
}
