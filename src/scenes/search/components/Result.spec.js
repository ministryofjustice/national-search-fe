import React from 'react';
import ReactDOM from 'react-dom';

import Result from './Result';

describe('Result', () => {

    it('renders successfully', () => {
        const div = document.createElement('div'),
            params = 'Some search parameters',
            data = {
                FIRST_NAME: 'John',
                SECOND_NAME: 'Simon',
                THIRD_NAME: 'Gareth',
                SURNAME: 'Smith',
                PREVIOUS_SURNAME: 'Jones',
                DATE_OF_BIRTH_DATE: '1997-01-01 00:00:00',
                CRN: 'D12345678',
                GENDER_ID: 545,
                CURRENT_HIGHEST_RISK_COLOUR: 'Green',
                CURRENT_DISPOSAL: 0,
                ALIASES: [
                    {
                        FIRST_NAME: 'Jack',
                        SURNAME: 'Jones'
                    }
                ],
                ADDRESSES: [
                    {
                        ADDRESS_NUMBER: 1,
                        STREET_NAME: 'Some Street',
                        TOWN_CITY: 'Sheffield',
                        COUNTY: 'South Yorkshire',
                        POSTCODE: 'S1 1AA'
                    }
                ]
            };

        ReactDOM.render(<Result params={params} data={data} contact={() => ({})} click={() => ({})}/>, div);
    });

});