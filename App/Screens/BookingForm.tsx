import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Colors from '../Resources/styles/Colors';
import CustomButton from '../Components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Math.floor(Dimensions.get('window').width);
const screenHeight = Math.floor(Dimensions.get('window').height);

const BookingForm = ({route, navigation}: {route: any, navigation: any}) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    // state: '',
    // pinCode: '',
    address: '',
    joinUsFrom: '',
    date: '',
    phoneNumber: '',
    numberOfPersons: '1',
    email: '',
  });

  const [focusData, setFocusData] = useState({
    name: false,
    // state: false,
    // pinCode: false,
    city: false,
    address: false,
    joinUsFrom: false,
    date: false,
    phoneNumber: false,
    numberOfPersons: false,
    email: false,
  })
  

  useEffect(() => {
    (async ()=>{
      await getEmail();
    })();
  }, []);

  const getEmail = async ()=> {
    let USER_INFO: any = await AsyncStorage.getItem('@loginUser');
    USER_INFO  = USER_INFO && JSON.parse(USER_INFO);
    console.log('Email logged in is ', USER_INFO.user.email);
    setFormData((prev)=> (
      {
        ...prev,
        ['email']: USER_INFO.user.email,
      }
    ))
  }

  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];

  const personsData = [
    {label: '1', value: '1'}, 
    {label: '2', value: '2'}, 
    {label: '3', value: '3'}, 
    {label: '4', value: '4'}, 
    {label: '5', value: '5'},
  ];

  const setData = (text:string, id:string) => {
    setFormData((prev)=> (
      {
        ...prev,
        [id]: text
      }
    ))
  }

  const checkValidation = async () => {
    if (formData.name && formData.joinUsFrom && formData.date && formData.phoneNumber && formData.city && formData.address && formData.numberOfPersons && formData.email ) {
      return true
    }
    else{
      return false
    }
  }
  const handleBookingForm = async () => {
    console.log('check validatiaon');
    const validate = await checkValidation();
    console.log("VAlidation ", validate);
    validate && navigation.navigate('ShowBookingDetails', { formData, package_amount: route.params.package_amount, package_name: route.params.package_name, })
  }

  const onFieldFocus = (field: string) => {
    setFocusData((prev)=> (
        {
          ...prev,
          [field]: true,
        }
    ))
  }

  const onFieldBlur = (field: string) => {
    setFocusData(prev => (
      {
        ...prev,
        [field]: false
      }
    ))
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}> Matheran Hill Station </Text>
        <View style={{marginVertical: 20}}>

          <View style={styles.formField}>
            <Text style={styles.label}> Name </Text>
            <TextInput style={[styles.input, focusData.name && {borderWidth: 1, borderColor: Colors.primary}]} id='name' onChangeText={(text:string)=> {setData(text, 'name')}} value={formData.name} placeholder='Enter name' onFocus={() => onFieldFocus('name')} onBlur={() => onFieldBlur('name')} />
          </View>
          
          <View style={styles.formField}>
            <Text style={styles.label}> Join us from </Text>
            <Dropdown
              style={[styles.dropdown, focusData.joinUsFrom && {borderWidth: 1, borderColor: Colors.primary}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Select item'}
              searchPlaceholder="Search..."
              value={formData.joinUsFrom}
              onChange={item => {
                setFormData(prev => ({
                  ...prev,
                  ['joinUsFrom']: item.value,
                }));
              }}
              onFocus={()=> onFieldFocus('joinUsFrom')}
              onBlur={()=> onFieldBlur('joinUsFrom')}
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}> Available Date </Text>
            <Dropdown
              style={[styles.dropdown, focusData.date && {borderWidth: 1, borderColor: Colors.primary}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Select date'}
              searchPlaceholder="Search..."
              value={formData.date}
              onChange={item => {
                setFormData(prev => ({
                  ...prev,
                  ['date']: item.value,
                }));
              }}
              onFocus={()=> onFieldFocus('date')}
              onBlur={()=> onFieldBlur('date')}
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}> Number Of Persons </Text>
            <Dropdown
              style={[styles.dropdown, focusData.numberOfPersons && {borderWidth: 1, borderColor: Colors.primary}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              data={personsData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Number of Persons'}
              searchPlaceholder="Search..."
              value={formData.numberOfPersons}
              onChange={item => {
                setFormData(prev => ({
                  ...prev,
                  ['numberOfPersons']: item.value,
                  ['amount']: (+item.value * 5500).toString(),
                }));
              }}
              onFocus={()=> onFieldFocus('numberOfPersons')}
              onBlur={()=> onFieldBlur('numberOfPersons')}
            />
          </View>

          {/* <View style={styles.formField}>
            <Text style={styles.label}> Payable Amount </Text>
            <TextInput style={styles.input} keyboardType={'numeric'} id='amount' value={formData.amount} editable={false}  />
          </View> */}

          <View style={styles.formField}>
            <Text style={styles.label}> Email </Text>
            <TextInput style={[styles.input, focusData.email && {borderWidth: 1, borderColor: Colors.primary}]} keyboardType={'email-address'} id='email' onChangeText={(text:string)=> {setData(text, 'email')}} value={formData.email} placeholder='Enter email number' onFocus={() => onFieldFocus('email')} onBlur={() => onFieldBlur('email')}/>
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}> Phone Number </Text>
            <TextInput style={[styles.input, focusData.phoneNumber && {borderWidth: 1, borderColor: Colors.primary}]} keyboardType={'phone-pad'} id='phoneNumber' onChangeText={(text:string)=> {setData(text, 'phoneNumber')}} value={formData.phoneNumber} placeholder='Enter mobile number'onFocus={() => onFieldFocus('phoneNumber')} onBlur={() => onFieldBlur('phoneNumber')} />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}> City </Text>
            <TextInput style={[styles.input, focusData.city && {borderWidth: 1, borderColor: Colors.primary}]} id='city' onChangeText={(text:string)=> {setData(text, 'city')}} value={formData.city} placeholder='Enter city name' onFocus={() => onFieldFocus('city')} onBlur={() => onFieldBlur('city')} />
          </View>

          {/* <View style={styles.formField}>
            <Text style={styles.label}> State </Text>
            <TextInput style={[styles.input, focusData.state && {borderWidth: 1, borderColor: Colors.primary}]} id='state' onChangeText={(text:string)=> {setData(text, 'state')}} value={formData.state} placeholder='Enter state name' onFocus={() => onFieldFocus('state')} onBlur={() => onFieldBlur('state')} />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}> Pincode </Text>
            <TextInput style={[styles.input, focusData.pinCode && {borderWidth: 1, borderColor: Colors.primary}]}  keyboardType="numeric" id='pinCode' onChangeText={(text:string)=> {setData(text, 'pinCode')}} value={formData.pinCode} placeholder='Enter pincode number' onFocus={() => onFieldFocus('pinCode')} onBlur={() => onFieldBlur('pinCode')} />
          </View> */}

          <View style={styles.formField}>
            <Text style={styles.label}> Address </Text>
            <TextInput style={[styles.input, focusData.address && {borderWidth: 1, borderColor: Colors.primary}]} multiline={true} numberOfLines={5} id='address' onChangeText={(text:string)=> {setData(text, 'address')}} value={formData.address} placeholder='Enter address' onFocus={() => onFieldFocus('address')} onBlur={() => onFieldBlur('address')} />
          </View>

          <CustomButton btnText="Continue to Pay" onClick={handleBookingForm} btnStyle={{ marginVertical: 5, height: 50 }} />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingForm;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 23,
    fontStyle: 'normal',
    fontWeight: '500',
    textAlign: 'center',
  },
  formField: {
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  input: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.lightBlack,
    borderRadius: 10,
    height: 50,
    fontSize: 16,
  }
});
