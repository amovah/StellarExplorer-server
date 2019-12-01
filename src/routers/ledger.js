import { Router } from 'express';
import Ledger from 'Root/models/Ledger';

const router = new Router();

router.get('/ledger', async (req, res) => {
  const ledgers = await Ledger.find();

  res.json(ledgers);
});

export default router;
