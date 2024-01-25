import CustomInput from '../CustomInput'
import CustomSelect from '../CustomSelect'
import CustomValues from '../CustomValues'

export function DropDownFields(props: any) {
  return (
    <div className='grid grid-cols-3 place-content-center w-full h-full gap-4 '>
      <CustomInput
        activeValue={props.formItem.fieldName}
        setActiveValue={(val) => props.handleFieldChange('fieldName', val)}
        label='Field Name'
        customStyle=''
      />
      <CustomSelect
        activeValue={props.formItem.fieldDataType}
        setActiveValue={(val) => props.handleFieldChange('fieldDataType', val)}
        label='Field Type'
        items={[
          {
            value: 'string',
            label: 'String',
          },
          {
            value: 'number',
            label: 'number',
          },
        ]}
      />
      <CustomValues
        customStyle='row-span-2'
        label='Values'
        activeValue={props.formItem.values}
        setActiveValue={(val) => props.handleFieldChange('values', val)}
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

      <CustomSelect
        activeValue={props.formItem.fieldDefaultData}
        setActiveValue={(val) =>
          props.handleFieldChange('fieldDefaultData', val)
        }
        label='Default Value'
        items={
          props.formItem.values
            ? props.formItem.values.map((value: any) => ({
                label: value.value,
                value: value.value,
              }))
            : []
        }
      />
    </div>
  )
}
