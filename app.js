const express = require('express');
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');
const authorization = require('./middleware/authorization');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', authorization, jobsRoutes);
app.use(notFound);
app.use(errorHandler);
app.use(helmet());
app.use(cors());
app.use(xss());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

const port = process.env.PORT || 3000;

const start = () => {
  try {
    app.listen(port, async () => {
      await connectDB(process.env.MONGO_URI);
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
