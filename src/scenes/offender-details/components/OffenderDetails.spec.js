import fs from 'fs';
import path from 'path';

import React from 'react';

import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import OffenderDetails from './OffenderDetails';

const mockData = fs.readFileSync(
  path.join(__dirname, '../..', 'search/data', 'Results.stub.json'),
  'utf8'
);

describe('Offender Details', () => {
  let wrapper, offenderDetailsInstance;

  describe('', () => {
    beforeEach(() => {
      wrapper = mount(
        <MemoryRouter>
          <OffenderDetails
            location={{
              state: { offender: JSON.parse(mockData).hits.hits[0]._source }
            }}
          />
        </MemoryRouter>
      );
      offenderDetailsInstance = wrapper.find(OffenderDetails).instance();
    });

    it('renders successfully', () => {
      expect(wrapper.find('h1').text()).toEqual('Offender details');
      expect(wrapper.find('h2').text()).toEqual('Smith, John - 19/03/1950');
    });
  });
});
