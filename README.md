# Fake API Node

This is a simple Node.js and Express-based fake API for managing dynamically structured data. The API allows CRUD operations on items stored in a local JSON file, with the structure defined via environment variables.

## Features

- **Dynamic Model Schema**: Define custom data structures via the `.env` file.  
- **CRUD Operations**: Create, read, update, and delete items.  
- **Dummy Data Generation**: Automatically generate 10 dummy items based on the schema.  
- **Persistent Storage**: Data is stored in a JSON file (`data/data.json`).  

## Requirements

- **Node.js v23.10.0 or later**  
- **npm** (comes with Node.js)  

## Installation

1. Clone this repository:
   ```sh
   git clone https://github.com/xscotophilic/fake-api-node.git
   cd fake-api-node
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:  
   - Copy the sample `.env` file and modify it as needed:
     ```sh
     cp .env.sample .env
     ```
   - Define your data model inside `.env`. Example:
     ```
     MODEL_SCHEMA={"name":"string","price":"number","inStock":"boolean"}
     ```
   - This defines a schema where each item must have:
     - `name` (string)
     - `price` (number)
     - `inStock` (boolean)

## Usage

1. Start the server:
   ```sh
   node server.js
   ```
2. The API will run at: `http://localhost:3000`

## API Endpoints

### 1. Create a New Item
```sh
curl -X POST http://localhost:3000/api/items -H "Content-Type: application/json" -d '{
  "name": "Custom Item",
  "price": 19.99,
  "inStock": true
}'
```

### 2. Get All Items
```sh
curl -X GET http://localhost:3000/api/items
```

### 3. Get a Single Item by ID
```sh
curl -X GET http://localhost:3000/api/items/{item_id}
```
Replace `{item_id}` with an actual item ID.

### 4. Update an Item by ID
```sh
curl -X PUT http://localhost:3000/api/items/{item_id} -H "Content-Type: application/json" -d '{
  "name": "Updated Item",
  "price": 24.99,
  "inStock": false
}'
```
Replace `{item_id}` with an actual item ID.

### 5. Delete an Item by ID
```sh
curl -X DELETE http://localhost:3000/api/items/{item_id}
```
Replace `{item_id}` with an actual item ID.

### 6. Create 10 Dummy Items
```sh
curl -X POST http://localhost:3000/api/items/dummy
```
- The dummy items will be generated based on the schema defined in `.env`.

## File Structure
```
/
├── data/
│   ├── data.json   # Stores item data
├── routes/
│   ├── items.js    # API routes for item management
├── server.js       # Main server file
├── .env.sample     # Sample environment file for model schema
├── package.json    # Dependencies and scripts
└── README.md       # API documentation
```

## License

This project is open-source and free to use.
