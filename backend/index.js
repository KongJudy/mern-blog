const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// ROUTERS
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

const { PORT, MONGO_URL, CLIENT_URL } = require('./config');

const app = express();

// MONGO DATABASE
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// LISTEN SERVER
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// CONNECT TO FRONTEND
app.use(
  cors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('./uploads'));

// ROUTES
app.use('/auth', authRouter);
app.use('/post', postRouter);
