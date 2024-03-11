import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import {
  CONFIRMAR_COMPRA,
  ENVIO,
  FINA_NOTES,
  GRATIS,
  SELECT_COLOR,
  SUB_TOTAL,
  TOTAL
} from "../../config/contants"

const Total = ({ amount, product, color }) => {
  return (
    <div className="mt-4">
      <div className="d-flex alig-items-center justify-content-between">
        <p>{SUB_TOTAL}</p>
        <p>{amount}</p>
      </div>
      <div className="d-flex alig-items-center justify-content-between">
        <p className="mb-2">{ENVIO}</p>
        <p className="mb-2">{GRATIS}</p>
      </div>
      <hr />
      <div className="d-flex alig-items-center justify-content-between">
        <p className="mb-2 total-des">{TOTAL}</p>
        <p className="mb-2 total-des">{amount}</p>
      </div>
      <div
        className="info-notes-container"
        dangerouslySetInnerHTML={{ __html: FINA_NOTES }}
      ></div>
      <Link
        to={color !== "null" && `/finalizacion/${product}/${color}`}
        onClick={() => {
          color === "null" && toast.error(SELECT_COLOR)
        }}
        className="total-buy-ticket"
      >
        <div className="total-buy-ticket-container">{CONFIRMAR_COMPRA}</div>
      </Link>
    </div>
  )
}

export default Total
