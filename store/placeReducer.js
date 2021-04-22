import { ADD_PLACE, SET_PLACES } from "./placeAction";
import Place from "../models/place";
import dayjs from "dayjs";

const initialState = {
    places: []
}

export default (state= initialState, action) => {

    switch(action.type) {
        case ADD_PLACE: 
            // const newPlace = new Place(dayjs().toString(), action.placeData.title, action.placeData.image);
            const newPlace = new Place(action.placeData.id.toString(), action.placeData.title, action.placeData.image);
            return {
                places: [...state.places, newPlace]
            }
            case SET_PLACES: 
            return {
                places: action.places.map(plc => new Place(plc.id.toString(), plc.title, plc.imageUri))
            }

        default: 
    return state;
    }
    
}