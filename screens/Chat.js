import React, { useLayoutEffect, useCallback, useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { auth, db } from '../firebase'
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat'

const Chat = ({navigation}) => {

  const [messages, setMessages] = useState([])

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])

  useLayoutEffect(() => {
    const unsubscribe = db.collection('chats').orderBy('createdAt','desc').onSnapshot(snapshot=>setMessages(
      snapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      }))
    ))

    return unsubscribe
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages))
      const {
        _id,
        createdAt,
        text,
        user
      } = messages [0]
      db.collection('chats').add({
        _id,
        createdAt,
        text,
        user
      })
  }, [])

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerLeft:()=>(
        <View style={styles.photo}>
          <Avatar 
          rounded
          source={{
            uri: auth?.currentUser?.photoURL
          }}
          />
        </View>        
      ),
      headerRight:()=>(
        <TouchableOpacity style={styles.button} onPress={singOut}>
          <AntDesign name="logout" size={24} color="black" /> 
        </TouchableOpacity>
        
      )
    })
  }, [])
  const singOut = () =>{
    auth.signOut().then(() => {
      navigation.replace('Login')
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL
      }}
    />
  )
}

export default Chat

const styles = StyleSheet.create({
  button: {
      marginRight: 20,
  },
  photo: {
    marginLeft: 10,
  },
})
