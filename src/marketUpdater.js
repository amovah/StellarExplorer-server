import unirest from 'unirest';
import Market from 'Root/models/Market';

export function mapSourceToModel(source) {
  return {
    price_usd: source.price_usd,
    volume_usd_24h: source['24h_volume_usd'],
    market_cap_usd: source.market_cap_usd,
    percent_change_24h: source.percent_change_24h,
  };
}

export async function getMarket() {
  const res = await unirest
    .get('https://api.coinmarketcap.com/v1/ticker/stellar/?convert=USD');

  return res.body[0];
}

export function updater() {
  setInterval(async () => {
    try {
      const res = await unirest
        .get('https://api.coinmarketcap.com/v1/ticker/stellar/?convert=USD');

      const newData = mapSourceToModel(res.body[0]);
      const market = await Market.findOne();

      if (!market) {
        const newMarket = new Market(mapSourceToModel(res.body[0]));
        await newMarket.save();
        return;
      }

      for (const [key, value] of Object.entries(newData)) {
        market[key] = value;
      }

      await market.save();
    } catch (e) {
      console.log(e);
    }
  }, 5 * 60 * 1000);
}
