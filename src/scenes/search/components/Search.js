import React, { Component } from 'react';
import Result from './Result';

export default class Search extends Component {

  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      serverError: false,
      hits: 0,
      results: [],
      searchParams: '',
      currentPage: 1
    };
  }

  /**
   * Perform the search
   */
  search() {

    window.scrollTo(0, 0);
    this.updateSearchState(0, [], false, true);

    let request = new XMLHttpRequest();

    const searchParams = this.state.searchParams.split(' ').map((item) => {
      return item.toLowerCase() === 'male' ? 545 : item.toLowerCase() === 'female' ? 546 : item;
    }).join(' ');

    request.open('POST', 'http://localhost:9200/offenders/_search');
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {

      if (request.status >= 200 && request.status < 400) {
        const response = JSON.parse(request.responseText);
        this.updateSearchState(response.hits.total, response.hits.hits, false, false);
      } else {
        this.updateSearchState(0, [], true, false);
      }

    }.bind(this);

    request.onerror = function () {
      this.updateSearchState(0, [], true, false);
    }.bind(this);

    request.send(JSON.stringify(this.buildSearchQuery(searchParams)));
  }

  /**
   *
   * @param searchParams
   * @returns {Object}
   */
  buildSearchQuery(searchParams) {

    const page = this.state.currentPage;

    return {
      from : page === 1 ? 0 : (page - 1) * 10,
      size : 10,
      query: {
        bool: {
          must: {
            match: {
              _all: {
                query: searchParams,
                fuzziness: 'AUTO',
                operator: 'and'
              }
            }
          },
          should: [
            {
              match: {
                CRN: {
                  query: searchParams,
                  boost: 5
                }
              }
            },
            {
              match: {
                SURNAME: {
                  query: searchParams,
                  boost: 3
                }
              }
            },
            {
              match: {
                POSTCODE: {
                  query: searchParams,
                  boost: 3
                }
              }
            },
            {
              match: {
                FIRST_NAME: {
                  query: searchParams,
                  boost: 2
                }
              }
            },
            {
              match: {
                TOWN_CITY: {
                  query: searchParams,
                  boost: 2
                }
              }
            }
          ]
        }
      }
    };
  }

  /**
   *
   * @param hits int
   * @param results Array
   * @param error boolean
   */
  updateSearchState(hits, results, error) {
    this.setState({
      hits: hits,
      results: results,
      serverError: error
    });
  }

  /**
   *
   * @param event
   */
  handleChange = (event) => {
    event.preventDefault();
    this.setState({ searchParams: event.target.value, currentPage: 1 }, this.search);
  };

  /**
   * Handle offender selection
   * @param event
   */
  handleClick = (event) => {
    event.preventDefault();
    const selected = this.state.results[event.target.parentElement.parentElement.id]['_source'];
    console.info('Selected:', selected);
  };

  /**
   *
   * @param event
   */
  previousPage = (event) => {
    event.preventDefault();

    if (this.state.currentPage > 1) {
      this.setState((prevState) => {
        return {
          currentPage: prevState.currentPage > 1 ? prevState.currentPage - 1 : prevState.currentPage
        };
      }, this.search);
    }
  };

  /**
   *
   * @param event
   */
  nextPage = (event) => {
    event.preventDefault();

    if (this.state.currentPage < Math.ceil(this.state.hits/10)) {
      this.setState((prevState) => {
        return {
          currentPage: prevState.currentPage < prevState.hits / 10 ? prevState.currentPage + 1 : prevState.currentPage
        };
      }, this.search);
    }
  };

  /**
   * Render DOM
   * @returns {XML}
   */
  render() {

    return (
      <div>

        <div className="govuk-box-highlight blue">

          <h1 className="heading-xlarge no-margin-top margin-bottom medium">National offender search</h1>

          <form className="padding-left-right">
            <label>
              <input className="form-control padded" placeholder="Find names, addresses, date of birth, CRN and more..." type="text" value={this.state.searchParams} onChange={this.handleChange}/>
            </label>
          </form>

        </div>

        <div className="padded">

          {this.state.searchParams.length > 0 &&
            <h2 className="heading-medium margin-top medium">{this.state.hits} results found</h2>
          }

          {this.state.serverError &&
            <p className="error-message">The server has encountered an error.</p>
          }

          {this.state.results.map((result, i) =>
            <div key={i}>
              <Result id={i} params={this.state.searchParams} data={result._source} click={this.handleClick} />
            </div>
          )}

          {this.state.hits > 10 &&
            <div>
              <a onClick={this.previousPage}>Previous</a> {this.state.currentPage + ' / ' + Math.ceil(this.state.hits/10)} &nbsp;
              <a onClick={this.nextPage}>Next</a>
            </div>
          }

        </div>

      </div>
    );
  }
}
