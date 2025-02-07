
const API_BASE = process.env.REACT_APP_API_URL.replace(/\/+$/, '');

export async function fetchExpenses() {
  try {
    const response = await fetch(`${API_BASE}/expenses`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
}

export async function addExpense(expense) {
  try {
    const response = await fetch(`${API_BASE}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error;
  }
}

export async function deleteExpense(id) {
  try {
    const response = await fetch(`${API_BASE}/expenses/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
}

export async function updateExpense(id, expense) {
  try {
    const response = await fetch(`${API_BASE}/expenses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating expense:", error);
    throw error;
  }
}