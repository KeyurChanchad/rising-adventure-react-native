import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Alert, ToastAndroid, Dimensions, TouchableOpacity, BackHandler
 } from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../Resources/styles/Colors';
import RazorpayCheckout from 'react-native-razorpay';
import { api } from '../RestAPI/RestAPIHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const BookingDetails = ({ navigation, route}: { navigation: any, route: any}) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
  }, [])
  
  const handleBackButtonClick = ()=> {
    console.log("Go to back...");
    
    navigation.goBack();
    return true;
  }

  const checkoutNow = () => {
    console.log("Redirect rezorpay payment gateway...");
    
    var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_yS4IjIG05nIf1G', // Your api key
    amount: route.params.formData.amount * 100,
    name:  route.params.formData.name,
    prefill: {
      email: route.params.formData.email,
      contact: route.params.formData.phoneNumber,
      name: route.params.formData.name
    },
    theme: {color: '#9600FF'}
  }
  RazorpayCheckout.open(options).then(async (data: any) => {
    // handle success
    let userInfo: any = await AsyncStorage.getItem("@loginUser");
    userInfo = JSON.parse(userInfo || "");
    const payload = {
      packageName: route.params.package_name,
      userId: userInfo.id,
      userName: route.params.formData.name,
      email: route.params.formData.email, 
      persons: route.params.formData.numberOfPersons,
      amount: route.params.formData.amount,
      joinUs: route.params.formData.joinUsFrom,
      date: route.params.formData.date,
      phoneNumber: route.params.formData.phoneNumber,
      address: route.params.formData.address
    }
    console.log("booked package payload ", payload);
    
    const res = await api('/v1/package/book', payload, 'post', 'token');
    if(res.status === 200){
      ToastAndroid.show('Package Book successfully', ToastAndroid.LONG)
      navigation.navigate('MyPackages', {successId: data.razorpay_payment_id})
    }
    else{
      Alert.alert("Package Booking", "Sorry your package has not book now, please contact us directly.", [{ text: 'Ok' }])
    }
  }).catch((error: any) => {
    // handle failure
    Alert.prompt(`Error: ${error.code} | ${error.description}`);
  });
  }

  return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 55}}>
          <View style={styles.field}>
            <Text style={styles.fieldName}> Name </Text>
            <Text style={styles.fieldValue}>{route.params.formData.name}</Text>
            <View style={styles.hr}></View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Email Address </Text>
            <Text style={styles.fieldValue}>{route.params.formData.email}</Text>
            <View style={styles.hr}></View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Package Name </Text>
            <Text style={styles.fieldValue}>{route.params.package_name}</Text>
            <View style={styles.hr}></View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Total Persons </Text>
            <Text style={styles.fieldValue}>{route.params.formData.numberOfPersons}</Text>
            <View style={styles.hr}></View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Total Amount </Text>
            <Text style={styles.fieldValue}>{route.params.formData.amount}</Text>
            <View style={styles.hr}></View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> JoinUs From </Text>
            <Text style={styles.fieldValue}>{route.params.formData.joinUsFrom}</Text>
            <View style={styles.hr}></View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Selected Date </Text>
            <Text style={styles.fieldValue}>{route.params.formData.date}</Text>
            <View style={styles.hr}></View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Phone Number </Text>
            <Text style={styles.fieldValue}>{route.params.formData.phoneNumber}</Text>
            <View style={styles.hr}></View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Address  </Text>
            <Text style={styles.fieldValue}>{route.params.formData.address} {route.params.formData.city} {route.params.formData.pinCode}</Text>
            <View style={styles.hr}></View>
          </View>
        </ScrollView>
        <TouchableOpacity
                style={styles.btn}
                onPress={checkoutNow}
              >
                <Text style={styles.btnText}> Continue to checkout </Text>
                { isLoading && <ActivityIndicator color={Colors.white} size={25} />  }
          </TouchableOpacity>
    </View>
  )
}

export default BookingDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  field:{
    padding: 5,
    marginVertical: 5,
  },
  fieldName:{
    fontSize: 14
  },
  fieldValue:{
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  btn: {
    backgroundColor: Colors.secondary,
    color: Colors.white,
    paddingVertical: 15,
    borderRadius: 30,
    paddingHorizontal: 20,
    width: screenWidth - 25,
    alignSelf: 'center',
    marginHorizontal: 25,
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  btnText: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: 'Roboto-Thin'
  },
  hr: {
    width: '90%',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: Colors.primary,
    left: 10,
    opacity: 0.3
  }
})