import EventCard from '@/components/shared/EventCard'
import { getEventById } from '@/lib/actions.js/event.actions'

const EventDetailPage = async ({ params: { id } }) => {
  const event = await getEventById(id)

  return (
    <div className="flex-1">
      {/* <div>{params.id}</div> */}
      <div>hi</div>
      <div>{id}</div>
      <div className="w-4/5 mx-auto my-2">
        <EventCard event={event} />
      </div>
    </div>
  )
}

export default EventDetailPage
