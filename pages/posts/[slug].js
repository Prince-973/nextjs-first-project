import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostFile } from "@/lib/post-util";
import React from "react";

function PostDeatailPage(props) {
  return <PostContent post={props.post} />;
}

export function getStaticProps(context) {
  const { params } = context;
  // console.log(params);

  const slug = params.slug;
  // console.log("slug", slug);

  const post = getPostData(`${slug}.md`);

  return {
    props: {
      post,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFileNames = getPostFile();

  const slugs = postFileNames.map((fileName) => fileName.replace(/.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: "blocking",
  };
}
export default PostDeatailPage;
