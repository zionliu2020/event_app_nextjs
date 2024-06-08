'use server'

import EventFilter from '@/components/shared/EventFilter'
import EventListing from '@/components/shared/EventListing'
import { getAllEvents } from '@/lib/actions.js/event.actions'
import Image from 'next/image'

export default async function Home({ searchParams }) {
  const searchTerm = searchParams.query ? searchParams.query : ''
  const categoryName = searchParams.category ? searchParams.category : ''

  const events = await getAllEvents({
    query: searchTerm,
    categoryName: categoryName,
  })

  // console.log(events)

  return (
    <main className="w-full  p-4 flex-1 flex flex-col justify-around items-center bg-gray-100">
      <EventFilter />

      {/* <EventListing /> */}
      <EventListing events={events} />
    </main>
  )
}
