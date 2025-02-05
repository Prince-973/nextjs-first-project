import React from "react";
import classes from "./feature-posts.module.css";
import PostGrid from "../posts/post-grid";
function FeatiredPosts(porps) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostGrid posts={porps.posts} />
    </section>
  );
}

export default FeatiredPosts;
