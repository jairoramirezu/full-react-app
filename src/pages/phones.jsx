import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Nav from "../components/nav/nav-main.jsx"
import Banner from "../components/header/banner.jsx"
import Footer from "../components/footer/main.jsx"
import phonesDetails from "../hooks/phones-details.jsx"
import Loader from "/images/audio.svg"
import ProductsRender from "../components/productList/productsRender"

const Phones = () => {
  const [phones, setPhones] = useState([])
  const { pathname } = useLocation()

  useEffect(() => {
    phonesDetails().then((data) => {
      setPhones(data)
    })
  }, [pathname])

  return (
    <div>
      {phones.length !== 0 ? (
        <div>
          <Nav />
          <Banner />
          <ProductsRender phones={phones} location={location} />
          <Footer />
        </div>
      ) : (
        <div className="loader-container">
          <img className="loader" src={Loader} />
        </div>
      )}
    </div>
  )
}

export default Phones
