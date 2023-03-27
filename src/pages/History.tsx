import { TranslatedText } from '../components'

const History: React.FC = () => {
  const handleInfoClick = (id: number) => {
    console.log(id)
  }

  const handleCloseModal = () => {
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
      />
    </div>
  )
}

export default History
