
function Login() {
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
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Login to BookShelf</h1>

          <p className="auth-description">
            Sign in to access your personal reading list and discover
            more books.
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
                placeholder="Enter your password"
                required
              />
            </div>

            <button className="auth-button" type="submit">
              Login
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>BookShelf &copy; 2026. Discover your next favorite story.</p>
      </footer>
    </div>
  )
}

export default Login
