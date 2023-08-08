const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// MIDDLEWARE
const cors = require('cors');
const cookieParser = require('cookie-parser');

// ROUTES
const authRouter = require('./routes/AuthRouter');
const postRouter = require('./routes/PostRouter');

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

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

app.use(cookieParser());
app.use(express.json());
app.use('/', authRouter);
app.use('/', postRouter);
app.use('/uploads', express.static('./uploads'));
