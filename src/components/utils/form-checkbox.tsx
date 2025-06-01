'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import React from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

import { cn } from '@/lib/utils'

interface IFormCheckbox {
  label: string
}
const FormCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & IFormCheckbox
>(({ label, ...props }, ref) => {

  return (
    <div
      className={cn(
        props.disabled && "cursor-not-allowed"
      )}>
      <Label
        className={cn(
          "flex items-center gap-1 w-fit",
          'hover:text-gray-500 cursor-pointer',
          props.disabled && "text-gray-500 cursor-not-allowed"
        )}>
        <Checkbox ref={ref} {...props} />
        {label}
      </Label>
    </div>
  )
})
FormCheckbox.displayName = 'FormCheckbox'

export default FormCheckbox
