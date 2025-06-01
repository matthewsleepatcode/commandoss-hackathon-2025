'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import WrapLabel from '../wrap-label'

interface Props {
  className?: string
  label?: string
  isCheckbox?: boolean
  onChange?: (value: DateRange | undefined) => void
  placeholder?: string
  value?: DateRange
}

export function DatePickerWithRange({
  className,
  label,
  isCheckbox,
  onChange,
  placeholder = 'Pick a date',
}: Props) {
  const [date, setDate] = React.useState<DateRange | undefined>()

  const [checked, setChecked] = React.useState<boolean>(false)
  const isDisable = !checked && isCheckbox

  const handleChecked = (checked: boolean) => {
    setChecked(checked)
    if (!checked) {
      setDate(undefined)
      onChange?.(undefined)
    }
  }

  const handleSetDay = (value: DateRange | undefined) => {
    setDate(value)
    onChange?.(value)
  }

  return (
    <WrapLabel
      label={label}
      isCheckbox={isCheckbox}
      handleChecked={handleChecked}
      checked={checked}
    >
      <div className={cn('grid gap-2', className)}>
        <Popover>
          <PopoverTrigger asChild disabled={isDisable}>
            <Button
              id="date"
              variant={'outline'}
              className={cn(
                'justify-start text-left font-normal',
                !date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>{placeholder}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleSetDay}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </WrapLabel>
  )
}
