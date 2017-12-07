import fs from 'fs';
import path from 'path';

import React from 'react';
import sinon from 'sinon';

import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

const mockData = fs.readFileSync(
  path.join(__dirname, '..', 'data', 'Results.stub.json'),
  'utf8'
);

jest.mock('elasticsearch', () => ({
  Client: class {
    search = () => {
      return new Promise(resolve => {
        resolve(JSON.parse(mockData));
      });
    };
  }
}));

import Search from './Search';

describe('Search', () => {
  let wrapper, handleChangeSpy, searchInstance;

  describe('', () => {
    beforeEach(() => {
      handleChangeSpy = sinon.spy(Search.prototype, 'handleChange');
      wrapper = mount(
        <MemoryRouter>
          <Search history={[]} />
        </MemoryRouter>
      );
      searchInstance = wrapper.find(Search).instance();
    });

    afterEach(() => {
      handleChangeSpy.restore();
    });

    it('renders successfully', () => {
      expect(wrapper.find('h1').text()).toEqual('National offender search');
    });

    it('should search based on user input parameters', () => {
      wrapper
        .find('#searchParams')
        .simulate('change', { target: { value: 'John Smith' } });

      expect(handleChangeSpy.calledOnce).toEqual(true);
      expect(searchInstance.state.searchParams).toEqual('John Smith');
    });

    it('should allow the user to change the search results page', () => {
      expect(searchInstance.state.currentPage).toEqual(1);
      searchInstance.changePage(2);
      expect(searchInstance.state.currentPage).toEqual(2);
    });

    it('should allow the user to select suggested search parameters', () => {
      wrapper
        .find('#searchParams')
        .simulate('change', { target: { value: 'John Smith' } });
      expect(searchInstance.state.searchParams).toEqual('John Smith');

      searchInstance.handleSuggestion('Smith', 'Smit');
      expect(searchInstance.state.searchParams).toEqual('John Smit');
    });

    it('should allow the user to select the contact option on each result', async () => {
      // Trigger the search and mock the response
      await searchInstance.handleChange({ target: { value: 'John Smith' } });
      searchInstance.handleContact({ target: { id: 'contact-1' } });
    });

    it('should allow the user to select the offender', async () => {
      // Trigger the search and mock the response
      await searchInstance.handleChange({ target: { value: 'John Smith' } });
      searchInstance.handleClick(0);
    });
  });
});
