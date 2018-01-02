// @flow
const Query = (searchParams: string, page: number, options?: Object) => {
  const searchQuery = {
    _source: {},
    from: page === 1 ? 0 : (page - 1) * 10,
    size: 10,
    query: {
      bool: {
        must: {
          match: {
            _all: {
              query: searchParams,
              fuzziness: 1,
              operator: 'and'
            }
          }
        },
        should: [
          {
            match: {
              CRN: {
                query: searchParams,
                fuzziness: 0,
                boost: 10
              }
            }
          },
          {
            match: {
              SURNAME: {
                query: searchParams,
                fuzziness: 3,
                boost: 6
              }
            }
          },
          {
            match: {
              DATE_OF_BIRTH_DATE: {
                query: searchParams,
                fuzziness: 2,
                boost: 6
              }
            }
          },
          {
            match: {
              'ADDRESSES.POSTCODE': {
                query: searchParams,
                fuzziness: 0,
                boost: 3
              }
            }
          },
          {
            match: {
              FIRST_NAME: {
                query: searchParams,
                fuzziness: 3,
                boost: 5
              }
            }
          },
          {
            match: {
              PREVIOUS_SURNAME: {
                query: searchParams,
                fuzziness: 3,
                boost: 3
              }
            }
          },
          {
            match: {
              TOWN_CITY: {
                query: searchParams,
                fuzziness: 1,
                boost: 2
              }
            }
          },
          {
            match: {
              'ALIASES.FIRST_NAME': {
                query: searchParams,
                fuzziness: 3,
                boost: 3
              }
            }
          },
          {
            match: {
              'ALIASES.SURNAME': {
                query: searchParams,
                fuzziness: 3,
                boost: 4
              }
            }
          },
          {
            match: {
              'ADDRESSES.TOWN': {
                query: searchParams,
                boost: 2
              }
            }
          },
          {
            match: {
              'ADDRESSES.STREET_NAME': {
                query: searchParams,
                boost: 1
              }
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
