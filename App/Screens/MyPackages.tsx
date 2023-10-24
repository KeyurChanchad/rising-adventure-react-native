import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, } from 'react-native';
import { api } from '../RestAPI/RestAPIHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Resources/styles/Colors';
import CustomButton from '../Components/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';

const MyPackages = () => {
 const [packages, setPackages] = useState([]);

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
    setPackages(res.data);
 }

 type data = {
    id: 'string',
    packageName: 'string',
    userId: 'string',
    userName: 'string',
    email: 'string',
    persons: number,
    status: 'string',
    amount: number,
    joinUs: 'string',
    date: 'string',
    phoneNumber: number,
    address: 'string'
  }

 const renderBookedPackage = async ({item}: {item: data})=> (
    <View style={styles.box}>
        <Text style={styles.text}> Event : { item.packageName }</Text>
        <Text style={styles.text}> Number of persons : { item.persons.toString() } </Text>
        <Text style={styles.text}> Join us place : { item.joinUs } </Text>
        <Text style={styles.text}> Event date : { item.date } </Text>
        <Text style={styles.text}> Status : Booked </Text>
        <Text style={styles.text}> Amount : { item.amount } </Text>
    </View>
 )

 const cancelPackage = (item: data)=> {
    console.log("canceling...", item.id);
    
 }

 return (
    <SafeAreaView style={styles.container}>
        {/* <FlatList
            data={packages}
            renderItem={renderBookedPackage}
            keyExtractor={item => item.id}
        /> */}
        <ScrollView>
            {
                packages.map((item: data, index: number) => (
                    <View style={styles.box} key={item.id}>
                        <Text style={styles.text}> Event : { item.packageName }</Text>
                        <Text style={styles.text}> Number of persons : { item.persons.toString() } </Text>
                        <Text style={styles.text}> Join us place : { item.joinUs } </Text>
                        <Text style={styles.text}> Event date : { item.date } </Text>
                        <Text style={styles.text}> Status : Booked </Text>
                        <Text style={styles.text}> Amount : { item.amount } </Text>
                        <CustomButton btnText="Cancel" btnStyle={{ width: 100, padding: 10 }} onClick={()=>cancelPackage(item)}/>

                    </View>
                ))
            }
        </ScrollView>
        
    </SafeAreaView>
 )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        borderWidth: 1,
        borderColor: Colors.black,
        borderStyle: 'solid',
        marginVertical: 20,
        marginHorizontal: 10,
        padding: 10
    },
    text: {
        fontSize: 18,
        fontWeight: '200',
        marginBottom: 2
    }
})

export default MyPackages;