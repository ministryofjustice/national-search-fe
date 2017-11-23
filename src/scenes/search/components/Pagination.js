import React, { Component } from 'react';

export default class Pagination extends Component {

    pagesArray = [];
    totalPages = 0;
    maxPages = 9;

    /**
     * @constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = this.props.state;
        this.totalPages = Math.ceil(this.state.hits / (props.pageSize || 10));
        for (let i = 0, len = this.totalPages; i < len; i++) {
            this.pagesArray.push(i + 1);
        }
    }

    /**
     *
     */
    previousPage = () => {
        if (this.state.currentPage > 1) {
            this.props.changePage(this.state.currentPage - 1);
        }
    };

    /**
     *
     */
    nextPage = () => {
        if (this.state.currentPage < this.totalPages) {
            this.props.changePage(this.state.currentPage + 1);
        }
    };

    /**
     *
     * @param event
     */
    changePage = (event) => {
        const id = parseInt(event.target.id.substr(event.target.id.indexOf('-') + 1), 10);
        if (id !== this.state.currentPage) {
            this.props.changePage(id);
        }
    };

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <a className={this.state.currentPage !== 1 ? 'clickable' : ''} onClick={this.previousPage}>&lt; Previous</a>&nbsp;-&nbsp;
                {this.totalPages <= this.maxPages && this.pagesArray.map((item, i) =>
                    <span key={i}>
                        <a id={'page-' + item} className={item !== this.state.currentPage ? 'clickable' : ''} onClick={this.changePage}>{item}</a>&nbsp;
                    </span>
                )}
                {this.totalPages > this.maxPages &&
                    <span>{this.state.currentPage} / {this.totalPages}</span>
                }
                &nbsp;-&nbsp;<a className={this.state.currentPage !== this.totalPages ? 'clickable' : ''} onClick={this.nextPage}>Next &gt;</a>
            </div>
        );
    }

};
