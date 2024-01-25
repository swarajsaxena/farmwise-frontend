import { FiPlus } from 'react-icons/fi'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../shadcn/components/ui/table'
import { format } from 'date-fns'

interface Props {
  fields: any[]
  handleFieldDelete: any
}

export function CustomTable({ fields, handleFieldDelete }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className=''>Action</TableHead>
          <TableHead className=''>Name</TableHead>
          <TableHead className=''>Field Type</TableHead>
          <TableHead className=''>Data Type</TableHead>
          <TableHead className=''>Validation</TableHead>
          <TableHead className=''>Values</TableHead>
          <TableHead className=''>Mandatory</TableHead>
          <TableHead className=''>Default Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((value) => (
          <TableRow key={value.id}>
            <TableCell className=''>
              <div
                className='p-1 rounded-full bg-red-500/10 text-red-500 w-max text-lg cursor-pointer'
                onClick={() => handleFieldDelete(value.id)}
              >
                <FiPlus className='rotate-45' />
              </div>
            </TableCell>
            <TableCell className=''>{String(value.fieldName || '-')}</TableCell>
            <TableCell className='capitalize'>
              {String(value.fieldType || '-')
                .split('_')
                .join(' ')}
            </TableCell>
            <TableCell className=''>
              {String(value.fieldDataType || '-')}
            </TableCell>
            <TableCell className=''>
              {value.fieldType === 'text_box' ? (
                <div>Max {String(value.maxFieldLength || '-')} digits</div>
              ) : value.fieldType === 'date_picker' ? (
                <div>
                  Between {format(value.minDate || new Date(), 'dd/MM/yyyy')}{' '}
                  and {format(value.maxDate || new Date(), 'dd/MM/yyyy')}
                </div>
              ) : (
                '-'
              )}
            </TableCell>
            <TableCell className='max-w-[100px] break-words text-wrap h-max'>
              {value.values.length
                ? value.values.map((val: any) => val.value).join(', ')
                : '-'}
            </TableCell>
            <TableCell className=''>{String(value.mandatory || '-')}</TableCell>
            <TableCell className=''>
              {value.fieldType === 'date_picker'
                ? value.fieldDefaultData
                  ? format(value.fieldDefaultData, 'dd/MM/yyyy')
                  : '-'
                : String(value.fieldDefaultData || '-')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
