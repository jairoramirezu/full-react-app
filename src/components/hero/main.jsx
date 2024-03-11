import { Link } from "react-router-dom"
import { IPHONE, IPHONE_DES, SEE_APPLE } from "../../config/contants"

const Hero = () => {
  return (
    <div className="hero-container mt-12">
      <div>
        <h1>{IPHONE}</h1>
        <h3>{IPHONE_DES}</h3>
        <div>
          <Link to="/apple">{SEE_APPLE} &gt;</Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
