import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../Screens/LoginScreen";
import HomeScreen from "../Screens/HomeScreen";
import AppStack from "./App";

const Stack = createNativeStackNavigator();
const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default AuthStack;