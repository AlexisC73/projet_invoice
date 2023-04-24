import { Invoice } from '@invoice/domain/dist'
import DatePickerInput from '../../DatePickerInput'
import FormSectionTitle from '../../FormSectionTitle'
import AddressInputs from '../../AddressInputs'
import Label from '../../Label'
import Input from '../../Input'
import PaymentTermsSelect from '../../PaymentTermsSelect'
import ProductsList from '../../ProductsList'

export default function FullInvoiceForm({
  invoice,
}: {
  invoice: Invoice['data']
}) {
  return (
    <div className='flex-1 px-6 sm:px-6 xl:pl-0'>
      <div id='from' className='flex flex-col gap-[1.125rem]'>
        <FormSectionTitle>Bill From</FormSectionTitle>
        <AddressInputs target='sender' address={invoice.sender} />
      </div>
      <div
        id='to'
        className='mt-[2.3125rem] flex flex-col gap-[1.1875rem] sm:mt-[2.8125rem]'
      >
        <FormSectionTitle>Bill To</FormSectionTitle>
        <div className='flex flex-col gap-[0.5rem]'>
          <Label name='buyerName'>Client's Name</Label>
          <Input name='buyerName' defaultValue={invoice.buyer.name} />
        </div>
        <div className='flex flex-col gap-[0.375rem] mt-[0.25rem] mb-[0.3125rem]'>
          <Label name='buyerEmail'>Client's Email</Label>
          <Input name='buyerEmail' defaultValue={invoice.contact} />
        </div>
        <AddressInputs target='buyer' address={invoice.buyer.address} />
        <div className='mt-[1.25rem] sm:grid sm:grid-cols-2 sm:mt-[1.6875rem] gap-x-[1.4375rem]'>
          <div className='flex flex-col gap-[0.125rem]'>
            <Label name='date'>Invoice Date</Label>
            <DatePickerInput name='date' />
          </div>
          <div className='flex flex-col mt-[1.4375rem] gap-[0.0625rem] sm:mt-[0.0625rem] sm:gap-[0.0625rem]'>
            <Label name='due-date'>Payment Terms</Label>
            <PaymentTermsSelect name='due-date' />
          </div>
        </div>
        <div className='mt-[0.3125rem] flex flex-col gap-[0.375rem]'>
          <Label name='description'>Project Description</Label>
          <Input name='description' defaultValue={invoice.description} />
        </div>
      </div>
      <div className='mt-[4.5rem] sm:mt-[2.3125rem]'>
        <ProductsList products={invoice.products} />
      </div>
      <div className='bg-gradient-to-t from-gray-200 to-white h-[5.5rem] sm:hidden'></div>
    </div>
  )
}
