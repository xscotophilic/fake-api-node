const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const express = require('express');

const router = express.Router();

const dataFilePath = path.join(__dirname, '../data/data.json');

const readData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    
    if (!data) {
      return [];
    }
    
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data from file:', error);
    return [];
  }
};

const getFileSize = (filePath) => {
  const stats = fs.statSync(filePath);
  return stats.size;
};

const writeData = (data) => {
  try {
    const fileSize = getFileSize(dataFilePath);

    if (fileSize > 500 * 1024) {
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
  if (!item.name || !item.description) {
    throw new Error('Missing required fields: name and description');
  }
};

const generateUuid = () => uuidv4();

router.post('/dummy', (req, res) => {
  try {
    const data = readData();
    
    for (let i = 0; i < 10; i++) {
      const dummyItem = {
        id: generateUuid(),
        name: `Sample Item ${i + 1}`,
        description: `This is dummy item ${i + 1}`,
        createdAt: new Date().toISOString(),
      };

      validateItem(dummyItem);
      data.push(dummyItem);
    }
    
    writeData(data);
    res.status(201).json({ message: '10 dummy items created successfully', items: data.slice(-10) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const newItem = req.body;
    validateItem(newItem);

    const data = readData();
    newItem.id = generateUuid();
    data.push(newItem);

    writeData(data);

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', (req, res) => {
  const data = readData();
  res.json(data);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const data = readData();
  const item = data.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.json(item);
});

router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = req.body;
    validateItem(updatedItem);

    const data = readData();
    const index = data.findIndex(i => i.id === id);

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
  const { id } = req.params;
  const data = readData();
  const index = data.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }

  const deletedItem = data.splice(index, 1);

  writeData(data);

  res.json(deletedItem);
});

module.exports = router;
