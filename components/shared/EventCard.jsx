'use client'

import React, { useTransition } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'
import { deleteEvent } from '@/lib/actions.js/event.actions'
import { useRouter } from 'next/navigation'

const EventCard = ({ event }) => {
  const {
    title,
    description,
    category,
    location,
    imageUrl,
    price,
    isFree,
    createdAt,
    startDate,
    endDate,
    _id,
  } = event

  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  if (event)
    return (
      <div className="relative w-full max-h-[500px] overflow-hidden bg-white border-gray-100 shadow-lg rounded-sm">
        <div className="relative top-0 left-0 ">
          <Link href={`/events/${event._id}`}>
            <Image
              src={event.imageUrl ? event.imageUrl : '/assets/new_year_eve.jpg'}
              width={800}
              height={600}
              alt="music_festival"
              className="w-full h-[250px] object-cover rounded-t-sm"
            />
          </Link>
          <div className="absolute bottom-2 right-2 flex flex-row gap-2">
            {/* --------update-------- */}
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <Link href={`/events/${event._id}/update`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-8 bg-white/80 rounded-xl p-1 cursor-pointer hover:bg-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit event</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* ------------delete--------- */}
            <AlertDialog asChild>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>
                    <AlertDialogTrigger asChild>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-8 bg-white/80 rounded-xl p-1 cursor-pointer hover:bg-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </AlertDialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete event</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your event.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      deleteEvent(_id)

                      toast({
                        title: 'Final',
                        description: 'Event deleted!',
                        duration: 3000,
                      })
                      router.push('/')
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Badge
            variant="outline"
            className="absolute top-1 left-1 bg-white/70"
          >
            {event.category}
          </Badge>
        </div>
        <CardHeader>
          <CardTitle>{event.title ? event.title : 'this is a title'}</CardTitle>
          <div>
            <p>Price: ${price}</p>
          </div>
          <div>
            <p>Start Date: {dayjs(event.startDate).format('MM/DD/YYYY')}</p>
          </div>
          <div>
            <p>End Date: {dayjs(event.endDate).format('MM/DD/YYYY')}</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-row ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <p className="mr-2">Location:</p>
          <p> {event.location}</p>
        </CardContent>
        <CardFooter>
          {event.description ? event.description : 'description'}
        </CardFooter>
      </div>
    )

  return (
    <div className="w-full bg-white border-gray-100 shadow-lg rounded-sm">
      <div>
        <Link href="/">
          <Image
            src="/assets/new_year_eve.jpg"
            width={800}
            height={600}
            alt="music_festival"
            className="w-full h-[250px] object-cover rounded-t-sm"
          />
        </Link>
      </div>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </div>
  )
}

export default EventCard
