import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../Resources/styles/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShowBookingDetails = ({route, navigation }: {route: any, navigation: any}) => {
  const [data, setData] = useState({name: '', joinUsFrom: '', date: '', phoneNumber: '', city: '', state: '', pinCode: '', address: '', numberOfPersons: 0,  package_amount: 0, package_name: '' });
  useEffect(() => {
    setData({
      ...route.params.formData,
      package_amount: route.params.package_amount,
      package_name: route.params.package_name,
    });
    console.log(data);
  }, [])
  
  return (
    <View style={styles.mainContainer}>
        <Text style={styles.heading}> Booking Details </Text>
        <View style={styles.container}>
          
          <View style={styles.field}>
            <Text style={styles.fieldName}> Package Name: </Text>
            <Text style={styles.fieldValue}> {data.package_name} </Text> 
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Booking Date: </Text>
            <Text style={styles.fieldValue}> {data.date} </Text> 
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Amount: </Text>
            <Text style={styles.fieldValue}> {data.numberOfPersons * data.package_amount} </Text> 
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Name: </Text>
            <Text style={styles.fieldValue}> {data.name} </Text> 
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Email: </Text>
            <Text style={styles.fieldValue}> keyur@myself.gmail.com </Text> 
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Phone Number: </Text>
            <Text style={styles.fieldValue}> {data.phoneNumber} </Text> 
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Address: </Text>
            <Text style={styles.fieldValue}> {data.address} </Text> 
          </View>
        </View>
    </View>
  )
}

export default ShowBookingDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    padding: 5,
  },
  container: {
    marginVertical: 10
  },
  field: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  fieldName: {
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: Colors.secondary,
    width: '35%',
    padding: 10,
    borderRadius: 10,
  },
  fieldValue: {
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: Colors.secondary,
    width: '55%',
    padding: 10,
    borderRadius: 10,
  },
});