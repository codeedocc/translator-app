import { useAppSelector } from '../hooks/redux'
import { useActions } from '../hooks/actions'
import { ReactNode } from 'react'

interface IModal {
  children: ReactNode
}

const Modal: React.FC<IModal> = ({ children }) => {
  const { closeAllModals } = useActions()
  const { isOpenLanguage, isOpenAddFav, checkFav } = useAppSelector(
    (state) => state.modal
  )

  return (
    <div
      className={
        isOpenLanguage || isOpenAddFav || checkFav
          ? 'modal-wrapper open'
          : 'modal-wrapper'
      }
      onClick={() => closeAllModals(false)}
    >
      <div
        className={checkFav ? 'modal description' : 'modal'}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
