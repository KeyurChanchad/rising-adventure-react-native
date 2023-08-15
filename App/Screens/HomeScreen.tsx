import {
  StyleSheet, 
  Text, 
  View, 
  Dimensions, 
  FlatList, 
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import React from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import Colors from '../Resources/styles/Colors';
import Footer from '../Components/Footer';

const screenWidth = Math.floor(Dimensions.get('window').width);
const screenHeight = Math.floor(Dimensions.get('window').height);

const images = [
  // 'https://source.unsplash.com/1024x768/?nature', //Remote image
  require('../Assets/Images/carousel-1.jpg'),          // Local image
  require('../Assets/Images/carousel-2.jpg'),          // Local image
  require('../Assets/Images/carousel-3.jpg'),          // Local image
];

const events = [
  require('../Assets/Images/himalayas.jpg'),
  require('../Assets/Images/matheran.jpg'),
  require('../Assets/Images/dang.jpg'),
  require('../Assets/Images/manali.jpg'),
  require('../Assets/Images/kasol_manali.jpg'),
  require('../Assets/Images/polo_forest.jpg'),
  require('../Assets/Images/bakor.jpg'),
  require('../Assets/Images/saputara.jpg'),
]
const HomeScreen = () => {
  const renderItems = ({item}) => (
      <View style={styles.highlitedEvent}>
        <Image source={item} style={styles.eventImg} />
      </View>
    )
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1}}>

      <SliderBox images={images} sliderBoxHeight={screenHeight / 3} dotColor={Colors.primary} circleLoop={true} autoplayInterval={10000} autoplay={true} imageLoadingColor={Colors.primary} />

      <View style={styles.eventsContainer}>
        <View style={{ padding: 5}}>
          <Text style={styles.heading1}> Highlited Events </Text>
          <Text style={styles.tagline}> Recommended camps by our instructors</Text>
        </View>

        <FlatList
          data={events}
          renderItem={renderItems}
          keyExtractor={item => item}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Footer />
      </ScrollView>

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.teal,
    width: screenWidth,
    height: '5%',
    paddingHorizontal: 16,
  },
  appName: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.white,
  },
  eventsContainer: {
    marginTop: 10,
  },
  heading1: {
    fontWeight: '500',
    color: Colors.primary,
    fontSize: 24,
  },
  eventImg: {
    width: screenWidth / 2 ,
    height: screenHeight / 2 - 30,
    resizeMode: 'stretch',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '300'
  },
  highlitedEvent: {
    elevation: 1,
    marginVertical: 5,
  }
});
