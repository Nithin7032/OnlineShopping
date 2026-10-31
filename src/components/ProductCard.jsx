function ProductCard({ product, onView, onAdd }) {
  return (
    <div className="card product-card h-100 shadow-sm">
      <div className="product-img-box" onClick={() => onView(product)}>
        <img src={product.image} alt={product.title} />
      </div>
      <div className="card-body d-flex flex-column">
        <span className="badge bg-secondary align-self-start mb-2 text-capitalize">
          {product.category}
        </span>
        <h6 className="product-title">{product.title}</h6>
        <div className="small mb-2">
          <span className="stars">{'★'.repeat(Math.round(product.rating.rate))}</span>
          <span className="text-muted"> ({product.rating.count})</span>
        </div>
        <div className="price mb-3 mt-auto">${product.price.toFixed(2)}</div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-dark btn-sm flex-fill" onClick={() => onView(product)}>
            View
          </button>
          <button className="btn btn-nk btn-sm flex-fill" onClick={() => onAdd(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
