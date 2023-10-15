import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, } from 'react-native';
import { api } from '../RestAPI/RestAPIHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPackages = () => {
 useEffect(()=>{
    (async ()=>{
        await getBookedPackages();
    })()
 }, []);

 const getBookedPackages = async ()=> {
    let userInfo: any = await AsyncStorage.getItem("@loginUser");
    userInfo = JSON.parse(userInfo || "");
    const userId = userInfo.id
    const res = await api(`/v1/getBookedPackages/${userId}`, null, 'get', 'token');
    console.log("Booked packages ", res);
    
 }

 return (
    <SafeAreaView>
        <View>
            <Text> My Packages</Text>
        </View>
    </SafeAreaView>
 )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default MyPackages;