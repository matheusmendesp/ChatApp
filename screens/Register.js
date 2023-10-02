import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { auth } from '../firebase'

const Register = ({ navigation }) => {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')


    const registerUser = () => {
        auth.createUserWithEmailAndPassword( email, password)
        .then((userCredential) => {
            
            const user = userCredential.user

            user.updateProfile({
                displayName: name, 
                photoURL: image ? image : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&psig=AOvVaw0VdNU8t4otIC5FGjQuJxI9&ust=1696351707522000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLi81Nno14EDFQAAAAAdAAAAABAE://example.com/jane-q-user/profile.jpg"
              })
              .then(() =>  {

              }).catch((error) => {

              })
              navigation.popToTop()
        })
        .catch((error) => {
            const errorMessage = error.message
            alert(errorMessage)
        });
    }



    return(
        <View style={styles.container}>
            <Input 
            placeholder='Enter your name'
            label='Name'
            leftIcon={{ type:'material', name:'badge' }} 
            value={name}
            onChangeText={text => setName(text)}
            />

            <Input 
            placeholder='Enter your email'
            label='Email'
            leftIcon={{ type:'material', name:'email' }} 
            value={email}
            onChangeText={text => setEmail(text)}
            />
            
            <Input 
            placeholder='Enter your password'
            label='Password'
            leftIcon={{ type:'material', name:'lock' }} 
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            />

            <Input 
            placeholder='Enter your image'
            label='Image Profile'
            leftIcon={{ type:'material', name:'face' }} 
            value={image}
            onChangeText={text => setImage(text)}
            />

            <Button title='Register' onPress={registerUser} style={styles.button}/>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10
    },
    container : {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
})

