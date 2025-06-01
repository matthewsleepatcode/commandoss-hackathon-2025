import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from '../ui/dialog'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  trigger: React.ReactNode
  loading?: boolean
}

export const DialogModal = ({ children, trigger, loading }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogTitle className="sr-only"></DialogTitle>
      <DialogContent className="max-h-[25rem] overflow-auto">
        <div className="flex flex-col text-pretty gap-4">
          <p className="text-lg font-semibold">
            {loading ? 'Thinking...' : 'Result'}
          </p>
          <div>{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
