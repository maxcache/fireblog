import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, browserHistory } from 'react-router';
import routes from './routes';

import  injectTapEventPlugin  from 'react-tap-event-plugin';

//injectTapEventPlugin();
//injectTapEventPlugin();

 
ReactDOM.render(
   <Router history={browserHistory}>{routes}</Router>,
    document.getElementById('container'));
