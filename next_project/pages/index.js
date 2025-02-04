import EventList from "@/components/events/event-list";
import { getAllEvents } from "@/dummy-data";
import { getFeaturedEvents } from "@/helper/api-util";

function HomePage(props) {
  return (
    <div>
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
