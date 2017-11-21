import React from 'react';
import ReactDOM from 'react-dom';

import Suggestions from './Suggestions';

describe('Suggestions', () => {

    it('renders successfully', () => {
        const div = document.createElement('div'),
            suggestions = [
                { text: 'John', option: 'Johns' },
                { text: 'Smit', option: 'Smith' }
            ];

        ReactDOM.render(<Suggestions suggestions={suggestions}/>, div);
    });

});