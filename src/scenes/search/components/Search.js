// @flow
import React, { Component } from 'react';
import elasticsearch from 'elasticsearch';

import Query from '../data/Query';
import Suggestions from './Suggestions';
import Result from './Result';
import Pagination from './Pagination';

type Props = {
  location: any,
  history: Array<any>
};
type State = {
  searchParams: string,
  serverError: boolean,
  hits: number,
  results: any,
  suggestions: Array<any>,
  currentPage: number
};

export default class Search extends Component<Props, State> {
  pageSize: number = 10;

  esClient = new elasticsearch.Client({
    host:
      process.env.REACT_APP_HOST_ENV === 'dev'
        ? 'http://localhost:9200'
        : 'https://search-prototype-national-search-6-6yaixttsjlsfkufv4jyawt4asa.eu-west-2.es.amazonaws.com'
  });

  /**
   *
   * @param props
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      searchParams: '',
      serverError: false,
      hits: 0,
      results: [],
      suggestions: [],
      currentPage: 1
    };

    (this: any).handleChange = this.handleChange.bind(this);
    (this: any).handleClick = this.handleClick.bind(this);
    (this: any).handleContact = this.handleContact.bind(this);
    (this: any).handleSuggestion = this.handleSuggestion.bind(this);
    (this: any).changePage = this.changePage.bind(this);
  }

  /**
   *
   */
  componentDidMount() {
    function getParameterByName(name) {
      const regex = new RegExp(
          '[?&]' + name.replace(/[[]]/g, '\\$&') + '(=([^&#]*)|&|#|$)'
        ),
        results = regex.exec(window.location.href);
      return !results
        ? null
        : !results[2] ? '' : decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    const searched = getParameterByName('search'),
      page = parseInt(getParameterByName('page'), 10);

    if (searched && searched.length) {
      this.setState(
        {
          searchParams: searched,
          currentPage: page || 1
        },
        this.search
      );
    }
  }

  /**
   *
   * @param params
   */
  updateQuerystring(params: string) {
    this.props.history.push({
      pathname: '',
      search:
        '?search=' +
        encodeURIComponent(params) +
        (this.state.currentPage > 1 ? '&page=' + this.state.currentPage : '')
    });
  }

  /**
   * Perform the search
   */
  search() {
    window.scrollTo(0, 0);

    let trimmedParams = this.state.searchParams.trim();

    this.setState({ hits: -1 }); // Reset pagination
    this.updateQuerystring(trimmedParams);

    // Don't search under 2 chars
    if (trimmedParams.length < 2) {
      this.setState({ hits: 0, results: [], suggestions: [] });
      return;
    }

    this.esClient
      .search({
        index: 'offenders',
        body: Query(trimmedParams, this.state.currentPage, this.pageSize)
      })
      .then(
        response => {
          this.updateSearchState(response.hits.total, response, false);
        },
        () => {
          this.updateSearchState(0, void 0, true);
        }
      );
  }

  /**
   *
   * @param hits int
   * @param results Array
   * @param error boolean
   */
  updateSearchState(hits: number, results?: Object, error: boolean) {
    let suggestions = [];

    if (results && results.hasOwnProperty('suggest')) {
      for (let i in results.suggest) {
        if (results.suggest.hasOwnProperty(i)) {
          results.suggest[i].forEach(suggestion => {
            suggestion.options.forEach(option => {
              if (option.score > 0.5) {
                suggestions.push({
                  text: suggestion.text,
                  option:
                    option.text.charAt(0).toUpperCase() + option.text.slice(1)
                });
              }
            });
          });
        }
      }
    }

    this.setState({
      hits: hits,
      results:
        results &&
        results.hasOwnProperty('hits') &&
        results.hits.hasOwnProperty('hits')
          ? results.hits.hits
          : [],
      suggestions: suggestions,
      serverError: error
    });
  }

  /**
   *
   * @param event
   */
  handleChange(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState(
      { searchParams: event.target.value, currentPage: 1 },
      this.search
    );
  }

  /**
   * Handle offender selection
   * @param id
   */
  handleClick(id: number) {
    const selected = this.state.results[id]['_source'];
    this.props.history.push({
      pathname: '/details',
      state: { offender: selected }
    });
  }

  /**
   * Handle offender add contact
   * @param event
   */
  handleContact(event: SyntheticInputEvent<HTMLInputElement>) {
    const id = event.target.id,
      selected = this.state.results[id.substr(id.indexOf('-') + 1)]['_source'];
    console.info('Add contact:', selected.OFFENDER_ID, selected);
  }

  /**
   *
   * @param text {String}
   * @param suggestion {String}
   */
  handleSuggestion(text: string, suggestion: string) {
    this.setState(prevState => {
      return {
        searchParams: prevState.searchParams
          .split(' ')
          .map(item => {
            return item.toLowerCase() === text.toLowerCase()
              ? suggestion
              : item;
          })
          .join(' ')
      };
    }, this.search);
  }

  /**
   *
   */
  handleNewOffenderClick() {
    console.info('New offender');
  }

  /**
   *
   * @param page {Number}
   */
  changePage(page: number) {
    this.setState({ currentPage: page }, this.search);
  }

  /**
   * Render DOM
   * @returns {XML}
   */
  render() {
    return (
      <div>
        <div className="govuk-box-highlight blue">
          <h1 className="heading-large no-margin-top margin-bottom medium">
            Search for an offender
          </h1>

          <form
            className="padding-left-right"
            onSubmit={event => {
              event.preventDefault();
            }}>
            <label>
              <input
                id="searchParams"
                className="form-control padded"
                placeholder="Enter names, addresses, date of birth, ID numbers and more..."
                type="text"
                value={this.state.searchParams}
                onChange={this.handleChange}
              />
            </label>
          </form>

          {this.state.suggestions.length > 0 && (
            <p className="margin-top medium no-margin-bottom">
              Did you mean{' '}
              <Suggestions
                suggestions={this.state.suggestions}
                click={this.handleSuggestion}
              />?
            </p>
          )}

          {this.state.searchParams.length >= 2 &&
            this.state.hits !== -1 && (
              <p className="bold margin-top medium no-margin-bottom">
                Can't find who you are looking for?{' '}
                <a
                  className="clickable white"
                  onClick={this.handleNewOffenderClick}>
                  Add a new offender
                </a>
              </p>
            )}

          {this.state.searchParams.length === 0 &&
            this.state.hits <= 0 && <div>&nbsp;</div>}
        </div>
        <div className="padded mobile-pad">
          <h2 className="heading-medium margin-top medium">
            {this.state.searchParams.length > 0 &&
              this.state.hits !== -1 && (
                <span>
                  {this.state.hits} results found
                  {this.state.hits > this.pageSize && (
                    <span>
                      , showing{' '}
                      {this.state.currentPage === 1
                        ? 1
                        : (this.state.currentPage - 1) * this.pageSize + 1}{' '}
                      to{' '}
                      {this.state.currentPage * this.pageSize > this.state.hits
                        ? this.state.hits
                        : this.state.currentPage * this.pageSize}
                    </span>
                  )}
                </span>
              )}{' '}
          </h2>

          {!this.state.searchParams.length &&
            !this.state.hits && (
              <div>
                <h2 className="heading-medium">
                  Use this <strong className="phase-tag">PROTOTYPE</strong>service
                  to search for:
                </h2>
                <ul className="list">
                  <li className="list-bullet">
                    Offender names and dates of birth
                  </li>
                  <li className="list-bullet">
                    Offender address and previous addresses
                  </li>
                  <li className="list-bullet">
                    Identification numbers such as CRN, PNC and National
                    Insurance
                  </li>
                  <li className="list-bullet">
                    Offender aliases and dates of birth
                  </li>
                </ul>

                <p className="margin-top medium">
                  You can access the{' '}
                  <a className="clickable">previous version of the search.</a>
                </p>
              </div>
            )}

          {this.state.serverError && (
            <p className="error-message">
              The server has encountered an error.
            </p>
          )}

          {this.state.results.map((result, i) => (
            <div key={i}>
              <Result
                id={i}
                params={this.state.searchParams}
                data={result._source}
                click={this.handleClick}
                contact={this.handleContact}
              />
            </div>
          ))}

          {this.state.hits > this.pageSize && (
            <Pagination
              state={this.state}
              pageSize={this.pageSize}
              changePage={this.changePage}
            />
          )}
        </div>
      </div>
    );
  }
}
