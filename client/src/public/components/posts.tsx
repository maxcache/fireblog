import * as  React from "react";
import { Component } from "react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";

class Posts extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { selectedUser: "vikram", posts: [], lastKey: {}, nextString: "Next", completed: false };

    }

    componentDidMount() {
        console.log(this.state)
        $.ajax({
            url: 'http://localhost:3000/api/posts?user=' + this.state.selectedUser
        }).done(function (data) {
            this.setState({ posts: data.items, lastKey: data.lastKey });
        }.bind(this));
    }


    getNext(e, item) {
        e.preventDefault();
        var newArray = this.state.posts;
        console.log(this.state.posts)
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
                <h3>{post.id}</h3>
                <h3>{post.Author}</h3>
            </div>
        );
        const url = '#/?page=' + this.state.lastKey.toString();
        const next = <a disabled={this.state.completed} href={url} onClick={(e) => this.getNext(e, this.state.lastKey.toString())}> {this.state.nextString} {this.state.lastKey.toString()} </a>;
        return (
            <div>
                {content}
                {next}
            </div>
        );
    }
}




export default Posts;