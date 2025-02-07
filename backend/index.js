const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS to allow requests from your frontend
app.use(cors({
  origin: ['http://localhost:5173', 'https://expense-tracker-0b9406567e39.herokuapp.com'], // Allow requests from these origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  date: String,
  category: String,
});

const Expense = mongoose.model('Expense', expenseSchema);

app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/expenses', async (req, res) => {
  const newExpense = new Expense({
    description: req.body.description,
    amount: req.body.amount,
    date: req.body.date,
    category: req.body.category,
  });

  try {
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/expenses/:id', async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/expenses/:id', async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});