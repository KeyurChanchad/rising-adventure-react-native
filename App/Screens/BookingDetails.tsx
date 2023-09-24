import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../Resources/styles/Colors';
import RazorpayCheckout from 'react-native-razorpay';

const BookingDetails = ({ navigation, route}: { navigation: any, route: any}) => {
  const [isLoading, setIsLoading] = useState(false);

  const checkoutNow = () => {
    console.log("Redirect rezorpay payment gateway...");
    
    var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: 'INR',
    key: 'rzp_test_yS4IjIG05nIf1G', // Your api key
    amount: route.params.package_amount * route.params.formData.numberOfPersons,
    name:  route.params.formData.name,
    prefill: {
      email: route.params.formData.email,
      contact: route.params.formData.phoneNumber,
      name: route.params.formData.name
    },
    theme: {color: '#F37254'}
  }
  RazorpayCheckout.open(options).then((data: any) => {
    // handle success
    Alert.alert(`Success: ${data.razorpay_payment_id}`);
  }).catch((error: any) => {
    // handle failure
    Alert.prompt(`Error: ${error.code} | ${error.description}`);
  });
  }

  return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.field}>
            <Text style={styles.fieldName}> Name </Text>
            <Text style={styles.fieldValue}>{route.params.formData.name}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Email Address </Text>
            <Text style={styles.fieldValue}>{route.params.formData.email}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Package Name </Text>
            <Text style={styles.fieldValue}>{route.params.package_name}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Total Persons </Text>
            <Text style={styles.fieldValue}>{route.params.formData.numberOfPersons}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Total Amount </Text>
            <Text style={styles.fieldValue}>{route.params.package_amount * route.params.formData.numberOfPersons}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> JoinUs From </Text>
            <Text style={styles.fieldValue}>{route.params.formData.joinUsFrom}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Selected Date </Text>
            <Text style={styles.fieldValue}>{route.params.formData.date}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Phone Number </Text>
            <Text style={styles.fieldValue}>{route.params.formData.phoneNumber}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldName}> Address  </Text>
            <Text style={styles.fieldValue}>{route.params.formData.address} {route.params.formData.city} {route.params.formData.pinCode}</Text>
          </View>

          <View style={styles.btnWrapper}>
            <TouchableOpacity
                  style={styles.btn}
                  onPress={checkoutNow}
                >
                  <Text style={styles.btnText}> Continue to checkout </Text>
                  { isLoading && <ActivityIndicator color={Colors.white} size={25} />  }
              </TouchableOpacity>
            </View>
        </ScrollView>
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
    marginVertical: 10,
  },
  fieldName:{
    fontSize: 14
  },
  fieldValue:{
    fontSize: 18
  },
  btnWrapper: {
    backgroundColor: Colors.secondary,
    paddingVertical: 20,
    borderRadius: 30,
    paddingHorizontal: '17%',
    marginTop: 20,
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: 'Roboto-Thin'
  },
})