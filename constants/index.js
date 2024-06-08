export const categories = [
  {
    id: '1',
    name: 'concerts',
  },
  {
    id: '2',
    name: 'conventions',
  },
  {
    id: '3',
    name: 'conferences',
  },
  {
    id: '4',
    name: 'parties',
  },
]

export const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  category: '',
  price: '',
  isFree: false,
  url: '',
}
