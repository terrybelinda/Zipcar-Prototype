import * as type from '../Types/types';

export const showVehicles = (data) => {
    return {
        type : type.SHOW_VEHICLES,
        payload : {
            data
        }
    }
}

export const allVehicles = (data) => {
    return {
        type : type.ALL_VEHICLES,
        payload : {
            data
        }
    }
}

export const selectedVehicle = (data) => {
    return {
        type : type.SELECTED_VEHICLE,
        payload : {
            data
        }
    }
}

export const showSelectedVehicle = (data) => {
    return {
        type : type.SHOW_SELECTED_VEHICLE,
        payload : {
            data
        }
    }
}

export const setAddress = (data) => {
    return {
        type : type.ADDRESS,
        payload : {
            data
        }
    }
}
export const setMapPosition = (data) => {
    let obj = {
        type : type.MAP_POSITION,
        payload : {
            data
        }
	}
	debugger;
	return obj;
}
export const setMarkerPosition = (data) => {
    return {
        type : type.MARKER_POSITION,
        payload : {
            data
        }
    }
}
