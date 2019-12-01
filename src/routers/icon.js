import { Router } from 'express';

const router = new Router();

router.get('/icon/:assetid', (req, res) => {
  res.send(req.params.assetid);
});

export default router;
