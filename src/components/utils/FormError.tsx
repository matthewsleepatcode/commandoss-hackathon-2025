import { CircleAlert } from "lucide-react"
import { PropsWithChildren } from "react"
import { Label } from "../ui/label"
import { cn } from "@/lib/utils"

interface Props extends PropsWithChildren {
  error?: string 
  className?: string
}

const WrapError = ({ children, error, className, }: Props) => {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {children}
      {
        Boolean(error) && (
          <div className="flex gap-1">
            <CircleAlert size={'16'} className="text-red-500" />
            <Label className="text-red-500 text-xs">{error}</Label>
          </div>
        )
      }
    </div>
  )
}

export default WrapError