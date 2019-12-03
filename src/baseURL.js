import { env } from 'process';

export const horizon = env.NODE_NAME === 'public'
  ? 'https://horizon.stellar.org'
  : 'https://horizon-testnet.stellar.org/';

export const api = env.NODE_NAME === 'public'
  ? 'https://api.stellar.expert/explorer/public'
  : 'https://api.stellar.expert/explorer/testnet';
