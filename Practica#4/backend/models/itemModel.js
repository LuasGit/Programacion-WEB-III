let items = [];

module.exports = {
  findAll: () => items,
  findById: (id) => items.find(item => item.id === id),
  create: (item) => {
    items.push(item);
  },
  update: (id, newItem) => {
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) items[index] = newItem;
  },
  delete: (id) => {
    items = items.filter(item => item.id !== id);
  }
};