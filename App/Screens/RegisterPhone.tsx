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
  Keyboard,
} from 'react-native';
import Colors from '../Resources/styles/Colors';
import CustomButton from '../Components/CustomButton';

const screenWidth = Math.floor(Dimensions.get('window').width);
const screenHeight = Math.floor(Dimensions.get('window').height);
const maximumCodeLength = 4;
const boxArray = new Array(maximumCodeLength).fill(0);

const RegisterPhone = ({route, navigation }: { route: any, navigation: any }) => {
  const [otp, setOtp] = useState('');
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);
  const inputRef = useRef<TextInput | null>(null);
  const [otpSended, setotpSended] = useState(false);

  const sendOTP = async () => {
    console.log('OTP will send');
    setotpSended(true);
  };

//   const OPTInput = () => {
//     return (
//       <View style={styles.otpContainer}>
//         {boxArray.map((digit, index) => (
//           <Pressable
//             style={[styles.optInputBox]}
//             key={index}
//             onPress={() => {
//                 handleOnPress(index);
//             }}>
//             <Text style={styles.digit}> {otp[index]} </Text>
//           </Pressable>
//         ))}
//       </View>
//     );
//   };

  const handleOnPress = (index: number) => {
    console.log('box is pressed');
    setIsInputBoxFocused(true);
    if(inputRef && inputRef.current) {
        inputRef.current.focus();
        console.log('keyboard is apperared')
    } 
    
  };

  const boxDigit = (_:any, index: number) => {
    const emptyInput = '';
    const digit = otp[index] || emptyInput;
    return (
      <Pressable
        style={[styles.optInputBox, isInputBoxFocused && styles.focus]}
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
    setIsInputBoxFocused(false);
  };

  const verifyOTP = () => {
    console.log('Verifing opt');
    setotpSended(false);
    navigation.navigate('BookingForm', { package_amount: route.params.package_amount, package_name: route.params.package_name })
  }

  return (
    <SafeAreaView style={styles.container}>
      { !otpSended ? 
      <View style={styles.box}>
        <Text style={styles.heading}> Phone Number </Text>
        <TextInput style={styles.input} />
        <Text style={styles.small}>
          {' '}
          We'll send OTP (One Time Password) to this phone number to verify your
          number.{' '}
        </Text>
        <CustomButton
          btnText={'Send'}
          btnStyle={{width: screenWidth / 4}}
          onClick={sendOTP}
        />
      </View>
        :
      <View style={styles.box}>
        <Text style={styles.heading}> OTP Verification </Text>
        <View style={styles.otpContainer}>
            {boxArray.map(boxDigit)} 
        </View>
        <TextInput
          style={styles.hiddenInput}
          onChangeText={setOtp}
          value={otp}
          maxLength={maximumCodeLength}
          keyboardType="numeric"
          autoFocus={true}
          ref={inputRef}
        />
        <Text style={styles.small}>
          {' '}
          Please enter the OTP sent to +919876543210.{' '}
        </Text>
        <CustomButton
          btnText={'Verify OTP'}
          btnStyle={{width: screenWidth / 3}}
          onClick={verifyOTP}
        />
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
    height: '20%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
    borderWidth: 3,
    borderColor: Colors.primary,
    borderStyle: 'solid',
  },
});
