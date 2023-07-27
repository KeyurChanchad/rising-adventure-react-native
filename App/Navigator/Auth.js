import React from "react";
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../Screens/LoginScreen";
import HomeScreen from "../Screens/HomeScreen";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
    <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
                headerShown: false,
                // headerTitle: "Login",
                // headerBackground: 'blue',
                // headerBackVisible: true,
            }}
        />
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
                headerShown: false,
            }}
        />
    </Stack.Navigator>
}

export default AuthStack;