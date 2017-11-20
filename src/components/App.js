import React from 'react'
import { Switch, Route } from 'react-router-dom'

import NoMatch from './NoMatch';
import PhaseBanner from './PhaseBanner';

import Search from '../scenes/search/components/Search';
import Feedback from '../scenes/feedback/components/Feedback';

const App = () => (
  <main id="content">
    <PhaseBanner/>
    <Switch>
      <Route exact path='/' component={Search}/>
      <Route exact path='/feedback' component={Feedback}/>
      <Route component={NoMatch}/>
    </Switch>
  </main>
);

export default App;
