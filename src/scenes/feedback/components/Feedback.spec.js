import React from 'react';
import { shallow } from 'enzyme';

import { MemoryRouter } from 'react-router-dom';

import Feedback from './Feedback';

describe('Feedback', () => {

    it('renders successfully', () => {
        const div = document.createElement('div');
        shallow(
            <MemoryRouter>
                <Feedback/>
            </MemoryRouter>, div);
    });

});