import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Colors from '../Resources/styles/Colors';
import { TextInput } from 'react-native-gesture-handler';
import CustomButton from '../Components/CustomButton';

const screenWidth = Math.floor(Dimensions.get('window').width);
const screenHeight = Math.floor(Dimensions.get('window').height);

const BookingForm = ({navigation}: {navigation: any}) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    pinCode: '',
    address: '',
    joinUsFrom: '',
    date: '',
    persons: '',
    phoneNumber: '',
  });
  useEffect(() => {
    console.log(formData);
  }, [formData]);

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

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}> Matheran Hill Station </Text>
        <View style={{marginVertical: 20}}>
          <View style={styles.formField}>
            <Text style={styles.label}> Name </Text>
            <TextInput style={styles.input} />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}> Phone Number </Text>
            <TextInput style={styles.input} />
          </View>
          
          <View style={styles.formField}>
            <Text style={styles.label}> Join us from </Text>
            <Dropdown
              style={[styles.dropdown]}
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
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}> Join us from </Text>
            <Dropdown
              style={[styles.dropdown]}
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
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}> City </Text>
            <TextInput style={styles.input} />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}> State </Text>
            <TextInput style={styles.input} />
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}> Pincode </Text>
            <TextInput style={styles.input}  keyboardType="numeric"/>
          </View>

          <View style={styles.formField}>
            <Text style={styles.label}> Address </Text>
            <TextInput style={styles.input} multiline={true} numberOfLines={4} />
          </View>

          <CustomButton btnText="Continue to Checkout"

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
    borderWidth: 1,
    borderColor: Colors.lightBlack,
    borderRadius: 10,
    height: 50,
  }
});
