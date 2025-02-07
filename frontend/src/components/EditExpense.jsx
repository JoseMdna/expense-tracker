import React, { useState } from 'react';
import axios from 'axios';

const EditExpense = ({ expense, onUpdate }) => {
  const [description, setDescription] = useState(expense.description);
  const [amount, setAmount] = useState(expense.amount);
  const [date, setDate] = useState(expense.date);
  const [category, setCategory] = useState(expense.category);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedExpense = { description, amount, date, category };
    axios.put(`http://localhost:3000/expenses/${expense._id}`, updatedExpense)
      .then((response) => onUpdate(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <button type="submit">Update Expense</button>
    </form>
  );
};

export default EditExpense;