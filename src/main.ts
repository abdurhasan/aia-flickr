
import helmet from 'helmet';
import Log from 'node-pretty-log';
import { ApplicationContext } from './app.context';
import cors from 'cors';
import AppModule from './app.module';
import morgan from 'morgan';
import { Environtment as Env } from './helpers';

async function bootstrap() {
  const app = await ApplicationContext();

  app.use(helmet())
  app.use(cors())
  app.use(morgan('dev'))

  await AppModule.load(app)
  await app.listen(Env.getInt('APP_PORT'));
  Log('info', `server is running .. http://localhost:${Env.getInt('APP_PORT')}`)
}


bootstrap()


