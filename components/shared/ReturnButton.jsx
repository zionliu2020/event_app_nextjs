'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const ReturnButton = () => {
  const router = useRouter()

  return (
    <Button
      className="bg-white border border-blue-200 text-black hover:bg-blue-200/20 hover:underline px-6"
      onClick={() => {
        router.back()
      }}
    >
      {'< '}Back
    </Button>
  )
}

export default ReturnButton
