import { useState, useEffect, useContext } from "react"
import PhoneDetail from "../phoneDetail/phoneDetail"
import NavContext from "../context/context"
import {
  FILTRAR,
  MAYOR_PRECIO,
  MENOR_PRECIO,
  RAM_MAS,
  RAM_MENOS,
  ROM_MAS,
  ROM_MENOS
} from "../../config/contants"

const ProductsRender = ({ phones }) => {
  const location = window.location.pathname.match(/\/(\w+)/)[1]
  const [sort, setSort] = useState("")
  const [filteredPhones, setFilteredPhones] = useState([])
  const dollarPrice = useContext(NavContext)[5][0]
  const currency = useContext(NavContext)[4][0]

  useEffect(() => {
    let filtered = phones?.productsData?.filter((phone) =>
      location !== "todos" ? phone?.metadata?.brand === location : true
    )
    filtered = filtered.filter((phone) => phone.active)
    filtered = filtered.sort((a, b) => {
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

    if (sort === "Mayor precio") {
      filtered.sort((a, b) => {
        const priceA =
          phones.pricesData.find((price) => price.id === a.default_price)
            ?.unit_amount || 0
        const priceB =
          phones.pricesData.find((price) => price.id === b.default_price)
            ?.unit_amount || 0
        return priceB - priceA
      })
    } else if (sort === "Menor precio") {
      filtered.sort((a, b) => {
        const priceA =
          phones.pricesData.find((price) => price.id === a.default_price)
            ?.unit_amount || 0
        const priceB =
          phones.pricesData.find((price) => price.id === b.default_price)
            ?.unit_amount || 0
        return priceA - priceB
      })
    } else if (sort === "- RAM") {
      filtered.sort((a, b) => {
        const ramA = Number(a.features[1]?.name)
        const ramB = Number(b.features[1]?.name)
        return ramA - ramB
      })
    } else if (sort === "+ RAM") {
      filtered.sort((a, b) => {
        const ramA = Number(a.features[1]?.name)
        const ramB = Number(b.features[1]?.name)
        return ramB - ramA
      })
    } else if (sort === "- ROM") {
      filtered.sort((a, b) => {
        const romA = Number(a.features[2]?.name)
        const romB = Number(b.features[2]?.name)
        return romA - romB
      })
    } else if (sort === "+ ROM") {
      filtered.sort((a, b) => {
        const romA = Number(a.features[2]?.name)
        const romB = Number(b.features[2]?.name)
        return romB - romA
      })
    } else if (sort === "A-Z") {
      filtered.sort((a, b) => {
        const nameComparison = a.name.localeCompare(b.name)
        if (nameComparison !== 0) {
          return nameComparison
        }
        const firstDigitA = parseInt(
          a.features[1].name.toString().match(/\d/)[0]
        )
        const firstDigitB = parseInt(
          b.features[1].name.toString().match(/\d/)[0]
        )
        if (Number(firstDigitA) < Number(firstDigitB)) return -1
        if (Number(firstDigitA) > Number(firstDigitB)) return 1
        if (Number(a.features[2].name) < Number(b.features[2].name)) return -1
        if (Number(a.features[2].name) > Number(b.features[2].name)) return 1
        return 0
      })
    } else if (sort === "Z-A") {
      filtered.sort((a, b) => {
        const nameComparison = b.name.localeCompare(a.name)
        if (nameComparison !== 0) {
          return nameComparison
        }
        const firstDigitA = parseInt(
          a.features[1].name.toString().match(/\d/)[0]
        )
        const firstDigitB = parseInt(
          b.features[1].name.toString().match(/\d/)[0]
        )
        if (Number(firstDigitA) < Number(firstDigitB)) return -1
        if (Number(firstDigitA) > Number(firstDigitB)) return 1
        if (Number(a.features[2].name) < Number(b.features[2].name)) return -1
        if (Number(a.features[2].name) > Number(b.features[2].name)) return 1
        return 0
      })
    }

    setFilteredPhones(filtered)
  }, [phones, location, sort])

  return (
    <div>
      <div className="w-100 d-flex justify-content-end px-4 mt-4 position-relative">
        <select
          className="sort-by-container"
          defaultValue={sort}
          onChange={(e) => {
            setSort(e.target.value)
          }}
        >
          <option disabled value="">
            {FILTRAR}
          </option>
          <option>A-Z</option>
          <option>Z-A</option>
          <option>{MAYOR_PRECIO}</option>
          <option>{MENOR_PRECIO}</option>
          <option>{RAM_MAS}</option>
          <option>{RAM_MENOS}</option>
          <option>{ROM_MAS}</option>
          <option>{ROM_MENOS}</option>
        </select>
        <img
          className="chevron-down chevron-down-alt"
          src="/images/chevron-down_dad.svg"
          alt="filtrar por"
        />
      </div>
      {filteredPhones.map((phone) => (
        <PhoneDetail
          key={`${phone.name}-${phone.features[1]?.name}-${phone.features[2]?.name}`}
          name={phone.name}
          img={phone.images[0]}
          detail={phone.features[0]?.name}
          ram={phone.features[1]?.name}
          rom={phone.features[2]?.name}
          size={phone.features[3]?.name}
          cam={phone.features[4]?.name}
          bat={phone.features[5]?.name}
          pes={phone.features[6]?.name}
          sim={phone.features[7]?.name}
          os={phone.features[8]?.name}
          chip={phone.features[9]?.name}
          details={phone.features[10]?.name}
          price={
            !currency
              ? `$${(
                  phones.pricesData.find(
                    (price) => price.id === phone.default_price
                  )?.unit_amount / 100
                ).toLocaleString("de-DE")}`
              : `BS ${(
                  (phones.pricesData.find(
                    (price) => price.id === phone.default_price
                  )?.unit_amount /
                    100) *
                  dollarPrice
                ).toLocaleString("de-DE")}`
          }
          id={phone.id}
        />
      ))}
    </div>
  )
}

export default ProductsRender
