const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const websiteRouter = require('./routes/website');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'images'),
  filename: (req, file, cb) =>
    cb(null, new Date().toISOString() + '-' + file.originalname),
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  )
    cb(null, true);
  else cb(null, false);
};

const corsOptions = {
  origin: '*',
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

// add middleware for CORS

app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use(websiteRouter);

app.use((req, res, next) => {
  const err = new Error('invalid url');
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.message);
  const message = err.message;
  const data = err.data;
  res.status(err.statusCode).json({ message: message, data: data });
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
