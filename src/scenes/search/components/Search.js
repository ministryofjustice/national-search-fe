import React, { Component } from 'react';

import Query from '../model/Query';
import Suggestions from './Suggestions';
import Result from './Result';
import Pagination from './Pagination';

export default class Search extends Component {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            searchParams: '',
            serverError: false,
            hits: 0,
            results: [],
            suggestions: [],
            currentPage: 1
        };
    }

    /**
     *
     */
    componentDidMount() {
        const searched = this.props.hasOwnProperty('location') && this.props.location.hasOwnProperty('search') ? this.props.location.search : '';
        if (searched.length) {
            this.setState({ searchParams: searched.substr(searched.indexOf('=') + 1).split('%20').join(' ') }, this.search);
        }
    }

    /**
     *
     * @param params
     */
    updateQuerystring(params) {
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

        let request = new XMLHttpRequest(),
            trimmedParams = this.state.searchParams.trim();

        this.updateQuerystring(trimmedParams);

        request.open('POST', 'http://localhost:9200/offenders/_search');
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function () {

            if (request.status >= 200 && request.status < 400) {
                const response = JSON.parse(request.responseText);
                this.updateSearchState(response.hits.total, response, false, false);
            } else {
                this.updateSearchState(0, void 0, true, false);
            }

        }.bind(this);

        request.onerror = function () {
            this.updateSearchState(0, void 0, true, false);
        }.bind(this);

        request.send(Query(trimmedParams, this.state.currentPage));
    }

    /**
     *
     * @param hits int
     * @param results Array
     * @param error boolean
     */
    updateSearchState(hits, results, error) {

        let suggestions = [];

        if (results && results.hasOwnProperty('suggest')) {
            for (let i in results.suggest) {
                if (results.suggest.hasOwnProperty(i)) {
                    results.suggest[i].forEach((suggestion) => {
                        suggestion.options.forEach((option) => {
                            if (option.score > 0.5) {
                                suggestions.push({ text: suggestion.text, option: option.text.charAt(0).toUpperCase() + option.text.slice(1) });
                            }
                        });
                    });
                }
            }
        }

        this.setState({
            hits: hits,
            results: results && results.hasOwnProperty('hits') && results.hits.hasOwnProperty('hits') ? results.hits.hits : [],
            suggestions: suggestions,
            serverError: error
        });
    }

    /**
     *
     * @param event
     */
    handleChange = (event) => {
        this.setState({ searchParams: event.target.value, currentPage: 1 }, this.search);
    };

    /**
     * Handle offender selection
     * @param event
     */
    handleClick = (event) => {
        const selected = this.state.results[event.target.parentElement.parentElement.id]['_source'];
        console.info('Selected:', selected);
    };

    /**
     * Handle offender add contact
     * @param event
     */
    handleContact = (event) => {
        const id = event.target.id,
            selected = this.state.results[id.substr(id.indexOf('-') + 1)]['_source'];
        console.info('Add contact:', selected);
    };

    /**
     *
     * @param text {String}
     * @param suggestion {String}
     */
    handleSuggestion = (text, suggestion) => {
        this.setState((prevState) => {
            return { searchParams: prevState.searchParams.split(' ').map((item) => {
              return item.toLowerCase() === text.toLowerCase() ? suggestion : item;
            }).join(' ')};
        }, this.search);
    };

    /**
     *
     * @param page {Number}
     */
    changePage = (page) => {
        this.setState({ currentPage: page }, this.search);
    };

    /**
     * Render DOM
     * @returns {XML}
     */
    render() {

        return (
            <div>

                <div className="govuk-box-highlight blue">

                    <h1 className="heading-large no-margin-top margin-bottom medium">National offender search</h1>

                    <form className="padding-left-right" onSubmit={(event) => { event.preventDefault(); }}>
                        <label>
                            <input className="form-control padded" placeholder="Find names, addresses, date of birth, CRN and more..." type="text" value={this.state.searchParams} onChange={this.handleChange}/>
                        </label>
                    </form>

                    {this.state.suggestions.length > 0 &&
                        <p className="margin-top medium no-margin-bottom">Did you mean <Suggestions suggestions={this.state.suggestions} click={this.handleSuggestion}/>?</p>
                    }

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
                            <Result id={i} params={this.state.searchParams} data={result._source} click={this.handleClick} contact={this.handleContact}/>
                        </div>
                    )}

                    {this.state.hits > 10 &&
                        <Pagination state={this.state} changePage={this.changePage}/>
                    }

                </div>
            </div>
        );
    }
}
