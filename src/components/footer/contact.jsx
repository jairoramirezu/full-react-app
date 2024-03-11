import { COMUNICATIONS, DISCLAIMER, MCBO_LOC } from "../../config/contants"

const Contact = () => {
  const currentDate = new Date()
  const yearMatch = /\d{4}/.exec(currentDate.toString())
  const year = yearMatch ? yearMatch[0] : null
  return (
    <div className="info-notes-container">
      <a href="https://instagram.com/rapidtell" target="_blank">
        <img width="24" height="24" src="/images/inst.svg" alt="instagram" />
      </a>
      {/* <a href="https://www.tiktok.com/@rapidtell" target="_blank">
        <img width="24" height="24" src="/images/tiktok.svg" alt="tiktok" />
      </a> */}
      <a href="https://www.facebook.com/rapidtelll" target="_blank">
        <img width="24" height="24" src="/images/fb.svg" alt="facebook" />
      </a>
      <p>{MCBO_LOC}</p>
      <p>{COMUNICATIONS}</p>
      <hr />
      <p>{`© ${year} ${DISCLAIMER}`}</p>
    </div>
  )
}

export default Contact
