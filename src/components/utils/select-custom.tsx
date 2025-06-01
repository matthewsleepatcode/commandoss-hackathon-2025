import React, { useEffect, useState } from 'react'
import { ChevronsUpDown, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import WrapLabel from './wrap-label'
import RenderIf from './RenderIf'
import _compact from 'lodash/compact'
import { cn } from '@/lib/utils'

type Option = { value: string; label: React.ReactNode }

interface CustomSelectProps {
  type?: 'single' | 'multi'
  options: Option[]
  value?: string | (string | null)[]
  onChange?: (value: string | string[]) => void
  placeholder?: string
  placeholderSearch?: string
  isCheckbox?: boolean
  label?: string
  isSearch?: boolean
  isRequired?: boolean
  triggerFlex?: boolean
  errorMessage?: string
}

export function SelectCustom({
  type = 'single',
  options,
  value = '',
  onChange,
  placeholder = 'Select',
  placeholderSearch = 'Search',
  isCheckbox,
  label,
  isSearch,
  isRequired,
  triggerFlex = false,
  errorMessage,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | (string | null)[]>('')

  const [checked, setChecked] = useState<boolean>(false)

  const isMulti = type === 'multi'

  const selectedValues = _compact(
    Array.isArray(selected) ? selected : [selected],
  )
  const selectedLabels = options
    .filter((v) => selectedValues.includes(v.value))
    .map((v) => v.label)

  const isDisable = isCheckbox && !checked

  useEffect(() => {
    setSelected(value)
  }, [value])

  const handleChecked = (checked: boolean) => {
    setChecked(checked)
    if (!checked) {
      setSelected('')
      onChange?.('')
    }
  }

  const toggleSelect = (val: string) => {
    if (isMulti) {
      const newValue = selectedValues.includes(val)
        ? selectedValues.filter((v) => v !== val)
        : [...selectedValues, val]
      setSelected(newValue)
      onChange && onChange(newValue)
    } else {
      onChange && onChange(val)
      setSelected(val)
      setOpen(false)
    }
  }

  const renderLabelMulti = () => {
    return selectedLabels.length > 4 ? (
      <Badge className="flex items-center space-x-1">
        {`${selectedLabels.length} Selected`}
      </Badge>
    ) : (
      selectedLabels.map((val, idx) => (
        <Badge key={idx} className="flex items-center space-x-1">
          {val}
        </Badge>
      ))
    )
  }

  return (
    <WrapLabel
      label={label}
      isCheckbox={isCheckbox}
      handleChecked={handleChecked}
      checked={checked}
      isRequired={isRequired}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger disabled={isDisable} asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full flex-wrap justify-between',
              triggerFlex && 'min-h-9 h-auto',
            )}
          >
            <div className="flex gap-1 flex-1 font-normal text-left">
              <RenderIf.Group>
                <RenderIf condition={!Boolean(selectedValues.length)}>
                  {placeholder}
                </RenderIf>
                <RenderIf condition={isMulti}>{renderLabelMulti()}</RenderIf>
                <RenderIf condition={!isMulti}>
                  <span className="line-clamp-1 whitespace-normal">
                    {selectedLabels[0]}
                  </span>
                </RenderIf>
              </RenderIf.Group>
            </div>
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="min-w-[var(--radix-popper-anchor-width)] w-full p-0">
          <Command>
            {isSearch && <CommandInput placeholder={placeholderSearch} />}
            <CommandList>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={() => toggleSelect(opt.value)}
                  className="cursor-pointer"
                >
                  {opt.label}
                  {selectedValues.includes(opt.value) && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </WrapLabel>
  )
}
