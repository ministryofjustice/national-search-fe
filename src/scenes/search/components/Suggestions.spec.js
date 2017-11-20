import React from 'react';
import ReactDOM from 'react-dom';

import Suggestions from './Suggestions';

it('renders successfully', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Suggestions suggestions={[]} />, div);
});