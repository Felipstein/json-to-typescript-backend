import { Express } from 'express';
import cors from 'cors';

import { env } from './env.config';

export function setCors(app: Express) {

  const origin = env.ORIGIN;

  let corsConfig;

  if(origin) {
    corsConfig = cors({ origin });
  } else {
    corsConfig = cors();
    console.warn('⚠️ Origin not setted.');
  }

  app.use(corsConfig);
  console.log('💉 CORS injected.');
}
