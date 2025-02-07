import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';

const App = () => {
  const [expenses, setExpenses] = useState([]);

  // Fetch all expenses
  useEffect(() => {
    axios.get('http://localhost:3000/expenses')
      .then((response) => setExpenses(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Add a new expense
  const addExpense = (expense) => {
    axios.post('http://localhost:3000/expenses', expense)
      .then((response) => setExpenses([...expenses, response.data]))
      .catch((error) => console.error(error));
  };

  // Delete an expense
  const deleteExpense = (id) => {
    axios.delete(`http://localhost:3000/expenses/${id}`)
      .then(() => setExpenses(expenses.filter((e) => e._id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <AddExpense addExpense={addExpense} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} deleteExpense={deleteExpense} />
    </div>
  );
};

export default App;