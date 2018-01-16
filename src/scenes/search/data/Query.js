// @flow
const Query = (
  searchParams: string,
  page: number,
  pageSize?: number = 10,
  options?: Object
) => {
  const searchQuery = {
    _source: {},
    from: page === 1 ? 0 : (page - 1) * pageSize,
    size: pageSize,
    query: {
      bool: {
        should: [
          {
            multi_match: {
              query: searchParams,
              type: 'cross_fields',
              operator: 'and',
              fields: [
                'CRN^10',
                'NOMS_NUMBER^8',
                'NI_NUMBER',
                'FIRST_NAME^10',
                'SURNAME^10',
                'SECOND_NAME^4',
                'THIRD_NAME^4',
                'PREVIOUS_SURNAME^6',
                'ALIASES.FIRST_NAME^6',
                'ALIASES.SURNAME^6',
                'DATE_OF_BIRTH_DATE^5',
                'ALIASES.SECOND_NAME^3',
                'ALIASES.THIRD_NAME^3',
                'ADDRESSES.TOWN_CITY',
                'ADDRESSES.POSTCODE^3'
              ]
            }
          }
        ]
      }
    },
    suggest: {
      text: searchParams,
      firstName: {
        term: {
          field: 'FIRST_NAME'
        }
      },
      surname: {
        term: {
          field: 'SURNAME'
        }
      }
    }
  };

  if (options && options.hasOwnProperty('excludes')) {
    searchQuery._source = {
      excludes: options.excludes
    };
  }

  return JSON.stringify(searchQuery);
};

export default Query;
