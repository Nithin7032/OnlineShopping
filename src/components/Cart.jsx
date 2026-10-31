function Cart({ cart, changeQty, removeItem, setPage, onCheckout }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const delivery = subtotal > 100 || subtotal === 0 ? 0 : 5
  const total = subtotal + delivery

  if (cart.length === 0) {
    return (
      <div className="text-center py-5 bg-white rounded shadow-sm">
        <h3>Your cart is empty</h3>
        <p className="text-muted">Looks like you haven't added anything yet.</p>
        <button className="btn btn-nk" onClick={() => setPage('home')}>
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="row g-4">
      <div className="col-lg-8">
        <div className="bg-white rounded shadow-sm p-3">
          <h4 className="mb-3">Shopping Cart</h4>
          {cart.map((item) => (
            <div key={item.id} className="d-flex align-items-center gap-3 border-bottom py-3">
              <img src={item.image} alt={item.title} className="cart-img" />
              <div className="flex-grow-1">
                <h6 className="mb-1">{item.title}</h6>
                <div className="price">${item.price.toFixed(2)}</div>
                <button className="btn btn-link text-danger p-0 small" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-outline-secondary btn-sm" onClick={() => changeQty(item.id, -1)}>
                  -
                </button>
                <span>{item.qty}</span>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => changeQty(item.id, 1)}>
                  +
                </button>
              </div>
              <div className="fw-bold" style={{ width: '80px', textAlign: 'right' }}>
                ${(item.price * item.qty).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-lg-4">
        <div className="bg-white rounded shadow-sm p-3">
          <h5 className="mb-3">Order Summary</h5>
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Delivery</span>
            <span>{delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="btn btn-nk w-100" onClick={onCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
