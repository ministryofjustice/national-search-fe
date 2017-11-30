import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Search from './Search';

describe('Search', () => {

    it('renders successfully', () => {
        const div = document.createElement('div');
        shallow(
            <MemoryRouter>
                <Search/>
            </MemoryRouter>, div);
    });

});