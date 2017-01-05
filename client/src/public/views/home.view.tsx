import * as React from "react";
import * as ReactDOM from "react-dom";
import Posts from "../components/posts";

var HomeView = React.createClass({
    getInitialState: function () {
        return { loaded: false };
    },

    componentDidMount: function () {
        this.setState({ loaded: true });
    },

    render: function () {
        var loading = this.state.loaded ? "" : " (loading...)";
        return <div><Posts /></div>;
    }
});

export default HomeView;