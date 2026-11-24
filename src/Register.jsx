import { useState } from 'react'
import { register } from './api'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (new TextEncoder().encode(password).length > 72) {
      setError('Password is too long.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)

    try {
      await register(email, password)

      alert('Account created successfully! Please log in.')

      window.location.href = '/login'
    } catch (error) {
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="/">BookShelf</a>

        <nav>
          <a href="/">Home</a>
          <a href="/reading-list">My Reading List</a>
          <a href="/login">Login</a>
          <a className="register-link" href="/register">
            Register
          </a>
        </nav>
      </header>

      <main className="auth-container">
        <section className="auth-card">
          <p className="eyebrow">JOIN OUR COMMUNITY</p>
          <h1>Create an Account</h1>

          <p className="auth-description">
            Create your BookShelf account to discover books and
            build your personal reading list.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                maxLength={254}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                required
                minLength={8}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                autoComplete="new-password"
                required
                minLength={8}
              />
            </div>

            <div className="verification-notice">
              <p>
                <strong>Email verification coming soon.</strong>
                {' '}Email verification will be available in
                a future update.
              </p>
            </div>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            <button
              className="auth-button"
              type="submit"
              disabled={submitting}
            >
              {submitting ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?{' '}
            <a href="/login">Login here</a>
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>
          BookShelf &copy; 2026. Discover your next favorite story.
        </p>
      </footer>
    </div>
  )
}

export default Register
