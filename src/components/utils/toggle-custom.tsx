'use client'

import React from 'react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import RenderIf from './RenderIf'
import { Check } from 'lucide-react'

interface ToggleCustomProps {
  title?: string
  type?: 'single' | 'multiple'
  options: { label: string; value: string }[]
  onChange: (value: string | string[]) => void
  value: string | string[]
  className?: string
}

const ToggleCustom = ({
  type = 'single',
  options,
  onChange,
  value,
  title,
  ...props
}: ToggleCustomProps) => {
  const handleSelect = (selectedValue: string | string[]) => {
    onChange?.(selectedValue)
  }

  return (
    <div className="space-y-2">
      {title && (
        <label className="text-sm font-semibold text-gray-700">{title}</label>
      )}
      {/* @ts-expect-error */}
      <ToggleGroup
        type={type}
        value={value}
        onValueChange={handleSelect}
        {...props}
      >
        {options.map(({ label, value: val }, index) => {
          return (
            <ToggleGroupItem
              key={index}
              value={val}
              className="border border-input"
            >
              <CheckBox condition={val === value} />
              <p className="text-wrap">{label}</p>
            </ToggleGroupItem>
          )
        })}
      </ToggleGroup>
    </div>
  )
}

interface CheckBoxProps {
  condition: boolean
}

const CheckBox = ({ condition }: CheckBoxProps) => {
  return (
    <div className="border border-input size-4 rounded-sm">
      <RenderIf condition={condition}>
        <Check size={14} />
      </RenderIf>
    </div>
  )
}

export default ToggleCustom
