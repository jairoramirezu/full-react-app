import { useState, useContext, useRef, useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import NavContext from "../context/context"
import sendTelegram from "../../hooks/new-sell"
import { PAY_METHOD, REGALO, VERIFICAR_CAMPO } from "../../config/contants"

import {
  CEDULA,
  CE_EXAMPLE,
  NOMBRE,
  TELEFONO,
  TE_EXAMPLE,
  APELLIDO,
  BUY_CONDITIONS,
  FINALIZAR_PEDIDO,
  EMAIL,
  CORREO,
  DIRECCION_ENTREGA,
  REF_PAGO,
  STATE,
  CITY,
  PUNTO_REFERENCIA
} from "../../config/contants"

const Form = ({ name: phoneName, color, price, ram, rom }) => {
  const navigate = useNavigate()
  const [final, setFinal] = useState(false)
  const index = useContext(NavContext)[0][0]
  const setIndex = useContext(NavContext)[0][1]
  const dollar = useContext(NavContext)[5][0]
  const name = useRef(null)
  const last = useRef(null)
  const id = useRef(null)
  const phone = useRef(null)
  const email = useRef(null)
  const address = useRef(null)
  const point = useRef(null)
  const city = useRef(null)
  const state = useRef(null)
  const payNumber = useRef(null)
  const [gift, setGift] = useState(false)
  const arrPay = ["venezuela", "pago móvil", "banesco"]

  const newPrice = () => {
    return arrPay.includes(index)
      ? `BS ${((price / 100) * dollar).toLocaleString("de-DE")}`
      : `$${(price / 100).toLocaleString("de-DE")}`
  }

  const success = async () => {
    setIndex(null)
    setFinal((prev) => !prev)
    await sendTelegram(
      name.current.value,
      last.current.value,
      id.current.value,
      phone.current.value,
      email.current.value,
      address.current.value,
      point.current.value,
      city.current.value,
      state.current.value,
      payNumber.current.value,
      phoneName,
      color,
      newPrice(),
      index,
      gift ? "🎁" : "",
      ram,
      rom
    )
    toast.success("Ya estamos preparando tu entrega. Gracias por tu compra!")
    setTimeout(() => {
      navigate("/")
    }, 5000)
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validate = (text) => {
    const value = text.current.value.trim()
    const fieldName = text.current.parentNode.firstChild.innerText

    if (value.length < 4) {
      toast.error(`${VERIFICAR_CAMPO} ${fieldName}`)
      return false
    }

    if (fieldName === "Teléfono" && value.length !== 11) {
      toast.error(`${VERIFICAR_CAMPO} ${fieldName}`)
      return false
    }

    if (fieldName === "Email" && !validateEmail(value)) {
      toast.error(`${VERIFICAR_CAMPO} ${fieldName}`)
      return false
    }

    return true
  }

  const Final = () => {
    if (!index) {
      toast.error(`Debe ingresar un ${PAY_METHOD}`)
      return false
    } else {
      if (
        validate(name) &&
        validate(last) &&
        validate(id) &&
        validate(phone) &&
        validate(email) &&
        validate(address) &&
        validate(point) &&
        validate(city) &&
        validate(state) &&
        validate(payNumber)
      ) {
        success()
      }
    }
  }

  return (
    <div>
      <form>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center justify-content-start position-relative width-alt">
            <label className="d-none">{NOMBRE}</label>
            <input
              className="input-form-client width-per"
              required
              type="text"
              ref={name}
            />
            <span className="text-placeholder">{NOMBRE}</span>
          </div>
          <div className="d-flex align-items-center justify-content-end position-relative width-alt">
            <label className="d-none">{APELLIDO}</label>
            <input
              className="input-form-client width-per"
              required
              type="text"
              ref={last}
            />
            <span className="text-placeholder">{APELLIDO}</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center position-relative">
          <label className="d-none">{CEDULA}</label>
          <input className="input-form-client" required type="text" ref={id} />
          <span className="text-placeholder">{CE_EXAMPLE}</span>
        </div>
        <div className="d-flex align-items-center justify-content-center position-relative">
          <label className="d-none">{TELEFONO}</label>
          <input
            className="input-form-client"
            required
            type="number"
            ref={phone}
            min="0"
          />
          <span className="text-placeholder">{TE_EXAMPLE}</span>
        </div>
        <div className="d-flex align-items-center justify-content-center position-relative">
          <label className="d-none">{EMAIL}</label>
          <input
            className="input-form-client"
            required
            type="email"
            ref={email}
          />
          <span className="text-placeholder">{CORREO}</span>
        </div>
        <div className="d-flex align-items-center justify-content-center position-relative">
          <label className="d-none">{DIRECCION_ENTREGA}</label>
          <input
            className="input-form-client"
            required
            type="text"
            ref={address}
          />
          <span className="text-placeholder">{DIRECCION_ENTREGA}</span>
        </div>
        <div className="d-flex align-items-center justify-content-center position-relative">
          <label className="d-none">{PUNTO_REFERENCIA}</label>
          <input
            className="input-form-client"
            required
            type="text"
            ref={point}
          />
          <span className="text-placeholder">{PUNTO_REFERENCIA}</span>
        </div>
        <div className="d-flex align-items-center justify-content-center position-relative">
          <label className="d-none">{CITY}</label>
          <input
            className="input-form-client"
            required
            type="text"
            ref={city}
          />
          <span className="text-placeholder">{CITY}</span>
        </div>
        <div className="d-flex align-items-center justify-content-center position-relative">
          <label className="d-none">{STATE}</label>
          <input
            className="input-form-client"
            required
            type="text"
            ref={state}
          />
          <span className="text-placeholder">{STATE}</span>
        </div>
        <div className="d-flex align-items-center justify-content-center position-relative">
          <label className="d-none">{REF_PAGO}</label>
          <input
            className="input-form-client"
            required
            type="text"
            ref={payNumber}
          />
          <span className="text-placeholder">{REF_PAGO}</span>
        </div>
        <div className="d-flex align-items-center justify-content-start form-check form-switch mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={() => setGift((prev) => !prev)}
            id="gift"
          />
          <label className="text-placeholder-alt" htmlFor="gift">
            {REGALO}
          </label>
        </div>
      </form>
      <hr className="my-4" />
      <div
        className="info-notes-container"
        dangerouslySetInnerHTML={{ __html: BUY_CONDITIONS }}
      ></div>
      <button
        className={`total-buy-ticket-container ${final && "opacity-25"}`}
        onClick={Final}
        disabled={final}
      >
        {FINALIZAR_PEDIDO}
      </button>
    </div>
  )
}

export default Form
