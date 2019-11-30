import { Router } from 'express';
import Market from 'Root/models/Market';
import {
  mapSourceToModel,
  getMarket,
} from 'Root/marketUpdater';

const router = new Router();

router.get('/market', async (req, res) => {
  const market = await Market.findOne();

  if (!market) {
    const newMarket = new Market(mapSourceToModel(await getMarket()));

    await newMarket.save();

    res.json(newMarket);
    return;
  }

  res.json(market);
});

export default router;
