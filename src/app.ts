import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import 'express-async-errors';
import 'dotenv/config';

import { setCors } from './config/cors.config';
import { env } from './config/env.config';

const app = express();

const configuration = new Configuration({
  apiKey: env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

setCors(app);

app.use(express.json());

app.post('/v1/transpile', async (req, res) => {
  const { json } = req.body;

  const result = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Convert JSON into TypeScript interfaces: ${json}. Don't send any explanations.`,
      },
    ],
  });

  const choices = result.data.choices;

  if(choices.length === 0) {
    return res.status(500).json({ errorFeedback: 'Não foi possível transpilar no momento, tente novamente mais tarde.' });
  }

  const { message } = choices[0];

  if(!message) {
    return res.status(500).json({ errorFeedback: 'Não foi possível transpilar no momento, tente novamente mais tarde.' });
  }

  return res.json({ result: message.content });
});

export { app };
