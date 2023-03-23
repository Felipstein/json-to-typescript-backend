import express from 'express';
import 'express-async-errors';
import 'dotenv/config';

import { APIError } from './errors/APIError';

import { setCors } from './config/cors.config';
import { ChatGptTranspilerService } from './services/impl/chat-gpt.-transpiler.service';

const app = express();

setCors(app);

app.use(express.json());

const transpilerService = new ChatGptTranspilerService();

app.post('/v1/transpile', async (req, res) => {
  const { json } = req.body;

  try {
    JSON.parse(json);
  } catch (err: Error | any) {
    throw new APIError('O JSON é inválido.', 400);
  }

  const message = await transpilerService.transpile(json);

  return res.json({ result: message });
});

export { app };
