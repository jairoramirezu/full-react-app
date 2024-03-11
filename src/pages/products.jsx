import Footer from "../components/footer/main.jsx"
import Banner from "../components/header/banner.jsx"
import Nav from "../components/nav/nav-main.jsx"
import ProductList from "../components/productList/productsList"

const Products = () => {
  return (
    <div>
      <Nav />
      <Banner />
      <div className="most-sold-productsPage">
      <ProductList name="SeeAll" />
      </div>
      <ProductList name="Apple" />
      <ProductList name="Blu" />
      <ProductList name="Infinix" />
      <ProductList name="Itel" />
      <ProductList name="Motorola" />
      <ProductList name="Realme" />
      <ProductList name="Samsung" />
      <ProductList name="Tecno" />
      <ProductList name="Xiaomi" />
      <Footer />
    </div>
  )
}

export default Products
