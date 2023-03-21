import express from 'express';
import 'express-async-errors';
import 'dotenv/config';

import { setCors } from './config/cors.config';

const app = express();

setCors(app);

app.use(express.json());

export { app };
