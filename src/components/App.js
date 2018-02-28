// @flow
import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import PhaseBanner from './PhaseBanner';
import Navigation from './Navigation';

import Search from '../scenes/search/components/Search';
import OffenderDetails from '../scenes/offender-details/components/OffenderDetails';
import Feedback from '../scenes/feedback/components/Feedback';
import SubHeader from './SubHeader';

const App = () => (
  <div>
    <header>
      <span className="title">National Delius</span>
      <nav className="top-nav">
        <span className="margin-right medium">
          <span className="far fa-print" /> Print
        </span>
        <span className="margin-right medium">
          <span className="far fa-file" /> My Documents
        </span>
        <span>
          <span className="far fa-cog" /> User Preferences
        </span>
      </nav>
    </header>

    <Route exact path="/details" component={SubHeader} />

    <div className="grid-flex">
      <div className="column-flex navigation omit-mobile">
        <Navigation />
      </div>
      <div className="column-flex main-content">
        <main
          id="content"
          className={
            window.location.pathname === '/details' ? 'push-down' : ''
          }>
          <PhaseBanner />
          <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path="/details" component={OffenderDetails} />
            <Route exact path="/feedback" component={Feedback} />
            <Redirect to="/" />
          </Switch>
        </main>
        <p className="margin-top medium">&nbsp;</p>
      </div>
    </div>
  </div>
);

export default App;
