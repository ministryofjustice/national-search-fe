import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import SubHeader from './SubHeader';

describe('SubHeader', () => {
  it('renders successfully', () => {
    shallow(
      <MemoryRouter>
        <SubHeader />
      </MemoryRouter>
    );
  });
});
