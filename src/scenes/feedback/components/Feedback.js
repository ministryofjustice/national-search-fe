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

                <fieldset>

                  <legend>
                    <span className="form-label-bold">Overall, how did you feel about the Short Format Pre-sentence Report service you used today?</span>
                  </legend>

                  <div className="multiple-choice margin-top medium">
                    <input id="radio-1" name="radio" type="radio" value="Very satisfied" />
                    <label htmlFor="radio-1">Very satisfied</label>
                  </div>

                  <div className="multiple-choice">
                    <input id="radio-2" name="radio" type="radio" value="Satisfied" />
                    <label htmlFor="radio-2">Satisfied</label>
                  </div>

                  <div className="multiple-choice">
                    <input id="radio-3" name="radio" type="radio" value="Dissatisfied" />
                    <label htmlFor="radio-3">Dissatisfied</label>
                  </div>

                  <div className="multiple-choice">
                    <input id="radio-4" name="radio" type="radio" value="Very dissatisfied" />
                    <label htmlFor="radio-4">Very dissatisfied</label>
                  </div>

                </fieldset>

                <hr />

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
