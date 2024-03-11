import { Link } from "react-router-dom"
import { FASTER, LAST_PRODUCTS, SEE_ALL } from "../../config/contants.jsx"

const LastProducts = () => {
  return (
    <div className="hero-container last-products">
      <div>
        <h1>{LAST_PRODUCTS}</h1>
        <h3>{FASTER}</h3>
        <Link to="/productos">
          <h6 className="info-text-phones">{SEE_ALL} &gt;</h6>
        </Link>
      </div>
    </div>
  )
}

export default LastProducts
