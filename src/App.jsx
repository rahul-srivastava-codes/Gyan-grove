import React, { useState } from "react";
import "./App.css";
function App() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Laptop", category: "Electronics", quantity: 15 },
    { id: 2, name: "Notebook", category: "Stationery", quantity: 8 },
    { id: 3, name: "Desk Chair", category: "Furniture", quantity: 5 },
  ]);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: "",
  });
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const addItem = () => {
    if (newItem.name && newItem.category && newItem.quantity) {
      setInventory([
        ...inventory,
        {
          id: Date.now(),
          name: newItem.name,
          category: newItem.category,
          quantity: parseInt(newItem.quantity),
        },
      ]);
      setNewItem({ name: "", category: "", quantity: "" });
    }
  };

  const editItem = (id, updatedItem) => {
    setInventory(
      inventory.map((item) => (item.id === id ? updatedItem : item))
    );
  };

  const deleteItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const filteredInventory = filterCategory
    ? inventory.filter((item) =>
        item.category.toLowerCase().includes(filterCategory.toLowerCase())
      )
    : inventory;

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    return sortOrder === "asc"
      ? a.quantity - b.quantity
      : b.quantity - a.quantity;
  });

  return (
    <div className="app-container">
      <h1 className="heading">Inventory Management</h1>
      <div>
        <div className="controls">
          <input
            type="text"
            placeholder="Item Name"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={newItem.category}
            onChange={handleInputChange}
          />
          <input
            type="number"
            placeholder="Quantity"
            name="quantity"
            value={newItem.quantity}
            onChange={handleInputChange}
          />
          <button id="button" onClick={addItem}>
            Add Item
          </button>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Filter by Category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />
          <button
            id="button"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            Sort by Quantity ({sortOrder})
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedInventory.map((item) => (
              <tr
                key={item.id}
                className={item.quantity < 10 ? "low-stock" : ""}
              >
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>
                  <div className="button">
                    <button
                      id="edit"
                      onClick={() =>
                        editItem(item.id, {
                          ...item,
                          name: prompt("Edit Name:", item.name) || item.name,
                          category:
                            prompt("Edit Category:", item.category) ||
                            item.category,
                          quantity:
                            parseInt(prompt("Edit Quantity:", item.quantity)) ||
                            item.quantity,
                        })
                      }
                    >
                      Edit
                    </button>
                    <button id="delete" onClick={() => deleteItem(item.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
