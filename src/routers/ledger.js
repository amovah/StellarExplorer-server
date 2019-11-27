import { Router } from 'express';
import Ledger from 'Root/models/Ledger';
import unirest from 'unirest';

const router = new Router();

async function getLedger() {
  const res = await unirest
    .get('https://api.stellar.expert/explorer/public/ledger/ledger-stats');

  return res.body.slice(-5);
}

router.get('/ledger', async (req, res) => {
  const ledgers = await Ledger.find();

  if (!ledgers[0]) {
    const incomingLedgers = await getLedger();
    const actions = [];
    const result = [];

    for (const item of incomingLedgers) {
      const newLedger = new Ledger(item);
      result.push(newLedger);
      actions.push(newLedger.save());
    }

    await Promise.all(actions);

    res.json(result);
  }
});

export default router;
