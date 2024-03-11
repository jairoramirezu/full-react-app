import { HISTORY } from "../../config/contants.jsx"

const History = () => (
  <div
    className="info-notes-container"
    dangerouslySetInnerHTML={{ __html: HISTORY }}
  ></div>
)

export default History
