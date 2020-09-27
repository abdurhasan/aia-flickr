import "reflect-metadata";
import express from 'express';
import { ControllersLoader } from 'simple-ts-express-decorators';
import { AppController } from "./controllers/app.controller";


const AppModule = express();

new ControllersLoader({
    controllers: [AppController]
}).load(AppModule);

export default AppModule