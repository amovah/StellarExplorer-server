import express from 'express';
import routers from './routers';

const app = express();

app.use(routers);

app.listen(process.env.APP_PORT || 8080, () => {
  console.log(`Server is listening on port ${process.env.NODE_PORT || 8080}`);
});
