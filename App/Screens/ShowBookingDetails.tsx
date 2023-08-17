import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ShowBookingDetails = ({route, navigation }: {route: any, navigation: any}) => {
  return (
    <View>
      <Text>{ route.params.formData}</Text>
    </View>
  )
}

export default ShowBookingDetails

const styles = StyleSheet.create({});