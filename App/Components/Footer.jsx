import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../Resources/styles/Colors';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.heading}>Rising Adventure</Text>
      <Text style={styles.secondText}>
        Rising is a Non Government Organization, being run by young students for
        social reformation and building the nation with moral values and ethics.
      </Text>
      <View style={styles.icons}>
        <TouchableOpacity style={styles.icon}>
          <MaterialCommunityIcon
            name="facebook"
            size={26}
            color={Colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <MaterialCommunityIcon
            name="instagram"
            size={26}
            color={Colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <MaterialCommunityIcon
            name="youtube"
            size={26}
            color={Colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <MaterialCommunityIcon
            name="whatsapp"
            size={26}
            color={Colors.black}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <MaterialIcon
            name="call"
            size={26}
            color={Colors.black}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.heading2}>Contact</Text>
        <Text style={{ fontSize: 18, color: Colors.white}}> Ahmedabad </Text>
        <Text style={styles.secondText}>
          308, University Plaza, Above Chocolate Room, Vijay Cross Roads,
          Navrangpura, Ahmedabad, Gujarat 380009
        </Text>
        <Text style={[styles.secondText, { marginVertical: 3}]}> Office Timings: 11AM to 8PM </Text>
      </View>
      <View style={styles.hr}></View>
      <Text style={styles.copyRight}>
        {' '}
        © 2023-2024 Rising • Privacy Policy • Terms and Conditions{' '}
      </Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 20,
    backgroundColor: Colors.black,
    padding: 16,
  },
  icons: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  icon: {
    padding: 5,
    borderRadius: 30,
    backgroundColor: Colors.white,
    marginHorizontal: 5,
  },
  copyRight: {
    color: Colors.white,
    marginVertical: 10,
    fontSize: 15,
  },
  heading: {
    fontSize: 24,
    color: Colors.primary,
    marginBottom: 2,
  },
  heading2: {
    fontSize: 21,
    color: Colors.primary,
    marginBottom: 2,
  },
  secondText: {
    fontSize: 15,
    color: Colors.white,
    letterSpacing: 0.5,
    opacity: 0.7,
  },
  contactInfo: {
    marginVertical: 10,
  },
  hr: {
    borderColor: Colors.black,
    opacity: 0.5,
    borderBottomWidth: 1
  },
});
