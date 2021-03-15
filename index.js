// temp user: 1218e1faabe32bb865209502f8017964
const express = require("express");

// creating app
const app = express();

// processing req
app.use(express.json());

// route handlers
app.use("/api", require("./routes/api"));

// port and listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));