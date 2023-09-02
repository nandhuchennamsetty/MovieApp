import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="failureContainer" testid="not found">
    <h1>Lost Your way</h1>
    <p className="para">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="returnHome">
        Go to Home
      </button>
    </Link>
  </div>
)
export default NotFound
