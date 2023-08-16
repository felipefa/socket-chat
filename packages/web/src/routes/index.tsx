import React from 'react';
import { Route, Routes as RoutesFromReactRouterDom } from 'react-router-dom';

import { Chat } from '../pages';

const Routes: React.FC = () => (
  <RoutesFromReactRouterDom>
    <Route path="/" Component={Chat} />
  </RoutesFromReactRouterDom>
);

export default Routes;
