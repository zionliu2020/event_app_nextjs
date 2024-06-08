'use server'

import { connectToDatabase } from '@/lib/database'
import connectDB from '../database/mongoose'

import { handleError } from '@/lib/utils'
import Event from '../database/models.js/event.models'
import { revalidatePath } from 'next/cache'

// CREATE
export async function createEvent({ event }) {
  try {
    // await connectToDatabase()
    await connectDB()

    const newEvent = await Event.create({
      ...event,
    })
    revalidatePath('/')

    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    handleError(error)
    // console.log(error)
  }
}

// UPDATE
export async function updateEvent({ event }) {
  try {
    await connectDB()

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event },
      { new: true }
    )
    revalidatePath('/')

    return JSON.parse(JSON.stringify(updatedEvent))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteEvent(eventId) {
  console.log(eventId)
  try {
    await connectDB()

    const deletedEvent = await Event.findByIdAndDelete(eventId)
    if (deletedEvent) revalidatePath('/')
  } catch (error) {
    handleError(error)
  }
}

// GET ONE EVENT BY ID
export async function getEventById(eventId) {
  try {
    await connectDB()

    const event = await Event.findById(eventId)

    if (!event) throw new Error('Event not found')

    return JSON.parse(JSON.stringify(event))
  } catch (error) {
    handleError(error)
  }
}

// GET ALL EVENTS
export async function getAllEvents({ query, categoryName }) {
  try {
    await connectDB()

    const titleCondition = query
      ? { title: { $regex: query, $options: 'i' } }
      : {}
    const categoryCondition = categoryName
      ? { category: { $regex: categoryName, $options: 'i' } }
      : {}
    const conditions = {
      $and: [titleCondition, categoryCondition],
    }

    const result = await Event.find(conditions)
    // const events = stringify(result)
    // return events
    const data = await JSON.parse(JSON.stringify(result))
    return data
    // return result
  } catch (error) {
    handleError(error)
  }
}
