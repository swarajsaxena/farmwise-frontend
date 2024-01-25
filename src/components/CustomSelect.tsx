import { Label } from '../shadcn/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../shadcn/components/ui/select'
import { cn } from '../shadcn/lib/utils'

const CustomSelect = ({
  label,
  items,
  setActiveValue,
  activeValue,
  classname,
}: {
  label: string
  items: { label: string; value: string }[]
  setActiveValue?: React.Dispatch<React.SetStateAction<any | undefined>>
  activeValue?: any | undefined
  classname?: string
}) => {
  return (
    <div
      className={cn(
        'flex flex-col w-full max-w-sm items-start gap-1.5',
        classname
      )}
    >
      <Label>{label}</Label>
      <Select
        value={activeValue}
        onValueChange={(val) => setActiveValue && setActiveValue(val)}
      >
        <SelectTrigger className=''>
          <SelectValue placeholder={label || 'Select a value'} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default CustomSelect
