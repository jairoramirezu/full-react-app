import { Link } from "react-router-dom"
import {
  APPLE,
  BRANDS,
  INFINIX,
  SAMSUNG,
  TECNO,
  XIAOMI,
  ITEL,
  MOTO,
  REALME,
  BLU
} from "../../config/contants"

const Menu = ({ menuDisplay, setMenuDisplay, pathname }) => {
  return (
    <>
      {!menuDisplay && (
        <div className="menu">
          <div className="position-relative d-flex flex-column p-5">
            <img
              src="/images/close_thin.svg"
              alt="close"
              onClick={() => setMenuDisplay(true)}
              className="close-button-menu-alt"
            />
            {pathname !== "/todos" && <Link to="/todos">{BRANDS}</Link>}
            {pathname !== "/apple" && <Link to="/apple">{APPLE}</Link>}
            {pathname !== "/blu" && <Link to="/blu">{BLU}</Link>}
            {pathname !== "/infinix" && <Link to="/infinix">{INFINIX}</Link>}
            {pathname !== "/itel" && <Link to="/itel">{ITEL}</Link>}
            {pathname !== "/motorola" && <Link to="/motorola">{MOTO}</Link>}
            {pathname !== "/realme" && <Link to="/realme">{REALME}</Link>}
            {pathname !== "/samsung" && <Link to="/samsung">{SAMSUNG}</Link>}
            {pathname !== "/tecno" && <Link to="/tecno">{TECNO}</Link>}
            {pathname !== "/xiaomi" && <Link to="/xiaomi">{XIAOMI}</Link>}
            {/* <Link>Soporte</Link> */}
          </div>
        </div>
      )}
    </>
  )
}

export default Menu
