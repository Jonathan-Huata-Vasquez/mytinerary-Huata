import citiesReducer from './citiesReducer'
import {combineReducers} from 'redux'
const mainReducer = combineReducers({
    citiesReducer : citiesReducer
})


export default mainReducer;