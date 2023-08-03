import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={{fontSize: 26, textAlign: 'center'}}>Rising Adventure</Text>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
    footerContainer: {
        
    }
})