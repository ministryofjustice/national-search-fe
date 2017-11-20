import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import Feedback from './Feedback';

it('renders successfully', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter>
            <Feedback />
        </MemoryRouter>, div);
});