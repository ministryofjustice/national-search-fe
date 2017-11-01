import React, { Component } from 'react';
import Result from './Result';

export default class Results extends Component {

  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      serverError: false,
      isSearching: true,
      hits: 0,
      results: [],
      searchParams: props.location.state.searchParams || ''
    };
  }

  /**
   * Init
   */
  componentDidMount() {
    this.search();
  }

  /**
   * Perform the search
   */
  search() {

    this.updateSearchState(0, [], false, true);

    const searchParams = this.state.searchParams,
      request = new XMLHttpRequest();

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
    return {
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
                crn: {
                  query: searchParams,
                  boost: 5
                }
              }
            },
            {
              match: {
                pncNumber: {
                  query: searchParams,
                  boost: 4
                }
              }
            },
            {
              match: {
                surname: {
                  query: searchParams,
                  boost: 3
                }
              }
            },
            {
              match: {
                firstName: {
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
   * @param searching boolean
   */
  updateSearchState(hits, results, error, searching) {
    this.setState({
      hits: hits,
      results: results,
      serverError: error,
      isSearching: searching
    });
  }

  /**
   *
   * @param event
   */
  handleChange = (event) => {
    event.preventDefault();
    this.setState({ searchParams: event.target.value });
  };

  /**
   * Handle offender selection
   * @param event
   */
  handleClick = (event) => {
    event.preventDefault();
    const selected = this.state.results[event.target.id]['_source'];
    console.info('Selected:', selected);
  };

  /**
   * Handle search parameters submission
   * @param event
   */
  handleSubmit = (event) => {
    event.preventDefault();
    this.search();
  };

  /**
   * Render DOM
   * @returns {XML}
   */
  render() {

    return (
      <div>
        <h1 className="heading-xlarge">Search results</h1>
        <div className="grid-row">
          <div className="column-one-third">
            <form onSubmit={this.handleSubmit}>
              <label>Search parameters
                <input className="form-control" type="text" value={this.state.searchParams} onChange={this.handleChange}/>
              </label>
            </form>
          </div>
          <div className="column-two-thirds">

            <h2 className="heading-medium no-margin top">{this.state.hits} results found</h2>

            <div className="margin-bottom">&nbsp;</div>

            {this.state.isSearching &&
              <p>Searching...</p>
            }

            {this.state.serverError &&
              <p className="error-message">The server has encountered an error.</p>
            }

            {this.state.results.map((result, i) =>
              <div key={i}>
                <Result id={i} data={result._source} click={this.handleClick} />
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }
}
