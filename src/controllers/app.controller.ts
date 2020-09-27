import { Controller, Get } from 'simple-ts-express-decorators';
import { Request, Response } from 'express';
import { AppService } from '../services/app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
        this.appService = new AppService()
    }

    @Get('/')
    async index(request: Request, response: Response) {
        const dor = await this.appService.getFlickerFeed()
        console.log(dor)
        response.json(
            { dor: true }
        )
    }
}