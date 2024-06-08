import EventCard from '@/components/shared/EventCard'
import ReturnButton from '@/components/shared/ReturnButton'
import { getEventById } from '@/lib/actions.js/event.actions'

const EventDetailPage = async ({ params: { id } }) => {
  const event = await getEventById(id)

  return (
    <section className="flex-1">
      {/* <div>{params.id}</div> */}

      <div className="w-4/5 mx-auto my-2">
        <div className="my-4">
          <ReturnButton />
        </div>
        <EventCard event={event} />
      </div>
    </section>
  )
}

export default EventDetailPage
