import { Controller, Get } from 'simple-ts-express-decorators';
import { Request, Response } from 'express';
import { AppService } from '../services/app.service'

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
        const pageNumber: number = Number(req?.query?.page) || 0;
        const pageKey: string = 'page-' + pageNumber;
        const getFeedData = await this.appService.getFlickerFeed(pageKey);
        res.send(getFeedData);
    }

    @Get('searchTag')
    async searchTag(req: Request, res: Response) {
        const tags: string = req?.query?.tags ? `${req?.query?.tags}` : '';
        const searchByTags = await this.appService.searchTag(tags);
        res.send(searchByTags);
    }

}