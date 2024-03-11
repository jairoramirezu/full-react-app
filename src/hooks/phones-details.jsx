import axios from "axios"

const fetchOptions = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_STRIPE_KEY}`
  }
}

const phonesDetails = async () => {
  let productsData = []
  let pricesData = []

  const res = await Promise.all([
    axios("https://api.stripe.com/v1/products?limit=100", fetchOptions),
    axios("https://api.stripe.com/v1/prices?limit=100", fetchOptions)
  ])
  productsData = res[0].data.data
  pricesData = res[1].data.data

  while (productsData.length === 100) {
    const lastId = productsData[productsData.length - 1].id
    const lastIdPrices = pricesData[pricesData.length - 1].id
    const productsRes = await axios(
      `https://api.stripe.com/v1/products?limit=100&starting_after=${lastId}`,
      fetchOptions
    )
    const pricesRes = await axios(
      `https://api.stripe.com/v1/prices?limit=100&starting_after=${lastIdPrices}`,
      fetchOptions
    )
    productsData = productsData.concat(productsRes.data.data)
    pricesData = pricesData.concat(pricesRes.data.data)
  }
  return { productsData, pricesData }
}

export const dollar = async () => {
  const res = await axios(
    "https://pydolarvenezuela-api.vercel.app/api/v1/dollar"
  )
  return { res }
}

export default phonesDetails
