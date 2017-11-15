import React, { Component } from 'react';
import Highlighter from 'react-highlight-words';

export default class Result extends Component {

  /**
   * Calculate the offender age based on DD/MM/YYYY
   * @param dateString
   * @returns {number}
   */
  pipeAge = (dateString) => {
    const today = new Date(),
      splitDate = dateString.substr(0, 10).split('-'),
      birthDate = new Date([splitDate[1], splitDate[2], splitDate[0]].join('/')),
      m = today.getMonth() - birthDate.getMonth(),
      age = today.getFullYear() - birthDate.getFullYear();

    return m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
  };

  /**
   *
   * @param dateString
   * @returns {string}
   */
  pipeDate = (dateString) => {
    const splitDate = dateString.substr(0, 10).split('-');
    return [splitDate[2], splitDate[1], splitDate[0]].join('/');
  };

  /**
   * Uppercase first character
   * @param num
   * @returns {string}
   */
  pipeGender = (num) => {
    return num === 545 ? 'Male' : 'Female';
  };

  /**
   * Render
   * @returns {XML}
   */
  render() {

    const data = this.props.data,
      searched = this.props.params.split(' ');

    return (
      <div>
        <div className="panel panel-border-narrow">

          <a id={this.props.id} className="clickable heading-large no-underline" onClick={this.props.click}><Highlighter highlightClassName="highlight" searchWords={searched} autoEscape={true} textToHighlight={data.SURNAME + ', ' + data.FIRST_NAME + ' - ' + this.pipeDate(data.DATE_OF_BIRTH_DATE)} /></a>

          <p className="no-margin bottom">
            <span className="bold">CRN: <Highlighter highlightClassName="highlight" searchWords={searched} autoEscape={true} textToHighlight={data.CRN} /></span>
            &nbsp;&nbsp;
            {data.CURRENT_HIGHEST_RISK_COLOUR !== null &&
              <span>Risk <span className={'risk-icon risk' + data.CURRENT_HIGHEST_RISK_COLOUR}> </span>&nbsp;|&nbsp;</span>
            }
            {data.CURRENT_REMAND_STATUS &&
              <span>{data.CURRENT_REMAND_STATUS}&nbsp;|&nbsp;</span>
            }

            <Highlighter highlightClassName="highlight" searchWords={searched} autoEscape={true} textToHighlight={this.pipeGender(data.GENDER_ID) + ', ' + this.pipeAge(data.DATE_OF_BIRTH_DATE)} />
          </p>

        </div>
        <div>&nbsp;</div>
      </div>
    );
  }
}
