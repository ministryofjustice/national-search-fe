import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import PhaseBanner from './PhaseBanner';

describe('PhaseBanner', () => {

    it('renders successfully', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MemoryRouter>
                <PhaseBanner/>
            </MemoryRouter>, div);
    });

});