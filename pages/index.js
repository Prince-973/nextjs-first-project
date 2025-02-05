import Hero from "@/components/home-page/hero";
import FeatiredPosts from "@/components/home-page/feature-posts";
export default function Home() {
  const DUMMY_POST = [
    {
      slug: "getting-started-with-nextjs",
      title: "Getting Started with Nextjs",
      image: "getting-started-with-nextjs.jpg",
      excerpt:
        "Nextjs is React FrameWork - it makes building fullstack React app and sites a breeze and ships with built-in SSR",
      date: "2025-02-10",
    },
    {
      slug: "getting-started-with-nextjs2",
      title: "Getting Started with Nextjs",
      image: "getting-started-with-nextjs.png",
      excerpt:
        "Nextjs is React FrameWork - it makes building fullstack React app and sites a breeze and ships with built-in SSR",
      date: "2025-02-10",
    },
    {
      slug: "getting-started-with-nextjs3",
      title: "Getting Started with Nextjs",
      image: "getting-started-with-nextjs.png",
      excerpt:
        "Nextjs is React FrameWork - it makes building fullstack React app and sites a breeze and ships with built-in SSR",
      date: "2025-02-10",
    },
    {
      slug: "getting-started-with-nextjs4",
      title: "Getting Started with Nextjs",
      image: "getting-started-with-nextjs.png",
      excerpt:
        "Nextjs is React FrameWork - it makes building fullstack React app and sites a breeze and ships with built-in SSR",
      date: "2025-02-10",
    },
  ];
  return (
    <>
      <Hero />
      <FeatiredPosts posts={DUMMY_POST} />
    </>
  );
}
