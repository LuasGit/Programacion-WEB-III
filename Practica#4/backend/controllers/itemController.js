const itemModel = require('../models/itemModel');
const { v4: uuidv4 } = require('uuid');

exports.getAllItems = (req, res) => {
  res.json(itemModel.findAll());
};

exports.getItemById = (req, res) => {
  const item = itemModel.findById(req.params.id);
  if (item) res.json(item);
  else res.status(404).send('Item not found');
};

exports.createItem = (req, res) => {
  const newItem = { id: uuidv4(), ...req.body };
  itemModel.create(newItem);
  res.status(201).json(newItem);
};

exports.updateItem = (req, res) => {
  const id = req.params.id;
  const updatedItem = { id, ...req.body };
  itemModel.update(id, updatedItem);
  res.json(updatedItem);
};

exports.deleteItem = (req, res) => {
  itemModel.delete(req.params.id);
  res.status(204).send();
};