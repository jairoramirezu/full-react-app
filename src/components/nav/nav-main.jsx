import { useEffect, useState, useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { accounts } from "../../data/phone-cover.js"
import NavContext from "../context/context.jsx"
import Menu from "./menu.jsx"
import Search from "./search.jsx"
import {
  CONCEPTO,
  MCBO_SAN,
  NO_CONCEPTO,
  TEXT_COPY,
  CI,
  BS
} from "../../config/contants.jsx"
import { toast } from "react-toastify"

const Nav = ({
  white = false,
  checkout = false,
  name = undefined,
  price = undefined,
  color = undefined
}) => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const location = window.location.pathname.split("/")
  const validate = location[1]
  const payMethods = ["zelle", "binance", "wise", "paypal"]
  const index = useContext(NavContext)[0][0]
  const [menuDisplay, setMenuDisplay] = useState(false)
  const [searchDisplay, setSearchDisplay] = useState(false)
  const dollarPrice = useContext(NavContext)[5][0]
  const currency = useContext(NavContext)[4][0]
  const setCurrency = useContext(NavContext)[4][1]
  const paypalComision = 0.0573

  useEffect(() => {
    if (!menuDisplay || !searchDisplay) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [menuDisplay, searchDisplay])

  useEffect(() => {
    setMenuDisplay(true)
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname])

  const searchFun = () => {
    setSearchDisplay((prev) => !prev)
  }

  const copyClipboard = (text) => {
    if (text.startsWith(`${CONCEPTO} `)) {
      const prefix = `${CONCEPTO} `
      navigator.clipboard.writeText(text.substring(prefix.length))
      return toast.success(TEXT_COPY)
    } else if (text.startsWith(`${CI} `)) {
      const prefix = `${CI} `
      navigator.clipboard.writeText(text.substring(prefix.length))
      return toast.success(TEXT_COPY)
    }
    navigator.clipboard.writeText(text)
    toast.success(TEXT_COPY)
  }

  return (
    <div
      className={`nav-container-box ${white && "nav-alt"} ${
        validate === "finalizacion" && "position-sticky"
      } ${validate === "finalizacion" && isScrolled && "new-bg-color"}`}
    >
      {!checkout ? (
        <div
          className={`nav-container ${isScrolled && "opacity-alt"} ${
            white && "nav-alt"
          }`}
        >
          <div className="nav-logo-container">
            <Link
              to="/"
              className="d-flex justify-content-center align-items-center"
            >
              <img
                width="28"
                height="28"
                src={`/images/rapidtell_${white ? "000" : "dad"}.svg`}
                alt="logo"
              />
            </Link>
            {!white && <h6 className="nav-text-city">{MCBO_SAN}</h6>}
          </div>
          <div className="nav-items-container">
            <div>
              {!currency ? (
                <img
                  src={`/images/dollar_${white ? "000" : "dad"}.svg`}
                  alt="currency"
                  onClick={() => setCurrency((prev) => !prev)}
                />
              ) : (
                <p
                  className={`my-0 currency ${
                    white ? "currency-color-alt" : undefined
                  }`}
                  onClick={() => setCurrency((prev) => !prev)}
                >
                  {BS}
                </p>
              )}
            </div>
            <div>
              <img
                src={`/images/search_${white ? "000" : "dad"}.svg`}
                alt="buscar"
                onClick={searchFun}
              />
            </div>
            <div>
              {menuDisplay ? (
                <img
                  src={`/images/menu_${white ? "000" : "dad"}.svg`}
                  alt="menu"
                  onClick={() => setMenuDisplay((prev) => !prev)}
                />
              ) : (
                <img
                  src={`/images/close_${white ? "000" : "dad"}.svg`}
                  alt="close"
                  onClick={() => setMenuDisplay((prev) => !prev)}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={`nav-container ${white && "nav-alt"}`}>
            <div className="nav-logo-container align-items-center alt-nav-logo-sold">
              <img onClick={() => navigate(-1)} src="/images/back-arrow-18.svg" alt="Ir atras" />
              <p>
                {name} - {color}
              </p>
            </div>
            <div className="nav-items-container color-alt-price">
              {!currency
                ? accounts.find((ele) => ele.method === index)?.method !==
                  "paypal"
                  ? `$${price.toLocaleString("de-DE")}`
                  : `$${Math.ceil(
                      Number(price) + Number(price * paypalComision)
                    ).toLocaleString("de-DE")}`
                : `BS ${(price * dollarPrice).toLocaleString("de-DE")}`}
            </div>
          </div>
          {index !== null && (
            <>
              <hr className="my-0 with-pers" />
              <div className="info-notes-container p-3 my-0">
                <p className="mt-0 capitalize">
                  {accounts.find((ele) => ele.method === index)?.method}
                </p>
                <div className="d-flex align-items-center">
                  <p>{accounts.find((ele) => ele.method === index)?.account}</p>
                  <img
                    src="/images/copy-16.svg"
                    className="copy-icon"
                    onClick={(e) => {
                      copyClipboard(e.target.parentElement.firstChild.innerText)
                    }}
                  />
                </div>
                {!payMethods.includes(index) && (
                  <div className="d-flex align-items-center">
                    <p>
                      {`${CI} ${
                        accounts.find((ele) => ele.method === index)?.id
                      }`}
                    </p>
                    <img
                      src="/images/copy-16.svg"
                      className="copy-icon"
                      onClick={(e) => {
                        copyClipboard(
                          e.target.parentElement.firstChild.innerText
                        )
                      }}
                    />
                  </div>
                )}
                {accounts.find((ele) => ele.method === index)?.method !==
                  "pago móvil" && (
                  <div className="d-flex align-items-center">
                    <p>
                      {accounts.find((ele) => ele.method === index)?.method ===
                      "zelle"
                        ? NO_CONCEPTO
                        : `${CONCEPTO} ${name}`}
                    </p>
                    {accounts.find((ele) => ele.method === index)?.method !==
                      "zelle" && (
                      <img
                        src="/images/copy-16.svg"
                        className="copy-icon"
                        onClick={(e) => {
                          copyClipboard(
                            e.target.parentElement.firstChild.innerText
                          )
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
      <Menu
        menuDisplay={menuDisplay}
        setMenuDisplay={setMenuDisplay}
        pathname={pathname}
      />
      <Search
        searchDisplay={searchDisplay}
        setSearchDisplay={setSearchDisplay}
        pathname={pathname}
      />
    </div>
  )
}

export default Nav
