import HeaderLayout from '@/Layout/HeaderLayout'
import InvoiceFilterBar from '@/store/invoice/InvoiceFilterBar'
import InvoiceList from '@/store/invoice/InvoiceList'
import RequireConnection from '@/store/user/RequireConnection'
import { useState } from 'react'

export default function Home() {
  const [filter, setFilter] = useState<string[]>([])

  return (
    <HeaderLayout>
      <RequireConnection>
        <InvoiceFilterBar filter={filter} setFilter={setFilter} />
        <div className='mt-10'>
          <InvoiceList filter={filter} />
        </div>
      </RequireConnection>
    </HeaderLayout>
  )
}
