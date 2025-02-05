import Hero from "@/components/home-page/hero";
import FeatiredPosts from "@/components/home-page/feature-posts";
import { getFeaturedPost } from "@/lib/post-util";
import Head from "next/head";
export default function Home(props) {
  return (
    <>
      <Head>
        <title>AllPages</title>
        <meta
          name="description"
          content="A list of all programming related tutorial and posts"
        />
      </Head>
      <Hero />
      <FeatiredPosts posts={props.posts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPost();

  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 69,
  };
}
