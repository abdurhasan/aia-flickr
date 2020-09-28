import "reflect-metadata";
import { ControllersLoader } from 'simple-ts-express-decorators';
import { AppController } from "./controllers/app.controller";


const AppModule = new ControllersLoader({
    controllers: [AppController]
})


export default AppModule;