import * as React from 'react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import WrapLabel from './wrap-label'

type ItemToggleType = {
  label: string
  value: string
}

interface Props {
  label?: string
  type?: 'single' | 'multiple'
  options?: ItemToggleType[]
  isCheckbox?: boolean
  onChange?: (value: string | string[]) => void
  value?: string | string[]
  isRequired?: boolean
}

const ToggleGroupOption = ({
  label,
  type = 'multiple',
  options = [],
  isCheckbox,
  onChange,
  value,
  isRequired,
}: Props) => {
  const [checked, setChecked] = React.useState<boolean>(false)
  const isDisabled = isCheckbox && !checked

  const handleChecked = (checked: boolean) => {
    setChecked(checked)
    if (!checked) {
      onChange?.(type === 'multiple' ? [] : '')
    }
  }

  const handleSelect = (selectedValue: string | string[]) => {
    if (isRequired && !selectedValue) return
    onChange?.(selectedValue)
  }

  return (
    <WrapLabel
      label={label}
      isCheckbox={isCheckbox}
      handleChecked={handleChecked}
      checked={checked}
      isRequired={isRequired}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-expect-error */}
      <ToggleGroup
        type={type}
        disabled={isDisabled}
        className="justify-start flex-wrap"
        onValueChange={handleSelect}
        value={value}
      >
        {options.map(({ label, value }, index) => (
          <ToggleGroupItem
            key={index}
            value={value}
            className="border border-input"
          >
            {label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </WrapLabel>
  )
}

export default ToggleGroupOption
