import React, { useState } from 'react';
import EditExpense from './EditExpense';

const ExpenseList = ({ expenses = [], setExpenses, deleteExpense }) => {
  const [editingExpense, setEditingExpense] = useState(null);

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleUpdate = (updatedExpense) => {
    setEditingExpense(null);
    // Update the expense in the list
    const updatedExpenses = expenses.map((expense) =>
      expense._id === updatedExpense._id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
  };

  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense._id}>
          <p>{expense.description} - ${expense.amount} - {expense.date} - {expense.category}</p>
          <button onClick={() => handleEdit(expense)}>Edit</button>
          <button onClick={() => deleteExpense(expense._id)}>Delete</button>
          {editingExpense && editingExpense._id === expense._id && (
            <EditExpense expense={expense} onUpdate={handleUpdate} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;