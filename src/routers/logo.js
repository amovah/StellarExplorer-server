import { Router } from 'express';
import unirest from 'unirest';
import Logo from 'Root/models/Logo';
import toml from 'toml';

const router = new Router();

async function getIconURL(asset) {
  const splitted = asset.split('-');
  try {
    const accountDetail = await unirest
      .get(`https://horizon.stellar.org/accounts/${splitted[1]}`);

    if (accountDetail.body.status === 400) {
      return 404;
    }

    const assetDetail = await unirest
      .get(`http://${accountDetail.body.home_domain}/.well-known/stellar.toml`);

    return toml.parse(assetDetail.body).CURRENCIES.find((i) => i.code === splitted[0]).image;
  } catch (e) {
    console.log('error', e);
    return 500;
  }
}

router.get('/logo/:assetid', async (req, res) => {
  const icon = await Logo.findOne({
    assetid: req.params.assetid,
  });

  if (!icon) {
    const iconURL = await getIconURL(req.params.assetid);

    if (iconURL === 404) {
      res.status(404);
      res.json({
        status: 404,
        error: 'asset not found',
      });
      return;
    }

    if (iconURL === 500) {
      res.status(500);
      res.json({
        status: 500,
        error: 'Internal Error, try again later!',
      });
    }

    const newIcon = new Logo({
      assetid: req.params.assetid,
      url: iconURL,
    });
    newIcon.save();
    res.json(newIcon);
    return;
  }

  res.json(icon);
});

export default router;
