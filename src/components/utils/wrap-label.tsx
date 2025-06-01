import React from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'

interface Props {
  isCheckbox?: boolean
  label?: string
  children: React.ReactNode
  checked?: boolean
  handleChecked?: (checked: boolean) => void
  isRequired?: boolean
  className?: string
}

const WrapLabel = ({
  isCheckbox,
  label,
  children,
  handleChecked,
  checked,
  isRequired = false,
  className,
}: Props) => {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center space-x-2">
        {isCheckbox && (
          <Checkbox
            id="checkbox"
            checked={checked}
            onCheckedChange={handleChecked}
          />
        )}

        <Label htmlFor="checkbox" className="text-sm font-medium">
          {isRequired ? label + ' *' : label}
        </Label>
      </div>
      {children}
    </div>
  )
}

export default WrapLabel
