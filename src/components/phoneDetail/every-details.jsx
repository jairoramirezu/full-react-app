import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { SELECT_COLOR, COMPRAR } from "../../config/contants"

const EveryDetail = ({
  size,
  cam,
  id = undefined,
  bat,
  pes,
  sim,
  os,
  chip,
  buy = false,
  color
}) => {
  return (
    <div className="phone-details-alt d-flex flex-column align-items-center justify-content-center">
      {buy && (
        <Link
          to={color !== null && `/review/${id}/${color}`}
          onClick={() => {
            color === null && toast.error(SELECT_COLOR)
          }}
          className="buy-ticket"
        >
          {COMPRAR}
        </Link>
      )}
      {size && (
        <p>
          <span className="fon-per-det">Pantalla:</span> {size}"
        </p>
      )}
      {cam && (
        <p>
          <span className="fon-per-det">Cámara:</span> {cam}MP
        </p>
      )}
      {bat && (
        <p>
          <span className="fon-per-det">Batería:</span> {bat}mAh
        </p>
      )}
      {pes && (
        <p>
          <span className="fon-per-det">Peso:</span> {pes} g
        </p>
      )}
      {sim && (
        <p>
          <span className="fon-per-det">SIM:</span> {sim}
        </p>
      )}
      {os && (
        <p>
          <span className="fon-per-det">Sistema Operativo:</span> {os}
        </p>
      )}
      {chip && (
        <p>
          <span className="fon-per-det">Chip:</span> {chip}
        </p>
      )}
    </div>
  )
}

export default EveryDetail
