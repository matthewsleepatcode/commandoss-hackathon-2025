import * as React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface CheckboxInputProps {
  label: string
  inputPlaceholder?: string
}

const CheckboxInput = ({
  label,
  inputPlaceholder,
  ...props
}: CheckboxInputProps) => {
  const [checked, setChecked] = React.useState<boolean>(false)

  const handleChecked = (checked: boolean) => {
    setChecked(checked)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="checkbox"
          checked={checked}
          onCheckedChange={handleChecked}
        />
        <Label htmlFor="checkbox" className="text-sm font-medium">
          {label}
        </Label>
      </div>
      <Input
        type="text"
        placeholder={inputPlaceholder}
        disabled={!checked}
        {...props}
      />
    </div>
  )
}

export default CheckboxInput
