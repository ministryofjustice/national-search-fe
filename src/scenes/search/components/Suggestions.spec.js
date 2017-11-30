import React from 'react';
import { shallow } from 'enzyme';

import Suggestions from './Suggestions';

describe('Suggestions', () => {

    it('renders successfully', () => {
        const div = document.createElement('div'),
            suggestions = [
                { text: 'John', option: 'Johns' },
                { text: 'Smit', option: 'Smith' }
            ];

        shallow(<Suggestions suggestions={suggestions}/>, div);
    });

});