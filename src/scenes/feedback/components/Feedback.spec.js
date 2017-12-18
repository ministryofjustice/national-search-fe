import React from 'react';
import sinon from 'sinon';

import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Feedback from './Feedback';

describe('Feedback', () => {
  let feedbackInstance,
    impressionsChangeSpy,
    feedbackChangeSpy,
    submitSpy,
    wrapper;

  beforeEach(() => {
    impressionsChangeSpy = sinon.spy(Feedback.prototype, 'handleImpressions');
    feedbackChangeSpy = sinon.spy(Feedback.prototype, 'handleFeedback');
    submitSpy = sinon.spy(Feedback.prototype, 'handleSubmit');
    wrapper = mount(
      <MemoryRouter>
        <Feedback />
      </MemoryRouter>
    );
    feedbackInstance = wrapper.find(Feedback).instance();
  });

  afterEach(() => {
    impressionsChangeSpy.restore();
    feedbackChangeSpy.restore();
    submitSpy.restore();
  });

  it('should update the state when the user enters some impressions text', () => {
    wrapper
      .find('#impressions')
      .simulate('change', { target: { value: 'Some impressions text' } });

    expect(impressionsChangeSpy.calledOnce).toEqual(true);
    expect(feedbackInstance.state.impressions).toEqual('Some impressions text');
  });

  it('should update the state when the user enters some feedback text', () => {
    wrapper
      .find('#feedback')
      .simulate('change', { target: { value: 'Some feedback text' } });

    expect(feedbackChangeSpy.calledOnce).toEqual(true);
    expect(feedbackInstance.state.feedback).toEqual('Some feedback text');
  });

  it('should update the state and route when the form is submitted', () => {
    expect(feedbackInstance.state.doRedirect).toEqual(false);
    wrapper.find('form').simulate('submit');

    expect(submitSpy.calledOnce).toEqual(true);
    expect(feedbackInstance.state.doRedirect).toEqual(true);
  });
});
