import { DatePicker } from './DatePicker'
import CustomInput from './CustomInput'
import CustomSelect from './CustomSelect'
import { FormField } from '../App'
import { Button } from '../shadcn/components/ui/button'
import { useState } from 'react'

const Form = ({ fields }: { fields: FormField[] }) => {
  let [formState, setFormState] = useState(
    fields.map((val) => ({
      fieldName: val.fieldName,
      fieldId: val.id,
      value: undefined,
    }))
  )

  const handleChange = (value: any, fieldId: string) => {
    setFormState((prevFormState) => {
      return prevFormState.map((field) => {
        if (field.fieldId === fieldId) {
          return {
            ...field,
            value: value,
          }
        } else {
          return field
        }
      })
    })
  }

  return (
    <div className='flex flex-col gap-4 p-6 border-dashed border-2 border-primary rounded-lg w-full'>
      {fields.map((value, index) => {
        switch (value.fieldType) {
          case 'date_picker':
            return (
              <DatePicker
                label={value.fieldName}
                key={value.id}
                activeValue={formState[index].value}
                setActiveValue={(val) => handleChange(val, value.id)}
              />
            )
          case 'text_box':
            return (
              <CustomInput
                label={value.fieldName}
                key={value.id}
                number={value.fieldDataType === 'number'}
                max={value.maxFieldLength}
                activeValue={formState[index].value}
                setActiveValue={(val) => handleChange(val, value.id)}
              />
            )
          case 'dropdown':
            return (
              <CustomSelect
                label={value.fieldName}
                key={value.id}
                items={value.values.map((v) => ({
                  label: v.value,
                  value: v.value,
                }))}
                activeValue={formState[index].value}
                setActiveValue={(val) => handleChange(val, value.id)}
              />
            )
        }
      })}
      <Button onClick={() => location.reload()}>Submit</Button>
    </div>
  )
}

export default Form
