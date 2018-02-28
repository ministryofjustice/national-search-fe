import React from 'react';
import sinon from 'sinon';

import { mount } from 'enzyme';

import Pagination from './Pagination';

describe('Pagination', () => {
  describe('when rendering with less than 9 pages', () => {
    let parentChangeSpy, prevSpy, nextSpy, changeSpy, wrapper;

    beforeEach(() => {
      parentChangeSpy = sinon.spy();
      prevSpy = sinon.spy(Pagination.prototype, 'previousPage');
      nextSpy = sinon.spy(Pagination.prototype, 'nextPage');
      changeSpy = sinon.spy(Pagination.prototype, 'changePage');
      wrapper = mount(
        <Pagination
          state={{ currentPage: 1, hits: 20 }}
          changePage={parentChangeSpy}
        />
      );
    });

    afterEach(() => {
      prevSpy.restore();
      nextSpy.restore();
      changeSpy.restore();
    });

    function exists(element) {
      return wrapper.find(element).length === 1;
    }

    function isClickable(element) {
      return wrapper.find(element).hasClass('clickable');
    }

    it('renders successfully with a list of two, selectable pages', () => {
      expect(exists('#page-1')).toEqual(true);
      expect(exists('#page-2')).toEqual(true);
      expect(exists('#page-3')).toEqual(false);

      expect(wrapper.find('#page-1').text()).toEqual('1');
      expect(wrapper.find('#page-2').text()).toEqual('2');

      expect(isClickable('#page-1')).toEqual(false);
      expect(isClickable('#page-2')).toEqual(true);

      expect(isClickable('#next-button')).toEqual(true);
    });

    it('should change to the next page when the next button is clicked', () => {
      const nextButton = wrapper.find('#next-button');

      nextButton.simulate('click');
      expect(nextSpy.calledOnce).toEqual(true);

      wrapper.setState({ currentPage: 2 });

      expect(parentChangeSpy.calledOnce).toEqual(true);
      expect(parentChangeSpy.calledWith(2)).toEqual(true);

      expect(isClickable('#page-1')).toEqual(true);
      expect(isClickable('#page-2')).toEqual(false);

      expect(isClickable('#prev-button')).toEqual(true);
    });

    xit('should change to the previous page when the previous button is clicked', () => {
      const prevButton = wrapper.find('#prev-button');

      wrapper.setState({ currentPage: 2 });

      prevButton.simulate('click');
      expect(prevSpy.calledOnce).toEqual(true);

      wrapper.setState({ currentPage: 1 });

      expect(parentChangeSpy.calledOnce).toEqual(true);
      expect(parentChangeSpy.calledWith(1)).toEqual(true);

      expect(isClickable('#page-1')).toEqual(false);
      expect(isClickable('#page-2')).toEqual(true);

      expect(isClickable('#next-button')).toEqual(true);
    });

    it('should change to the selected page when the corresponding page number button is clicked', () => {
      const pageButton = wrapper.find('#page-2');

      pageButton.simulate('click');
      expect(changeSpy.calledOnce).toEqual(true);

      wrapper.setState({ currentPage: 2 });

      expect(parentChangeSpy.calledOnce).toEqual(true);
      expect(parentChangeSpy.calledWith(2)).toEqual(true);

      expect(isClickable('#page-1')).toEqual(true);
      expect(isClickable('#page-2')).toEqual(false);

      expect(isClickable('#prev-button')).toEqual(true);
    });
  });

  describe('when rendering with more than 9 pages in total', () => {
    it('renders successfully with a simple number of pages', () => {
      const state = {
          currentPage: 1,
          hits: 100
        },
        wrapper = mount(<Pagination state={state} />);

      expect(wrapper.find('#page-1')).toHaveLength(0);
      expect(wrapper.find('#pages').text()).toEqual('1 / 10');
      expect(wrapper.find('#next-button').hasClass('clickable')).toEqual(true);
    });
  });
});
