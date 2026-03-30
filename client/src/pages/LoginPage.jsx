import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login(formValues)
      navigate('/')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className='page-shell'>
      <section className='auth-card'>
        <h1>Log in</h1>
        <p className='page-copy'>Use your Worklane account to continue.</p>

        <form className='auth-form' onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input
              name='email'
              type='email'
              value={formValues.email}
              onChange={handleChange}
              autoComplete='email'
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              name='password'
              type='password'
              value={formValues.password}
              onChange={handleChange}
              autoComplete='current-password'
              required
            />
          </label>

          {error ? <p className='form-error'>{error}</p> : null}

          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p className='page-copy'>
          Need an account? <Link to='/register'>Create one</Link>
        </p>
      </section>
    </main>
  )
}

export default LoginPage
