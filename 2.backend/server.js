const express = require('express');
const fs = require('fs-extra');
const cors = require('cors');
const app = express();
const PORT = 5000;
const DATA_FILE = './backend/data.json';

app.use(cors());
app.use(express.json());

// Read data
app.get('/items', async (req, res) => {
  const data = await fs.readJSON(DATA_FILE).catch(() => []);
  res.json(data);
});

// Create new item
app.post('/items', async (req, res) => {
  const data = await fs.readJSON(DATA_FILE).catch(() => []);
  const newItem = { id: Date.now(), name: req.body.name };
  data.push(newItem);
  await fs.writeJSON(DATA_FILE, data);
  res.json(newItem);
});

// Update item
app.put('/items/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  let data = await fs.readJSON(DATA_FILE).catch(() => []);
  data = data.map(item =>
    item.id === id ? { ...item, name: req.body.name } : item
  );
  await fs.writeJSON(DATA_FILE, data);
  res.json({ message: 'Updated successfully' });
});

// Delete item
app.delete('/items/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  let data = await fs.readJSON(DATA_FILE).catch(() => []);
  data = data.filter(item => item.id !== id);
  await fs.writeJSON(DATA_FILE, data);
  res.json({ message: 'Deleted successfully' });
});

app.listen(PORT, () => console.log(✅ Server running on http://localhost:${PORT}));
