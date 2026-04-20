import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const onSubmit = async (values) => {
    try {
      setError('')
      await login(values)
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="auth-container">
      <form className="card form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        {error ? <p className="error">{error}</p> : null}
        <label className="field">
          <span>Username</span>
          <input {...register('username', { required: true })} />
        </label>
        <label className="field">
          <span>Password</span>
          <input type="password" {...register('password', { required: true })} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
