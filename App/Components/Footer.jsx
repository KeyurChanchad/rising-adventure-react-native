import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../Resources/styles/Colors';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text>Rising Adventure</Text>
      <Text>
      Rising is a Non Government Organization, being run by young
      students for social reformation and building the nation with moral
      values and ethics.
    </Text>
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity style={styles.icon}>
        <MaterialCommunityIcon
          name='facebook'
          size={18}
          color={Colors.white}
          />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <MaterialCommunityIcon
          name='instagram'
          size={18}
          color={Colors.white}
          />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <MaterialCommunityIcon
          name='youtube'
          size={18}
          color={Colors.white}
          />
      </TouchableOpacity>
    </View>
    </View>
  )
}

export default Footer;

const styles = StyleSheet.create({
    footerContainer: {
      marginTop: 20,
      backgroundColor: Colors.sliver,
    }
})