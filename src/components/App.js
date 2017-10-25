import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PhaseBanner from './PhaseBanner';
import Search from '../scenes/search/components/Search';
import Results from '../scenes/results/components/Results';
import Feedback from '../scenes/feedback/components/Feedback';
import NoMatch from './NoMatch';

const App = () => (
  <main id="content">
    <PhaseBanner/>
    <Switch>
      <Route exact path='/' component={Search}/>
      <Route exact path='/results' component={Results}/>
      <Route exact path='/feedback' component={Feedback}/>
      <Route component={NoMatch}/>
    </Switch>
  </main>
);

export default App;
