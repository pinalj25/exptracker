import React, { useState,useEffect } from "react";
import "./Adt.css";

export default function AddTransaction({ addTransaction, isVisible, onClose , editTransaction, transactionToEdit }) {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [transactionType, setTransactionType] = useState("Income");
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  
  useEffect(() => {
    // Update form fields when transactionToEdit changes
    if (transactionToEdit) {
      setDate(transactionToEdit.date);
      setCategory(transactionToEdit.category);
      setTransactionType(transactionToEdit.transactionType);
      setAmount(transactionToEdit.amount.toString());
      setDetails(transactionToEdit.details);
    }
  }, [transactionToEdit]);

  const handleAddTransaction = () => {
    // Validate input fields
    if (!date || !category || !amount || isNaN(parseFloat(amount) || details)) {
      alert("Please fill in all fields with valid data.");
      return;
    }

    // Convert amount to a number
    const parsedAmount = parseFloat(amount);
    if (transactionToEdit) {
        // Handle editing the existing transaction
        editTransaction({
          index: transactionToEdit.index, // Include the index of the transaction being edited
          data: { date, category, transactionType, amount: parsedAmount, details },
        });
      } else {
        // Handle adding a new transaction
        addTransaction({ date, category, transactionType, amount: parsedAmount, details });
      }
    

    // Reset form fields
    setDate("");
    setCategory("");
    setTransactionType("Income");
    setAmount("");
    setDetails("");

    // Close the modal
    onClose();
  };

  const handleClose = () => {
    // Close the modal
    onClose();
  };

  return isVisible ? (
    <div className="modal">
      <div className="hide">
         <h2>{transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}</h2>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>Transaction Type:</label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Details:</label>
          <input
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <button onClick={() => handleAddTransaction()}>
  {transactionToEdit ? 'Save Changes' : 'Add Transaction'}
</button>
        
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  ) : null;
}
