import { useEffect, useContext, useState, useRef } from "react"
import { Link } from "react-router-dom"
import NavContext from "../context/context"
import { BS } from "../../config/contants"

// filter by name

const Search = ({ searchDisplay, setSearchDisplay, pathname }) => {
  const [list, setList] = useState([])
  const products = useContext(NavContext)[1][0]
  const prices = useContext(NavContext)[2][0]
  const currency = useContext(NavContext)[4][0]
  const setCurrency = useContext(NavContext)[4][1]
  const dollarPrice = useContext(NavContext)[5][0]
  const inputRef = useRef(null)
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    setSearchDisplay(true)
  }, [pathname])

  useEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus()
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [searchDisplay])

  const handleClickOutside = () => {
    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  const find = (name) => {
    setList([])
    const sortedProducts = products.sort((a, b) => {
      const nameComparison = a.name.localeCompare(b.name)
      if (nameComparison !== 0) {
        return nameComparison
      }
      const firstDigitA = parseInt(a.features[1].name.toString().match(/\d/)[0])
      const firstDigitB = parseInt(b.features[1].name.toString().match(/\d/)[0])
      if (Number(firstDigitA) < Number(firstDigitB)) return -1
      if (Number(firstDigitA) > Number(firstDigitB)) return 1
      if (Number(a.features[2].name) < Number(b.features[2].name)) return -1
      if (Number(a.features[2].name) > Number(b.features[2].name)) return 1
      return 0
    })
    const filter = sortedProducts.filter((ele) => ele.active)
    name.length &&
      filter.map(
        (ele) =>
          ele.name.toLowerCase().includes(name.toLowerCase()) &&
          setList((prev) => [...prev, ele])
      )
  }

  const clear = () => {
    setSearchDisplay(true)
    setList([])
  }

  const handleImageError = () => {
    setRetryKey(retryKey + 1)
  }

  useEffect(() => {
    setRetryKey(0)
  }, [retryKey])

  return (
    <>
      {!searchDisplay && (
        <div className="menu">
          <div className="position-relative d-flex flex-row p-5">
            <img
              src="/images/close_thin.svg"
              alt="close"
              onClick={clear}
              className="close-button-menu-alt"
            />
            {!currency ? (
              <img
                src="/images/dollar_dad.svg"
                alt="currency"
                onClick={() => setCurrency((prev) => !prev)}
                className="dollar-button-menu-alt"
              />
            ) : (
              <p
                className="my-0 currency bs-button-menu-alt"
                onClick={() => setCurrency((prev) => !prev)}
              >
                {BS}
              </p>
            )}
          </div>
          <div className="d-flex flex-column w-100">
            <div className="w-100 d-flex position-relative">
              <input
                className="search-bar"
                placeholder="Buscar"
                onChange={(e) => find(e.target.value)}
                ref={inputRef}
                spellCheck={false}
              />
              <img
                className="position-absolute search-bar-lup"
                src="/images/search_dad.svg"
                alt="buscar"
                onClick={() => {
                  inputRef.current.focus()
                }}
              />
            </div>
            <div className="search-bar-products p-5 pt-0">
              {list.map((ele) => (
                <Link
                  to={`/review/${ele.id}/null`}
                  onClick={clear}
                  key={`${ele.name}-${ele?.features[1]?.name}-${ele?.features[2]?.name}-${retryKey}`}
                >
                  <div className="container-phones d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                      <img
                        className="search-prod-image"
                        src={ele.images[0]}
                        onError={handleImageError}
                      />
                      <div className="search-prod-details d-flex flex-column justify-content-evenly align-items-start">
                        <h3>{ele.name}</h3>
                        <h3>{ele?.features[1]?.name}GB / RAM</h3>
                        <h3>{ele?.features[2]?.name}GB / ROM</h3>
                      </div>
                    </div>
                    <div className="search-price-container">
                      <h3 className="search-prod-price">
                        {!currency
                          ? `$${(
                              prices.find((el) => el.id === ele.default_price)
                                ?.unit_amount / 100
                            ).toLocaleString("de-DE")}`
                          : `BS ${(
                              (prices.find((el) => el.id === ele.default_price)
                                ?.unit_amount /
                                100) *
                              dollarPrice
                            ).toLocaleString("de-DE")}`}
                      </h3>
                    </div>
                  </div>
                  <hr className="hr-products" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Search
