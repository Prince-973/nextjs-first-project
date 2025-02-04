export async function getAllEvents() {
  const res = await fetch(
    "https://nextjs-project-6657f-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );
  const data = await res.json();
  const transformedEvents = [];
  for (const key in data) {
    transformedEvents.push({
      id: key,
      ...data[key],
    });
  }
  return transformedEvents;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
