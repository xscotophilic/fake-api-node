const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require('path');

let filepath = path.join(__dirname, '../data/data.json');

router.post("/sampledata", async (req, res) => {
  try {
    const { id, userdata } = req.body;
    let writingdata = {
      id,
      userdata
    };
    let data = JSON.stringify(writingdata);
    fs.writeFileSync(filepath, data);
    
    return res.status(200).send("OK");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error.");
  }
});

router.get("/sampledata", async (req, res) => {
  try {
    let rawdata = fs.readFileSync(filepath);
    let data = JSON.parse(rawdata);
    return res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
