import { Controller, Get, Post } from 'simple-ts-express-decorators';
import { Request, Response } from 'express';
import { AppService } from '../services/app.service';
import { isProduction } from '../helpers'
import * as dotenv from 'dotenv';
import { IState } from '../interfaces'
dotenv.config();

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
        this.appService = new AppService()
    }

    @Get('/')
    index(req: Request, res: Response) {
        res.json({ version: '1.0.0' })
    }

    @Get('getFeed')
    async getFeed(req: Request, res: Response) {
        const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const pageNumber: number = Number(req?.query?.page) || 0;
        const pageKey: string = 'page-' + pageNumber;
        const getFeedData = await this.appService.getFlickerFeed(clientIp, pageKey);
        res.send(getFeedData);
    }

    @Get('searchTag')
    async searchTag(req: Request, res: Response) {
        const tags: string = req?.query?.tags ? `${req?.query?.tags}` : '';
        const searchByTags = await this.appService.searchTag(tags);
        res.send(searchByTags);
    }

    @Get('getStateData')
    async getStateData(req: Request, res: Response) {
        res.json(this.appService.getStateData())
    }

    @Post('setStateData')
    setState(req: Request, res: Response) {
        const updateState: IState = req.body;        
        this.appService.setStateData(updateState)        
        res.json(updateState)
    }

    @Get('getEnvironment')
    async getEnvironment(req: Request, res: Response) {
        if (isProduction) {
            res.status(403).json({ message: 'this service only for development' })
        } else {
            res.json(process.env)
        }

    }


}