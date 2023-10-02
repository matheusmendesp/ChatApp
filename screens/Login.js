import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { auth } from '../firebase'

const Login = ({ navigation }) => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const singIn = () => {
      auth.signInWithEmailAndPassword( email, password)
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage)
        })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.replace('Chat')
              const uid = user.uid;
              
            } else {
              navigation.canGoBack() && 
              navigation.popToTop()
            }
          });

        return unsubscribe
      }, [])

    return(
        <View style={styles.container}>
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
            <Button title='Sing in' style={styles.button} onPress={singIn}/>

            <Button title='Register' style={styles.button} onPress={()=> navigation.navigate('Register')}/>
        </View>
    )
}

export default Login

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

