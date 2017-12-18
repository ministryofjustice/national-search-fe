// @flow
import React from 'react';
import { Link } from 'react-router-dom';

const PhaseBanner = () => (
  <div className="phase-banner mobile-pad">
    <p>
      <strong className="phase-tag">PROTOTYPE</strong>
      <span>
        This is an experimental service – your{' '}
        <Link to="feedback">feedback</Link> will help us to improve it.
      </span>
    </p>
  </div>
);

export default PhaseBanner;
