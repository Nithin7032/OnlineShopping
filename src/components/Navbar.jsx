function Navbar({ cartCount, search, setSearch, setPage, user, onLogout, openAuth }) {
  return (
    <>
      <nav className="navbar nk-navbar py-2">
        <div className="container d-flex flex-wrap gap-2 align-items-center">
          <span className="nk-brand" onClick={() => setPage('home')}>
            nes<span>kart</span>
          </span>

          <div className="input-group flex-grow-1 mx-md-4" style={{ maxWidth: '600px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search for products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage('home')
              }}
            />
            <button className="btn btn-nk">Search</button>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-outline-light" onClick={() => setPage('home')}>
              Home
            </button>
            {user ? (
              <>
                <span className="text-white align-self-center">Hi, {user.name.split(' ')[0]}</span>
                <button className="btn btn-outline-light" onClick={onLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-outline-light" onClick={() => openAuth('login')}>
                  Login
                </button>
                <button className="btn btn-outline-warning" onClick={() => openAuth('register')}>
                  Register
                </button>
              </>
            )}
            <button className="btn btn-nk position-relative" onClick={() => setPage('cart')}>
              🛒 Cart
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      <div className="nk-subbar text-white-50 small py-1">
        <div className="container">Free delivery on orders above $100 | Easy 7-day returns</div>
      </div>
    </>
  )
}

export default Navbar
