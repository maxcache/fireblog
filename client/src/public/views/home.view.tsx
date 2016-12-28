import * as React from "react";
import * as ReactDOM from "react-dom";

var HomeView = React.createClass({
    getInitialState: function () {
        return { loaded: false };
    },

    componentDidMount: function () {
        this.setState({ loaded: true });
    },

    render: function () {
        var loading = this.state.loaded ? "" : " (loading...)";
        return <div>
            <h2>Hello public {loading} Vicckky</h2>
        </div>;
    }
});

export default HomeView;