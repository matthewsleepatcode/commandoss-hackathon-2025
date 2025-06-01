import React, { PropsWithChildren, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ArrowUp } from 'lucide-react'

interface Props extends PropsWithChildren {
  className?: string
  classNameTrigger?: string
  childrenTrigger?: React.ReactNode
  asChild?: boolean
  side?: 'left' | 'right' | 'top' | 'bottom'
  modal?: boolean
  classNameOpened?: string
}

const ModalDropdown = ({
  className,
  children,
  childrenTrigger,
  asChild = false,
  classNameTrigger,
  side,
  modal = true,
  classNameOpened,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={modal}>
      <DropdownMenuTrigger
        className={cn(
          'p-0 px-[16px] border border-primary/10 hover:border-yellow1 data-[state=open]:bg-yellow3 data-[state=open]:border-yellow1 cursor-pointer rounded-md foscus:outline-none bg-inherit outline-none w-full min-h-[40px]',
          classNameTrigger,
          isOpen && classNameOpened,
        )}
        asChild={asChild}
      >
        <div
          className={cn(
            'flex items-center gap-[12px] justify-between',
            classNameTrigger,
          )}
        >
          {childrenTrigger}
          <ArrowUp
            size={16}
            className={cn(
              'transition-rotate duration-300',
              isOpen && 'rotate-180',
            )}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={side} className={className}>
        <DropdownMenuItem className={className}>{children}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ModalDropdown
