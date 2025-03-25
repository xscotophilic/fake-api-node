require('dotenv').config();
const express = require('express');

const itemsRoutes = require('./routes/items');

const PORT = 3000;
const app = express();

app.use(express.json());

app.use('/api/items', itemsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});