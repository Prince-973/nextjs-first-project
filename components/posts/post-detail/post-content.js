import React from "react";
import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkdown from "react-markdown";

function PostContent(props) {
  const { post } = props;
  // console.log(post.image);

  if (!post) {
    console.error("Post is null or undefined in PostContent.");
    return <p>Post not found.</p>; // Fallback UI
  }

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    code({ language, value }) {
      return (
        <SyntaxHighlighter
          style={atomOneDark}
          language={language || "javascript"}
        >
          {value}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
