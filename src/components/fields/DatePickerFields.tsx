import CustomInput from '../CustomInput'
import CustomSelect from '../CustomSelect'
import { DatePicker } from '../DatePicker'

export function DatePickerFields(props) {
  return (
    <div className='grid grid-cols-3 place-content-center w-full h-full gap-4'>
      <CustomInput
        activeValue={props.formItem.fieldName}
        setActiveValue={(val) => props.handleFieldChange('fieldName', val)}
        label='Field Name'
      />
      <CustomSelect
        activeValue={props.formItem.fieldDataType}
        setActiveValue={(val) => props.handleFieldChange('fieldDataType', val)}
        label='Field Type'
        items={[
          {
            value: 'date',
            label: 'Date',
          },
        ]}
      />
      <DatePicker
        label='Minimum Date'
        activeValue={props.formItem.minDate}
        setActiveValue={(val) => props.handleFieldChange('minDate', val)}
      />
      <DatePicker
        label='Maximum Date'
        activeValue={props.formItem.maxDate}
        setActiveValue={(val) => props.handleFieldChange('maxDate', val)}
      />
      <CustomSelect
        activeValue={props.formItem.mandatory}
        setActiveValue={(val) => props.handleFieldChange('mandatory', val)}
        label='Mandatory'
        items={[
          {
            value: 'true',
            label: 'Yes',
          },
          {
            value: 'false',
            label: 'No',
          },
        ]}
      />
      <DatePicker
        label='Default Value'
        activeValue={props.formItem.fieldDefaultData}
        setActiveValue={(val) =>
          props.handleFieldChange('fieldDefaultData', val)
        }
      />
    </div>
  )
}
