import { Textarea } from '../ui/textarea'
import * as React from 'react'

import { Label } from '../ui/label'

interface IFormTextarea {
  label: string
}
const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & IFormTextarea
>(({ label, ...props }, ref) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <Label>{label}</Label>
      <Textarea ref={ref} {...props} />
    </div>
  )
})

FormTextarea.displayName = 'FormTextarea'

export { FormTextarea }
