const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data store
let expenses = [];
let nextId = 1;

// Routes
// GET all expenses
app.get('/expenses', (req, res) => {
  res.json(expenses);
});

// POST a new expense
app.post('/expenses', (req, res) => {
  const newExpense = {
    id: nextId++,
    description: req.body.description,
    amount: req.body.amount,
    date: req.body.date,
    category: req.body.category,
  };
  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

// PUT (update) an expense
app.put('/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const expenseIndex = expenses.findIndex((e) => e.id === id);
  if (expenseIndex === -1) {
    return res.status(404).json({ error: 'Expense not found' });
  }
  expenses[expenseIndex] = { ...expenses[expenseIndex], ...req.body };
  res.json(expenses[expenseIndex]);
});

// DELETE an expense
app.delete('/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  expenses = expenses.filter((e) => e.id !== id);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});