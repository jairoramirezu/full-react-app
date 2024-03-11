import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import EveryDetail from "./every-details"
import { COLOR, COMPRAR, RAM, ROM, SELECT_COLOR } from "../../config/contants"
import { toast } from "react-toastify"

const PhoneDetail = ({
  name,
  img,
  ram,
  rom,
  detail,
  price,
  id,
  size,
  cam,
  bat,
  pes,
  sim,
  os,
  chip,
  details
}) => {
  const [list, setList] = useState([])
  const [color, setColor] = useState(null)
  const colors = detail.split(", ")
  const [retryKey, setRetryKey] = useState(0)

  const handleImageError = () => {
    setRetryKey(retryKey + 1)
  }

  useEffect(() => {
    setRetryKey(0)
  }, [img])

  return (
    <div className="phone-detail-container d-flex flex-column">
      {!list.includes(name) ? (
        <>
          <div className="image-detail-container">
            <img
              key={retryKey}
              src={img}
              className="phone-detail-img"
              onError={handleImageError}
            />
            <Link
              to={color !== null && `/review/${id}/${color}`}
              onClick={() => {
                color === null && toast.error(SELECT_COLOR)
              }}
              className="buy-ticket"
              name={name}
            >
              {COMPRAR}
            </Link>
            <img
              className="add-button"
              src="/images/plus.svg"
              alt="detalles"
              name={name}
              onClick={(e) => {
                setList((prev) => [...prev, e.target.name])
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="image-detail-container">
            <img src={img} className="phone-detail-img opacity-unit" />
            <EveryDetail
              name={name}
              size={size}
              cam={cam}
              img={img}
              id={id}
              bat={bat}
              pes={pes}
              sim={sim}
              os={os}
              chip={chip}
              color={color}
              buy
            />
            <div>
              <a href={details} target="_blank">
                <img
                  className="add-button details-icon-button"
                  src="/images/details-17.svg"
                  alt="details"
                />
              </a>
              <img
                className="add-button"
                src="/images/close_thick.svg"
                alt="close"
                name={name}
                onClick={(e) => {
                  setList((prev) =>
                    prev.filter((item) => item !== e.target.name)
                  )
                }}
              />
            </div>
          </div>
        </>
      )}
      <div className="d-flex align-items-center justify-content-between phone-detail-info-container">
        <div>
          <h1 className="phone-detail-name">{name}</h1>
          <div className="position-relative width-to-help">
            <select
              className="phone-detail-display-select position-sticky"
              onChange={(e) => setColor(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                {COLOR}
              </option>
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <img
              className="chevron-down position-alt"
              src="/images/chevron-down_000.svg"
            />
          </div>
        </div>
        <div>
          <h6 className="phone-detail-display right">{price}</h6>
          <h6 className="phone-detail-display right">
            {ram}
            {RAM}
          </h6>
          <h6 className="phone-detail-display right">
            {rom}
            {ROM}
          </h6>
        </div>
      </div>
    </div>
  )
}

export default PhoneDetail
