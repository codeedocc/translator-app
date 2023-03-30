import { useAppSelector } from '../hooks/redux'
import { useActions } from '../hooks/actions'
import { ReactNode } from 'react'

interface IModal {
  children: ReactNode
  isOpenFav?: boolean
}

const Modal: React.FC<IModal> = ({ children, isOpenFav }) => {
  const { closeAllModals } = useActions()
  const { isOpenLanguage, isOpenAddFav, isRemovingFav } = useAppSelector(
    (state) => state.modal
  )

  return (
    <div
      className={
        isOpenLanguage || isOpenAddFav || isOpenFav || isRemovingFav
          ? 'modal-wrapper open'
          : 'modal-wrapper'
      }
      onClick={() => closeAllModals(false)}
    >
      <div
        className={
          isOpenFav
            ? 'modal description'
            : isRemovingFav
            ? 'modal removing'
            : 'modal'
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
