import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Navigation from './Navigation';

describe('Navigation', () => {
  it('renders successfully', () => {
    shallow(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
  });
});
