// @flow
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

type Props = {};
type State = {
  satisfaction: string,
  feedback: string,
  doRedirect: boolean
};

export default class Feedback extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      satisfaction: '',
      feedback: '',
      doRedirect: false
    };

    (this: any).handleRadio = this.handleRadio.bind(this);
    (this: any).handleText = this.handleText.bind(this);
    (this: any).handleSubmit = this.handleSubmit.bind(this);
  }

  handleRadio(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ satisfaction: event.target.value });
  }

  handleText(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ feedback: event.target.value });
  }

  handleSubmit() {
    window.location.href =
      'mailto:nick.gallon@digital.justice.gov.uk?subject=National%20Search%20Feedback&body=Overall%20' +
      this.state.satisfaction +
      '%20-%20' +
      this.state.feedback;
    this.setState({ doRedirect: true });
  }

  render() {
    return (
      <div>
        <h1 className="heading-xlarge">Give feedback</h1>

        <div className="grid-row">
          <div className="column-one-third">
            <nav>
              -{' '}
              <Link to="" className="nav-item">
                Return to search
              </Link>
            </nav>
          </div>
          <div className="column-two-thirds">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <fieldset>
                  <legend>
                    <span className="form-label-bold">
                      Overall, how did you feel about the National offender
                      search service you used today?
                    </span>
                  </legend>

                  <div className="multiple-choice margin-top medium">
                    <input
                      id="radio-1"
                      name="radio"
                      type="radio"
                      value="Very satisfied"
                      checked={this.state.satisfaction === 'Very satisfied'}
                      onChange={this.handleRadio}
                    />
                    <label htmlFor="radio-1">Very satisfied</label>
                  </div>

                  <div className="multiple-choice">
                    <input
                      id="radio-2"
                      name="radio"
                      type="radio"
                      value="Satisfied"
                      checked={this.state.satisfaction === 'Satisfied'}
                      onChange={this.handleRadio}
                    />
                    <label htmlFor="radio-2">Satisfied</label>
                  </div>

                  <div className="multiple-choice">
                    <input
                      id="radio-3"
                      name="radio"
                      type="radio"
                      value="Dissatisfied"
                      checked={this.state.satisfaction === 'Dissatisfied'}
                      onChange={this.handleRadio}
                    />
                    <label htmlFor="radio-3">Dissatisfied</label>
                  </div>

                  <div className="multiple-choice">
                    <input
                      id="radio-4"
                      name="radio"
                      type="radio"
                      value="Very dissatisfied"
                      checked={this.state.satisfaction === 'Very dissatisfied'}
                      onChange={this.handleRadio}
                    />
                    <label htmlFor="radio-4">Very dissatisfied</label>
                  </div>
                </fieldset>

                <hr />

                <label className="form-label-bold">
                  How could we improve this service?
                  <textarea
                    id="feedback"
                    name="feedback"
                    className="form-control wide"
                    placeholder="Start typing here..."
                    type="text"
                    value={this.state.feedback || ''}
                    onChange={this.handleText}
                  />
                </label>
              </div>

              <div className="margin-top large">&nbsp;</div>

              <button className="button button-start" type="submit">
                Submit feedback
              </button>
            </form>

            {this.state.doRedirect && <Redirect to="/" />}
          </div>
        </div>
      </div>
    );
  }
}
