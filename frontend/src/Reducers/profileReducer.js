import * as types from '../Types/types';

const initialState = {
	showvehicles: false,
	allvehicles: [],
	selectedvehicle: null,
	showselectedvehicle: false,
	address: '',
	mapPosition: null,
	markerPosition: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
		case types.ALL_VEHICLES :
			return Object.assign({}, state, {
				allvehicles : action.payload.data
			})
		case types.SHOW_VEHICLES :
			return Object.assign({}, state, {
				showvehicles : action.payload.data
			})
		case types.SELECTED_VEHICLE :
			return Object.assign({}, state, {
				selectedvehicle : action.payload.data
			})
		case types.SHOW_SELECTED_VEHICLE :
			return Object.assign({}, state, {
				showselectedvehicle : action.payload.data
			})
		case types.ADDRESS :
			return Object.assign({}, state, {
				address : action.payload.data
			})
		case types.MAP_POSITION :
		let obj1 = {};
		 Object.assign(obj1, state, {
				mapPosition : action.payload.data
		})
		console.log(state.mapPosition);
		return obj1;
		case types.MARKER_POSITION :
		let obj = {};
		 Object.assign(obj, state, {
			markerPosition : action.payload.data
		})
		console.log(state.markerPosition);
		return obj;
        default:
            return state;
    }
}