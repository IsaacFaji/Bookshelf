
function Register() {
  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="/">BookShelf</a>

        <nav>
          <a href="/">Home</a>
          <a href="/reading-list">My Reading List</a>
          <a href="/login">Login</a>
          <a className="register-link" href="/register">Register</a>
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

          <form onSubmit={(event) => event.preventDefault()}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                required
                minLength="8"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Re-enter your password"
                required
                minLength="8"
              />
            </div>

            <div className="verification-notice">
              <p>
                <strong>Email verification required.</strong>
                {' '}After registering, you will receive an email
                with a link to verify your account.
              </p>
            </div>

            <button className="auth-button" type="submit">
              Register
            </button>
          </form>

          <p className="auth-footer">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>BookShelf &copy; 2026. Discover your next favorite story.</p>
      </footer>
    </div>
  )
}

export default Register
