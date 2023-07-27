import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Button,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const LoginScreen = ({navigation}) => {
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const userInfo = await AsyncStorage.getItem('@loginUser');
      // console.log("Final output ", userInfo);
      userInfo &&
        navigation.replace('Home', {
          screen: 'Home',
        });
      GoogleSignin.configure({
        scopes: ['email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
        webClientId:
          '574593264255-gnja60ufkt2aosqk5gu59lfm9jjkledp.apps.googleusercontent.com', // in oauth_client client_type: 3 client_ID from google-services.josn
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      });
    })();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.signOut();
      console.log('Sign with google is called...');
      await GoogleSignin.hasPlayServices();
      let info = await GoogleSignin.signIn();
      setloggedIn(true);
      console.log('Login information ', info);
      console.log('Login EMAIL ', info.user.email);
      let result = await axios({
        method: 'get',
        url: `https://script.google.com/macros/s/AKfycbx1wYrX1YgXRoa5f_ZlBJiAGpiem1ph4A-Ti3X4eh6ZycCa0PazZz0pxEsT1IaMk67cAw/exec?sheet=${config.sheetId}&subsheet=Users&query=select * where A='${info.user.email}'`,
        data: null,
      });
      console.log('Email is exits ', result.data);
      if (Number(JSON.stringify(result.data.length)) !== 0) {
        info = {...info, roll: result.data[0].Roll};
        console.log('Login information ', info);
        await AsyncStorage.setItem('@loginUser', JSON.stringify(info));
        navigation.replace('Home', {
          screen: 'Home',
        });
      } else {
        Alert.alert('The email you loggedIn with is not exited.');
        await GoogleSignin.signOut();
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        console.log('Some other error ', error);
      }
    }
  };

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <Text style={styles.addName}> Rising Adventure </Text>
            <View style={styles.btnLogin}>
              <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  addName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  body: {
    height: screenHeight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogin: {
    alignItems: 'center',
  },
});