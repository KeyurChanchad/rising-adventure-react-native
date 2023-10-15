import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  ScrollView,
  BackHandler,
} from 'react-native';
import React, { useEffect } from 'react';
import Colors from '../Resources/styles/Colors';
import {SliderBox} from 'react-native-image-slider-box';
import Footer from '../Components/Footer';

const screenHeight = Math.floor(Dimensions.get('window').height);
const screenWidth = Math.floor(Dimensions.get('window').width);

const data = [
  {
    id: 1,
    item: 'item 1',
  },
  {
    id: 2,
    item: 'item 3',
  },
  {
    id: 3,
    item: 'item 3',
  },
  {
    id: 4,
    item: 'item 4',
  },
  {
    id: 5,
    item: 'item 15',
  },
];

const images = [
  // 'https://source.unsplash.com/1024x768/?nature', //Remote image
  require('../Assets/Images/carousel-4.jpg'), // Local image
  require('../Assets/Images/carousel-5.jpg'), // Local image
  require('../Assets/Images/carousel-6.jpg'), // Local image
];

const EventsScreen = ({ navigation }: { navigation: any }) => {
  useEffect(()=>{
    const backHandler = BackHandler.addEventListener('hardwareBackPress', ()=> {
      console.log("~~~~~~``` Go to Back ~~~~~~~~");
      
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
      else{
        BackHandler.exitApp();
      }
      return true;
    });
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{padding: 16}}>
          <Text style={styles.heading1}> Our Events </Text>
          <Text style={styles.tagline}>
            Life is either a daring adventure or nothing.
          </Text>
        </View>
        <View style={styles.eventsContainer}>
          {data.map((event, index) => (
            <View style={styles.event} key={index}>
              <SliderBox
                images={images}
                sliderBoxHeight={screenHeight / 4}
                dotColor={Colors.primary}
                circleLoop={true}
                parentWidth={screenWidth - 50}
                ImageComponentStyle={{
                  borderRadius: 15,
                  width: '97%',
                  marginTop: 5,
                }}
                imageLoadingColor={Colors.primary}
              />
              <View>
                <Text style={styles.eventName}> Marvellous Matheran </Text>
                <View style={styles.eventInfo}>
                  <Text style={styles.price}> From 5000 /- </Text>
                  <Text style={styles.duration}> 3 days/ 2 nights </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading1: {
    fontWeight: '500',
    color: Colors.primary,
    fontSize: 24,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '300',
  },
  eventsContainer: {
    marginBottom: 20,
  },
  event: {
    height: screenHeight / 3 + 10,
    width: screenWidth - 40,
    backgroundColor: Colors.white,
    marginVertical: 7,
    marginHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 20,
    padding: 5,
    elevation: 3,
  },
  eventName: {
    fontWeight: '400',
    color: Colors.primary,
    fontSize: 18,
  },
  eventInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {},
  duration: {},
});
