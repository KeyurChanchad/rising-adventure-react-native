import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../Screens/LoginScreen";
import HomeScreen from "../Screens/HomeScreen";
import AppStack from "./App";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Colors from "../Resources/styles/Colors";
import Event from "../Screens/Event";
import EventsScreen from "../Screens/EventsScreen";
const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();
const AuthStack = () => {
    return (
        <Drawer.Navigator initialRouteName="HomeScreen">
            <Drawer.Screen 
                name="HomeScreen" 
                component={HomeScreen} 
                options={{
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: Colors.white,
                    
                }}
            />
            <Drawer.Screen name="LoginScreen" component={LoginScreen} />
            <Drawer.Screen 
                name="Events" 
                component={EventsScreen} 
                options={{
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: Colors.white,
                    
                }}
            />
            <Drawer.Screen 
                name="Event" 
                component={Event} 
                options={{
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: Colors.white,
                    
                }}
            />
        </Drawer.Navigator>
    )
}

export default AuthStack;