import { infoFav } from '../assets/icons'

const TranslatedText = () => {
  return (
    <div className="info-text">
      <div className="info-from">
        <span>
          <p>en</p>
          <p>Hello how are you?</p>
        </span>
        <img src={infoFav} alt="" />
      </div>
      <div className="line" />
      <div className="info-to">
        <span>
          <p>sp</p>
          <p>¿Hola, cómo estás?</p>
        </span>
      </div>
    </div>
  )
}

export default TranslatedText
