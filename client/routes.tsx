import * as React from 'react';
import * as Router from 'react-router';
import { Route, IndexRoute } from 'react-router';

import AdminHome from './src/admin/views/admin.view';
import HomeView from './src/public/views/home.view';
import AppFrame from './src/app.view';

var routeMap = (
    <Route path="/" component={AppFrame}>
        <IndexRoute component={HomeView}/>
        <Route path="/admin" component={AdminHome}/>    
    </Route>
);

export default routeMap;