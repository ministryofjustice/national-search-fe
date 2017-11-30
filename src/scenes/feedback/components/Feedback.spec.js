import React from 'react';
import sinon from 'sinon';

import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Feedback from './Feedback';

describe('Feedback', () => {

    let feedbackInstance,
        radioChangeSpy,
        textChangeSpy,
        submitSpy,
        wrapper;

    beforeEach(() => {
        radioChangeSpy = sinon.spy(Feedback.prototype, 'handleRadio');
        textChangeSpy = sinon.spy(Feedback.prototype, 'handleText');
        submitSpy = sinon.spy(Feedback.prototype, 'handleSubmit');
        wrapper = mount(<MemoryRouter><Feedback/></MemoryRouter>);
        feedbackInstance = wrapper.find(Feedback).instance();
    });

    afterEach(() => {
        radioChangeSpy.restore();
        textChangeSpy.restore();
        submitSpy.restore();
    });

    it('should update the state when the user selects a radio button', () => {

        const radioButtons = ['Very satisfied', 'Satisfied', 'Dissatisfied', 'Very dissatisfied'];

        radioButtons.forEach((item, index) => {
            wrapper.find('#radio-' + (index + 1)).simulate('change');
            expect(feedbackInstance.state.satisfaction).toEqual(item);
        });

        expect(radioChangeSpy.callCount).toEqual(4);
    });

    it('should update the state when the user enters some feedback text', () => {
        wrapper.find('#feedback').simulate('change', { target: { value: 'Some feedback text' } });

        expect(textChangeSpy.calledOnce).toEqual(true);
        expect(feedbackInstance.state.feedback).toEqual('Some feedback text');
    });

    it('should update the state and route when the form is submitted', () => {
        expect(feedbackInstance.state.doRedirect).toEqual(false);
        wrapper.find('form').simulate('submit');

        expect(submitSpy.calledOnce).toEqual(true);
        expect(feedbackInstance.state.doRedirect).toEqual(true);

    });

});