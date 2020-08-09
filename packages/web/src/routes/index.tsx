import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Chat } from '../pages';

const Routes: React.FC = () => (
  <Switch>
    <Redirect exact from="/" to="/chat" />
    <Route path="/chat" component={Chat} />
  </Switch>
);

export default Routes;
