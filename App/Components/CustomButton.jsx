import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../Resources/styles/Colors'

const CustomButton = (props) => {
  return (
    <TouchableOpacity style={[styles.btn, props.btnStyle]} onPress={props.onclick}>
      <Text style={styles.btnText}> { props.btnText} </Text>
    </TouchableOpacity>
  )
}

export default CustomButton;

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: Colors.primary,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderStyle: 'solid',
        borderRadius: 10,
    },
    btnText: {
        color: Colors.white,
        fontSize: 18,
    }
});