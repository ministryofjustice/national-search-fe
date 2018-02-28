import React, { Component } from 'react';
import Utils from '../utils/Utils';

type Props = {};
type State = {
  offender: Object
};

export default class SubHeader extends Component<Props, State> {
  /**
   *
   * @param props
   */
  constructor(props: Props) {
    super(props);
    this.state = { offender: props.location.state.offender, addressOpen: -1 };
  }

  render() {
    const offender = this.state.offender,
      restricted = offender.CURRENT_RESTRICTION || offender.CURRENT_EXCLUSION;

    return (
      <div className="sub-header">
        <hr className="dotted" />

        <div className="pull-left pad-left">
          <p className=" delius text-white font-xxsmall">
            CRN: <span className="text-blue">{offender.CRN}</span>
            {!restricted && (
              <span>
                {' '}
                Name:{' '}
                <span className="text-blue">
                  {offender.FIRST_NAME + ' ' + offender.SURNAME}
                </span>{' '}
                D.O.B: {Utils.pipeDate(offender.DATE_OF_BIRTH_DATE)} ({Utils.pipeAge(
                  offender.DATE_OF_BIRTH_DATE
                )}) Offender Manager:{' '}
                <span className="text-blue">Created, CRC</span> - CRC Created,
                CPS Manchester
              </span>
            )}
            {!!restricted && <span> Restricted access</span>}
          </p>
          {!restricted && (
            <p className="delius text-white font-xxsmall">
              Remand Status:{' '}
              {offender.CURRENT_REMAND_STATUS || 'Not Applicable'} Tier:{' '}
              {offender.CURRENT_TIER || 'Not Yet Assessed'}
            </p>
          )}
        </div>
        <div className="pull-right pad-right">
          <span className="risk-icon-top" /> <span className="risk-icon-top" />{' '}
          <span className="risk-icon-top" /> <span className="risk-icon-top" />{' '}
          <span className="risk-icon-top" />{' '}
        </div>
      </div>
    );
  }
}
