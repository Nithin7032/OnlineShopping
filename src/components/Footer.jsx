function Footer() {
  return (
    <footer className="footer-nk mt-5 pt-4 pb-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="text-white">nes<span style={{ color: '#ff7a00' }}>kart</span></h5>
            <p className="small">Your one-stop online shop for fashion, jewelry and electronics.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="text-white">Customer Service</h6>
            <ul className="list-unstyled small">
              <li>Help Center</li>
              <li>Returns & Refunds</li>
              <li>Track Your Order</li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="text-white">Contact</h6>
            <p className="small mb-0">support@neskart.com</p>
            <p className="small">Mon - Sat, 9 AM to 6 PM</p>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="text-center small mb-0">© 2026 Neskart. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
