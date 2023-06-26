import express, { Application, Request, Response } from 'express';
const app: Application = express();
import dotenv from 'dotenv';
dotenv.config();
import helmet from 'helmet';
import cors from 'cors';



// ***Host Api Server***
const port: string | undefined=process.env.API_PORT;
export default app.listen(port, () => console.info('\x1b[32m','API host listening','\x1b[0m',`(on port ${port})...`,'\x1b[0m'))
.on('error', (err: Error) => console.error('\x1b[31m','Can not start the api host:','\x1b[0m',err));

// Config Api
app.use(express.json());

// Import Routes
import routes from './routes';
app.use('/', routes);

// Security
app.use(helmet());
app.use(cors());