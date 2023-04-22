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
    <div className='flex-1 px-6 sm:px-6 xl:pl-0'>
      <div id='from' className='flex flex-col gap-[18px]'>
        <FormSectionTitle>Bill From</FormSectionTitle>
        <AddressInput target='sender' address={invoice.sender} />
      </div>
      <div id='to' className='mt-[37px] flex flex-col gap-[19px] sm:mt-[45px]'>
        <FormSectionTitle>Bill To</FormSectionTitle>
        <div className='flex flex-col gap-[8px]'>
          <Label name='buyerName'>Client's Name</Label>
          <Input name='buyerName' defaultValue={invoice.buyer.name} />
        </div>
        <div className='flex flex-col gap-[6px] mt-[4px] mb-[5px]'>
          <Label name='buyerEmail'>Client's Email</Label>
          <Input name='buyerEmail' defaultValue={invoice.contact} />
        </div>
        <AddressInput target='buyer' address={invoice.buyer.address} />
        <div className='mt-[20px] sm:grid sm:grid-cols-2 sm:mt-[27px] gap-x-[23px]'>
          <div className='flex flex-col gap-[2px]'>
            <Label name='date'>Invoice Date</Label>
            <DatePickerInput name='date' />
          </div>
          <div className='flex flex-col mt-[23px] gap-[1px] sm:mt-[1px] sm:gap-[1px]'>
            <Label name='due-date'>Payment Terms</Label>
            <PaymentTermsSelect name='due-date' />
          </div>
        </div>
        <div className='mt-[5px] flex flex-col gap-[6px]'>
          <Label name='description'>Project Description</Label>
          <Input name='description' defaultValue={invoice.description} />
        </div>
      </div>
      <div className='mt-[72px] sm:mt-[37px]'>
        <ProductsList products={invoice.products} />
      </div>
      <div className='bg-gradient-to-t from-gray-200 to-white h-[88px] sm:hidden'></div>
    </div>
  )
}
