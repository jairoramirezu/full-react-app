import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home.jsx"
import Products from "./pages/products.jsx"
import Phones from "./pages/phones.jsx"
import Review from "./pages/review.jsx"
import ScrollToTop from "./components/scrollTop/scrollTop.jsx"
import Sold from "./pages/sold.jsx"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/:slug" element={<Phones />} />
        <Route path="/review/:slug/:slug" element={<Review />} />
        <Route path="/finalizacion/:slug/:slug" element={<Sold />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  )
}

export default App
