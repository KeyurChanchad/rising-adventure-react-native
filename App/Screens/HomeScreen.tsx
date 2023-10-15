import {
  StyleSheet, 
  Text, 
  View, 
  Dimensions, 
  FlatList, 
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
  ToastAndroid,
  BackHandler
} from 'react-native';
import React,{ useState, useEffect } from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import Colors from '../Resources/styles/Colors';
import Footer from '../Components/Footer';
import { api } from '../RestAPI/RestAPIHandler';
import Utility from '../Helpers/Utility';

const screenWidth = Math.floor(Dimensions.get('window').width);
const screenHeight = Math.floor(Dimensions.get('window').height);

const images = [
  // 'https://source.unsplash.com/1024x768/?nature', //Remote image
  require('../Assets/Images/carousel-1.jpg'),          // Local image
  require('../Assets/Images/carousel-2.jpg'),          // Local image
  require('../Assets/Images/carousel-3.jpg'),          // Local image
];

interface Event {
id: string,
name: string,
slogan: string,
days: number,
nights: number,
minAge: number,
maxAge: number,
maxAltitude: number,
amount: number,
description: string,
joinUsFrom: Array<object>,
availableDates: Array<object>,
crouselImages: Array<string>,
coverImage: string
}


const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log("calling");
    
    (async ()=>{
      await getAllEvents();
    })();

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
  
  const getAllEvents = async () => {
    console.log("getting all events");
    try {
      console.log("api calling ");
      var res: any = await api('/v1/getAllPackages', {}, 'get', 'token');
      res.status === 200 ? setEvents(res.data) : setEvents([]);
      // console.log("All events ", res.data);
    } catch (error) {
      console.log("error of events ", error);
      Utility.showToast("Internal server error", ToastAndroid.LONG)
    }
  }
  const renderItems = ({ item }: { item: Event}) => (
    <Pressable style={styles.highlitedEvent} onPress={
      ()=> navigation.navigate('Event', { data: item })
    }>
      <Image source={{ uri: item.coverImage}} style={styles.eventImg} />
    </Pressable>
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
          keyExtractor={item => item.id}
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
