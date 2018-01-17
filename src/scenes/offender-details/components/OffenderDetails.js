// @flow
import React, { Component } from 'react';
import Utils from '../../../utils/Utils';

type Props = {
  location: Object
};
type State = {
  offender: Object,
  addressOpen: any
};

export default class OffenderDetails extends Component<Props, State> {
  /**
   *
   * @param props
   */
  constructor(props: Props) {
    super(props);
    this.state = { offender: props.location.state.offender, addressOpen: -1 };
    console.info(this.state.offender);

    (this: any).handleAddressClick = this.handleAddressClick.bind(this);
  }

  /**
   *
   */
  componentWillMount() {
    window.scrollTo(0, 0);
  }

  /**
   *
   * @param event
   */
  handleAddressClick(event: any) {
    const clickId = parseInt(event.target.id, 10);

    this.setState(prevState => {
      return { addressOpen: clickId === prevState.addressOpen ? -1 : clickId };
    });
  }

  /**
   *
   * @returns {*}
   */
  render() {
    const offender = this.state.offender,
      restricted = offender.CURRENT_RESTRICTION || offender.CURRENT_EXCLUSION;

    return (
      <div className="mobile-pad">
        <h1 className="heading-xlarge">Offender summary</h1>

        <h2 className="font-large">
          {restricted
            ? 'Restricted access'
            : offender.SURNAME +
              ', ' +
              offender.FIRST_NAME +
              ' - ' +
              Utils.pipeDate(offender.DATE_OF_BIRTH_DATE)}
        </h2>
        <p className="margin-top no-margin-bottom">
          <span className="bold">CRN: {offender.CRN}</span>
          {offender.CURRENT_HIGHEST_RISK_COLOUR !== null && (
            <span id="risk">
              &nbsp;Risk&nbsp;
              <span
                className={
                  'risk-icon risk-' +
                  offender.CURRENT_HIGHEST_RISK_COLOUR.toLowerCase()
                }
              />
            </span>
          )}
          {!restricted && (
            <span>
              {offender.CURRENT_DISPOSAL > 0 && (
                <span>&nbsp;|&nbsp;Current offender&nbsp;|&nbsp;</span>
              )}
              {Utils.pipeGender(offender.GENDER_ID) +
                ', ' +
                Utils.pipeAge(offender.DATE_OF_BIRTH_DATE)}
            </span>
          )}
        </p>

        {restricted === 1 && (
          <div>
            <hr />
            <p>
              {offender.CURRENT_RESTRICTION
                ? offender.RESTRICTION_MESSAGE
                : offender.EXCLUSION_MESSAGE}
            </p>
          </div>
        )}

        {restricted !== 1 && (
          <div className="margin-top">
            <hr />

            <h3 className="bold margin-bottom">Offender details</h3>

            <p>{offender.OFFENDER_DETAILS}</p>

            <p className="no-margin-bottom">
              <strong>Previous surname:</strong> {offender.PREVIOUS_SURNAME}
            </p>
            <p className="no-margin-bottom">
              <strong>Other names:</strong>{' '}
              {offender.SECOND_NAME + ', ' + offender.THIRD_NAME}
            </p>
            <p className="no-margin-bottom">
              <strong>NI Number:</strong> {offender.NI_NUMBER}
            </p>
            {offender.CURRENT_REMAND_STATUS !== null && (
              <p className="no-margin-bottom">
                <strong>Status:</strong> {offender.CURRENT_REMAND_STATUS}
              </p>
            )}

            <hr />

            <h3 className="bold margin-bottom">Contact details</h3>

            <p className="no-margin-bottom">
              <strong>Telephone:</strong> {offender.TELEPHONE_NUMBER}
            </p>
            <p className="no-margin-bottom">
              <strong>Mobile:</strong> {offender.MOBILE_NUMBER}
            </p>
            <p className="no-margin-bottom">
              <strong>Email:</strong> {offender.E_MAIL_ADDRESS}
            </p>
            <p className="no-margin-bottom">
              <strong>Interpreter required:</strong>{' '}
              {offender.INTERPRETER_REQUIRED ? 'Yes' : 'No'}
            </p>

            {offender.ADDRESSES.length > 0 && (
              <div>
                <hr />

                <h3 className="bold margin-bottom">Address history</h3>

                {offender.ADDRESSES.map((address, i) => (
                  <div key={i}>
                    <a
                      className={
                        this.state.addressOpen === i
                          ? 'expand-content clickable no-margin-bottom active'
                          : 'expand-content clickable no-margin-bottom'
                      }
                      id={i}
                      onClick={this.handleAddressClick}>
                      {address.NO_FIXED_ABODE === 'Y'
                        ? 'No fixed abode'
                        : address.ADDRESS_NUMBER +
                          ' ' +
                          address.STREET_NAME +
                          ', ' +
                          address.TOWN_CITY +
                          ', ' +
                          address.COUNTY +
                          '. ' +
                          address.POSTCODE}
                    </a>

                    <div
                      className={
                        this.state.addressOpen === i
                          ? 'panel panel-border-narrow'
                          : 'js-hidden'
                      }>
                      <p className="no-margin-bottom">
                        <span className="bold">Start date:</span>{' '}
                        {Utils.pipeDate(address.START_DATE)}
                      </p>
                      <p className="no-margin-bottom">
                        <span className="bold">End date:</span>{' '}
                        {address.END_DATE}
                      </p>
                      <p>
                        <span className="bold">Telephone:</span>{' '}
                        {address.TELEPHONE_NUMBER}
                      </p>

                      <h3 className="bold">Notes</h3>
                      <p>{address.NOTES}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {offender.ALIASES.length > 0 && (
              <div>
                <hr />

                <h3 className="bold margin-bottom">Known aliases</h3>

                {offender.ALIASES.map((alias, i) => (
                  <p key={i} className="no-margin-bottom">
                    {alias.SURNAME +
                      ', ' +
                      alias.FIRST_NAME +
                      ' - ' +
                      Utils.pipeDate(alias.DATE_OF_BIRTH_DATE)}
                  </p>
                ))}
              </div>
            )}

            <hr />

            <h3 className="bold margin-bottom">Other records</h3>

            <p className="no-margin-bottom">
              <strong>PNC:</strong> {offender.PNC_NUMBER}
            </p>
            <p className="no-margin-bottom">
              <strong>CRO:</strong> {offender.CRO_NUMBER}
            </p>
            <p className="no-margin-bottom">
              <strong>NOMS:</strong> {offender.NOMS_NUMBER}
            </p>

            <hr />

            <h3 className="bold margin-bottom">Notes</h3>

            <p>{offender.NOTES}</p>
          </div>
        )}
      </div>
    );
  }
}
