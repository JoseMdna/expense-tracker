import React, { useEffect, useState } from 'react';
import { fetchExpenses, addExpense, deleteExpense, updateExpense } from './api';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses()
      .then(data => setExpenses(data))
      .catch(err => console.error(err));
  }, []);

  const handleAddExpense = (expense) => {
    addExpense(expense)
      .then(newExpense => setExpenses([...expenses, newExpense]))
      .catch(err => console.error(err));
  };

  const handleDeleteExpense = (id) => {
    deleteExpense(id)
      .then(() => setExpenses(expenses.filter(expense => expense._id !== id)))
      .catch(err => console.error(err));
  };

  const handleUpdateExpense = (id, updatedExpense) => {
    updateExpense(id, updatedExpense)
      .then(newExpense => {
        setExpenses(expenses.map(expense => expense._id === id ? newExpense : expense));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <AddExpense addExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} deleteExpense={handleDeleteExpense} updateExpense={handleUpdateExpense} />
    </div>
  );
}

export default App;