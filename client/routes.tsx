import * as React from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import HomeView from './src/public/views/home.view';
import AppFrame from './src/app.view';
import Post from './src/public/components/post';

var routeMap = (
    <Router history={hashHistory}>
        <Route path="/" component={AppFrame}>
            <IndexRoute component={HomeView} />
            <Route path="/post/:user/:postid" component={Post} />
        </Route>
    </Router>
);

export default routeMap;