// @flow
import React from 'react';
import { Route, Link } from 'react-router-dom';

const SearchMenuItem = ({ to }) => (
  <Route
    path={to}
    exact={true}
    children={({ match }) => (
      <li className={match ? 'active' : ''}>
        <span className="far fa-search" />
        <Link to={'/'} className="no-underline">
          National Search
        </Link>
      </li>
    )}
  />
);

const FakeSubmenu = ({ to }) => (
  <Route
    path={to}
    exact={true}
    children={({ match }) => (
      <span className={match ? '' : 'js-hidden'}>
        <li className={match ? 'sub-item active' : 'sub-item'}>
          Offender summary
        </li>
        <li className="sub-item">Offender Index</li>
        <li className="sub-item">Event List</li>
        <li className="sub-item">Contact List</li>
        <li className="sub-item">Subject Access Reports</li>
      </span>
    )}
  />
);

const Navigation = () => (
  <nav className={window.location.pathname === '/details' ? 'push-down' : ''}>
    <ul>
      <li>
        <span className="far fa-home" /> Home
      </li>
      <SearchMenuItem to={'/'} />
      <li>
        <span className="far fa-eye" /> National Custody Search
      </li>
      <li>
        <span className="far fa-history" /> Recently Viewed
      </li>
      <li>
        <span className="far fa-briefcase" /> Case Management
      </li>
      <FakeSubmenu to={'/details'} />
      <li>
        <span className="far fa-calendar" /> Officer Diary
      </li>
      <li>
        <span className="far fa-bank" /> Court Diary
      </li>
      <li>
        <span className="far fa-bed" /> Approved Premises Diary
      </li>
      <li>
        <span className="far fa-book" /> UPW Project Diary
      </li>
      <li>
        <span className="far fa-paint-brush" /> UPW Projects
      </li>
      <li>
        <span className="far fa-wrench" /> Data Maintenance
      </li>
      <li>
        <span className="far fa-database" /> Reference Data
      </li>
      <li>
        <span className="far fa-user" /> User Administration
      </li>
      <li>
        <span className="far fa-cog" /> User Preferences
      </li>
      <li>
        <span className="far fa-power-off" /> Exit
      </li>
    </ul>
  </nav>
);

export default Navigation;
