import { Link } from "react-router-dom"
import { phones } from "../../data/phone-cover.js"
import { SEE_NOW } from "../../config/contants.jsx"

const ProductList = ({ name }) => {
  return (
    <div
      className="hero-container last-products"
      style={{
        backgroundImage: `url(${
          name === "SeeAll"
            ? "/images/4.jpg"
            : phones.find(({ classPhone }) => classPhone === name)?.url
        })`
      }}
    >
      <div>
        <h1>{name === "SeeAll" ? "Todas las marcas" : name}</h1>
        <Link to={`/${name === "SeeAll" ? "todos" : name.toLowerCase()}`}>
          <h6 className="info-text-phones">{SEE_NOW} &gt;</h6>
        </Link>
      </div>
    </div>
  )
}

export default ProductList
