import AppModule from './app';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import Log from 'node-pretty-log';
import { Environtment as Env } from './helpers';

async function bootstrap() {
  const app = await AppModule
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(helmet())
  app.use(cors())
  await app.listen(Env.getInt('APP_PORT'));
  Log('info', `server is running .. http://localhost:${Env.getInt('APP_PORT')}`)
}


bootstrap()

// const express = require("express");
// const helmet = require("helmet");

// const app = express();

// app.use(helmet());