import { useState } from 'react'

function Auth({ mode, setMode, onLogin, onRegister, message }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function switchMode(newMode) {
    setMode(newMode)
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    let result = ''
    if (mode === 'register') {
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters.')
        return
      }
      if (form.password !== form.confirm) {
        setError('Passwords do not match.')
        return
      }
      result = onRegister(form)
    } else {
      result = onLogin(form.email, form.password)
    }
    if (result) setError(result)
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <div className="bg-white rounded shadow-sm p-4">
          <h3 className="mb-1">{mode === 'login' ? 'Sign In' : 'Create Account'}</h3>
          <p className="text-muted">
            {mode === 'login' ? 'Welcome back to Neskart' : 'Join Neskart and start shopping'}
          </p>

          {message && <div className="alert alert-info py-2">{message}</div>}
          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
                </div>
              </>
            )}

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
            </div>

            {mode === 'register' && (
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input type="password" className="form-control" name="confirm" value={form.confirm} onChange={handleChange} required />
              </div>
            )}

            <button type="submit" className="btn btn-nk w-100">
              {mode === 'login' ? 'Login' : 'Register'}
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            {mode === 'login' ? (
              <>
                New to Neskart?{' '}
                <button className="btn btn-link p-0" onClick={() => switchMode('register')}>
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button className="btn btn-link p-0" onClick={() => switchMode('login')}>
                  Login
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Auth
