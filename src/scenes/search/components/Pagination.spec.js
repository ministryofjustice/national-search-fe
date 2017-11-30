import React from 'react';
import { shallow } from 'enzyme';

import Pagination from './Pagination';

describe('Pagination', () => {

    it('renders successfully', () => {
        const div = document.createElement('div'),
            state = {
                currentPage: 1,
                hits: 10
            };
        shallow(<Pagination state={state} />, div);
    });

});
