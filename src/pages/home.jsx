import Banner from "../components/header/banner.jsx"
import Nav from "../components/nav/nav-main.jsx"
import Hero from "../components/hero/main.jsx"
import LastProducts from "../components/hero/last-products.jsx"
import MostSold from "../components/hero/most-sold"
import Footer from "../components/footer/main.jsx"
import OnlyMobile from "../components/onlyMobile/onlyMobile.jsx"

const Home = () => (
  <>
    <div className="isMobile">
      <Nav />
      <Banner />
      <LastProducts />
      <Hero />
      <MostSold />
      <Footer />
    </div>
    <OnlyMobile />
  </>
)

export default Home
