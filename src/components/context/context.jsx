import { createContext, useState, useEffect } from "react"
import phonesDetails, {dollar} from "../../hooks/phones-details.jsx"

const NavContext = createContext([])

export const Context = ({ children }) => {
  const [index, setIndex] = useState(null)
  const [products, setProducts] = useState([])
  const [prices, setPrices] = useState([])
  const [overflow, setOverflow] = useState(true)
  const [currency, setCurrency] = useState(false)
  const [dollarPrice, setDollarPrice] = useState(undefined)

  useEffect(() => {
    phonesDetails().then((data) => {
      setProducts(data?.productsData)
      setPrices(data?.pricesData)
    })

    dollar().then((res) =>
      setDollarPrice(
        Math.floor(res?.res?.data?.monitors?.enparalelovzla?.price + 2)
      )
    )
  }, [])

  const store = [
    [index, setIndex],
    [products, setProducts],
    [prices, setPrices],
    [overflow, setOverflow],
    [currency, setCurrency],
    [dollarPrice, setDollarPrice]
  ]

  return <NavContext.Provider value={store}>{children}</NavContext.Provider>
}

export default NavContext
