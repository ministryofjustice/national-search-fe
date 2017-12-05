import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';

import Result from './Result';

describe('Result', () => {
  let contactSpy,
    clickSpy,
    wrapper,
    searchData = {
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

  describe('should expose static methods', () => {
    it('pipeAge method should return the numerical age based on DOB', () => {
      expect(Result.pipeAge()).toEqual(void 0);
      expect(typeof Result.pipeAge('1997-02-05 00:00:00')).toEqual('number');
    });

    it('pipeAge method should return the DOB as DD/MM/YYYY', () => {
      expect(Result.pipeDate('1997-02-12 00:00:00')).toEqual('12/02/1997');
    });

    it('pipeGender method should return Male/Female based on the passed gender code 545/546', () => {
      expect(Result.pipeGender(545)).toEqual('Male');
      expect(Result.pipeGender(546)).toEqual('Female');
    });
  });

  describe('when a basic search is performed', () => {
    beforeEach(() => {
      const params = 'John Smith';

      contactSpy = sinon.spy();
      clickSpy = sinon.spy();
      wrapper = mount(
        <Result
          params={params}
          data={searchData}
          contact={contactSpy}
          click={clickSpy}
        />
      );
    });

    it('should render the Green risk colour', () => {
      expect(wrapper.find('.risk-green')).toHaveLength(1);
    });

    it('should NOT render the current disposal', () => {
      expect(wrapper.find('#currentDisposal')).toHaveLength(0);
    });

    it('should NOT include any additional results', () => {
      const additionalResults = wrapper.instance().additionalResults();
      expect(additionalResults).toHaveLength(0);
    });
  });

  describe('when searching for alias and/or address', () => {
    beforeEach(() => {
      const params = 'Jack Jones Simon Sheffield S1 1AA';

      searchData.CURRENT_HIGHEST_RISK_COLOUR = 'Red';
      searchData.CURRENT_DISPOSAL = 1;

      contactSpy = sinon.spy();
      clickSpy = sinon.spy();
      wrapper = mount(
        <Result
          params={params}
          data={searchData}
          contact={contactSpy}
          click={clickSpy}
        />
      );
    });

    it('should render the Red risk colour', () => {
      expect(wrapper.find('.risk-red')).toHaveLength(1);
    });

    it('should render the current disposal', () => {
      expect(wrapper.find('#currentDisposal')).toHaveLength(1);
    });

    it('should include additional information based on deep search', () => {
      const additionalResults = wrapper.instance().additionalResults();
      expect(additionalResults.length).toEqual(4);
      expect(additionalResults[0]).toEqual('Alias: Jones, Jack');
      expect(additionalResults[1]).toEqual('Previous surname: Jones');
      expect(additionalResults[2]).toEqual('Other names: Simon, Gareth');
      expect(additionalResults[3]).toEqual(
        '1 Some Street, Sheffield, South Yorkshire. S1 1AA'
      );
    });
  });
});
