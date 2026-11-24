import { useState } from 'react'
import { useAuth } from './AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { login, loading } = useAuth()

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login(email, password)

      window.location.href = '/'
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
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Login to BookShelf</h1>

          <p className="auth-description">
            Sign in to access your personal reading list and discover
            more books.
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
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            <button
              className="auth-button"
              type="submit"
              disabled={submitting || loading}
            >
              {submitting ? 'Logging In...' : 'Login'}
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account?{' '}
            <a href="/register">Register here</a>
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

export default Login
