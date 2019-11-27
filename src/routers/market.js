import { Router } from 'express';
import Market from 'Root/models/Market';
import unirest from 'unirest';

const router = new Router();

async function retrieveMarket() {
  const res = await unirest
    .get('https://api.coinmarketcap.com/v1/ticker/stellar/?convert=USD');

  return res.body[0];
}

function mapSourceToModel(source) {
  return {
    price_usd: source.price_usd,
    volume_usd_24h: source['24h_volume_usd'],
    market_cap_usd: source.market_cap_usd,
    percent_change_24h: source.percent_change_24h,
  };
}

router.get('/market', async (req, res) => {
  const market = await Market.findOne();

  if (!market) {
    const newMarket = new Market(mapSourceToModel(await retrieveMarket()));

    await newMarket.save();

    res.json(newMarket);
    return;
  }

  res.json(market);
});

export default router;
