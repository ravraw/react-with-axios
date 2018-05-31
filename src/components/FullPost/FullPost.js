import React, { Component } from "react";

import Axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  componentDidUpdate() {
    if (this.props.id) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost && this.props.id !== this.state.loadedPost.id)
      ) {
        Axios.get(
          `https://jsonplaceholder.typicode.com/posts/${this.props.id}`
        ).then(res => this.setState({ loadedPost: res.data }));
      }
    }
  }

  render() {
    let post = <p className="FullPost">Please select a Post!</p>;

    if (this.props.id) {
      post = <p className="FullPost">Loading ......</p>;
    }

    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete">Delete</button>
          </div>
        </div>
      );
    }

    return post;
  }
}

export default FullPost;
