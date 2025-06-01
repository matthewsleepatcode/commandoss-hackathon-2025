'use client'

import { Switch } from '../ui/switch'
import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'

import { Label } from '../ui/label'

interface IFormSwitch {
  label: string
}
const FormSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & IFormSwitch
>(({ label, ...props }, ref) => {
  return (
    <div className="flex items-center justify-between gap-1">
      <Label>{label}</Label>
      <Switch ref={ref} {...props} />
    </div>
  )
})

FormSwitch.displayName = 'FormSwitch'

export { FormSwitch }
