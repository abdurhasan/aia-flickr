import { Environtment, HttpClient } from '../helpers'

export class AppService {
    private dataStore;
    private flickerBaseUrl: string;
    constructor() {
        this.flickerBaseUrl = Environtment.get('FLICKER_BASE_URL')
    }

    async getFlickerFeed() {

    }

    getData() {
        return this.dataStore;
    }
}