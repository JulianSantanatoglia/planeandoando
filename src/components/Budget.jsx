import React, { useState } from 'react';

const Budget = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: '', amount: 0 });

  const handleChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const addExpense = () => {
    if (!newExpense.name || newExpense.amount <= 0) {
      alert('¡Revisa el nombre y el monto!');
      return;
    }
    setExpenses([...expenses, { name: newExpense.name, amount: parseInt(newExpense.amount) }]);
    setNewExpense({ name: '', amount: 0 });
  };

  const remainingBudget = budget - expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-2xl shadow-2xl text-white">
      <h2 className="text-2xl font-semibold mb-4">¡Mi Presupuesto Viajero!</h2>

      <div className="space-y-2 mb-4">
        <input
          type="number"
          name="budget"
          value={budget}
          onChange={(e) => setBudget(parseInt(e.target.value))}
          placeholder="Presupuesto Total"
          className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
        />
        <input
          type="text"
          name="name"
          value={newExpense.name}
          onChange={handleChange}
          placeholder="Nombre del Gasto"
          className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
        />
        <input
          type="number"
          name="amount"
          value={newExpense.amount}
          onChange={handleChange}
          placeholder="Monto del Gasto"
          className="w-full p-2 rounded-md bg-gray-800 border border-gray-700"
        />
      </div>

      <button
        onClick={addExpense}
        className="w-full py-2 px-4 bg-blue-500 rounded-md hover:bg-blue-600"
      >
        ¡Sumar Gasto!
      </button>

      <ul className="mt-4 space-y-2">
        {expenses.map((expense, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 rounded-md bg-gray-800"
          >
            <span>{expense.name}</span>
            <span>${expense.amount}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-xl font-semibold">
        Presupuesto Restante: ${remainingBudget}
      </div>
    </div>
  );
};

export default Budget;