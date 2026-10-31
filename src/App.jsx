import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import ProductCard from './components/ProductCard.jsx'
import ProductModal from './components/ProductModal.jsx'
import Cart from './components/Cart.jsx'
import Checkout from './components/Checkout.jsx'
import OrderSuccess from './components/OrderSuccess.jsx'
import Auth from './components/Auth.jsx'
import Footer from './components/Footer.jsx'

const API_URL = 'https://fakestoreapi.com'

function App() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [page, setPage] = useState('home')
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [selected, setSelected] = useState(null)
  const [order, setOrder] = useState(null)

  // registration / login
  const [authMode, setAuthMode] = useState('login')
  const [authMessage, setAuthMessage] = useState('')
  const [goToCheckout, setGoToCheckout] = useState(false)
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('neskart_users')
    return saved ? JSON.parse(saved) : []
  })
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('neskart_user')
    return saved ? JSON.parse(saved) : null
  })

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('neskart_cart')
    return saved ? JSON.parse(saved) : []
  })

  // fetch products and categories from Fake Store API
  async function loadData() {
    try {
      setLoading(true)
      setError('')
      const productRes = await fetch(`${API_URL}/products`)
      const categoryRes = await fetch(`${API_URL}/products/categories`)
      if (!productRes.ok || !categoryRes.ok) {
        throw new Error('Server error')
      }
      setProducts(await productRes.json())
      setCategories(await categoryRes.json())
    } catch {
      setError('Could not load products. Please check your internet and try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // keep cart saved in the browser
  useEffect(() => {
    localStorage.setItem('neskart_cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('neskart_users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    if (user) {
      localStorage.setItem('neskart_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('neskart_user')
    }
  }, [user])

  function openAuth(mode) {
    setAuthMode(mode)
    setAuthMessage('')
    setPage('login')
  }

  function afterAuth(loggedUser) {
    setUser(loggedUser)
    setAuthMessage('')
    if (goToCheckout) {
      setGoToCheckout(false)
      setPage('checkout')
    } else {
      setPage('home')
    }
  }

  // returns an error message, or empty text if everything is fine
  function registerUser(form) {
    const email = form.email.trim().toLowerCase()
    if (users.find((u) => u.email === email)) {
      return 'An account with this email already exists.'
    }
    const newUser = { name: form.name.trim(), email: email, phone: form.phone, password: form.password }
    setUsers([...users, newUser])
    afterAuth({ name: newUser.name, email: newUser.email, phone: newUser.phone })
    return ''
  }

  function loginUser(emailInput, password) {
    const email = emailInput.trim().toLowerCase()
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) {
      return 'Invalid email or password.'
    }
    afterAuth({ name: found.name, email: found.email, phone: found.phone })
    return ''
  }

  function logout() {
    setUser(null)
    setPage('home')
  }

  function handleCheckout() {
    if (user) {
      setPage('checkout')
    } else {
      setGoToCheckout(true)
      setAuthMode('login')
      setAuthMessage('Please login or register to place your order.')
      setPage('login')
    }
  }

  function addToCart(product) {
    const exists = cart.find((item) => item.id === product.id)
    if (exists) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item)))
    } else {
      setCart([...cart, { id: product.id, title: product.title, price: product.price, image: product.image, qty: 1 }])
    }
  }

  function changeQty(id, change) {
    const updated = cart
      .map((item) => (item.id === id ? { ...item, qty: item.qty + change } : item))
      .filter((item) => item.qty > 0)
    setCart(updated)
  }

  function removeItem(id) {
    setCart(cart.filter((item) => item.id !== id))
  }

  function placeOrder(form, total) {
    setOrder({
      id: 'NK' + Date.now().toString().slice(-8),
      name: form.name,
      city: form.city,
      payment: form.payment,
      total: total,
    })
    setCart([])
    setPage('success')
  }

  // filter + search + sort
  let visibleProducts = products.filter((p) => {
    const matchCategory = category === 'all' || p.category === category
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  if (sort === 'low') {
    visibleProducts = [...visibleProducts].sort((a, b) => a.price - b.price)
  } else if (sort === 'high') {
    visibleProducts = [...visibleProducts].sort((a, b) => b.price - a.price)
  } else if (sort === 'rating') {
    visibleProducts = [...visibleProducts].sort((a, b) => b.rating.rate - a.rating.rate)
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <>
      <Navbar
        cartCount={cartCount}
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        user={user}
        onLogout={logout}
        openAuth={openAuth}
      />

      <div className="container my-4" style={{ minHeight: '70vh' }}>
        {page === 'home' && (
          <>
            <div className="nk-hero p-4 p-md-5 mb-4">
              <h1 className="fw-bold">Big Savings on Everything</h1>
              <p className="lead mb-0">Shop men's & women's fashion, jewelry and electronics at Neskart.</p>
            </div>

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
              <div className="d-flex flex-wrap gap-2">
                <button
                  className={`btn btn-outline-dark nk-cat-btn ${category === 'all' ? 'active' : ''}`}
                  onClick={() => setCategory('all')}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    className={`btn btn-outline-dark nk-cat-btn ${category === c ? 'active' : ''}`}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <select
                className="form-select w-auto"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">Sort by: Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-warning" role="status"></div>
                <p className="mt-2">Loading products...</p>
              </div>
            )}

            {error && (
              <div className="alert alert-danger text-center">
                {error}
                <br />
                <button className="btn btn-sm btn-danger mt-2" onClick={loadData}>
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && (
              <>
                <p className="text-muted">{visibleProducts.length} products found</p>
                <div className="row g-4">
                  {visibleProducts.map((product) => (
                    <div key={product.id} className="col-6 col-md-4 col-lg-3">
                      <ProductCard product={product} onView={setSelected} onAdd={addToCart} />
                    </div>
                  ))}
                </div>
                {visibleProducts.length === 0 && (
                  <div className="alert alert-warning text-center">No products match your search.</div>
                )}
              </>
            )}
          </>
        )}

        {page === 'login' && (
          <Auth
            key={authMode}
            mode={authMode}
            setMode={setAuthMode}
            onLogin={loginUser}
            onRegister={registerUser}
            message={authMessage}
          />
        )}

        {page === 'cart' && (
          <Cart cart={cart} changeQty={changeQty} removeItem={removeItem} setPage={setPage} onCheckout={handleCheckout} />
        )}
        {page === 'checkout' && user && (
          <Checkout cart={cart} onPlaceOrder={placeOrder} setPage={setPage} user={user} />
        )}
        {page === 'success' && order && <OrderSuccess order={order} setPage={setPage} />}
      </div>

      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={addToCart} />
      )}

      <Footer />
    </>
  )
}

export default App
