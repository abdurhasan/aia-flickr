import { Environtment as env } from './environment.helper';

export const isProduction: boolean = env.get('APP_MODE') === 'production';
export function parseJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return null;
    }
    return JSON.parse(str);
}

// export const unblockEventLoop = async () => new Promise(resolve => setImmediate(resolve));

// let resetTimeId: number = null;
// export function getResetTimeId(): number {
//     console.log('calleddd.... ' ,resetTimeId)
//     return resetTimeId
// }

// export function setResetTimeId(newTimeId: number): void {
//     resetTimeId = newTimeId;
// }


export * from './environment.helper';
export * from './http.helper';


