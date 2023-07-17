import React from "react";
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../Screens/LoginScreen";

const Stack = createNativeStackNavigator();
const AuthStack =
 () => {
    <Stack.Navigator>
        <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
                headerShown: true,
                headerTitle: "Login",
                headerBackground: 'blue',
                headerBackVisible: true,
            }}
        />
    </Stack.Navigator>
}

export default AuthStack;