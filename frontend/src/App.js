import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/expenses')
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addExpense = (expense) => {
    axios.post('http://localhost:3000/expenses', expense)
      .then((response) => setExpenses([...expenses, response.data]))
      .catch((error) => console.error(error));
  };

  const deleteExpense = (id) => {
    axios.delete(`http://localhost:3000/expenses/${id}`)
      .then(() => setExpenses(expenses.filter((e) => e._id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <AddExpense addExpense={addExpense} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} deleteExpense={deleteExpense} />
    </div>
  );
};

export default App;