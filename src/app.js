import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';
import routers from './routers';

mongoose.connect(
  `${process.env.DB_URL || `mongodb://localhost/${process.env.DB_NAME}`}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
);
mongoose.connection.on('error', (error) => {
  console.error(`Database connection error ${error}`);

  process.exit(0);
});

mongoose.connection.on('disconnected', () => {
  console.error('Disconnected from database');

  process.exit(0);
});

const app = express();

app.use(routers);

app.listen(process.env.APP_PORT || 8080, () => {
  console.log(`Server is listening on port ${process.env.NODE_PORT || 8080}`);
});
