import React, { Component } from 'react';
import Highlighter from 'react-highlight-words';

export default class Result extends Component {

  /**
   *
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      otherNames: '',
      locations: ''
    };
  }

  /**
   * 
   */
  componentDidMount() {
    const data = this.props.data;

    let tmpAdditional = [],
      tmpAddress = [];

    if (data.PREVIOUS_SURNAME) {
      tmpAdditional.push(data.PREVIOUS_SURNAME);
    }
    if (data.SECOND_NAME) {
      tmpAdditional.push(data.SECOND_NAME);
    }
    if (data.THIRD_NAME) {
      tmpAdditional.push(data.THIRD_NAME);
    }

    data.ADDRESSES.forEach((address) => {
      tmpAddress.push(address.TOWN_CITY)
    });

    this.setState({
      otherNames: tmpAdditional.length ? tmpAdditional.join(', ') : '',
      locations: tmpAddress.length ? tmpAddress.filter(function(item, pos, self) {
        return self.indexOf(item) === pos;
      }).join(', ') : ''
    });
  }

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
          <table role="presentation">
            <tbody>
            <tr>
              <td className="no-padding">
                <a id={this.props.id} className="clickable heading-large no-underline" onClick={this.props.click}><Highlighter highlightClassName="highlight" searchWords={searched} autoEscape={true} textToHighlight={data.SURNAME + ', ' + data.FIRST_NAME} /></a>

                {this.state.otherNames &&
                  <div className="no-margin bottom">
                    <Highlighter highlightClassName="highlight" searchWords={searched} autoEscape={true} textToHighlight={this.state.otherNames} />
                  </div>
                }

                {this.state.locations &&
                  <div className="no-margin bottom">
                    <Highlighter highlightClassName="highlight" searchWords={searched} autoEscape={true} textToHighlight={this.state.locations} />
                  </div>
                }

                <p className="form-label-bold no-margin bottom">Date of birth: <Highlighter highlightClassName="highlight" searchWords={searched} autoEscape={true} textToHighlight={this.pipeDate(data.DATE_OF_BIRTH_DATE)} /></p>
                <p className="form-label-bold no-margin bottom">CRN: <Highlighter highlightClassName="highlight" searchWords={searched} autoEscape={true} textToHighlight={data.CRN} /></p>
                <p className="form-label-bold no-margin bottom">PNC: <Highlighter highlightClassName="highlight" searchWords={searched} autoEscape={true} textToHighlight={data.PNC_NUMBER.toString()} /></p>
                <p className="no-margin top"><Highlighter highlightClassName="highlight" searchWords={searched} autoEscape={true} textToHighlight={this.pipeGender(data.GENDER_ID) + ', ' + this.pipeAge(data.DATE_OF_BIRTH_DATE)} /></p>

                {data.CURRENT_HIGHEST_RISK_COLOUR &&
                  <p>Risk: {data.CURRENT_HIGHEST_RISK_COLOUR}</p>
                }
              </td>
              <td width="110"><img src="images/placeholder.png" alt="placeholder" /></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div>&nbsp;</div>
      </div>
    );
  }
}
