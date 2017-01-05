import * as  React from "react";
import { Component } from "react";
import * as ReactDOM from "react-dom";
import { Link } from 'react-router'
import * as $ from "jquery";
import Post from './post';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Posts extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { selectedUser: "vikram", posts: [], lastKey: {}, nextString: "Next", completed: false };

    }

    componentDidMount() {

        $.ajax({
            url: 'http://localhost:3000/api/posts?user=' + this.state.selectedUser
        }).done(function (data) {
            this.setState({ posts: data.items, lastKey: data.lastKey });
        }.bind(this));


    }


    getNext(e, item) {
        e.preventDefault();
        var newArray = this.state.posts;
        if (item != "") {
            $.ajax({
                url: 'http://localhost:3000/api/posts?user=' + this.state.selectedUser + '&page=' + item
            }).done(function (data) {
                data.items.forEach(element => {
                    if (newArray.indexOf(element) < 0) {
                        newArray.push(element);
                    }
                });
                this.setState({ posts: newArray });
                if (Object.keys(data.lastKey).length === 0 && data.lastKey.constructor === Object) {
                    this.setState({ lastKey: "", nextString: "Finished :)", completed: true });
                } else {
                    this.setState({ lastKey: data.lastKey });
                }

            }.bind(this));
        }
        return false;
    }

    render() {
        const content = this.state.posts.map((post) =>
            <div key={post.id}>
                <Card>
                    <CardHeader
                        title={post.title}
                        subtitle={post.Author} />
                    <CardTitle title="Card title" subtitle={post.id} />
                    <CardText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
                    <CardActions>
                        <Link to={`/post/${post.Author}/${post.id}`}>Read </Link>
                        <FlatButton target="_blank" label="Read" href={`/post/${post.Author}/${post.id}`}></FlatButton>

                    </CardActions>
                </Card></div>
        );
        const url = '#/?page=' + this.state.lastKey.toString();
        const next = <a disabled={this.state.completed} href={url} onClick={(e) => this.getNext(e, this.state.lastKey.toString())}> {this.state.nextString} {this.state.lastKey.toString()} </a>;
        return (
            <div id="content">
                {content}
                {next}
            </div>
        );
    }
}




export default Posts;