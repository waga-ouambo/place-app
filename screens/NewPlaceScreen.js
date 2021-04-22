import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput} from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
import Colors from '../constants/Color';
import {useDispatch} from 'react-redux';
import * as placeAction from '../store/placeAction';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {

    const [title, setTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        setTitle(text);
    }
    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath); 
    }

    const savePlaceHandler = () => {
        dispatch(placeAction.addPlace(title, selectedImage));
        props.navigation.goBack();
    }

    return (
        <ScrollView>
            <View style={styles.form} >
                <Text style={styles.label} > Title</Text>
                <TextInput 
                style={styles.textInput} 
                onChangeText={titleChangeHandler}
                value={title}
                placeholder="Enter a place"
                />
                <View>
                    <ImagePicker onImageTaken={imageTakenHandler} />
                </View>
                <View>
                    <LocationPicker />
                </View>
                <Button title='Save Place' color={Colors.primary} onPress={savePlaceHandler} /> 
            </View>
        </ScrollView> 
     )

}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewPlaceScreen ;