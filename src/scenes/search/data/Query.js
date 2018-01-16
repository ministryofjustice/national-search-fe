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
                'NI_NUMBER^6',
                'FIRST_NAME^10',
                'SECOND_NAME^4',
                'THIRD_NAME^4',
                'SURNAME^10',
                'PREVIOUS_SURNAME^6',
                'DATE_OF_BIRTH_DATE^5',
                'ALIASES.FIRST_NAME^6',
                'ALIASES.SURNAME^6',
                'ALIASES.DATE_OF_BIRTH_DATE^5',
                'ADDRESSES.POSTCODE^3',
                'ALIASES.SECOND_NAME^2',
                'ALIASES.THIRD_NAME^2'
              ]
            }
          },
          {
            multi_match: {
              query: searchParams,
              type: 'best_fields',
              operator: 'or',
              fields: [
                'ADDRESSES.STREET_NAME',
                'ADDRESSES.TOWN_CITY',
                'ADDRESSES.COUNTY',
                'E_MAIL_ADDRESS',
                'MOBILE_NUMBER'
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
