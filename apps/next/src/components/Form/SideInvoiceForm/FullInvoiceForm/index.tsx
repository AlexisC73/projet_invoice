import { Invoice } from '@invoice/domain/dist'
import DatePickerInput from '../../DatePickerInput'
import FormSectionTitle from '../../FormSectionTitle'
import AddressInputs from '../../AddressInputs'
import Label from '../../Label'
import Input from '../../Input'
import PaymentTermsSelect from '../../PaymentTermsSelect'
import ProductsList from '../../ProductsList'
import ActionButton from '@/components/ui/ActionButton'

export default function FullInvoiceForm({
  invoice,
  onSubmit,
  onCancel,
}: {
  invoice: Invoice['data']
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onCancel: () => void
}) {
  return (
    <form onSubmit={onSubmit} className='flex-1 px-6 sm:px-6 xl:pl-0'>
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
          <Label name='buyer-name'>Client's Name</Label>
          <Input name='buyer-name' defaultValue={invoice.buyer.name} />
        </div>
        <div className='flex flex-col gap-[0.375rem] mt-[0.25rem] mb-[0.3125rem]'>
          <Label name='buyer-email'>Client's Email</Label>
          <Input name='buyer-email' defaultValue={invoice.contact} />
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
      <div className='flex justify-end pt-[1.3125rem] gap-[0.5rem] pb-[1.375rem] px-6 sm:pt-[2.375rem] sm:pr-[2.5rem]'>
        <ActionButton clickAction={onCancel} action='Cancel' style='default' />
        <ActionButton action='Save Changes' style='primary' type='submit' />
      </div>
    </form>
  )
}
