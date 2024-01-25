import { useEffect, useState } from 'react'
import './App.css'
import CustomSelect from './components/CustomSelect'
import { Button } from './shadcn/components/ui/button'
import { v4 as uuidv4 } from 'uuid'
import { Label } from './shadcn/components/ui/label'
import Form from './components/Form'
import { CustomTable } from './components/Table'
import { TextBoxFields } from './components/fields/TextBoxFields'
import { DropDownFields } from './components/fields/DropDownFields'
import { DatePickerFields } from './components/fields/DatePickerFields'

export interface FormItemState {
  fieldType: 'text_box' | 'dropdown' | 'date_picker' | undefined
  fieldName: string
  fieldDataType: 'string' | 'number' | 'date' | undefined
  maxFieldLength: number | undefined
  minDate: string | undefined
  maxDate: string | undefined
  values: { value: string; id: string }[]
  mandatory: 'true' | 'false' | undefined
  fieldDefaultData: string
}

export interface FormField extends FormItemState {
  id: string
}

function App() {
  let [showcase, setShowcase] = useState(false)
  let [activeFieldType, setActiveFieldType] = useState<
    'text_box' | 'dropdown' | 'date_picker' | undefined
  >('dropdown')
  let [activeRole, setActiveRole] = useState<
    'student' | 'dark' | 'business' | undefined
  >()
  let [showFieldAdder, setShowFieldAdder] = useState(true)

  const initialFormState: FormItemState = {
    fieldType: activeFieldType,
    fieldName: '',
    fieldDataType: undefined,
    maxFieldLength: undefined,
    minDate: undefined,
    maxDate: undefined,
    values: [],
    mandatory: undefined,
    fieldDefaultData: '',
  }

  let [formItem, setFormItem] = useState(initialFormState)
  const storedFields = localStorage.getItem('formFields')
  let [fields, setFields] = useState<FormField[]>(
    storedFields ? JSON.parse(storedFields) : []
  )

  useEffect(() => {
    localStorage.setItem('formFields', JSON.stringify(fields))
  }, [fields])

  const handleFieldChange = (fieldName: keyof FormItemState, value: any) => {
    setFormItem({
      ...formItem,
      [fieldName]: value,
    })
  }

  const handleFieldAdd = () => {
    const newField = { ...formItem, id: uuidv4() }
    setFields((prev) => [...prev, newField])
    setFormItem(initialFormState)
    setShowFieldAdder(false)
    setActiveFieldType(undefined)
  }

  useEffect(() => {
    setFormItem(initialFormState)
  }, [activeFieldType])

  const handleFieldDelete = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id))
  }

  return (
    <div className='flex items-center justify-center p-4 mt-4 pb-20 select-none'>
      <div className='w-full max-w-5xl flex flex-col gap-8'>
        <div>
          <div className='font-medium opacity-75'>
            Farmwise Frontend Assignment
          </div>
          <div className='text-3xl font-bold'>Dynamic Data Collection App</div>
        </div>
        <CustomSelect
          activeValue={activeRole}
          setActiveValue={setActiveRole}
          label='Role'
          items={[
            { value: 'student', label: 'Student' },
            { value: 'dark', label: 'Salaried' },
            { value: 'business', label: 'Business' },
          ]}
        />
        {!showcase ? (
          <>
            <Button
              onClick={() => setShowFieldAdder(!showFieldAdder)}
              className='max-w-[180px]'
            >
              {!showFieldAdder ? 'Add A Field' : 'Hide Field Adder'}
            </Button>
            {showFieldAdder && (
              <div className='flex flex-col gap-4'>
                <div className='p-6 border-dashed border-2 border-primary rounded-xl flex flex-col items-start justify-center gap-4'>
                  {fields.length < 4 ? (
                    <>
                      <CustomSelect
                        // classname='mb-8'
                        activeValue={activeFieldType}
                        setActiveValue={setActiveFieldType}
                        label='Field Type'
                        items={[
                          { value: 'text_box', label: 'Text Box' },
                          { value: 'dropdown', label: 'Dropdown' },
                          { value: 'date_picker', label: 'Date Picker' },
                        ]}
                      />
                      <div className='h-[2px] w-full bg-border' />
                      <div className='w-full'>
                        {activeFieldType === 'text_box' ? (
                          <TextBoxFields
                            formItem={formItem}
                            handleFieldChange={handleFieldChange}
                          ></TextBoxFields>
                        ) : activeFieldType === 'dropdown' ? (
                          <DropDownFields
                            formItem={formItem}
                            handleFieldChange={handleFieldChange}
                          ></DropDownFields>
                        ) : activeFieldType === 'date_picker' ? (
                          <DatePickerFields
                            formItem={formItem}
                            handleFieldChange={handleFieldChange}
                          ></DatePickerFields>
                        ) : (
                          <div className='py-4 text-center'>
                            Please Select A Field Type
                          </div>
                        )}
                      </div>
                      {activeFieldType !== undefined && (
                        <div className='flex justify-stretch w-full gap-4'>
                          <Button
                            onClick={() => handleFieldAdd()}
                            className='w-full'
                          >
                            Add The field
                          </Button>
                          <Button
                            variant='secondary'
                            onClick={() => setShowFieldAdder(!showFieldAdder)}
                            className='w-full'
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className='py-4 text-center w-full'>
                      Maximum 4 fields are allowed
                    </div>
                  )}
                </div>
              </div>
            )}
            {fields.length > 0 && (
              <div className='flex flex-col gap-4'>
                <Label>A list of Form Fields</Label>
                <CustomTable
                  fields={fields}
                  handleFieldDelete={handleFieldDelete}
                ></CustomTable>
                <div className='flex gap-4'>
                  <Button
                    className='w-full'
                    onClick={() => setShowcase(true)}
                  >
                    Confirm
                  </Button>
                  <Button
                    className='w-full'
                    variant={'secondary'}
                    onClick={() => setShowcase(true)}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className='flex flex-col items-start gap-4'>
            <Button
              className='flex items-start gap-2 px-0'
              variant={'link'}
              onClick={() => setShowcase(false)}
            >
              {/* <FiChevronLeft className='text-sm' /> */}
              Go Back
            </Button>
            <Form fields={fields} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
