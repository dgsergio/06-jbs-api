const express = require('express');
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/auth');
const jobsRoutes = require('./routes/jobs');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const connectDB = require('./db/connect');

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', jobsRoutes);
app.use(notFound);
app.use(errorHandler);

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
