import React from 'react';
import ReactDOM from 'react-dom';

import Pagination from './Pagination';

describe('Pagination', () => {

    it('renders successfully', () => {
        const div = document.createElement('div'),
            state = {
                currentPage: 1,
                hits: 10
            };
        ReactDOM.render(<Pagination state={state} />, div);
    });

});
