import EventForm from '@/components/shared/EventForm'
import { getEventById } from '@/lib/actions.js/event.actions'

const UpdateEvent = async ({ params: { id } }) => {
  const event = await getEventById(id)

  return (
    <div className="flex-1 w-full flex flex-col justify-around items-center bg-gray-100">
      <h1>Update Event</h1>
      <EventForm type="Update" event={event} eventId={id} />
    </div>
  )
}

export default UpdateEvent
