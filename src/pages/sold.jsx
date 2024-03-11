import { useEffect, useState } from "react"
import Footer from "../components/footer/main.jsx"
import Nav from "../components/nav/nav-main.jsx"
import SoldComponent from "../components/sold/sold-compo"
import Loader from "/images/audio.svg"
import phonesDetails from "../hooks/phones-details.jsx"

const Sold = () => {
  const [phones, setPhones] = useState([])
  const [prices, setPrices] = useState([])
  const location = window.location.pathname.split("/")
  const product = location[location.length - 2]
  const color = location[location.length - 1]

  useEffect(() => {
    phonesDetails().then((data) => {
      setPhones(data?.productsData?.find((ele) => ele.id === product))
      setPrices(data?.pricesData)
    })
  }, [])

  return (
    <div>
      {phones.length !== 0 ? (
        <div>
          <Nav
            white
            checkout
            name={phones.name}
            price={(
              prices.find((ele) => ele.id === phones.default_price)
                ?.unit_amount / 100
            )}
            color={color}
          />
          <div className="review-container">
            <SoldComponent
              img={phones.images[0]}
              name={phones.name}
              price={
                prices.find((ele) => ele.id === phones.default_price)
                  ?.unit_amount
              }
              color={color}
              ram={phones.features[1].name}
              rom={phones.features[2].name}
            />
          </div>
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

export default Sold
