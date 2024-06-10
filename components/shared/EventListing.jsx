import EventCard from './EventCard'

const EventListing = ({ events }) => {
  if (events)
    return (
      <section className="w-full m-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-wrap">
        {events.map((event) => (
          <EventCard event={event} key={event._id} />
        ))}
      </section>
    )

  return (
    <section className="w-full m-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-wrap">
      <EventCard />
      <EventCard />
    </section>
  )
}

export default EventListing
