import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { CreateAccount, Login, MovieDetails, Movies } from '../screens'

const Stack = createStackNavigator()

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: 'MovieFlix',
        headerStyle: { backgroundColor: '#FFC700' },
        headerLeft: () => '',
        headerRight: () => ''
      }}
    >
      <Stack.Screen
        // options={{
        //   headerBackImage={}
        // }}
        name="Login"
        component={ Login }
      />

      <Stack.Screen
        name="CreateAccount"
        component={ CreateAccount }
      />

      <Stack.Screen
        name="Movies"
        component={ Movies }
      />

      <Stack.Screen
        name="MovieDetails"
        component={ MovieDetails }
      />
    </Stack.Navigator>
  )
}