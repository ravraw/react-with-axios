import React, { Component } from "react";

import Axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost && this.props.id !== this.state.loadedPost.id)
      ) {
        Axios.get(`/posts/${this.props.match.params.id}`).then(res =>
          this.setState({ loadedPost: res.data })
        );
      }
    }
  }

  deletePostHandler = () => {
    Axios.delete(`/posts/${this.props.id}`).then(res => {
      console.log(res);
    });
  };

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
            <button className="Delete" onClick={this.deletePostHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }

    return post;
  }
}

export default FullPost;
