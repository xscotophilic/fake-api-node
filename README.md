# Fake API Node

This is a simple Node.js and Express-based fake API for managing items. It allows CRUD operations on items stored in a local JSON file.

## Features

- Create an item
- Retrieve all items
- Retrieve an item by ID
- Update an item by ID
- Delete an item by ID
- Create 10 dummy items


## Requirements

- Node.js v23.10.0 or later
- npm (comes with Node.js)

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
  "description": "This is a manually created item."
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
  "description": "This item has been updated."
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

## File Structure
```
/
├── data/
│   ├── data.json  # Stores item data
├── routes/
│   ├── items.js   # API routes for item management
├── server.js      # Main server file
├── package.json   # Dependencies and scripts
└── README.md      # API documentation
```

## License

This project is open-source and free to use.

