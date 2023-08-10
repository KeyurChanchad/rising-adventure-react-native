import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../Resources/styles/Colors';
import {SliderBox} from 'react-native-image-slider-box';
import Footer from '../Components/Footer';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Timeline from 'react-native-timeline-flatlist';

const screenHeight = Math.floor(Dimensions.get('window').height);
const screenWidth = Math.floor(Dimensions.get('window').width);

const images = [
  // 'https://source.unsplash.com/1024x768/?nature', //Remote image
  require('../Assets/Images/carousel-7.jpg'), // Local image
  require('../Assets/Images/carousel-8.jpg'), // Local image
  require('../Assets/Images/carousel-1.jpg'), // Local image
  require('../Assets/Images/carousel-2.jpg'), // Local image
];

type joinUs = {
  from: string;
  image: string;
  price: number;
  days: number;
};

const joinUsData: joinUs[] = [
  {
    from: 'Ahmedabad',
    image:
      'https://imgs.search.brave.com/NzJQ9jpJi5l5Bt43x1_QixscSGzonNWmOR479P3hz7o/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMudHJhdmVsdHJp/YW5nbGUuY29tL2Js/b2cvd3AtY29udGVu/dC91cGxvYWRzLzIw/MTYvMDIvSmFtYS1N/YXNqaWQtaW4tQWht/ZWRhYmFkLmpwZw',
    price: 5500,
    days: 3,
  },
  {
    from: 'Baroda',
    image:
      'https://imgs.search.brave.com/NzJQ9jpJi5l5Bt43x1_QixscSGzonNWmOR479P3hz7o/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMudHJhdmVsdHJp/YW5nbGUuY29tL2Js/b2cvd3AtY29udGVu/dC91cGxvYWRzLzIw/MTYvMDIvSmFtYS1N/YXNqaWQtaW4tQWht/ZWRhYmFkLmpwZw',
    price: 5500,
    days: 3,
  },
  {
    from: 'Surat',
    image:
      'https://imgs.search.brave.com/NzJQ9jpJi5l5Bt43x1_QixscSGzonNWmOR479P3hz7o/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMudHJhdmVsdHJp/YW5nbGUuY29tL2Js/b2cvd3AtY29udGVu/dC91cGxvYWRzLzIw/MTYvMDIvSmFtYS1N/YXNqaWQtaW4tQWht/ZWRhYmFkLmpwZw',
    price: 5500,
    days: 3,
  },
  {
    from: 'Matheran',
    image:
      'https://imgs.search.brave.com/NzJQ9jpJi5l5Bt43x1_QixscSGzonNWmOR479P3hz7o/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMudHJhdmVsdHJp/YW5nbGUuY29tL2Js/b2cvd3AtY29udGVu/dC91cGxvYWRzLzIw/MTYvMDIvSmFtYS1N/YXNqaWQtaW4tQWht/ZWRhYmFkLmpwZw',
    price: 3500,
    days: 3,
  },
  {
    from: 'Mumbai',
    image:
      'https://imgs.search.brave.com/NzJQ9jpJi5l5Bt43x1_QixscSGzonNWmOR479P3hz7o/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMudHJhdmVsdHJp/YW5nbGUuY29tL2Js/b2cvd3AtY29udGVu/dC91cGxvYWRzLzIw/MTYvMDIvSmFtYS1N/YXNqaWQtaW4tQWht/ZWRhYmFkLmpwZw',
    price: 5000,
    days: 3,
  },
];

type datesDataType = {
  month: string;
  dates: number[];
};

const eventDates: datesDataType[] = [
  {
    month: 'Auguest',
    dates: [5, 6, 8, 12, 15, 22, 28],
  },
  {
    month: 'September',
    dates: [1, 2, 5, 16, 19, 21, 22, 25],
  },
  {
    month: 'October',
    dates: [4, 9, 11, 15, 18, 20, 24, 29, 30],
  },
  {
    month: 'November',
    dates: [5, 6, 8, 12, 15, 22, 28],
  },
  {
    month: 'December',
    dates: [5, 6, 8, 12, 15, 22, 28],
  },
];



const shedule = [
  {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
  {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
  {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
  {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
  {time: '16:30', title: 'Event 5', description: 'Event 5 Description'},
];

const Event = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState(0);

  const monthSelected = (month: string) => {
    console.log('Selected month is ', month);
    setSelectedMonth(month);
  }

  const dateSelected = (date: number) => {
    console.log('Selected date is ', date);
    setSelectedDate(date);
  }

  

  const renderJoinUsItem = ({item}: {item: joinUs}) => {
    return (
      <View style={styles.joinUsItem}>
        <Image source={{uri: item.image}} style={styles.joinUsImg} />
        <Text style={{fontSize: 20, fontWeight: '400'}}> {item.from} </Text>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <View style={styles.row}>
            <MaterialIcon
              name="currency-rupee"
              size={18}
              color={Colors.primary}
            />
            <Text> {item.price} /-</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome6 name="calendar" size={18} color={Colors.primary} />
            <Text> {item.days} days</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <SliderBox
          images={images}
          sliderBoxHeight={screenHeight / 4}
          dotColor={Colors.primary}
          circleLoop={true}
          parentWidth={screenWidth}
          autoplay={true}
          ImageComponentStyle={{}}
          imageLoadingColor={Colors.primary}
        />
        <View>
          <View style={styles.header}>
            <Text style={styles.packageName}> Marvellous Matheran </Text>
            <Text style={styles.tagline}>
              {' '}
              Experience the finest hill station of Maharashtra!{' '}
            </Text>
          </View>

          <View style={styles.packgeInfo}>
            <View style={styles.row}>
              <View style={styles.singleInfo}>
                <FontAwesome6
                  name="calendar"
                  size={18}
                  color={Colors.primary}
                />
                <View>
                  <Text> Duration </Text>
                  <Text> 3 days / 2 nights </Text>
                </View>
              </View>
              <View style={styles.singleInfo}>
                <MaterialIcon name="map" size={22} color={Colors.primary} />
                <View>
                  <Text> Difficulty </Text>
                  <Text> easy </Text>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.singleInfo}>
                <MaterialIcon name="group" size={22} color={Colors.primary} />
                <View>
                  <Text> Age group </Text>
                  <Text> 8-35 years </Text>
                </View>
              </View>
              <View style={styles.singleInfo}>
                <FontAwesome6
                  name="mountain-sun"
                  size={18}
                  color={Colors.primary}
                />
                <View>
                  <Text> Max Altitude </Text>
                  <Text> 2500 ft </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.hr}></View>

          <View style={styles.aboutInfo}>
            <Text style={styles.heading}> About </Text>
            <Text style={styles.secondaryText}>
              {' '}
              Matheran is situated near Mumbai in Maharashtra and is known for
              its misty mountains, toy trains and typical sahyadri weather.
              Marvelous Matheran is an event where trekkers will enjoy the misty
              mountains and hilly weather. The place is highly populated on
              weekends.{' '}
            </Text>
          </View>
        </View>

        <View style={styles.feeIncludeContainer}>
          <Text style={styles.heading}> Fee Includes </Text>
          <View style={styles.feeItems}>
            <View
              style={[
                styles.row,
                {justifyContent: 'space-evenly', marginVertical: 5},
              ]}>
              <View style={styles.feeItem}>
                <MaterialCommunityIcon
                  name="bus"
                  size={24}
                  color={Colors.primary}
                  style={styles.circle}
                />
                <Text> Travelling </Text>
              </View>
              <View style={styles.feeItem}>
                <MaterialIcon
                  name="fastfood"
                  size={24}
                  color={Colors.primary}
                  style={styles.circle}
                />
                <Text> Food </Text>
              </View>
              <View style={styles.feeItem}>
                <MaterialIcon
                  name="sports-football"
                  size={24}
                  color={Colors.primary}
                  style={styles.circle}
                />
                <Text> Activity </Text>
              </View>
            </View>

            <View
              style={[
                styles.row,
                {justifyContent: 'space-evenly', marginVertical: 5},
              ]}>
              <View style={styles.feeItem}>
                <FontAwesome6
                  name="mountain-sun"
                  size={18}
                  color={Colors.primary}
                  style={styles.circle}
                />
                <Text> Stay </Text>
              </View>
              <View style={styles.feeItem}>
                <MaterialIcon
                  name="local-hospital"
                  size={24}
                  color={Colors.primary}
                  style={styles.circle}
                />
                <Text> First Aid </Text>
              </View>
              <View style={styles.feeItem}>
                <FontAwesome6
                  name="circle-user"
                  size={24}
                  color={Colors.primary}
                  style={styles.circle}
                />
                <Text> Guide </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.joinUsContainer}>
          <Text style={styles.heading}> Join us from </Text>
          <View style={styles.joinUsPlaces}>
            <FlatList
              data={joinUsData}
              renderItem={renderJoinUsItem}
              keyExtractor={item => item.from}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.heading}> Date from Ahmedabad </Text>

          <View style={[styles.row, {flexWrap: 'wrap'}]}>
            {eventDates.map((item: datesDataType, index: number) => (
              <Pressable style={[styles.month, { backgroundColor: selectedMonth===item.month ? Colors.primary : Colors.white}]} key={index} onPress={() => monthSelected(item.month)}>
                <Text style={[styles.text, { color: selectedMonth===item.month ? Colors.white : Colors.primary }]}>{item.month}</Text>
              </Pressable>
            ))}
          </View>

          <View style={[styles.row, {flexWrap: 'wrap'}]}>
            {eventDates[0].dates.map((date: number, index: number) => (
              <Pressable style={[styles.date, { backgroundColor: selectedDate===date ? Colors.primary : Colors.white}]} key={index} onPress={() => dateSelected(date)}>
                <Text style={[styles.text, { color: selectedDate===date ? Colors.white : Colors.primary }]}>{date}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    marginHorizontal: 10,
  },

  packageName: {
    fontWeight: '500',
    color: Colors.primary,
    fontSize: 24,
  },

  tagline: {
    fontSize: 16,
    fontWeight: '300',
  },

  packgeInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 10,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
  },

  singleInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
  },

  hr: {
    borderColor: Colors.black,
    opacity: 0.5,
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },

  aboutInfo: {
    padding: 10,
  },

  heading: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
  },

  secondaryText: {
    fontSize: 15,
  },

  feeIncludeContainer: {
    padding: 10,
  },

  circle: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: Colors.grey,
    width: 45,
    height: 45,
  },

  feeItem: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    marginHorizontal: 5,
  },

  feeItems: {
    marginVertical: 5,
  },

  joinUsContainer: {
    padding: 10,
  },

  joinUsItem: {
    width: screenWidth / 2 + 20,
    height: 200,
    backgroundColor: Colors.white,
    marginRight: 10,
    padding: 10,
    borderRadius: 15,
    elevation: 3,
  },

  joinUsImg: {
    flex: 1,
    borderRadius: 15,
  },

  joinUsPlaces: {
    marginVertical: 5,
    paddingVertical: 10,
  },

  dateContainer: {
    marginVertical: 5,
    paddingVertical: 10,
  },

  month: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  date: {
    padding: 4,
    width: 35,
    height: 35,
    borderRadius: 15,
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});
