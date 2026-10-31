function ProductModal({ product, onClose, onAdd }) {
  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div className="modal-dialog modal-lg mt-5" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{product.title}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-5 text-center mb-3">
                <img src={product.image} alt={product.title} className="img-fluid" style={{ maxHeight: '300px' }} />
              </div>
              <div className="col-md-7">
                <span className="badge bg-secondary text-capitalize mb-2">{product.category}</span>
                <p>{product.description}</p>
                <p className="mb-1">
                  <span className="stars">{'★'.repeat(Math.round(product.rating.rate))}</span>{' '}
                  {product.rating.rate} / 5 ({product.rating.count} reviews)
                </p>
                <h3 className="price my-3">${product.price.toFixed(2)}</h3>
                <button
                  className="btn btn-nk"
                  onClick={() => {
                    onAdd(product)
                    onClose()
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
