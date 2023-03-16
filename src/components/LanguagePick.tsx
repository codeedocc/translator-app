import { changer, english, spanish } from '../assets/icons'

const LanguagePick: React.FC = () => {
  return (
    <div className="language">
      <span>
        <img src={english} alt="" />
        <p>English</p>
      </span>
      <img src={changer} alt="" className="changer" />
      <span>
        <p>Spanish</p>
        <img src={spanish} alt="" />
      </span>
    </div>
  )
}

export default LanguagePick
