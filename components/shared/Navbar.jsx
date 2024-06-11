import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="p-4 flex flex-row justify-around items-center">
      <div>
        <Link href="/">
          <h1 className="font-bold text-2xl">Event Hub</h1>
        </Link>
      </div>
      <ul className="flex flex-row justify-around gap-4">
        <li className="hover:underline">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:underline">
          <Link href="/events/create">Create Event</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
