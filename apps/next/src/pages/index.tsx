import HeaderLayout from '@/Layout/HeaderLayout'
import InvoiceFilterBar from '@/store/invoice/InvoiceFilterBar'
import InvoiceList from '@/store/invoice/InvoiceList'
import RequireConnection from '@/store/user/RequireConnection'

export default function Home() {
  return (
    <HeaderLayout>
      <RequireConnection>
        <InvoiceFilterBar />
        <div className='mt-10'>
          <InvoiceList />
        </div>
      </RequireConnection>
    </HeaderLayout>
  )
}
