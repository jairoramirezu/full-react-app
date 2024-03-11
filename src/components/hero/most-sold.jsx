import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { phoneList } from "../../data/phone-cover.js"
import { COMPRAR, MOST_SOLD } from "../../config/contants.jsx"
import NavContext from "../context/context.jsx"

const MostSold = () => {
  const [phoneIndex, setPhoneIndex] = useState(0)
  const currency = useContext(NavContext)[4][0]
  const dollarPrice = useContext(NavContext)[5][0]

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (phoneIndex <= phoneList.length - 2) {
        setPhoneIndex((prev) => prev + 1)
      } else {
        setPhoneIndex(0)
      }
    }, 3000)

    return () => clearInterval(intervalId)
  }, [phoneIndex])

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div
      className="hero-container last-products mt-12"
      style={{ backgroundImage: `url(${phoneList[phoneIndex].url})` }}
    >
      <div>
        <h1 className={phoneList[phoneIndex].white ? "text-white" : undefined}>
          {MOST_SOLD}
        </h1>
        <h3 className={phoneList[phoneIndex].white ? "text-white" : undefined}>
          {phoneList[phoneIndex].name}
        </h3>
        <h3
          className={`phone-detail-ms ${
            phoneList[phoneIndex].white ? "text-white" : undefined
          }`}
        >
          {phoneList[phoneIndex].ram}GB / RAM -{" "}
          {phoneList[phoneIndex].rom}GB / ROM
        </h3>
        <div>
          <Link
            to={`/review/${phoneList[phoneIndex].tag}/null`}
            className="info-text-phones"
          >
            {COMPRAR} &gt;
          </Link>
        </div>
      </div>
      <Link className="price" to={`/review/${phoneList[phoneIndex].tag}/null`}>
        {!currency
          ? `$${phoneList[phoneIndex].price.toLocaleString("de-DE")}`
          : `BS ${(phoneList[phoneIndex].price * dollarPrice).toLocaleString("de-DE")}`}
      </Link>
      <img
        onClick={() =>
          phoneIndex !== 0
            ? setPhoneIndex((prev) => prev - 1)
            : setPhoneIndex(phoneList.length - 1)
        }
        className="chevron chevron-left"
        src="/images/chevron_left.svg"
        alt="chevron-left"
      />
      <img
        onClick={() =>
          phoneIndex <= phoneList.length - 2
            ? setPhoneIndex((prev) => prev + 1)
            : setPhoneIndex(0)
        }
        className="chevron chevron-right"
        src="/images/chevron_right.svg"
        alt="chevron-right"
      />
    </div>
  )
}

export default MostSold
