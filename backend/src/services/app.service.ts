import { Environtment as Env, HttpClient, parseJson } from '../helpers';
import { toJson as XMLToJson } from 'xml2json';
import { IFeedData, IState } from '../interfaces'


export class AppService {
    public feedData: object;
    private flickerBaseUrl: string;    

    constructor() {
        this.flickerBaseUrl = Env.get('FLICKER_BASE_URL');
        this.feedData = new Object();
    }

    async getFlickerFeed(clientIp: any, pageKey: string): Promise<IFeedData[]> {

        if (this.feedData.hasOwnProperty(clientIp) && this.feedData[clientIp].hasOwnProperty(pageKey)) {
            return this.feedData[pageKey][clientIp]
        } else {

            // 1. fetch data from flickr API
            const getApi = (await HttpClient.get(this.flickerBaseUrl))?.data;

            // 2. Processed Data
            const readyData = this.processFeedApi(getApi) || [];

            // 3. store data for pagination purposed    
            if (readyData.length > 0) {
                this.feedData[clientIp] = new Object()
                this.feedData[clientIp][pageKey] = readyData
            }

            return readyData;
        }
    }

    processFeedApi(dataStr: string): IFeedData[] {
        const parsedData = parseJson(XMLToJson(dataStr))?.feed?.entry || [];
        const defaultImage: string = 'https://coolbackgrounds.io/images/backgrounds/white/white-radial-gradient-a5802da1.jpg';

        const feedParsed: IFeedData[] = parsedData.map(snap => {
            const image: string = (snap?.link.filter(snapFil => snapFil['rel'] === 'enclosure'))[0]?.href || defaultImage

            return {
                id: snap?.id || `${Date.now()}`,
                author: snap?.author?.name || '',
                title: snap?.title,
                image
            }
        })
        return feedParsed;
    }

    async searchTag(tags: string): Promise<IFeedData[]> {
        const tagUrl: string = this.flickerBaseUrl + '?tags=' + tags;
        const getApi = (await HttpClient.get(tagUrl))?.data;
        return this.processFeedApi(getApi)
    }

    getStateData(): IState {
        const {
            feedData,
            flickerBaseUrl
        } = this;

        return {
            feedData,
            flickerBaseUrl
        }

    }
    setStateData(updateState: IState): void {
        for (const key in updateState) {
            if (this.hasOwnProperty(key)) {
                this[key] = updateState[key]
            }
        }

    }

    // runResetState(resetTime: number): void {

    //     setInterval(function () {
    //         const repeatTime: number = this._repeat;
    //         Log('info', ` resetTime is running every ${repeatTime / 1000} second`)
    //         Log('info', ` resetTimeId == `, getResetTimeId())

    //         // console.log('repeatTime',repeatTime)
    //         // console.log(repeatTime)
    //         // if (Number(repeatTime) === this.resetTimeId) {
    //         //     this.feedData = {};
    //         // } else {
    //         //     clearInterval(this)
    //         // }
    //     }, resetTime)
    // }



}