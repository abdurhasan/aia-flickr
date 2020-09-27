import Axios from 'axios';
import * as https from 'https';
import { Environtment } from '../helpers/environment.helper'

let HttpClient = Axios.create();

if (Environtment.getBoolean('SSL_IGNORE')) {
    HttpClient = Axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    });
}
export { HttpClient };
