import { TranslatedText } from '../components'

const History: React.FC = () => {
  const handleInfoClick = (id: number) => {
    console.log(id)
  }

  const handleCloseModal = () => {
    console.log(null)
  }

  const removeFav = () => {
    console.log(null)
  }

  return (
    <div className="info">
      <TranslatedText
        title={''}
        from={''}
        to={''}
        word={''}
        translatedWord={''}
        id={0}
        key={''}
        handleInfoClick={handleInfoClick}
        handleCloseModal={handleCloseModal}
        isOpenFav={false}
        removeFav={removeFav}
      />
    </div>
  )
}

export default History
