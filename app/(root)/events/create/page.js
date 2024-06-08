import EventForm from '@/components/shared/EventForm'

const page = () => {
  return (
    <section className="flex-1 w-full  bg-gray-100">
      <h1 className="font-semibold text-xl text-center py-8 text-indigo-800">
        Create Event
      </h1>
      <div className="w-full p-4 sm:w-4/5 mx-auto">
        <EventForm type="Create" />
      </div>
    </section>
  )
}

export default page
