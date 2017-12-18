// @flow
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

type Props = {};
type State = {
  impressions: string,
  feedback: string,
  doRedirect: boolean
};

export default class Feedback extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      impressions: '',
      feedback: '',
      doRedirect: false
    };

    (this: any).handleImpressions = this.handleImpressions.bind(this);
    (this: any).handleFeedback = this.handleFeedback.bind(this);
    (this: any).handleSubmit = this.handleSubmit.bind(this);
  }

  handleImpressions(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ impressions: event.target.value });
  }

  handleFeedback(event: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ feedback: event.target.value });
  }

  handleSubmit() {
    window.location.href =
      'mailto:nick.gallon@digital.justice.gov.uk?subject=National%20Search%20Feedback&body=What%20were%20your%20first%20impressions%20of%20the%20offender%20search%3F%0D%0A%0D%0A' +
      encodeURIComponent(this.state.impressions) +
      '%0D%0A%0D%0AIf%20you%20could%20change%20anything%20what%20would%20it%20be%3F%0D%0A%0D%0A' +
      encodeURIComponent(this.state.feedback);
    this.setState({ doRedirect: true });
  }

  render() {
    return (
      <div className="mobile-pad">
        <h1 className="heading-xlarge">Give feedback</h1>

        <div className="grid-row">
          <div className="column-two-thirds">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label className="form-label-bold">
                  1. What were your first impressions of the offender search?
                  <textarea
                    id="impressions"
                    name="impressions"
                    className="form-control wide"
                    value={this.state.impressions || ''}
                    onChange={this.handleImpressions}
                  />
                </label>

                <div className="margin-top large">&nbsp;</div>

                <label className="form-label-bold">
                  2. If you could change anything what would it be?
                  <textarea
                    id="feedback"
                    name="feedback"
                    className="form-control wide"
                    value={this.state.feedback || ''}
                    onChange={this.handleFeedback}
                  />
                </label>
              </div>

              <p className="no-margin-bottom">
                This is a very early stage test for a new kind of National
                Offender Search.
              </p>
              <p>
                This test does not use any real offender data or store any data
                in any way.
              </p>

              <div className="margin-top large">&nbsp;</div>

              <button className="button" type="submit">
                Send feedback
              </button>
            </form>

            {this.state.doRedirect && <Redirect to="/" />}
          </div>
          <div className="column-one-third">&nbsp;</div>
        </div>
      </div>
    );
  }
}
