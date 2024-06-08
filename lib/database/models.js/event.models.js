import { Schema, model, models } from 'mongoose'

const EventSchema = new Schema({
  title: { type: String, required: true, default: 'title' },
  description: { type: String, default: '1' },
  location: { type: String, default: '11' },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, default: 'i am an image' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  price: { type: String, default: 0 },
  isFree: { type: Boolean, default: false },
  url: { type: String, default: '1' },
  category: { type: String, default: '1' },
})

const Event = models.Event || model('Event', EventSchema)

export default Event
