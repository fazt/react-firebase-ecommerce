import { useEffect } from 'react'
import { Button } from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function LoginPage() {

  const { loginWithGoogle, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])


  return (
    <Button onClick={loginWithGoogle}>
      Login with Google
    </Button>
  )
}

export default LoginPage