import React from "react";
import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function PostContent(props) {
  const { post } = props;
  console.log(post.image);

  if (!post) {
    console.error("Post is null or undefined in PostContent.");
    return <p>Post not found.</p>; // Fallback UI
  }

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    paragraph(paragraph) {
      const { node } = paragraph;
      if (node.children[0].type === "image") {
        const image = node.children[0];
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.url}`}
              alt={image.alt || "Post Image"}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },

    code(code) {
      const { language, value } = code;
      return (
        <SyntaxHighlighter
          // style={atomOneDark}
          language={language}
          children={value}
        />
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
