import Query from './Query';

describe('Query', () => {

    let query = Query('Some search parameters', 1),
        parsedQuery = JSON.parse(query);

    it('should return a string', () => {
        expect(typeof query).toEqual('string');
    });

    it('should return a JSON based search query which can be parsed', () => {
        expect(parsedQuery.from).toEqual(0);
    });

    it('should query paginated results based on current page', () => {

        query = Query('Some search parameters', 10);
        parsedQuery = JSON.parse(query);

        expect(parsedQuery.from).toEqual(90);
    });

});
