// @flow
import React, { Component } from 'react';
import Highlighter from 'react-highlight-words';

type Props = {
  id: number,
  params: string,
  data: any,
  contact: Function,
  click: Function
};

export default class Result extends Component<Props> {
  constructor(props: Props) {
    super(props);

    (this: any).additionalResults = this.additionalResults.bind(this);
  }

  /**
   * Calculate the offender age based on DD/MM/YYYY
   * @param dateString
   * @returns {number}d
   */
  static pipeAge(dateString: string): number {
    if (!dateString) {
      return 0;
    }
    const today = new Date(),
      splitDate = dateString.substr(0, dateString.indexOf(' ')).split('-'),
      birthDate = new Date(
        [splitDate[1], splitDate[2], splitDate[0]].join('/')
      ),
      m = today.getMonth() - birthDate.getMonth(),
      age = today.getFullYear() - birthDate.getFullYear();

    return m < 0 || (m === 0 && today.getDate() < birthDate.getDate())
      ? age - 1
      : age;
  }

  /**
   *
   * @param dateString
   * @returns {string}
   */
  static pipeDate(dateString: string): string {
    const splitDate = dateString.substr(0, dateString.indexOf(' ')).split('-');
    return [splitDate[2], splitDate[1], splitDate[0]].join('/');
  }

  /**
   *
   * @param num
   * @returns {string}
   */
  static pipeGender(num: number) {
    return num === 545 ? 'Male' : 'Female';
  }

  /**
   *
   * @returns {Array}
   */
  additionalResults() {
    const searched = this.props.params.trim().split(' '),
      data = this.props.data;

    // Restricted or excluded record
    if (data.CURRENT_RESTRICTION || data.CURRENT_EXCLUSION) {
      return [];
    }

    let deepItems = new Set();

    function findTerm(source, term) {
      let isFound = false;
      source.forEach(item => {
        isFound =
          (term.length > 1 &&
            item &&
            item
              .toString()
              .toLowerCase()
              .includes(term.toLowerCase())) ||
          isFound;
      });
      return isFound;
    }

    searched.forEach(term => {
      if (data.hasOwnProperty('ALIASES')) {
        data.ALIASES.forEach(alias => {
          if (findTerm([alias.FIRST_NAME, alias.SURNAME], term)) {
            deepItems.add('Alias: ' + alias.SURNAME + ', ' + alias.FIRST_NAME);
          }
          if (findTerm([alias.SECOND_NAME, alias.THIRD_NAME], term)) {
            deepItems.add(
              'Alias other names: ' +
                alias.SECOND_NAME +
                ', ' +
                alias.THIRD_NAME
            );
          }
        });
      }

      if (findTerm([data.PNC_NUMBER], term)) {
        deepItems.add('PNC: ' + data.PNC_NUMBER);
      }

      if (findTerm([data.SECOND_NAME, data.THIRD_NAME], term)) {
        deepItems.add(
          'Other names: ' + data.SECOND_NAME + ', ' + data.THIRD_NAME
        );
      }

      if (findTerm([data.PREVIOUS_SURNAME], term)) {
        deepItems.add('Previous surname: ' + data.PREVIOUS_SURNAME);
      }

      if (data.hasOwnProperty('ADDRESSES')) {
        data.ADDRESSES.forEach(address => {
          if (
            findTerm(
              [
                address.TOWN_CITY,
                address.STREET_NAME,
                address.COUNTY,
                address.POSTCODE
              ],
              term
            )
          ) {
            deepItems.add(
              'Address: ' +
                address.ADDRESS_NUMBER +
                ' ' +
                address.STREET_NAME +
                ', ' +
                address.TOWN_CITY +
                ', ' +
                address.COUNTY +
                '. ' +
                address.POSTCODE
            );
          }
        });
      }
    });

    return Array.from(deepItems);
  }

  /**
   * Render
   * @returns {XML}
   */
  render() {
    const data = this.props.data,
      searched = this.props.params.trim().split(' '),
      restricted = data.CURRENT_RESTRICTION || data.CURRENT_EXCLUSION;

    return (
      <div>
        <div className="panel panel-border-narrow">
          <a
            className="clickable heading-large no-underline"
            onClick={() => {
              this.props.click(this.props.id);
            }}>
            <Highlighter
              highlightClassName="highlight"
              searchWords={searched}
              autoEscape={true}
              textToHighlight={
                restricted
                  ? 'Restricted access'
                  : data.SURNAME +
                    ', ' +
                    data.FIRST_NAME +
                    ' - ' +
                    Result.pipeDate(data.DATE_OF_BIRTH_DATE)
              }
            />
          </a>

          <p className="no-margin bottom">
            <span className="bold">
              CRN:&nbsp;
              <Highlighter
                highlightClassName="highlight"
                searchWords={searched}
                autoEscape={true}
                textToHighlight={data.CRN}
              />
            </span>
            &nbsp;&nbsp;
            {data.CURRENT_HIGHEST_RISK_COLOUR !== null && (
              <span id="risk">
                Risk&nbsp;
                <span
                  className={
                    'risk-icon risk-' +
                    data.CURRENT_HIGHEST_RISK_COLOUR.toLowerCase()
                  }
                />
              </span>
            )}
            {!restricted && (
              <span>
                {data.CURRENT_DISPOSAL > 0 && (
                  <span>
                    &nbsp;|&nbsp;
                    <span id="currentDisposal">Current offender</span>
                    &nbsp;|&nbsp;
                  </span>
                )}
                <Highlighter
                  highlightClassName="highlight"
                  searchWords={searched}
                  autoEscape={true}
                  textToHighlight={
                    Result.pipeGender(data.GENDER_ID) +
                    ', ' +
                    Result.pipeAge(data.DATE_OF_BIRTH_DATE)
                  }
                />
              </span>
            )}
          </p>

          {this.additionalResults().map((item, i) => (
            <div key={i}>
              <Highlighter
                highlightClassName="highlight"
                searchWords={searched}
                autoEscape={true}
                textToHighlight={item}
              />
            </div>
          ))}

          <p>
            <a
              id={'contact-' + this.props.id}
              className="clickable"
              onClick={this.props.contact}>
              Add contact
            </a>
          </p>
        </div>
        <div>&nbsp;</div>
      </div>
    );
  }
}
