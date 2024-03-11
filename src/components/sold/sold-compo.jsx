import { useContext, useEffect } from "react"
import { toast } from "react-toastify"
import Form from "../form/form"
import NavContext from "../context/context"
import {
  BANESCO,
  BINANCE,
  DELIVERY_FREE,
  FINALIZAR_PEDIDO,
  PAG_MO,
  PAYPAL,
  PAYPAL_TAX,
  PAY_METHOD_ALT,
  VENEZUELA,
  WISE,
  ZELLE
} from "../../config/contants"

const SoldComponent = ({ img, name, price, color, ram, rom }) => {
  const index = useContext(NavContext)[0][0]
  const setIndex = useContext(NavContext)[0][1]
  const currency = useContext(NavContext)[4][0]
  const setCurrency = useContext(NavContext)[4][1]
  const payMethods = ["zelle", "binance", "wise", "paypal"]

  useEffect(() => {
    if (index) {
      !payMethods.includes(index) ? setCurrency(true) : setCurrency(false)
    }
    if (index === "paypal") {
      toast(PAYPAL_TAX)
    }
  }, [index])

  return (
    <div>
      <h1 className="review-title">{FINALIZAR_PEDIDO}</h1>
      <h3 className="review-des">{DELIVERY_FREE}</h3>
      <img src={img} className="phone-detail-img my-4" />
      <select
        className="mt-3 payment-method"
        defaultValue=""
        onChange={(e) => setIndex(e.target.value)}
      >
        <option value="" disabled>
          {PAY_METHOD_ALT}
        </option>
        <option value="banesco">{BANESCO}</option>
        <option value="venezuela">{VENEZUELA}</option>
        <option value="pago móvil">{PAG_MO}</option>
        <option value="binance">{BINANCE}</option>
        <option value="zelle">{ZELLE}</option>
        <option value="wise">{WISE}</option>
        <option value="paypal">{PAYPAL}</option>
      </select>
      <Form name={name} color={color} price={price} ram={ram} rom={rom} />
    </div>
  )
}

export default SoldComponent
