//Utility
import NetInfo from '@react-native-community/netinfo';
import {ToastAndroid, Platform, AlertIOS, Alert} from 'react-native';
export default class Utility {
  /**
   * @method showToast
   * @description to display toast message
   */
  static showToast(msg, time=ToastAndroid.SHORT) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, time); //toast msg in android device
    } else {
      // AlertIOS.alert(msg); //alert msg
      Alert.alert(msg)
    }
  }

  /**
   * @method isNetworkAvailable
   * @description to get network information
   */
  static isNetworkAvailable = async ()=> {
    const response = await NetInfo.fetch(); //fetch network is available or not
    console.log("response of netinfo ", response);
    return response.isConnected;
  }
}
