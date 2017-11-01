import React, { Component } from 'react';

export default class Result extends Component {

  /**
   * Calculate the offender age based on DD/MM/YYYY
   * @param dateString
   * @returns {number}
   */
  pipeAge = (dateString) => {
    const today = new Date(),
      splitDate = dateString.split('/'),
      birthDate = new Date([splitDate[1], splitDate[0], splitDate[2]].join('/')),
      m = today.getMonth() - birthDate.getMonth(),
      age = today.getFullYear() - birthDate.getFullYear();

    return m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
  };

  /**
   *
   * @param string
   * @returns {number}
   */
  pipeCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  /**
   *
   * @returns {XML}
   */
  render() {
    
    const data = this.props.data;

    return (
      <div>
        <div className="panel panel-border-narrow">
          <a id={this.props.id} className="clickable heading-large no-underline" onClick={this.props.click}>{data.surname}, {data.firstName}</a>
          <p className="form-label-bold no-margin bottom">Date of birth: {data.dateOfBirth}</p>
          <p className="form-label-bold no-margin bottom">CRN: {data.crn}</p>
          <p className="form-label-bold no-margin bottom">PNC: {data.pncNumber}</p>
          <p className="no-margin top">{this.pipeCase(data.gender)}, {this.pipeAge(data.dateOfBirth)}, {this.pipeCase(data.nationality)}</p>
          <p className="no-margin top">{this.pipeCase(data.currentRemandStatus)}</p>
        </div>
        <div>&nbsp;</div>
      </div>
    );
  }
}
