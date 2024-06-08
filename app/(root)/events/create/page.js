import EventForm from '@/components/shared/EventForm'

const page = () => {
  return (
    <div className="flex-1 w-full flex flex-col justify-around items-center bg-gray-100">
      <h1>Create Event</h1>
      <EventForm type="Create" />
    </div>
  )
}

export default page
