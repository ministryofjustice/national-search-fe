import React from 'react';
import ReactDOM from 'react-dom';
import PhaseBanner from './PhaseBanner';

describe('PhaseBanner', () => {

    it('renders successfully', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PhaseBanner/>, div);
    });

});