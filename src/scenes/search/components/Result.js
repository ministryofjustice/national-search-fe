import React, { Component } from 'react';
import Highlighter from 'react-highlight-words';

export default class Result extends Component {

    /**
     * Calculate the offender age based on DD/MM/YYYY
     * @param dateString
     * @returns {number}
     */
    pipeAge = (dateString) => {
        if (!dateString) {
            return;
        }
        const today = new Date(),
            splitDate = dateString.substr(0, dateString.indexOf(' ')).split('-'),
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
        const splitDate = dateString.substr(0, dateString.indexOf(' ')).split('-');
        return [splitDate[2], splitDate[1], splitDate[0]].join('/');
    };

    /**
     * 
     * @param num
     * @returns {string}
     */
    pipeGender = (num) => {
        return num === 545 ? 'Male' : 'Female';
    };

    /**
     *
     * @returns {Array}
     */
    additional = () => {

        const searched = this.props.params.split(' '),
            data = this.props.data;

        let deepItems = new Set();

        function findTerm(source, term) {
            let isFound = false;
            source.forEach((item) => {
                if (term !== '' && item.toLowerCase().includes(term.toLowerCase())) {
                    isFound = true;
                }
            });
            return isFound;
        }

        searched.forEach((term) => {

            data.ALIASES.forEach((alias) => {
                if (findTerm([alias.FIRST_NAME, alias.SURNAME], term)) {
                    deepItems.add('Alias: ' + alias.SURNAME + ', ' + alias.FIRST_NAME);
                }
            });

            if (findTerm([data.SECOND_NAME, data.THIRD_NAME], term)) {
                deepItems.add('Other names: ' + data.SECOND_NAME + ', ' + data.THIRD_NAME);
            }

            if (findTerm([data.PREVIOUS_SURNAME], term)) {
                deepItems.add('Previous surname: ' + data.PREVIOUS_SURNAME);
            }

            data.ADDRESSES.forEach((address) => {
                if (findTerm([address.TOWN_CITY, address.STREET_NAME, address.COUNTY, address.POSTCODE], term)) {
                    deepItems.add(address.ADDRESS_NUMBER + ' ' + address.STREET_NAME + ', ' + address.TOWN_CITY + ', ' + address.COUNTY + '. ' + address.POSTCODE);
                }
            });
        });

        return Array.from(deepItems);
    };

    /**
     * Render
     * @returns {XML}
     */
    render() {

        const data = this.props.data,
            searched = this.props.params.split(' '),
            additional = this.additional();

        return (
            <div>
                <div className="panel panel-border-narrow">

                    <a id={this.props.id} className="clickable heading-large no-underline" onClick={this.props.click}>
                        <Highlighter highlightClassName="highlight" searchWords={searched} autoEscape={true} textToHighlight={data.SURNAME + ', ' + data.FIRST_NAME + ' - ' + this.pipeDate(data.DATE_OF_BIRTH_DATE)}/>
                    </a>

                    <p className="no-margin bottom">
                        <span className="bold">CRN: <Highlighter highlightClassName="highlight" searchWords={searched} autoEscape={true} textToHighlight={data.CRN}/></span>
                        &nbsp;&nbsp;
                        {data.CURRENT_HIGHEST_RISK_COLOUR !== null &&
                        <span>Risk <span
                            className={'risk-icon risk-' + data.CURRENT_HIGHEST_RISK_COLOUR.toLowerCase()}> </span>&nbsp;|&nbsp;</span>
                        }
                        {data.CURRENT_DISPOSAL > 0 &&
                        <span>Current offender&nbsp;|&nbsp;</span>
                        }
                        <Highlighter highlightClassName="highlight" searchWords={searched} autoEscape={true} textToHighlight={this.pipeGender(data.GENDER_ID) + ', ' + this.pipeAge(data.DATE_OF_BIRTH_DATE)}/>
                    </p>

                    {additional.map((item, i) =>
                        <div key={i}>
                            <Highlighter highlightClassName="highlight" searchWords={searched} autoEscape={true} textToHighlight={item}/>
                        </div>
                    )}

                    <p><a id={'contact-' + this.props.id} className="clickable" onClick={this.props.contact}>Add contact</a></p>

                </div>
                <div>&nbsp;</div>
            </div>
        );
    }
}
