import * as React from 'react';
import * as Router from 'react-router';
import { Route, IndexRoute } from 'react-router';
import HomeView from './src/public/views/home.view';
import AppFrame from './src/app.view';

var routeMap = (
    <Route path="/" component={AppFrame}>
        <IndexRoute component={HomeView}/>      
    </Route>
);

export default routeMap;