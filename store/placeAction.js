export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'
import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';

export const addPlace = (title, imagepPath) => {
    return async dispatch => {
        const fileName = imagepPath.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: imagepPath,
                to: newPath
            })
            const dbResult = await insertPlace(title, newPath, 'dum address', 10.5, 12.6);
            dispatch ({type: ADD_PLACE, placeData: {id: dbResult.insertId, title: title, image: newPath}}); 
        } catch (error) {
            console.log(error);
            throw error;
        } 
       
    }
    
} 

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            dispatch({type: SET_PLACES, places: dbResult.rows._array});  
        } catch (error) {
            throw error
        }

        
    }

}
