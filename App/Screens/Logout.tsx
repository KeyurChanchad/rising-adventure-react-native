import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Resources/styles/Colors';

const Logout = ({ navigation }: { navigation: any}) => {

  useEffect(() => {
    console.log("signing out...");
    signOut();
    navigation.navigate('LoginScreen');
  }, [])
  

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('@loginUser'); 
      await AsyncStorage.removeItem('@emailVerified'); 
      console.log('signout sucessfully..');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text onPress={()=> signOut()} style={{ padding: 10, fontSize: 10, backgroundColor: Colors.primary, color: Colors.white, borderRadius: 10, margin: 10,}}>Logout</Text>
    </View>
  );
};

export default Logout;
