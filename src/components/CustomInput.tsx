import { useState } from 'react'
import { Input } from '../shadcn/components/ui/input'
import { Label } from '../shadcn/components/ui/label'
import { cn } from '../shadcn/lib/utils'

const CustomInput = ({
  label,
  setActiveValue,
  activeValue,
  number = false,
  customStyle,
  max,
}: {
  label: string
  setActiveValue?: React.Dispatch<React.SetStateAction<any | undefined>>
  activeValue?: any | undefined
  number?: boolean
  customStyle?: string
  max?: number
}) => {
  const [inputValue, setInputValue] = useState(activeValue)

  return (
    <div
      className={cn('flex flex-col w-full items-start gap-1.5', customStyle)}
    >
      <Label>{label}</Label>
      <Input
        value={inputValue}
        onChange={(e) => {
          const maxLength = max || 0
          const value = e.target.value

          if (value.length > maxLength) {
            setInputValue(value.slice(0, maxLength))
          } else {
            setInputValue(value)
          }
        }}
        id={label}
        placeholder={label}
        type={number ? 'number' : 'text'}
        min={0}
        maxLength={max}
      />
    </div>
  )
}

export default CustomInput
