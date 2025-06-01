import * as React from 'react'
import WrapLabel from './wrap-label'
import { Input } from '../ui/input'
import { UseFormSetValue, FieldValues } from 'react-hook-form'
import get from 'lodash/get'
import { Button } from '../ui/button'
import { Eye, EyeOff } from 'lucide-react'

type InputProps = PropsType<typeof Input>

interface Props extends InputProps {
  label?: string
  isCheckbox?: boolean
  isRequired?: boolean
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  value?: string
  className?: string
  setValue?: UseFormSetValue<FieldValues>
  name?: string
  errors?: FieldValues
}

const InputCustom = ({
  label,
  isCheckbox,
  isRequired,
  type = 'text',
  placeholder = label,
  onChange,
  setValue,
  value,
  className,
  name,
  errors,
  ...props
}: Props) => {  
  const [checked, setChecked] = React.useState<boolean>(false)
  const [isShowPassword, setShowPassword] = React.useState<boolean>(false)
  const isPassword = type === 'password'

  const isDisable = !checked && isCheckbox
  const errorMessage = get(errors, `${name}.message`)

  const handleChecked = (checked: boolean) => {
    setChecked(checked)

    if (!checked && setValue && name) {
      setValue(name, '')
    }
  }

  return (
    <WrapLabel
      label={label}
      isCheckbox={isCheckbox}
      handleChecked={handleChecked}
      checked={checked}
      isRequired={isRequired}
      className={className}
    >
      <div className="relative">
        <Input
          autoComplete={'off'}
          type={isPassword ? (isShowPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          onChange={onChange}
          value={value as string}
          disabled={isDisable}
          name={name}
          {...props}
        />

        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!isShowPassword)}
          >
            {isShowPassword ? (
              <EyeOff className="h-5 w-5 text-gray-500" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500" />
            )}
          </Button>
        )}
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </WrapLabel>
  )
}

export default InputCustom
