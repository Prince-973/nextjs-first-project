import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/event-search";
import { getAllEvents } from "@/helper/api-util";

import { useRouter } from "next/router";

function EventPage(props) {
  const events = props.events;
  const router = useRouter();
  function findEventhandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <div>
      <EventsSearch onSearch={findEventhandler} />
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const event = await getAllEvents();

  return {
    props: {
      events: event,
    },
    revalidate: 60,
  };
}

export default EventPage;
