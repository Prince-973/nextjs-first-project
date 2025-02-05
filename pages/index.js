import Hero from "@/components/home-page/hero";
import FeatiredPosts from "@/components/home-page/feature-posts";
import { getFeaturedPost } from "@/lib/post-util";
export default function Home(props) {
  // console.log("props", props.posts);

  return (
    <>
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
