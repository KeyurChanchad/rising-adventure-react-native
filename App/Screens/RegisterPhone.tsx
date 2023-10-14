import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Dimensions,
  Pressable,
  Linking,
} from 'react-native';
import Colors from '../Resources/styles/Colors';
import CustomButton from '../Components/CustomButton';
import { api } from '../RestAPI/RestAPIHandler';

const screenWidth = Math.floor(Dimensions.get('window').width);
const screenHeight = Math.floor(Dimensions.get('window').height);
const maximumCodeLength = 6;
let boxArray = new Array(maximumCodeLength).fill('');

const RegisterPhone = ({route, navigation }: { route: any, navigation: any }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const inputRef = useRef<TextInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({ message: "", validate: false })


  const sendOTP = async () => {
    setLoading(true);
    console.log('OTP will send on ', email);
    let payload = {
      email,
    }
    // Linking.openURL(`whatsapp://send?text=Your Rising adventure verification code is: ${payload.otp}&phone=${payload.phoneNumber}`);
    try {
      let res: any = await api('/v1/opt/send', payload, 'post', 'token');
      console.log('response of sendotp ', JSON.stringify(res));
      if (res.status === 200){
        setOtp(res.data.OTP);
      }
      setLoading(false); 
    } catch (error) {
      console.log("Error in send otp ", error);   
      setLoading(false); 
    }
  };

  const handleOnPress = (index: number) => {
    console.log('box is pressed');
    if(inputRef && inputRef.current) {
        inputRef.current.focus();
        console.log('keyboard is apperared')
    } 
  };

  const boxDigit = (_:any, index: number) => {
    const digit = boxArray[index];

    return (
      <Pressable
        style={[styles.optInputBox, digit && styles.focus]}
        key={index}
        onBlur={handleOnBlur}
        onPress={() => {
          handleOnPress(index);
        }}>
        <Text style={styles.digit}> {digit} </Text>
      </Pressable>
    );
  };

  const handleOnBlur = () => {
    console.log("on blur is called");
  };

  const verifyOTP = (text: string) => {
    console.log('Verifing opt ', text);
    setEnteredOtp(text);
    boxArray = text.split("", text.length);
    console.log(otp , enteredOtp, boxArray);
    
    
    if(text.length === maximumCodeLength ){
      if(otp === text){
        setValidation({ message: 'Verified!', validate: true});
        setTimeout(()=>{
          console.log("verified successfully ");
          boxArray = Array(maximumCodeLength).fill('');
          navigation.navigate('BookingForm', { package_amount: route.params.package_amount, package_name: route.params.package_name, packageId: route.params.packageId })
        }, 1000)
      }
      else{
        console.log("Wrong otp entered.");
        setValidation({ message: 'Wrong OTP!', validate: true});
      }
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      { !otp.length ? 
      <View style={styles.box}>
        <Text style={styles.heading}> Email Address </Text>
        <TextInput style={styles.input} onChangeText={(text)=>{setEmail(text)}} value={email}  placeholder='Enter a valid email' keyboardType='email-address' />
        <Text style={styles.small}>
          {' '}
          We'll send OTP (One Time Password) to this email to verify your
          number.{' '}
        </Text>
        <CustomButton
          btnText={'Send'}
          btnStyle={{width: screenWidth / 4, marginTop: 10}}
          onClick={sendOTP}
        />
      </View>
        :
      <View style={styles.box}>
        <Text style={styles.heading}> OTP Verification </Text>
        <View style={styles.otpContainer}>
            {otp.split("", otp.length).map(boxDigit)} 
        </View>
        <TextInput
          style={styles.hiddenInput}
          onChangeText={(text)=> {verifyOTP(text)}}
          value={enteredOtp}
          keyboardType="numeric"
          autoFocus={true}
          ref={inputRef}
        />
        { validation.validate && <Text style={[styles.validationText, { color: validation.message === 'Wrong OTP!' ? 'red' : 'green' }]}> { validation.message } </Text>}
        <Text style={styles.small}>Please enter the OTP sent to {email}.</Text>
        {/**<CustomButton
          btnText={'Verify OTP'}
          btnStyle={{width: screenWidth / 3}}
          onClick={verifyOTP}
      />**/}
      </View>
    }
    </SafeAreaView>
  );
};

export default RegisterPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    marginTop: 30,
    marginHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightBlack,
    borderRadius: 10,
    paddingHorizontal: 10
  },
  hiddenInput: {
    height: 0,
    width: 0,
  },
  heading: {
    fontSize: 18,
    color: Colors.black,
    marginBottom: 10,
  },
  small: {
    fontSize: 15,
    marginVertical: 5,
  },
  otpContainer: {
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'relative',
  },
  optInputBox: {
    width: '13%',
    height: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.black,
    borderStyle: 'solid',
  },
  digit: {
    fontWeight: '700',
    fontSize: 26,
    textAlign: 'center',
  },
  focus: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'solid',
  },
  validationText: {
    alignSelf: 'flex-end', 
    marginRight: 10,  
    fontWeight: '600', 
    fontSize: 18
  }
});
