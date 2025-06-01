import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MaskedTextProps {
  text: string
  className?: string
}

const MaskedText = ({ text, className }: MaskedTextProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={cn('relative flex items-center gap-2', className)}>
      <span
        className={cn(
          'transition-opacity',
          isVisible ? 'opacity-100' : 'blur-sm',
        )}
      >
        {text}
      </span>

      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="text-gray-500 hover:text-gray-700 transition"
      >
        {isVisible ? (
          <Eye className="h-5 w-5" />
        ) : (
          <EyeOff className="h-5 w-5" />
        )}
      </button>
    </div>
  )
}

export default MaskedText
