// @flow
import React from 'react';
import { Route, Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <span className="far fa-home"> </span> Home
      </li>
      <SearchMenuItem to={'/'} />
      <li>
        <span className="far fa-eye"> </span> National Custody Search
      </li>
      <li>
        <span className="far fa-history"> </span> Recently Viewed
      </li>
      <li>
        <span className="far fa-briefcase"> </span> Case Management
      </li>
      <FakeSubmenu to={'/details'} />
      <li>
        <span className="far fa-calendar"> </span> Officer Diary
      </li>
      <li>
        <span className="far fa-bank"> </span> Court Diary
      </li>
      <li>
        <span className="far fa-bed"> </span> Approved Premises Diary
      </li>
      <li>
        <span className="far fa-book"> </span> UPW Project Diary
      </li>
      <li>
        <span className="far fa-paint-brush"> </span> UPW Projects
      </li>
      <li>
        <span className="far fa-wrench"> </span> Data Maintenance
      </li>
      <li>
        <span className="far fa-database"> </span> Reference Data
      </li>
      <li>
        <span className="far fa-user"> </span> User Administration
      </li>
      <li>
        <span className="far fa-cog"> </span> User Preferences
      </li>
      <li>
        <span className="far fa-power-off"> </span> Exit
      </li>
    </ul>
  </nav>
);

const SearchMenuItem = ({ to }) => (
  <Route
    path={to}
    exact={true}
    children={({ match }) => (
      <li className={match ? 'active' : ''}>
        <span className="far fa-search"> </span>
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

export default Navigation;
