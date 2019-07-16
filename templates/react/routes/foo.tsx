import React, { lazy } from 'react';
import { Route } from 'react-router';

const Create = lazy(() => import('../components/{{{lc}}}/Create'));
const Update = lazy(() => import('../components/{{{lc}}}/Update'));
const Show = lazy(() => import('../components/{{{lc}}}/Show'));
const List = lazy(() => import('../components/{{{lc}}}/List'));

export default [
  <Route path="/{{{name}}}/create" component={Create} exact key="create" />,
  <Route path="/{{{name}}}/edit/:id" component={Update} exact key="update" />,
  <Route path="/{{{name}}}/show/:id" component={Show} exact key="show" />,
  <Route path="/{{{name}}}/" component={List} exact strict key="list" />,
  <Route path="/{{{name}}}/:page" component={List} exact strict key="page" />
];