import React, { useState } from 'react'
import { CopyCheckIcon, CopyIcon } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { Button } from '../ui/button'

const Copy = ({ value }: { value: string }) => {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const onCopy = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      toast({ title: 'Copied!', description: value, duration: 2000 })
      setTimeout(() => setCopied(false), 1000) // Reset icon
    } catch (err) {
      console.error('Copy failed', err)
    }
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onCopy}
            className="p-1"
          >
            {copied ? (
              <CopyCheckIcon size={14} />
            ) : (
              <CopyIcon size={14} className="text-gray-400" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          {value}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Copy
