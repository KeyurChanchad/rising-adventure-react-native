import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../Screens/LoginScreen";
import HomeScreen from "../Screens/HomeScreen";
import AppStack from "./App";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Colors from "../Resources/styles/Colors";
import Event from "../Screens/Event";
import EventsScreen from "../Screens/EventsScreen";
import BookingForm from "../Screens/BookingForm";
import RegisterPhone from "../Screens/RegisterPhone";
import BookingDetails from "../Screens/BookingDetails";
import Logout from "../Screens/Logout";
const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();
const AuthStack = () => {
    return (
        <Drawer.Navigator initialRouteName="LoginScreen">
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
            <Drawer.Screen 
                name="LoginScreen" 
                component={LoginScreen} 
                options={{ 
                    headerShown: false,
                    drawerItemStyle: {
                        display: 'none'
                    },
                    drawerStyle: {
                        display: 'none'
                    }
                }}
            />
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

            <Drawer.Screen 
                name="BookingForm" 
                component={BookingForm} 
                options={{
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTitle: "Package Booking",
                    headerTintColor: Colors.white,
                    drawerItemStyle: {
                        display: 'none'
                    },
                    drawerStyle: {
                        display: 'none'
                    }
                }}
            />

            <Drawer.Screen 
                name="RegisterPhone" 
                component={RegisterPhone} 
                options={{
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTitle: "Register",
                    headerTintColor: Colors.white,
                    drawerItemStyle: {
                        display: 'none'
                    },
                    drawerStyle: {
                        display: 'none'
                    }
                }}
            />

            <Drawer.Screen
                name="ShowBookingDetails"
                component={BookingDetails}
                options={{
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTitle: "Booking Details",
                    headerTintColor: Colors.white,
                    drawerItemStyle: {
                        display: 'none',
                    },
                    drawerStyle: {
                        display: 'none'
                    }
                }}
            />
            
            <Drawer.Screen 
                name="Logout"
                component={Logout}
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