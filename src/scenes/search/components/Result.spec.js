import React from 'react';
import ReactDOM from 'react-dom';

import Result from './Result';

describe('Result', () => {

    it('renders successfully', () => {
        const div = document.createElement('div'),
            params = 'Some search parameters',
            data = {
                FIRST_NAME: '',
                SURNAME: '',
                DATE_OF_BIRTH_DATE: '1997-01-01 00:00:00',
                CRN: 'D12345678',
                GENDER_ID: 545,
                CURRENT_HIGHEST_RISK_COLOUR: 'Green',
                CURRENT_REMAND_STATUS: 'Remanded in custody'
            };

        ReactDOM.render(<Result params={params} data={data}/>, div);
    });

});