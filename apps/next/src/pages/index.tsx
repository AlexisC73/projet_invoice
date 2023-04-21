import GoBackButton from '@/components/ui/GoBackButton'
import Header from '@/components/Header/Header'
import data from '@/data/invoices.json'
import { PropsWithChildren } from 'react'
import { CalendarIcon } from '@/assets/icons'
import ArrowDown from '@/assets/icons/arrow-down'
import FormInput from '@/components/Form/FormInput'
import FormTitle from '@/components/Form/FormTitle'
import FormSectionTitle from '@/components/Form/FormSectionTitle'
import DatePickerInput from '@/components/Form/DatePickerInput'
import PaymentTermsSelect from '@/components/Form/PaymentTermsSelect'

export default function Home() {
  const invoice = data[0]
  return (
    <main className='flex flex-col lg:flex-row justify-center min-h-screen bg-[#F8F8FB] pb-96'>
      <Header />
      <section id='content' className='flex-1'>
        <div className='p-6 lg:p-0 lg:pt-6 w-full lg:max-w-[730px] lg:mx-auto'>
          <div className='sm:pt-8'>
            <GoBackButton />
            <div className='absolute top-[72px] left-0 right-0 bg-white p-6'>
              <GoBackButton />
              <div className='mt-[20px]'>
                <FormTitle>
                  Edit <span className='text-[#888EB0]'>#</span>
                  {invoice.id}
                </FormTitle>
              </div>
              <div id='from'>
                <div className='mt-[16px]'>
                  <FormSectionTitle>Bill From</FormSectionTitle>
                </div>
                <div className=' mt-[19px] gap-x-[23px] gap-y-[23px] grid grid-cols-2'>
                  <FormInput
                    label='Street Address'
                    name='sender-street'
                    defaultValue={invoice.sender.street}
                    className='col-span-2'
                  />
                  <FormInput
                    label='City'
                    name='city'
                    defaultValue={invoice.sender.city}
                  />
                  <FormInput
                    label='Post Code'
                    name='sender-postcode'
                    defaultValue={invoice.sender.zip}
                  />
                  <FormInput
                    label='Country'
                    name='sender-country'
                    defaultValue={invoice.sender.country}
                    className='col-span-2'
                  />
                </div>
              </div>
              <div id='to'>
                <div className='mt-[38px]'>
                  <FormSectionTitle>Bill To</FormSectionTitle>
                </div>
                <div className='gap-y-[23px] mt-[19px] gap-x-[23px] grid grid-cols-2'>
                  <FormInput
                    label="Client's Name"
                    name='client-name'
                    defaultValue={invoice.buyer.name}
                    className='col-span-2'
                  />
                  <FormInput
                    label="Client's Email"
                    name='client-email'
                    defaultValue={invoice.contact}
                    className='col-span-2'
                  />
                  <FormInput
                    label='Street Address'
                    name='buyer-street'
                    defaultValue={invoice.buyer.address.street}
                    className='col-span-2'
                  />
                  <FormInput
                    label='City'
                    name='buyer-city'
                    defaultValue={invoice.buyer.address.city}
                  />
                  <FormInput
                    label='Post Code'
                    name='buyer-postcode'
                    defaultValue={invoice.buyer.address.zip}
                  />
                  <FormInput
                    label='Country'
                    name='buyer-country'
                    defaultValue={invoice.buyer.address.country}
                    className='col-span-2'
                  />
                </div>
              </div>
              <div className='mt-[42px] flex flex-col gap-y-[23px]'>
                <div className='mt-[-2px]'>
                  <DatePickerInput label='Invoice Date' name='date' />
                </div>

                <div className='mt-[-2px]'>
                  <PaymentTermsSelect label='Payment Terms' name='date' />
                </div>
                <FormInput
                  label='Project Description'
                  defaultValue={invoice.description}
                  name='description'
                  className='col-span-2'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
