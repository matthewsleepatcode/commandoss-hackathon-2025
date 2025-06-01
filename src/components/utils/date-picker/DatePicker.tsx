'use client'

import * as React from 'react'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { timeFormatUtc } from '@/lib/format'
import WrapLabel from '../wrap-label'

interface Props {
  title?: string
  className?: string
  onChange: (event: unknown) => void
  value?: Date
  placeholder?: string
  isCheckbox?: boolean
}

export function DatePicker({
  title,
  className,
  onChange,
  value,
  placeholder = 'Pick a date',
}: Props) {
  const [date, setDate] = React.useState<Date>()

  const onSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate)
      onChange(newDate.toISOString())
    }
  }

  React.useEffect(() => {
    if (value) {
      setDate(new Date(value))
    }
  }, [value])

  return (
    <WrapLabel label={title}>
      <div className={cn('flex flex-col gap-[8px] w-[280px]', className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'flex gap-[8px] text-left font-normal justify-start',
                !date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon />
              {date ? timeFormatUtc(date, 'PP') : <span>{placeholder}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </WrapLabel>
  )
}
