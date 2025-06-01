import { cn } from '@/lib/utils'
import {
  AccountStatus,
  ReviewStatus,
} from '@/view/AccountScreen/types/account.types'
import React from 'react'
import { Label } from '../ui/label'
import { formatText } from '@/lib/format'

export enum StatusType {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
}
interface Props {
  children?: React.ReactNode
  type?: AccountStatus | ReviewStatus | StatusType | 'COMPLETED' | string
}

const Status = ({ type = StatusType.DISABLED, children }: Props) => {
  const isEnabled =
    type === AccountStatus.OPEN ||
    type === StatusType.ENABLED ||
    type === 'COMPLETED' || type === 'YES'
  const isPending = type === ReviewStatus.PENDING
  const isReview = type === ReviewStatus.REVIEWING

  return (
    <div
      className={cn(
        'text-txtCloseGray500 bg-bgCloseGray50 pt-[2px] pr-2 pb-[2px] pl-2 text-center rounded-3xl w-fit content-center',
        {
          'bg-bgSuccessBlue25 text-txtSuccessBlue500': isEnabled,
          'bg-bgWarning50 text-txtWarning800': isPending || isReview,
        },
      )}
    >
      <Label>{children || formatText(type)}</Label>
    </div>
  )
}

export default Status
