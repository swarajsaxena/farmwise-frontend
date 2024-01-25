import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '../shadcn/lib/utils'
import { Button } from '../shadcn/components/ui/button'
import { Calendar } from '../shadcn/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../shadcn/components/ui/popover'
import { Label } from '../shadcn/components/ui/label'

export function DatePicker({
  activeValue,
  label = 'Select A Date',
  setActiveValue,
}: {
  label?: string
  setActiveValue?:
    | React.Dispatch<React.SetStateAction<any | undefined>>
    | undefined
  activeValue?: any | undefined
}) {
  console.log(activeValue)

  return (
    <Popover>
      <PopoverTrigger>
        <div className='grid w-full gap-1.5'>
          <Label className='text-left'>{label}</Label>
          <Button
            variant={'outline'}
            className={cn(
              'justify-start text-left font-normal',
              !activeValue && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {activeValue ? format(activeValue, 'PPP') : <span>{label}</span>}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className='p-0'>
        <Calendar
          mode='single'
          selected={activeValue}
          onSelect={(day) => {
            if (setActiveValue) {
              setActiveValue(day)
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
