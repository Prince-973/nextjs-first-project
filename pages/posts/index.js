import AllPosts from "@/components/posts/all-post";
import { getAllPosts } from "@/lib/post-util";
import React from "react";

function AllPostsPage(props) {
  return <AllPosts posts={props.posts} />;
}

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostsPage;
