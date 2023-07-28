import { 
  StyleSheet, 
  Text, 
  View,
  Dimensions
} from 'react-native'
import React from 'react';
import { SliderBox } from "react-native-image-slider-box";
import Colors from '../Resources/styles/Colors';

const screenWidth = Math.floor(Dimensions.get('window').width);
const screenHeight = Math.floor(Dimensions.get('window').height);

const images = [
  "https://source.unsplash.com/1024x768/?nature",
  "https://source.unsplash.com/1024x768/?water",
  "https://source.unsplash.com/1024x768/?girl",
  "https://source.unsplash.com/1024x768/?tree", // Network image
  // require('./assets/images/girl.jpg'),          // Local image
]
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text>Rising Adventure</Text>
      </View>
      <SliderBox images={images} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.teal,
    width: screenWidth,
    height: '5%'
  }
})