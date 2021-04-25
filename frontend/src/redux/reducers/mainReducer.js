import citiesReducer from './citiesReducer'
import cityItineraryReducer from './cityItineraryReducer'
import {combineReducers} from 'redux'
const mainReducer = combineReducers({
    citiesReducer : citiesReducer,
    cityItineraryReducer
})


export default mainReducer;