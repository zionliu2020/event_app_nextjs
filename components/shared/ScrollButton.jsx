'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

const ScrollButton = () => {
  return (
    <Button
      className="bg-blue-400 hover:bg-blue-500 rounded-full p-2 "
      onClick={() =>
        window.scroll({
          top: 100,
          left: 100,
          behavior: 'smooth',
        })
      }
    >
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
          d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </Button>
  )
}

export default ScrollButton
