import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/event-search";
import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";

function EventPage() {
  const events = getAllEvents();
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

export default EventPage;
