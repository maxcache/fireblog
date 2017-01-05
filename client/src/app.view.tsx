import * as React from 'react';
//import * as Router from 'react-router';
import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import { deepOrange500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500
    },
});

export default class AppFrame extends React.Component<any, any> {


    constructor(props) {
        super(props);
        this.state = { open: false };

    }

    handleToggle = () => this.setState({ open: !this.state.open });

    handleClose = () => this.setState({ open: false });

    render() {
        // this.handleToggle();
        return <MuiThemeProvider>
            <div>
                <RaisedButton
                    label="Open Drawer"
                    onClick={this.handleToggle}
                    />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}></Drawer>

                <div className='app-content'>  {this.props.children}</div>
            </div>
        </MuiThemeProvider>;
    }
}