import { useEffect, useState, useContext } from "react"
import phonesDetails from "../../hooks/phones-details"
import NavContext from "../context/context.jsx"
import Loader from "/images/audio.svg"
import { useLocation } from "react-router-dom"
import Total from "./total.jsx"
import EveryDetail from "../phoneDetail/every-details.jsx"
import {
  DELIVERY_FREE,
  REVIEW_COMPRA,
  ROM,
  RAM,
  COLOR
} from "../../config/contants.jsx"

const ReviewC = () => {
  const { pathname } = useLocation()
  const location = window.location.pathname.split("/")
  const product = location[location.length - 2]
  const [phones, setPhones] = useState([])
  const [prices, setPrices] = useState([])
  const [info, setInfo] = useState(false)
  const setIndex = useContext(NavContext)[0][1]
  const currency = useContext(NavContext)[4][0]
  const dollarPrice = useContext(NavContext)[5][0]
  const price = prices?.find((ele) => ele.id === phones.default_price)
  const [color, setColor] = useState(null)
  const [colors, setColors] = useState(null)

  useEffect(() => {
    setColor(location[location.length - 1])
    phonesDetails().then((data) => {
      setPhones(data?.productsData?.find((ele) => ele.id === product))
      setPrices(data?.pricesData)
    })
    setIndex(null)
  }, [pathname])

  useEffect(() => {
    if (phones?.features?.length > 0) {
      const newColors = phones.features[0]?.name.split(", ")
      setColors(newColors)
    }
  }, [phones])

  return (
    <div className="review-container">
      {phones.length !== 0 ? (
        <div>
          <h1 className="review-title">{REVIEW_COMPRA}</h1>
          <h3 className="review-des">{DELIVERY_FREE}</h3>
          <div>
            {!info ? (
              <div className="position-relative mt-5 w-100">
                <img className="phone-detail-img" src={phones?.images[0]} />
                <img
                  className="add-button"
                  src="/images/plus.svg"
                  alt="details"
                  onClick={() => {
                    setInfo((prev) => !prev)
                  }}
                />
              </div>
            ) : (
              <div className="position-relative mt-5 w-100">
                <img
                  className="phone-detail-img opacity-unit"
                  src={phones?.images[0]}
                />
                <EveryDetail
                  size={phones?.features[3]?.name}
                  cam={phones?.features[4]?.name}
                  bat={phones?.features[5]?.name}
                  pes={phones?.features[6]?.name}
                  sim={phones?.features[7]?.name}
                  os={phones?.features[8]?.name}
                  chip={phones?.features[9]?.name}
                />
                <img
                  className="add-button"
                  src="/images/close_thick.svg"
                  alt="close"
                  onClick={() => {
                    setInfo((prev) => !prev)
                  }}
                />
              </div>
            )}
            <div className="container-select-color d-flex justify-content-start align-items-center mt-2 position-relative">
              <h1 className="review-phone-title mb-0">{phones?.name} -</h1>
              <select
                className="phone-detail-display-select phone-detail-display-select-alt"
                onChange={(e) => setColor(e.target.value)}
                value={color === "null" ? "" : color}
              >
                <option value="" disabled>
                  {COLOR}
                </option>
                {colors?.map((ele) => (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                ))}
              </select>
              <img
                className="chevron-down"
                src="/images/chevron-down_000.svg"
                alt="seleccionar color"
              />
            </div>
            <div className="d-flex justify-content-between review-phone-det-container">
              <h3 className="review-phone-det mb-2 mt-1 phone-detail-ms">
                {phones?.features[1]?.name}
                {RAM} - {phones?.features[2]?.name}
                {ROM}
              </h3>
            </div>
            <div className="d-flex justify-content-between mb-3 mt-0 review-phone-det-container">
              <h3 className="review-phone-det mt-0">1</h3>
              <h3 className="review-phone-det mt-0">
                {!currency
                  ? `$${(price?.unit_amount / 100).toLocaleString("de-DE")}`
                  : `BS ${(
                      (price?.unit_amount / 100) *
                      dollarPrice
                    ).toLocaleString("de-DE")}`}
              </h3>
            </div>
            <hr />
          </div>
          <Total
            amount={
              !currency
                ? `$${(price?.unit_amount / 100).toLocaleString("de-DE")}`
                : `BS ${(
                    (price?.unit_amount / 100) *
                    dollarPrice
                  ).toLocaleString("de-DE")}`
            }
            product={product}
            color={color}
          />
        </div>
      ) : (
        <div className="loader-container">
          <img className="loader" src={Loader} />
        </div>
      )}
    </div>
  )
}

export default ReviewC
