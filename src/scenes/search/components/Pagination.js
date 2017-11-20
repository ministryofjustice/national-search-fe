import React, { Component } from 'react';

export default class Pagination extends Component {

    /**
     * @constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = this.props.state;
    }

    /**
     *
     */
    previousPage = () => {
        if (this.state.currentPage > 1) {
            this.props.previousPage();
        }
    };

    /**
     *
     */
    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.hits / 10)) {
            this.props.nextPage();
        }
    };

    pages = () => {
      return this.state.currentPage + ' / ' + Math.ceil(this.state.hits / 10);
    };

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <a className="clickable" onClick={this.previousPage}>Previous</a> {this.pages()} &nbsp;
                <a className="clickable" onClick={this.nextPage}>Next</a>
            </div>
        );
    }

};
