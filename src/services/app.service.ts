import { Environtment, HttpClient, parseJson } from '../helpers';
import { toJson as XMLToJson } from 'xml2json';
import { IFeedData } from '../interfaces'
export class AppService {
    public feedData: object;
    private flickerBaseUrl: string;
    constructor() {
        this.flickerBaseUrl = Environtment.get('FLICKER_BASE_URL');
        this.feedData = {};
    }

    async getFlickerFeed(pageKey: string) {
        if (this.feedData.hasOwnProperty(pageKey)) {
            return this.feedData[pageKey]
        } else {

            // 1. fetch data from flickr API
            const getApi = (await HttpClient.get(this.flickerBaseUrl))?.data;

            // 2. Processed Data
            const readyData = this.processFeedApi(getApi) || [];

            // 3. store data for pagination purposed    
            if (readyData.length > 0) {
                this.feedData[pageKey] = readyData;
            }

            return readyData;
        }
    }

    processFeedApi(dataStr: string): IFeedData[] {
        const parsedData = parseJson(XMLToJson(dataStr))?.feed?.entry || [];
        const defaultImage: string = 'https://coolbackgrounds.io/images/backgrounds/white/white-radial-gradient-a5802da1.jpg';
        const feedParsed: IFeedData[] = parsedData.map(snap => {
            const image: string = (snap?.link.filter(filt => filt.rel === 'rel'))?.href || defaultImage;
            return {
                id: snap?.id || `${Date.now()}`,
                author: snap?.author?.name || '',
                title: snap?.title,
                image
            }
        })

        return feedParsed

    }
}