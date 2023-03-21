import express from 'express';
import 'express-async-errors';
import 'dotenv/config';

import { setCors } from './config/cors.config';

const app = express();

setCors(app);

app.use(express.json());

app.post('/v1/transpile', (req, res) => {

  return res.json({ ok: true });
});

export { app };
