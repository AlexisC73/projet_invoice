import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { getUserState } from './user'
import { PropsWithChildren } from 'react'

const RequireConnection: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { status } = useSelector(getUserState)

  if (status === 'error') {
    router.push('/login')
  }
  if (status === 'connected') {
    return <>{children}</>
  }

  return (
    <div className='flex h-full items-center justify-center'>Loading ...</div>
  )
}

//TODO : add a loader

export default RequireConnection
