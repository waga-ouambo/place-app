import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Platform, Button, FlatList, TouchableHighlight } from 'react-native';
import {  ScrollView, TextInput } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButton';
import { Ionicons } from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux';
import PlaceItem from '../components/PlaceItem';
import * as PlaceActions from '../store/placeAction';

const PlaceListScreen = props => {

    const places = useSelector(state => state.places.places);
    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(PlaceActions.loadPlaces()); 
    }, [dispatch])


    return  <FlatList 
                data={places}  
                keyExtractor={item => item.id} 
                renderItem={itemData => <PlaceItem 
                                        image={itemData.item.imageUri} 
                                        title={itemData.item.title} 
                                        address={null} 
                                        onSelect={() => {
                                            props.navigation.navigate('PlaceDetail',  {
                                                placeTitle:itemData.item.title,
                                                placeId: itemData.item.id
                                            })}}
                                        /> } 
                />
         

}

PlaceListScreen.navigationOptions = navData => { 
    return  {
        headerTitle: 'All Placess',
        headerRight: () => ( <TouchableHighlight>
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                        <Ionicons 
                        name='md-add'
                        color='white'
                        size={32}  
                        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add' } 
                        onPress={() => navData.navigation.navigate('NewPlace')}
                        />
            </HeaderButtons>
            </TouchableHighlight>),
        // headerRight: () => <Ionicons name='md-add' size={32} color='white' onPress={() => navData.navigation.navigate('NewPlace')} />,
        
    }
 
}

const styles = StyleSheet.create({});

export default PlaceListScreen ;