import express from 'express';

const app = express();

app.listen(process.env.APP_PORT || 8080, () => {
  console.log(`Server is listening on port ${process.env.NODE_PORT || 8080}`);
});
