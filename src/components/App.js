// @flow
import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import PhaseBanner from './PhaseBanner';

import Search from '../scenes/search/components/Search';
import OffenderDetails from '../scenes/offender-details/components/OffenderDetails';
import Feedback from '../scenes/feedback/components/Feedback';

const App = () => (
  <main id="content">
    <PhaseBanner />
    <Switch>
      <Route exact path="/" component={Search} />
      <Route exact path="/details" component={OffenderDetails} />
      <Route exact path="/feedback" component={Feedback} />
      <Redirect to="/" />
    </Switch>
  </main>
);

export default App;
