const API_URL = 'http://localhost:5000/items';
const itemList = document.getElementById('itemList');
const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');

// Fetch and display all items
async function loadItems() {
  const res = await fetch(API_URL);
  const items = await res.json();
  itemList.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name}</span>
      <div>
        <button onclick="editItem(${item.id}, '${item.name}')">Edit</button>
        <button onclick="deleteItem(${item.id})">Delete</button>
      </div>
    `;
    itemList.appendChild(li);
  });
}

// Add item
addBtn.onclick = async () => {
  const name = itemInput.value.trim();
  if (!name) return alert('Enter item name');
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  itemInput.value = '';
  loadItems();
};

// Edit item
async function editItem(id, oldName) {
  const newName = prompt('Edit item name:', oldName);
  if (!newName) return;
  await fetch(${API_URL}/${id}, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName }),
  });
  loadItems();
}

// Delete item
async function deleteItem(id) {
  await fetch(${API_URL}/${id}, { method: 'DELETE' });
  loadItems();
}

loadItems();
