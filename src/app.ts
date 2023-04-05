import express from 'express';
import 'express-async-errors';
import 'dotenv/config';

import { APIError } from './errors/APIError';
import { errorHandler } from './middlewares/error-handler';
import { ChatGptTranspilerService } from './services/impl/chat-gpt.-transpiler.service';
import { isValidTranspilationType } from './types/Transpilations';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Max-Age', '10');

  next();
});


const transpilerService = new ChatGptTranspilerService();

app.post('/v1/transpile', async (req, res) => {
  const { json, transpilation_type } = req.body;

  try {
    JSON.parse(json);
  } catch (err: Error | any) {
    throw new APIError('O JSON é inválido.', 400);
  }

  if(transpilation_type) {
    if(!isValidTranspilationType(transpilation_type)) {
      throw new APIError('Tipo de transpilação inválido. Por favor, selecione alguma opção existente.', 400);
    }
  }

  const message = await transpilerService.transpile(json, transpilation_type || 'typescript_interface');

  return res.json({ result: message });
});

app.use(errorHandler);

export { app };
