import React, { Component } from "react";

import Axios from "../../../src/axios";

import Post from "../../components/Post/Post";
import "./Posts.css";

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };

  componentDidMount() {
    console.log(this.props);
    Axios.get("/posts")
      .then(res => {
        const posts = res.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Rav"
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(err => this.setState({ error: true }));
  }

  postSelectedHandler(id) {
    this.setState({ selectedPostId: id });
  }

  render() {
    let posts = <p>Something went wrong...</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }
    return <section className="Posts">{posts}</section>;
  }
}
export default Posts;
