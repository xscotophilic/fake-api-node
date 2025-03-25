const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const express = require('express');

const router = express.Router();

const dataFilePath = path.join(__dirname, '../data/data.json');

const modelSchema = process.env.MODEL_SCHEMA
  ? JSON.parse(process.env.MODEL_SCHEMA)
  : {};

const readData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading data from file:', error);
    return [];
  }
};

const getFileSize = (filePath) => fs.statSync(filePath).size;

const writeData = (data) => {
  try {
    if (getFileSize(dataFilePath) > 500 * 1024) {
      console.log('Data file exceeds size limit. Emptying the file.');
      fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
      return;
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data to file:', error);
  }
};

const validateItem = (item) => {
  for (const [key, type] of Object.entries(modelSchema)) {
    if (!(key in item)) {
      throw new Error(`Missing required field: ${key}`);
    }
    if (typeof item[key] !== type) {
      throw new Error(`Invalid type for ${key}: expected ${type}`);
    }
  }
};

router.post('/dummy', (req, res) => {
  try {
    const data = readData();
    for (let i = 0; i < 10; i++) {
      const dummyItem = { id: uuidv4() };
      for (const [key, type] of Object.entries(modelSchema)) {
        dummyItem[key] =
          type === 'string'
            ? `Sample ${key} ${i + 1}`
            : type === 'number'
            ? i + 1
            : type === 'boolean'
            ? i % 2 === 0
            : null;
      }
      validateItem(dummyItem);
      data.push(dummyItem);
    }
    writeData(data);
    res.status(201).json({
      message: '10 dummy items created successfully',
      items: data.slice(-10),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const newItem = req.body;
    validateItem(newItem);
    newItem.id = uuidv4();
    const data = readData();
    data.push(newItem);
    writeData(data);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', (req, res) => res.json(readData()));

router.get('/:id', (req, res) => {
  const item = readData().find((i) => i.id === req.params.id);
  item ? res.json(item) : res.status(404).json({ message: 'Item not found' });
});

router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = req.body;
    validateItem(updatedItem);
    const data = readData();
    const index = data.findIndex((i) => i.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }
    updatedItem.id = id;
    data[index] = updatedItem;
    writeData(data);
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', (req, res) => {
  const data = readData();
  const index = data.findIndex((i) => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });
  const deletedItem = data.splice(index, 1);
  writeData(data);
  res.json(deletedItem);
});

module.exports = router;
