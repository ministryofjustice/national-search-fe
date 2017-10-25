import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Search extends Component {

  constructor() {
    super();
    this.state = {
      searchParams: '',
      doRedirect: false
    };
  }

  handleChange = (event) => {
    this.setState({ searchParams: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ doRedirect: true });
  };

  render() {

    return (
      <div>
        <h1 className="heading-xlarge">National search</h1>
        <div className="grid-row">
          <div className="column-two-thirds">

            <form onSubmit={this.handleSubmit}>

              <div className="form-group">

                <label>Search parameters
                  <input className="form-control" type="text" value={this.state.searchParams || ''} onChange={this.handleChange}/>
                </label>

              </div>

              <div className="margin-top large">&nbsp;</div>

              <input className="button button-start" type="submit" value="Search"/>

            </form>

            {this.state.doRedirect && <Redirect to={{
              pathname: '/results',
              state: { searchParams: this.state.searchParams }
            }}/>}

          </div>
          <div className="column-one-third">&nbsp;</div>
        </div>
      </div>
    );
  }
}
