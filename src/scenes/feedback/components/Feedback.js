import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Feedback extends Component {

  constructor() {
    super();
    this.state = {
      feedback: '',
      doRedirect: false
    };
  }

  handleChange = (event) => {
    this.setState({ feedback: event.target.value });
  };

  handleSubmit = (event) => {
    this.setState({ doRedirect: true });
    event.preventDefault();
  };

  render() {

    return (
      <div>
        <h1 className="heading-xlarge">Give feedback</h1>
        <div className="grid-row">
          <div className="column-one-third">
            <nav>
              - <Link to="/" className="nav-item">Return to search</Link>
            </nav>
          </div>
          <div className="column-two-thirds">

            <form onSubmit={this.handleSubmit}>

              <div className="form-group">

                <label className="form-label-bold">How could we improve this service?
                  <textarea className="form-control wide" placeholder="Start typing here..." type="text" value={this.state.feedback || ''} onChange={this.handleChange}/>
                </label>

              </div>

              <div className="margin-top large">&nbsp;</div>

              <input className="button button-start" type="submit" value="Submit feedback"/>

            </form>

            { this.state.doRedirect && (<Redirect to="/"/>) }

          </div>
        </div>
      </div>
    );
  }
}
