import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { countryActions } from '../store/country/country.slice'
import { languageActions } from '../store/language/language.slice'

const actions = {
  ...countryActions,
  ...languageActions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}
