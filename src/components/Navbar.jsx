import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../images/logo.svg"
import { FaAlignRight } from "react-icons/fa"

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(false)
  const handleToggle = (e) => {
    setIsHidden(!isHidden)
  }

  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="Beach Resort" />
          </Link>
          <button className="nav-btn" type="button" onClick={handleToggle}>
            <FaAlignRight className="nav-icon" />
          </button>
        </div>
        <ul className={isHidden ? "show-nav nav-links" : "nav-links"}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/rooms">Rooms</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
