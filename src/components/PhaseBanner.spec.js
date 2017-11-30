import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import PhaseBanner from './PhaseBanner';

describe('PhaseBanner', () => {

    it('renders successfully', () => {
        const div = document.createElement('div');
        shallow(
            <MemoryRouter>
                <PhaseBanner/>
            </MemoryRouter>, div);
    });

});