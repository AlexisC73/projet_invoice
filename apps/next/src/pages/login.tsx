import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Login() {
  const router = useRouter()
  const { connected } = router.query

  useEffect(() => {
    if (connected) {
      router.push('/')
    }
  }, [connected])
  return (
    <div>
      <Link href={'http://localhost:5500/user/auth/google'}>
        Me connecter avec google
      </Link>
    </div>
  )
}
