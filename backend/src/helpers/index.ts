
export const MS_TENMINUTE = 1000 * 10;
export function parseJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return null;
    }
    return JSON.parse(str);
}

export * from './environment.helper';
export * from './http.helper';