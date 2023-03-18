import { bindActionCreators } from '@reduxjs/toolkit'
import { languageActions } from '../store/language/language.slice'
import { countryActions } from '../store/country/country.slice'
import { modalActions } from '../store/modal/modal.slice'
import { useDispatch } from 'react-redux'

const actions = {
  ...countryActions,
  ...languageActions,
  ...modalActions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
