import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator
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
import { StackActions } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../Resources/styles/Colors';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [loggedIn, setloggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [configure, setConfigure] = useState(false);

  useEffect(() => {
    (async () => {
      const userInfo = await AsyncStorage.getItem('@loginUser');
      // console.log("Final output ", userInfo);
      userInfo &&
        navigation.replace('HomeScreen', {
          screen: 'HomeScreen',
        });
      console.log("configure google signing...");
      
      GoogleSignin.configure({
        scopes: ['email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
        webClientId:
          '574593264255-gnja60ufkt2aosqk5gu59lfm9jjkledp.apps.googleusercontent.com', // in oauth_client client_type: 3 client_ID from google-services.josn
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      });
    })();
  }, [configure]);

  const signIn = async () => {
    try {
      setConfigure(true);
      setIsLoading(true);
      console.log("trying to login...");
      await GoogleSignin.signOut();
      console.log('Sign with google is called...');
      await GoogleSignin.hasPlayServices();
      let info = await GoogleSignin.signIn();
      await AsyncStorage.setItem('@loginUser', JSON.stringify(info)); 
      setloggedIn(true);
      setIsLoading(false);
      console.log('Login information ', info);
      console.log('Login EMAIL ', info.user.email);
      navigation.navigate('HomeScreen', {})
      // let result = await axios({
      //   method: 'get',
      //   url: `https://script.google.com/macros/s/AKfycbx1wYrX1YgXRoa5f_ZlBJiAGpiem1ph4A-Ti3X4eh6ZycCa0PazZz0pxEsT1IaMk67cAw/exec?sheet=${config.sheetId}&subsheet=Users&query=select * where A='${info.user.email}'`,
      //   data: null,
      // });
      // console.log('Email is exits ', result.data);
      // if (Number(JSON.stringify(result.data.length)) !== 0) {
      //   info = {...info, roll: result.data[0].Roll};
      //   console.log('Login information ', info);
      //   await AsyncStorage.setItem('@loginUser', JSON.stringify(info));
      //   navigation.replace('HomeScreen', {
      //     screen: 'HomeScreen',
      //   });
      // } else {
      //   Alert.alert('The email you loggedIn with is not exited.');
      //   await GoogleSignin.signOut();
      // }
    } catch (error: any) {
      setConfigure(true);
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
    <View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <Text style={styles.addName}> Rising Adventure  </Text>
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              style={styles.btn}
              onPress={signIn}
            >
              <AntDesign
                name="google"
                size={20}
                color={Colors.black}
              />
              <Text style={styles.btnText}> Continue with Google </Text>
              { isLoading && <ActivityIndicator color={Colors.white} size={25} />  }
            </TouchableOpacity>
          </View>
          {/* <View style={styles.btnLogin}>
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={signIn}
            />            
          </View> */}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  addName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  body: {
    padding: 20,
    height: screenHeight,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    justifyContent: 'space-between',
  },
  btnText: {
    color: Colors.black,
    fontSize: 20,
  },
});