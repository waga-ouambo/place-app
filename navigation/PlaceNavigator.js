import  {Platform} from 'react-native'; 
import { createStackNavigator } from 'react-navigation-stack';

import { createAppContainer } from 'react-navigation';

import PlaceListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import MapScreen from '../screens/MapScreen';
import Colors from '../constants/Color';

const PlaceNavigator = createStackNavigator({
    Places: PlaceListScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    MapS: MapScreen
},{
    defaultNavigationOptions :  {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
})

export default createAppContainer(PlaceNavigator);