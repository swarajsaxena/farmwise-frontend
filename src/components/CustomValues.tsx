import { useState } from 'react'
import { Label } from '../shadcn/components/ui/label'
import { FiPlus } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid'
import { FormItemState } from '../App'
import { cn } from '../shadcn/lib/utils'

const CustomValues = ({
  label,
  setActiveValue,
  activeValue,
  customStyle,
}: {
  label: string
  setActiveValue: React.Dispatch<React.SetStateAction<any | undefined>>
  activeValue: any | undefined
  number?: boolean
  customStyle?: string
}) => {
  let [value, setValue] = useState('')
  return (
    <div
      className={cn(
        'flex flex-col w-full max-w-sm items-start gap-1.5',
        customStyle
      )}
    >
      <Label>{label}</Label>
      <div className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm flex-wrap gap-2 min-h-10 h-full items-start justify-start'>
        {activeValue.length > 0 && (
          <div className='flex flex-wrap gap-2 mt-1'>
            {activeValue.map((val: FormItemState['values'][0]) => (
              <div
                onClick={() => {
                  setActiveValue(
                    activeValue.filter(
                      (v: FormItemState['values'][0]) => v.id !== val.id
                    )
                  )
                }}
                className='flex gap-1 items-center bg-primary/20 text-secondary-foreground hover:bg-primary/10 transition-all px-2 pl-3 py-1 rounded-md cursor-pointer'
                key={val.id}
              >
                {val.value}
                <FiPlus className='text-primary text-sm h-4 w-4 cursor-pointer rotate-45' />
              </div>
            ))}
          </div>
        )}
        <input
          type='text'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='outline-none border-none w-full resize-none'
          placeholder='type to add, press enter'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              if (value !== '') {
                setActiveValue([...activeValue, { value: value, id: uuidv4() }])
                setValue('')
              }
            }
          }}
        />
      </div>
    </div>
  )
}

export default CustomValues
