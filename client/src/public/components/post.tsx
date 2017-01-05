import * as  React from "react";
import { Component } from "react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";

class Post extends Component<any, any>  {
    constructor(props) {
        super(props);
        this.state = { postItem: {} }
    }

    componentWillMount() {
        $.ajax({
            url: 'http://localhost:3000/api/post/' + this.props.params.user + '/' + this.props.params.postid
        }).done(function (data) {
            this.setState({ postItem: data.item });         
        }.bind(this));
    }

    render() {       
        return (
            <div> <h1>POST </h1>
                <span>{this.state.postItem.id} </span>
            </div>
        );
    }
}



export default Post;