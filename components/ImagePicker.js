import React, {useState} from 'react';
import  {View, Button, Text, StyleSheet, Image, Alert} from 'react-native';
import Colors from '../constants/Color';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';


const ImgPicker = props => { 

        const [pickedImage, setPicketImage] = useState();
        const [type, setType] = useState(Camera.Constants.Type.back);
    
        const verifyPermissions = async() => {
            
            // const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
            const result = await Camera.requestPermissionsAsync();
            if(result.status !== 'granted') {
                Alert.alert(
                    'Insufficient Permissions!', 
                    'You need to grant camera permissions to use this app.',
                    [{text: 'Okay'}]
                    );

                    return false;
            }
            return true; 
            
        } 

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return
        }
         setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            ); 
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPicketImage(image.uri);
        props.onImageTaken(image.uri); 
    }


    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}> 
                   { !pickedImage ?  <Text>No image picked yet </Text> :
                    <Image style={styles.image} source={{uri: pickedImage}} /> 
                }   
            </View>
                <Button 
                title='Take Image' 
                color={Colors.primary} 
                onPress={takeImageHandler}
                /> 
        </View>
    )
}

const styles =  StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
})


export default ImgPicker;