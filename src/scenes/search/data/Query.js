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
                'FIRST_NAME^10',
                'SURNAME^10',
                'SECOND_NAME^4',
                'THIRD_NAME^4',
                'PREVIOUS_SURNAME^6',
                'ALIASES.FIRST_NAME^8',
                'ALIASES.SURNAME^8',
                'ALIASES.SECOND_NAME^3',
                'ALIASES.THIRD_NAME^3'
              ]
            }
          },
          {
            multi_match: {
              query: searchParams,
              type: 'most_fields',
              operator: 'or',
              fields: [
                'CRN^10',
                'NOMS_NUMBER^8',
                'NI_NUMBER^6',
                'DATE_OF_BIRTH_DATE^5',
                'ALIASES.DATE_OF_BIRTH_DATE^5',
                'ADDRESSES.STREET_NAME',
                'ADDRESSES.TOWN_CITY',
                'ADDRESSES.COUNTY',
                'ADDRESSES.POSTCODE^3',
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
      },
      secondName: {
        term: {
          field: 'SECOND_NAME'
        }
      },
      thirdName: {
        term: {
          field: 'THIRD_NAME'
        }
      },
      aliasFirstName: {
        term: {
          field: 'ALIASES.FIRST_NAME'
        }
      },
      aliasSurname: {
        term: {
          field: 'ALIASES.SURNAME'
        }
      },
      aliasSecondName: {
        term: {
          field: 'ALIASES.SECOND_NAME'
        }
      },
      aliasThirdName: {
        term: {
          field: 'ALIASES.THIRD_NAME'
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
