import HeaderLayout from '@/Layout/HeaderLayout'
import RequireConnection from '@/store/user/RequireConnection'

export default function Home() {
  return (
    <HeaderLayout>
      <RequireConnection></RequireConnection>
    </HeaderLayout>
  )
}
