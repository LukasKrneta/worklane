import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  })
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
      await register(formValues)
      navigate('/login')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className='page-shell'>
      <section className='auth-card'>
        <h1>Create account</h1>
        <p className='page-copy'>Start with the auth flow for Worklane.</p>

        <form className='auth-form' onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input
              name='name'
              type='text'
              value={formValues.name}
              onChange={handleChange}
              autoComplete='name'
              required
            />
          </label>

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
              autoComplete='new-password'
              required
            />
          </label>

          {error ? <p className='form-error'>{error}</p> : null}

          <button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className='page-copy'>
          Already have an account? <Link to='/login'>Log in</Link>
        </p>
      </section>
    </main>
  )
}

export default RegisterPage
