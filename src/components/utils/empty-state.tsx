import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { FileX } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  isFullHeight?: boolean
}

const EmptyState = ({
  title = 'No Data',
  isFullHeight = false,
}: EmptyStateProps) => {
  return (
    <Card
      className={cn(
        'flex flex-col items-center justify-center text-center p-6',
        isFullHeight ? 'h-full min-h-[400px]' : 'h-auto',
      )}
    >
      <FileX className="h-8 w-8 text-gray-400" />
      <h3 className="mt-4 text-gray-500">{title}</h3>
    </Card>
  )
}

export default EmptyState
