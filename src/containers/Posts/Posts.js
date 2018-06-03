import React, { Component } from "react";

import Axios from "../../../src/axios";

//import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

import Post from "../../components/Post/Post";
import FullPost from "../FullPost/FullPost";

import "./Posts.css";

class Posts extends Component {
  state = {
    posts: []
    //selectedPostId: null,
    //error: false
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
    this.props.history.push({ pathname: "/" + id });
    //this.props.history.push({"/" + id });
  }

  render() {
    let posts = <p>Something went wrong...</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          // <Link to={"/" + post.id} key={post.id}>
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
          // </Link>
        );
      });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>;
        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}
export default Posts;
