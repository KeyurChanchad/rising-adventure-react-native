import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './App/Navigator/Auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './App/Screens/LoginScreen';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            // options={{
            //     headerShown: true,
            //     headerTitle: "Login",
            //     headerBackground: 'blue',
            //     headerBackVisible: true,
            // }}
        />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({});

