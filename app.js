const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const adminRouter = require('./routes/admin');

const app = express();

app.use(express.json());

// add middleware for CORS

app.use('/admin', adminRouter);

const dbConnect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://kaikaew_13:1J9ddERuWRi143ge@cluster0.r5crp.mongodb.net/kitsu?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    app.listen(6969);
  } catch (err) {
    console.log(err);
  }
};
dbConnect();
