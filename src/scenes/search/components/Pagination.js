// @flow
import React, { Component } from 'react';

type Props = {
  state: any,
  pageSize?: number,
  changePage: Function
};
type State = {
  hits: number,
  currentPage: number
};

export default class Pagination extends Component<Props, State> {
  pagesArray = [];
  totalPages = 0;
  maxPages = 9;

  /**
   * @constructor
   */
  constructor(props: Props) {
    super(props);

    this.state = props.state;
    this.totalPages = Math.ceil(this.state.hits / (props.pageSize || 10));
    for (let i = 0, len = this.totalPages; i < len; i++) {
      this.pagesArray.push(i + 1);
    }

    (this: any).previousPage = this.previousPage.bind(this);
    (this: any).nextPage = this.nextPage.bind(this);
    (this: any).changePage = this.changePage.bind(this);
  }

  /**
   *
   */
  previousPage() {
    if (this.state.currentPage > 1) {
      this.setState(
        previousState => {
          return { currentPage: --previousState.currentPage };
        },
        () => {
          this.props.changePage(this.state.currentPage);
        }
      );
    }
  }

  /**
   *
   */
  nextPage() {
    if (this.state.currentPage < this.totalPages) {
      this.setState(
        previousState => {
          return { currentPage: ++previousState.currentPage };
        },
        () => {
          this.props.changePage(this.state.currentPage);
        }
      );
    }
  }

  /**
   *
   * @param event
   */
  changePage(event: SyntheticInputEvent<HTMLInputElement>) {
    const id = parseInt(
      event.target.id.substr(event.target.id.indexOf('-') + 1),
      10
    );
    if (id !== this.state.currentPage) {
      this.props.changePage(id);
    }
  }

  /**
   *
   * @returns {XML}
   */
  render() {
    return (
      <div>
        {this.state.currentPage !== 1 && (
          <span>
            <a
              id="prev-button"
              className="clickable"
              onClick={this.previousPage}>
              &lt; Previous
            </a>{' '}
            -{' '}
          </span>
        )}
        {this.totalPages <= this.maxPages &&
          this.pagesArray.map((item, i) => (
            <span key={i}>
              <a
                id={'page-' + item}
                className={item !== this.state.currentPage ? 'clickable' : ''}
                onClick={this.changePage}>
                {item}
              </a>{' '}
            </span>
          ))}
        {this.totalPages > this.maxPages && (
          <span id="pages">
            {this.state.currentPage} / {this.totalPages}
          </span>
        )}

        {this.totalPages > 1 &&
          this.state.currentPage < this.totalPages && (
            <span>
              {' '}
              -{' '}
              <a id="next-button" className="clickable" onClick={this.nextPage}>
                Next &gt;
              </a>
            </span>
          )}
      </div>
    );
  }
}
