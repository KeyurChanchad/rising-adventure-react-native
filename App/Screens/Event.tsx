import { 
  StyleSheet, 
  Text, 
  View,
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native';
import React from 'react';
import Colors from '../Resources/styles/Colors';
import {SliderBox} from 'react-native-image-slider-box';
import Footer from '../Components/Footer';

const screenHeight = Math.floor(Dimensions.get('window').height);
const screenWidth = Math.floor(Dimensions.get('window').width); 

const images = [
  // 'https://source.unsplash.com/1024x768/?nature', //Remote image
  require('../Assets/Images/carousel-7.jpg'), // Local image
  require('../Assets/Images/carousel-8.jpg'), // Local image
  require('../Assets/Images/carousel-1.jpg'), // Local image
  require('../Assets/Images/carousel-2.jpg'), // Local image
];

const Event = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1}}>

      <SliderBox
        images={images}
        sliderBoxHeight={screenHeight / 4 }
        dotColor={Colors.primary}
        circleLoop={true}
        parentWidth={screenWidth}
        autoplay={true}
        ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
        imageLoadingColor={Colors.primary}
      />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Event

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})