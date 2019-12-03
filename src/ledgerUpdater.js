import unirest from 'unirest';
import Ledger from 'Root/models/Ledger';

const gap = 86400000;

export async function getLedger() {
  const res = await unirest
    .get('https://api.stellar.expert/explorer/public/ledger/ledger-stats');

  return res.body.slice(-5);
}

export async function updateDB() {
  const ledgers = await Ledger.find().sort({ ts: -1 });
  const incomingLedgers = await getLedger();
  const actions = [];

  if (ledgers.length) {
    await Ledger.remove({});
  }

  for (const item of incomingLedgers) {
    const newLedger = new Ledger(item);
    actions.push(newLedger.save());
  }

  await Promise.all(actions);
}

export async function updater() {
  const last = (await Ledger.find().sort({ ts: -1 }).limit(1))[0];

  if (!last) {
    await updateDB();
    updater();
    return;
  }

  if (last.ts * 1000 + gap < Date.now()) {
    await updateDB();
    const newLast = (await Ledger.find().sort({ ts: -1 }).limit(1))[0];

    setTimeout(updater, Date.now() - newLast.ts * 1000 + gap);

    return;
  }

  setTimeout(updater, last.ts * 1000 + gap - Date.now());
}
