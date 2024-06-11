'use client'

import { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@uidotdev/usehooks'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { categories } from '@/constants'

const EventFilter = () => {
  const [query, setQuery] = useState('')
  const debouncedSearchTerm = useDebounce(query, 300)

  const router = useRouter()
  const searchParams = useSearchParams()

  const onSelectedCategory = (value) => {
    let newUrl = ''

    if (value && value !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: value,
      })

      console.log(newUrl)
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['category'],
      })
    }

    router.push(newUrl, { scroll: false })
  }

  useEffect(() => {
    let newUrl = ''
    if (debouncedSearchTerm) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'query',
        value: debouncedSearchTerm,
      })
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['query'],
      })
    }

    router.push(newUrl, { scroll: false })
  }, [debouncedSearchTerm])

  return (
    <section className="event-filter sticky top-2 bg-white/40 rounded-lg p-2 z-20  w-4/5 max-w-[600px] flex flex-col md:flex-row gap-2 my-4">
      <div className="relative  basis-3/5">
        <Input
          type="text"
          placeholder="search events..."
          className="text-right"
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 absolute top-2 left-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <div className=" basis-2/5">
        <Select onValueChange={(value) => onSelectedCategory(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All" className="">
              All
            </SelectItem>
            {categories.map((category) => (
              <SelectItem value={category.name} key={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  )
}

export default EventFilter
