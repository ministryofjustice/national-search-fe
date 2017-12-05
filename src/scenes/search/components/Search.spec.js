import React from 'react';
import sinon from 'sinon';
import fs from 'fs';
import path from 'path';

import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Search from './Search';

describe('Search', () => {
  let wrapper, handleChangeSpy, searchInstance;

  const stubData = fs.readFileSync(
    path.join(__dirname, '..', 'data', 'Results.stub.json'),
    'utf8'
  );

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

    xit('should search based on user input parameters', () => {
      wrapper
        .find('#searchParams')
        .simulate('change', { target: { value: 'John Smith' } });

      expect(handleChangeSpy.calledOnce).toEqual(true);
      expect(searchInstance.state.searchParams).toEqual('John Smith');
    });

    xit('should allow the user to change the search results page', () => {
      expect(searchInstance.state.currentPage).toEqual(1);
      searchInstance.changePage(2);
      expect(searchInstance.state.currentPage).toEqual(2);
    });

    xit('should allow the user to select suggested search parameters', () => {
      wrapper
        .find('#searchParams')
        .simulate('change', { target: { value: 'John Smith' } });
      expect(searchInstance.state.searchParams).toEqual('John Smith');

      searchInstance.handleSuggestion('Smith', 'Smit');
      expect(searchInstance.state.searchParams).toEqual('John Smit');
    });

    xit('should allow the user to select the contact option on each result', () => {
      // Trigger the search and mock the response
      searchInstance.handleChange({ target: { value: 'John Smith' } });

      searchInstance.handleContact({ target: { id: 'contact-1' } });
    });

    xit('should allow the user to select the offender', () => {
      // Trigger the search and mock the response
      searchInstance.handleChange({ target: { value: 'John Smith' } });

      searchInstance.handleClick(0);
    });
  });
});
