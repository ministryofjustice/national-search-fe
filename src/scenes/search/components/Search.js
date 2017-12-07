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
  esClient = new elasticsearch.Client({ host: 'localhost:9200' });

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
    const searched =
      this.props.hasOwnProperty('location') &&
      this.props.location.hasOwnProperty('search')
        ? this.props.location.search
        : '';
    if (searched.length) {
      this.setState(
        {
          searchParams: searched
            .substr(searched.indexOf('=') + 1)
            .split('%20')
            .join(' ')
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
      search: '?search=' + params.split(' ').join('%20')
    });
  }

  /**
   * Perform the search
   */
  search() {
    window.scrollTo(0, 0);

    let trimmedParams = this.state.searchParams.trim();

    this.setState({ hits: 0 }); // Reset pagination
    this.updateQuerystring(trimmedParams);

    this.esClient
      .search({
        index: 'offenders',
        body: Query(trimmedParams, this.state.currentPage)
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
    console.info('Selected:', selected.OFFENDER_ID);
  }

  /**
   * Handle offender add contact
   * @param event
   */
  handleContact(event: SyntheticInputEvent<HTMLInputElement>) {
    const id = event.target.id,
      selected = this.state.results[id.substr(id.indexOf('-') + 1)]['_source'];
    console.info('Add contact:', selected.OFFENDER_ID);
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
            National offender search
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
                placeholder="Find names, addresses, date of birth, CRN and more..."
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
        </div>
        <div className="padded">
          {this.state.searchParams.length > 0 && (
            <h2 className="heading-medium margin-top medium">
              {this.state.hits} results found
            </h2>
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

          {this.state.hits > 10 && (
            <Pagination state={this.state} changePage={this.changePage} />
          )}
        </div>
      </div>
    );
  }
}
