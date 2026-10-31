function OrderSuccess({ order, setPage }) {
  return (
    <div className="text-center py-5 bg-white rounded shadow-sm">
      <div style={{ fontSize: '4rem' }}>✅</div>
      <h3 className="text-success">Order Placed Successfully!</h3>
      <p className="mb-1">
        Order ID: <strong>{order.id}</strong>
      </p>
      <p className="mb-1">
        Thank you, {order.name}. Your order will be delivered to {order.city}.
      </p>
      <p className="mb-1">
        Payment: {order.payment} | Total: <strong>${order.total.toFixed(2)}</strong>
      </p>
      <button className="btn btn-nk mt-3" onClick={() => setPage('home')}>
        Continue Shopping
      </button>
    </div>
  )
}

export default OrderSuccess
