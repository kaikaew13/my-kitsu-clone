const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');

const app = express();

app.use(express.json());

// add middleware for CORS

app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  const err = new Error('invalid url');
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.message);
  const message = err.message;
  res.status(err.statusCode).json({ message: message });
});

(async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://kaikaew_13:1J9ddERuWRi143ge@cluster0.r5crp.mongodb.net/kitsu?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    app.listen(6969);
  } catch (err) {
    console.log(err);
  }
})();
