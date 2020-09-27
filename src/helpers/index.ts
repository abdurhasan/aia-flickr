
function createPagination(req: Request) {

}

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