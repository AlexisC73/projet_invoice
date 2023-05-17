import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { getUserState } from './user'
import { PropsWithChildren } from 'react'
import Spinner from '@/components/Spinner/Spinner'

const RequireConnection: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { status } = useSelector(getUserState)

  if (status === 'error') {
    router.push('/login')
  }
  if (status === 'connected') {
    return <>{children}</>
  }

  return <Spinner />
}

//TODO : add a loader

export default RequireConnection
