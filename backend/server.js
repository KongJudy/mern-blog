const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { PORT, MONGO_URL } = process.env;

const app = express();

// MONGO DATABASE
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use(express.json());
