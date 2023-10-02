import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from './screens/Login'
import Register from './screens/Register'
import Chat from './screens/Chat'


const stack = createStackNavigator()

const App = () => {
  return(
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen name='Login' component={Login} />
        <stack.Screen name='Register' component={Register} />
        <stack.Screen name='Chat' component={Chat} />
      </stack.Navigator>
    </NavigationContainer>
  )
}

export default App