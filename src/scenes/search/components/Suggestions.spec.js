import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';

import Suggestions from './Suggestions';

describe('Suggestions', () => {

    let wrapper,
        clickSpy;

    describe('two suggestions returned', () => {

        beforeEach(() => {
            const suggestions = [
                { text: 'John', option: 'Johns' },
                { text: 'Smit', option: 'Smith' }
            ];

            clickSpy = sinon.spy();
            wrapper = mount(<Suggestions suggestions={suggestions} click={clickSpy}/>);
        });

        it('renders two suggestions', () => {
            expect(wrapper.find('.white')).toHaveLength(2);
        });

        it('allows the suggestion to be selected', () => {
            wrapper.find('.white').first().simulate('click');
            expect(clickSpy.calledOnce).toEqual(true);
        })
    });

    describe('no suggestions returned', () => {

        beforeEach(() => {
            const suggestions = [];

            wrapper = mount(<Suggestions suggestions={suggestions}/>);
        });

        it('renders no suggestions', () => {
            expect(wrapper.find('.white')).toHaveLength(0);
        });
    });

});