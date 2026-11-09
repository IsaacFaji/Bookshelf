
import './App.css'
import Login from './Login'
import Register from './Register'

function Home() {
  const books = [
    { title: 'The Hunger Games', author: 'Suzanne Collins', year: '2008', color: 'cover-one' },
    { title: '1984', author: 'George Orwell', year: '1949', color: 'cover-two' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', year: '1960', color: 'cover-three' },
    { title: 'Dune', author: 'Frank Herbert', year: '1965', color: 'cover-four' },
    { title: 'Pride and Prejudice', author: 'Jane Austen', year: '1813', color: 'cover-five' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: '1925', color: 'cover-six' },
    { title: 'Where the Crawdads Sing', author: 'Delia Owens', year: '2018', color: 'cover-seven' },
    { title: 'Project Hail Mary', author: 'Andy Weir', year: '2021', color: 'cover-eight' }
  ]

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

      <main>
        <section className="hero">
          <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
          <h1>Find Your Next Favorite Book</h1>
          <p className="hero-description">
            Discover new stories, explore timeless classics, and keep track
            of the books you love.
          </p>

          <form
            className="search-form"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="search"
              placeholder="Search by book title or author..."
              aria-label="Search books"
            />
            <button type="submit">Search</button>
          </form>
        </section>

        <section className="featured-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">HANDPICKED FOR YOU</p>
              <h2>Featured Books</h2>
            </div>
            <p className="section-description">
              A few stories worth adding to your shelf.
            </p>
          </div>

          <div className="book-grid">
            {books.map((book) => (
              <article className="book-card" key={book.title}>
                <div className={`book-cover ${book.color}`}>
                  <span className="cover-title">{book.title}</span>
                  <span className="cover-author">{book.author}</span>
                </div>

                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <span className="book-year">{book.year}</span>

                  <button
                    className="details-button"
                    type="button"
                    onClick={() => alert(`${book.title} by ${book.author}`)}
                  >
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>BookShelf &copy; 2026. Discover your next favorite story.</p>
      </footer>
    </div>
  )
}

function App() {
  const currentPath = window.location.pathname

  if (currentPath === '/login') {
    return <Login />
  }

  if (currentPath === '/register') {
    return <Register />
  }

  return <Home />
}

export default App

