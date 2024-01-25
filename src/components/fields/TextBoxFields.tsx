import CustomSelect from '../../components/CustomSelect'
import CustomInput from '../../components/CustomInput'

export function TextBoxFields({
  formItem,
  handleFieldChange,
}: {
  formItem: any
  handleFieldChange: any
}) {
  return (
    <div className='grid grid-cols-3 place-content-center w-full h-full gap-4'>
      <CustomInput
        activeValue={formItem.fieldName}
        setActiveValue={(val) => handleFieldChange('fieldName', val)}
        label='Field Name'
      />
      <CustomSelect
        activeValue={formItem.fieldDataType}
        setActiveValue={(val) => handleFieldChange('fieldDataType', val)}
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
      <CustomInput
        activeValue={formItem.maxFieldLength}
        setActiveValue={(val) => handleFieldChange('maxFieldLength', val)}
        label='Max Field Length'
        number={true}
      />
      <CustomSelect
        activeValue={formItem.mandatory}
        setActiveValue={(val) => handleFieldChange('mandatory', val)}
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
      <CustomInput
        activeValue={formItem.fieldDefaultData}
        setActiveValue={(val) => handleFieldChange('fieldDefaultData', val)}
        label='Default Value'
        number={formItem.fieldDataType === 'number' && true}
      />
    </div>
  )
}
