import { useState } from 'react'

function Checkout({ cart, onPlaceOrder, setPage, user }) {
  const [form, setForm] = useState({
    name: user ? user.name : '',
    phone: user ? user.phone : '',
    address: '',
    city: '',
    pincode: '',
    payment: 'Cash on Delivery',
  })

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const delivery = subtotal > 100 ? 0 : 5
  const total = subtotal + delivery

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onPlaceOrder(form, total)
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-5 bg-white rounded shadow-sm">
        <h4>No items to checkout</h4>
        <button className="btn btn-nk mt-2" onClick={() => setPage('home')}>
          Go to Shop
        </button>
      </div>
    )
  }

  return (
    <div className="row g-4">
      <div className="col-lg-7">
        <form className="bg-white rounded shadow-sm p-4" onSubmit={handleSubmit}>
          <h4 className="mb-3">Delivery Details</h4>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea className="form-control" name="address" rows="2" value={form.address} onChange={handleChange} required />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">City</label>
              <input className="form-control" name="city" value={form.city} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Pincode</label>
              <input className="form-control" name="pincode" value={form.pincode} onChange={handleChange} required />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label">Payment Method</label>
            <select className="form-select" name="payment" value={form.payment} onChange={handleChange}>
              <option>Cash on Delivery</option>
              <option>UPI</option>
              <option>Credit / Debit Card</option>
            </select>
          </div>
          <button type="submit" className="btn btn-nk w-100">
            Place Order
          </button>
        </form>
      </div>

      <div className="col-lg-5">
        <div className="bg-white rounded shadow-sm p-4">
          <h5 className="mb-3">Your Items</h5>
          {cart.map((item) => (
            <div key={item.id} className="d-flex justify-content-between small mb-2">
              <span>
                {item.title.slice(0, 35)}... x {item.qty}
              </span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className="d-flex justify-content-between">
            <span>Delivery</span>
            <span>{delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}</span>
          </div>
          <div className="d-flex justify-content-between fw-bold fs-5 mt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
