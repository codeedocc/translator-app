import { navLinks } from '../assets/constants'
import { NavLink } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      {navLinks.map((item) => {
        return (
          <NavLink to={item.path} className="navLink" key={item.name}>
            <span>
              <img
                src={item.image}
                alt={item.image}
                style={{
                  height: item.name === 'Лого' ? '48px' : '28px',
                  width: item.name === 'Лого' ? '48px' : '28px',
                }}
                className={item.name !== 'Лого' ? 'links' : ''}
              />
              <p>{item.name !== 'Лого' && item.name}</p>
            </span>
          </NavLink>
        )
      })}
    </div>
  )
}

export default Navbar
