import { Router } from 'express';

const router = new Router();

router.get('/market', (req, res) => {
  res.send('sample');
});

export default router;
