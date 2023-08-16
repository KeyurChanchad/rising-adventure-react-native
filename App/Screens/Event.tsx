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
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../Resources/styles/Colors';
import {SliderBox} from 'react-native-image-slider-box';
import Footer from '../Components/Footer';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Timeline from 'react-native-timeline-flatlist';
import CustomButton from '../Components/CustomButton';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native-gesture-handler';

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

const scheduleData = [
  {
    time: 'Day 0',
    date: 'Aug 17, 2023',
    title: 'Departure from Ahmedabad/Baroda/Surat',
    description:
      'The camp will depart on the previous day evening from Ahmedabad.\ni.e. if the camp start date on Friday, then the camp will depart on Thursday evening.',
  },
  {
    time: 'Day 1',
    date: 'Aug 17, 2023',
    title: 'Departure from Ahmedabad/Baroda/Surat',
    description:
      'The camp will depart on the previous day evening from Ahmedabad.\ni.e. if the camp start date on Friday, then the camp will depart on Thursday evening',
    imageUrl:
      'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg',
  },
  {
    time: 'Day 2',
    date: 'Aug 17, 2023',
    title: 'Departure from Ahmedabad/Baroda/Surat',
    description:
      'The camp will depart on the previous day evening from Ahmedabad.\ni.e. if the camp start date on Friday, then the camp will depart on Thursday evening.',
    imageUrl:
      'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg',
  },
  {
    time: 'Day 3',
    date: 'Aug 17, 2023',
    title: 'Departure from Ahmedabad/Baroda/Surat',
    description:
      'The camp will depart on the previous day evening from Ahmedabad.\ni.e. if the camp start date on Friday, then the camp will depart on Thursday evening.',
    imageUrl:
      'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg',
  },
];

const Event = ({ navigation }: { navigation: any}) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState(0);
  const [opentModal, setOpenModal] = useState(false);

  const monthSelected = (month: string) => {
    console.log('Selected month is ', month);
    setSelectedMonth(month);
  };

  const dateSelected = (date: number) => {
    console.log('Selected date is ', date);
    setSelectedDate(date);
  };

  const bookNow = async () => {
    console.info('pay 5500');
    navigation.navigate('RegisterPhone')
  };

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

  const OpenModalComponent = ({
    title,
    onPress,
  }: {
    title: String;
    onPress: Function;
  }) => {
    return (
      <TouchableWithoutFeedback
        style={[styles.row, styles.modalBtn]}
        onPress={() => {
          console.log('open modal');
          setOpenModal(true);
        }}>
        <Text style={styles.secondaryText}> {title} </Text>
        <MaterialCommunityIcon
          name="arrow-right-thin"
          size={32}
          color={Colors.primary}
          style={{}}
        />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <SliderBox
          images={images}
          sliderBoxHeight={screenHeight / 2}
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
                  size={26}
                  color={Colors.primary}
                />
                <View style={{marginHorizontal: 7}}>
                  <Text> Duration </Text>
                  <Text> 3 days / 2 nights </Text>
                </View>
              </View>
              <View style={styles.singleInfo}>
                <MaterialIcon name="map" size={26} color={Colors.primary} />
                <View style={{marginHorizontal: 7}}>
                  <Text> Difficulty </Text>
                  <Text> easy </Text>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.singleInfo}>
                <MaterialIcon name="group" size={26} color={Colors.primary} />
                <View style={{marginHorizontal: 7}}>
                  <Text> Age group </Text>
                  <Text> 8-35 years </Text>
                </View>
              </View>
              <View style={styles.singleInfo}>
                <FontAwesome6
                  name="mountain-sun"
                  size={24}
                  color={Colors.primary}
                />
                <View style={{marginHorizontal: 7}}>
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
              Matheran is situated near Mumbai in Maharashtra and is known for
              its misty mountains, toy trains and typical sahyadri weather.
              Marvelous Matheran is an event where trekkers will enjoy the misty
              mountains and hilly weather. The place is highly populated on
              weekends.
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
              <Pressable
                style={[
                  styles.month,
                  {
                    backgroundColor:
                      selectedMonth === item.month
                        ? Colors.primary
                        : Colors.white,
                  },
                ]}
                key={index}
                onPress={() => monthSelected(item.month)}>
                <Text
                  style={[
                    styles.text,
                    {
                      color:
                        selectedMonth === item.month
                          ? Colors.white
                          : Colors.primary,
                    },
                  ]}>
                  {item.month}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={[styles.row, {flexWrap: 'wrap'}]}>
            {eventDates[2].dates.map((date: number, index: number) => (
              <Pressable
                style={[
                  styles.date,
                  {
                    backgroundColor:
                      selectedDate === date ? Colors.primary : Colors.white,
                  },
                ]}
                key={index}
                onPress={() => dateSelected(date)}>
                <Text
                  style={[
                    styles.text,
                    {
                      color:
                        selectedDate === date ? Colors.white : Colors.primary,
                    },
                  ]}>
                  {date}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.scheduleContainer}>
          <Text style={styles.heading}> Schedule </Text>
          <Timeline
            data={scheduleData}
            circleColor={Colors.primary}
            lineColor={Colors.primary}
            lineWidth={2}
            circleSize={12}
            timeStyle={{
              backgroundColor: Colors.primary,
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderRadius: 20,
              color: Colors.white,
            }}
            listViewStyle={{borderStyle: 'dotted'}}
            separator={true}
            style={{width: screenWidth - 50, paddingLeft: 20, marginTop: 10}}
          />
        </View>

        <View style={styles.bookCotainer}>
          <Text style={styles.heading}> Attractions </Text>
          <View
            style={[
              styles.row,
              {justifyContent: 'space-evenly', marginTop: 5},
            ]}>
            <View style={styles.row}>
              <Text style={styles.secondaryText}>From</Text>
              <MaterialIcon
                name="currency-rupee"
                size={16}
                color={Colors.primary}
                style={{}}
              />
              <Text style={{fontSize: 16}}>5500 / person</Text>
            </View>

            <CustomButton onclick={bookNow} btnText={'Book Now'} />
          </View>
        </View>

        <View style={{marginTop: 5}}>
          <OpenModalComponent title={'Things to carry'} onPress={() => {}} />
          <View style={styles.hr}></View>

          <OpenModalComponent title={'Things to carry'} onPress={() => {}} />
          <View style={styles.hr}></View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={opentModal}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setOpenModal(!opentModal);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Hello World!</Text>
                  <TouchableOpacity onPress={()=> { setOpenModal(false)}} >
                    <MaterialIcon
                      name="close"
                      size={24}
                      color={Colors.primary}
                      style={{}}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.modalText}>
                  {' '}
                  1.Shoes, sandals/chappal/sleepers, socks{' '}
                </Text>
                <Text style={styles.modalText}>
                  {' '}
                  2.Shoes, sandals/chappal/sleepers, socks{' '}
                </Text>
                <Text style={styles.modalText}>
                  {' '}
                  3.Shoes, sandals/chappal/sleepers, socks{' '}
                </Text>
                <Text style={styles.modalText}>
                  {' '}
                  4.Shoes, sandals/chappal/sleepers, socks{' '}
                </Text>
                <Text style={styles.modalText}>
                  {' '}
                  5.Shoes, sandals/chappal/sleepers, socks{' '}
                </Text>
              </View>
            </View>
          </Modal>
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
    marginVertical: 10,
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
    borderColor: Colors.lightBlack,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    marginBottom: 10,
  },

  aboutInfo: {
    padding: 10,
  },

  heading: {
    fontSize: 23,
    fontStyle: 'normal',
    fontWeight: '500',
  },

  secondaryText: {
    fontSize: 16,
    paddingHorizontal: 10,
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
    width: 38,
    height: 38,
    borderRadius: 19,
    margin: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  scheduleContainer: {
    marginVertical: 5,
    paddingVertical: 10,
  },

  bookCotainer: {
    padding: 5,
  },

  modalBtn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginBottom: 3,
  },

  centeredView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: screenWidth - 20,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
  },

  modalText: {
    fontSize: 15,
    marginBottom: 5,
  },

  modalHeader: {
    width: '95%',
    flexDirection: 'row',
    alignItems:'flex-start',
    justifyContent: 'space-between',
  },
});
