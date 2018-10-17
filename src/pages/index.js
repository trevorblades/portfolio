import Home from './home';
import NotFound from './not-found';
import Projects from './projects';
import React from 'react';
import {Route, Switch} from 'react-router-dom';

const Pages = () => (
  <Switch>
    <Route path="/" exact render={Home} />
    <Route path="/projects" exact render={Projects} />
    <Route render={NotFound} />
  </Switch>
);

export default Pages;
