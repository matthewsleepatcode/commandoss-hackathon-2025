import { CircleAlert } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import RenderIf from './RenderIf'

interface Option<T> {
  value: string
  label: string
  meta?: T
}

interface Props<T> {
  title: string
  value?: string
  error?: string
  placeholder?: string
  options?: Option<T>[]
  onValueChange?: (newValue: string) => void
}

const FormSelect = <T,>({
  title,
  value,
  error,
  placeholder,
  options = [],

  onValueChange,
}: Props<T>) => {
  const [selectOptions, setSelectOptions] = useState<Option<T>[]>(options)

  const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    if (!value) {
      setSelectOptions(options)
      return
    }
    const option = selectOptions.filter((v) => {
      const label = v.label.toLowerCase()

      return label.indexOf(value) !== -1
    })
    setSelectOptions(option)
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>{title}</Label>
      <Select value={value} onValueChange={onValueChange} autoComplete="off">
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <Input onChange={handleTextChange} placeholder="search" />
          {selectOptions.map((option) => {
            return (
              <SelectItem
                autoFocus={false}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
      <RenderIf condition={Boolean(error)}>
        <div className="flex gap-1">
          <CircleAlert size={'16'} className="text-red-500" />
          <Label className="text-red-500 text-xs">{error}</Label>
        </div>
      </RenderIf>
    </div>
  )
}

export { FormSelect }
