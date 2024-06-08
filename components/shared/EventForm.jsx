'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { categories } from '@/constants'
import { eventDefaultValues } from '@/constants'

import { Textarea } from '@/components/ui/textarea'
import { useState, useEffect } from 'react'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'

import { Checkbox } from '../ui/checkbox'
import { useRouter } from 'next/navigation'
import { createEvent, updateEvent } from '@/lib/actions.js/event.actions'
import { useToast } from '@/components/ui/use-toast'

const EventForm = ({ type, event, eventId }) => {
  const [file, setFile] = useState('')
  const initialValue =
    event && type === 'Update'
      ? {
          ...event,
          startDateTime: new Date(event.startDate),
          endDateTime: new Date(event.endDate),
        }
      : eventDefaultValues

  const router = useRouter()
  const form = useForm({
    defaultValues: initialValue,
  })
  const { toast } = useToast()

  const onSubmit = async (values) => {
    if (type === 'Create')
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: file },
        })

        if (newEvent) {
          form.reset()
          toast({
            title: 'Done',
            description: 'Event Created!',
            duration: 3000,
          })
          router.push('/')
        }
      } catch (error) {
        console.log(error)
      }

    if (type === 'Update') {
      if (!eventId) {
        router.back()
        return
      }

      try {
        const updatedEvent = await updateEvent({
          event: { ...values, imageUrl: file },
        })

        if (updatedEvent) {
          form.reset()
          // revalidatePath('/')
          // router.push(`/events/${updatedEvent._id}`)
          toast({
            title: 'Done',
            description: 'Event Updated!',
            duration: 3000,
          })
          router.push(`/`)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleFile = (e) => {
    const newFile = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result
      setFile(base64String)
    }
    if (newFile) {
      reader.readAsDataURL(newFile)
    }
  }

  useEffect(() => {
    if (event) {
      setFile(event.imageUrl)
    }
  }, [event])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {/* ------------------- title and categories --------------------------- */}
        <div className="flex flex-col gap-4 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            className="basis-1/2"
            render={({ field }) => (
              <FormItem className="basis-2/3">
                <FormControl>
                  <Input
                    // required
                    placeholder="Event title"
                    {...field}
                    value={field.value || ''}
                    className="input-field "
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            className="basis-1/2"
            render={({ field }) => (
              <FormItem className="w-full basis-1/3">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        {/*--------------------- descriptions and file uploader----------------- */}
        <div className="w-full flex flex-col gap-6 justify-between md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileBase64
                    multiple={false}
                    onDone={({ file }) => field.onChange(file)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* <FileBase64 multiple={false} onDone={({ file }) => setFile(file)} /> */}
          <div className="flex flex-row gap-2 self-start  md:self-center">
            <span>File:</span>
            <input type="file" onChange={handleFile} className="inline" />
          </div>
        </div>

        {/* ---------------------- location / address -------------------------- */}
        <div className="flex flex-col gap-4 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center  w-full overflow-hidden rounded-lg bg-grey-50 ">
                    <Input
                      placeholder="Event location or Online"
                      {...field}
                      value={field.value || ''}
                      className=""
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ---------------------- start date and end date ----------------- */}
        <div className="flex flex-col gap-4 md:flex-row ">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl>
                  <div className="w-full flex flex-row  gap-2 ">
                    <p className="whitespace-nowrap text-grey-600 translate-y-1 ">
                      Start Date:
                    </p>
                    <div className="pb-1">
                      <DatePicker
                        format="y-MM-dd"
                        onChange={(date) => field.onChange(date)}
                        value={field.value}
                        className="date-picker "
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className=" w-full flex flex-row gap-2 ">
                    <p className="whitespace-nowrap text-grey-600 mr-[6px] md:mr-0 translate-y-1">
                      End Date:
                    </p>
                    <div>
                      <DatePicker
                        format="y-MM-dd"
                        onChange={(date) => field.onChange(date)}
                        value={field.value}
                        className="date-picker "
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ----------------------- price and URL -------------------------------- */}
        <div className="w-full flex flex-col gap-4 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex flex-row items-center justify-between gap-4  w-full  rounded-full bg-grey-50 ">
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      value={field.value || 0}
                      className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex ">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Free Ticket
                              </label>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree"
                                className="mr-2 h-5 w-5 border-2 border-primary-500"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center  w-full overflow-hidden rounded-lg bg-grey-50 ">
                    <Input
                      placeholder="URL"
                      {...field}
                      value={field.value || ''}
                      className=""
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ----------------------- submit button -------------------------- */}
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Submitting...' : `${type} Event `}
        </Button>
      </form>
    </Form>
  )
}

export default EventForm
