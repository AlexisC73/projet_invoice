import { Invoice } from '@invoice/domain/dist'
import DatePickerInput from '../Form/DatePickerInput'
import FormSectionTitle from '../Form/FormSectionTitle'
import FormTitle from '../Form/FormTitle'
import ActionButton from '../ui/ActionButton'
import GoBackButton from '../ui/GoBackButton'
import AddressInput from './AddressInput'
import Label from '../Form/Label'
import Input from '../Form/Input'
import PaymentTermsSelect from '../Form/PaymentTermsSelect'
import ProductsList from '../Form/ProductsList'

export default function FullForm({ invoice }: { invoice: Invoice['data'] }) {
  return (
    <div className='absolute top-[72px] left-0 right-0 bg-white sm:w-[720px] sm:top-0 sm:pl-[160px] sm:pr-[57px]'>
      <div className='pt-6 px-6'>
        <GoBackButton />
        <div className='mt-[20px] sm:mt-[4px]'>
          <FormTitle>
            Edit <span className='text-[#888EB0]'>#</span>
            {invoice.id}
          </FormTitle>
        </div>
      </div>

      <div className='sm:overflow-y-scroll px-6'>
        <div id='from' className='mt-[16px] flex flex-col gap-[19px]'>
          <FormSectionTitle>Bill From</FormSectionTitle>
          <AddressInput target='sender' address={invoice.sender} />
        </div>
        <div id='to' className='mt-[37px] flex flex-col gap-[19px]'>
          <FormSectionTitle>Bill To</FormSectionTitle>
          <div className='flex flex-col gap-[6px]'>
            <Label name='buyerName'>Client's Name</Label>
            <Input name='buyerName' defaultValue={invoice.buyer.name} />
          </div>
          <div className='flex flex-col gap-[6px] mt-[4px] mb-[5px]'>
            <Label name='buyerEmail'>Client's Email</Label>
            <Input name='buyerEmail' defaultValue={invoice.contact} />
          </div>
          <AddressInput target='buyer' address={invoice.buyer.address} />
          <div className='mt-[20px]'>
            <div className='flex flex-col gap-[2px]'>
              <Label name='date'>Invoice Date</Label>
              <DatePickerInput name='date' />
            </div>
            <div className='flex flex-col mt-[23px]'>
              <Label name='due-date'>Payment Terms</Label>
              <PaymentTermsSelect name='due-date' />
            </div>
          </div>
          <div className='mt-[5px] flex flex-col gap-[6px]'>
            <Label name='description'>Project Description</Label>
            <Input name='description' defaultValue={invoice.description} />
          </div>
        </div>
        <div className='mt-[72px]'>
          <ProductsList products={invoice.products} />
        </div>
      </div>
      <div className='bg-gradient-to-t from-gray-200 to-white  h-[88px]'></div>

      <div className='flex justify-end pt-[21px] gap-[8px] pb-[22px] px-6'>
        <ActionButton action='Cancel' type='default' />
        <ActionButton action='Save Changes' type='primary' />
      </div>
    </div>
  )
}
