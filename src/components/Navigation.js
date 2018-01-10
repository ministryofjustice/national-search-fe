// @flow
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <span className="far fa-home"> </span> Home
      </li>
      <li className="active">
        <Link className="no-underline" to={'/'}>
          <span className="far fa-search"> </span> National Search
        </Link>
      </li>
      <li>
        <span className="far fa-eye"> </span> National Custody Search
      </li>
      <li>
        <span className="far fa-history"> </span> Recently Viewed
      </li>
      <li>
        <span className="far fa-briefcase"> </span> Case Management
      </li>
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

export default Navigation;
