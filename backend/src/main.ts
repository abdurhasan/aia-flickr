
import helmet from 'helmet';
import Log from 'node-pretty-log';
import { ApplicationContext } from './app.context';
import cors from 'cors';
import AppModule from './app.module';
import morgan from 'morgan';
import { Environtment as Env } from './helpers';
import bodyParser from 'body-parser';
// import cluster from 'cluster';
// import { cpus } from 'os';
// const CPULength: number = cpus().length;



async function bootstrap() {

  const app = await ApplicationContext();

  app.use(helmet())
  app.use(bodyParser.json())
  app.use(cors())
  app.use(morgan('dev'))

  await AppModule.load(app)
  await app.listen(Env.getInt('APP_PORT'));
  Log('info', `server is running .. http://localhost:${Env.getInt('APP_PORT')} and PID : ${process.pid}`)
}


bootstrap()




// if (cluster.isMaster) {

  //   for (let i = 0; i < CPULength; i++) {
  //     cluster.fork();
  //   }

  //   cluster.on('exit', (worker) => {
  //     Log('error', `worker ${worker.process.pid} died`);
  //   });

  // } else {

  //   const app = await ApplicationContext();

  //   app.use(helmet())
  //   app.use(bodyParser.json())
  //   app.use(cors())
  //   app.use(morgan('dev'))

  //   await AppModule.load(app)
  //   await app.listen(Env.getInt('APP_PORT'));
  //   Log('info', `server is running .. http://localhost:${Env.getInt('APP_PORT')} and PID : ${process.pid}`)

  // }