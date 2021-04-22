import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlaceNavigator from './navigation/PlaceNavigator';
import { enableScreens } from 'react-native-screens';

import { createStore, combineReducers, applyMiddleware} from 'redux';
import  {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlaceReducer from './store/placeReducer';
import { init } from './helpers/db';

enableScreens();

init()
.then(() => {
  console.log('Initialized Database!!!!!!!!');
})
.catch(err => {
  console.error('Initializing Failled.');
  console.error(err);
})

const rootReducer = combineReducers({
  places: PlaceReducer
})

const store = createStore(rootReducer,applyMiddleware(ReduxThunk)); 

export default function App() {

  return (<Provider store={store}>
              <PlaceNavigator />
         </Provider>)
//   (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
