import Loader from 'react-loader-spinner'
import './index.css'

/* ha */

const LoaderElement = () => (
  <div className="loader-con" testid="loader">
    <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
  </div>
)

export default LoaderElement
