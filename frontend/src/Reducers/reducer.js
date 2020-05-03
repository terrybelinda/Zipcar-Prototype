import { combineReducers } from 'redux';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
	profileData : profileReducer,
});

export default rootReducer;