import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";

import { getAllEvents, getEventById } from "@/helper/api-util";
import { Fragment } from "react";

function Eventdetail(props) {
  const event = props.selectedEvent;
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>;
      </div>
    );
  }
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.image}
        imageAlt={event.title}
        image={event.image}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default Eventdetail;

export async function getStaticProps(context) {
  const { params } = context;
  const EventId = params.eventId;
  const event = await getEventById(EventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => {
    return {
      params: {
        eventId: event.id,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}
