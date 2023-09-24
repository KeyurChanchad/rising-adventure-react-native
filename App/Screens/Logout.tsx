import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logout = () => {
  useEffect(() => {
    signOut();
  }, []);

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('@loginUser'); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Logout</Text>
    </View>
  );
};

export default Logout;
