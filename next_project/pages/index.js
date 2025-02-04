import EventList from "@/components/events/event-list";
import NewsletterRegistration from "@/components/input/newsletter-registration";

import { getFeaturedEvents } from "@/helper/api-util";
import Head from "next/head";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta name="description" content="Finds the best events for you" />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.items} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      items: featuredEvents,
    },
    revalidate: 1800,
  };
}
export default HomePage;
