import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import { router } from './routes'

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.disable("x-powered-by");

app.use('/api/v1', router)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});