import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import PhaseBanner from './PhaseBanner';

describe('PhaseBanner', () => {
  it('renders successfully', () => {
    shallow(
      <MemoryRouter>
        <PhaseBanner />
      </MemoryRouter>
    );
  });
});
