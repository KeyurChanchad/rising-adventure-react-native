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
import { api } from '../RestAPI/RestAPIHandler';

const screenHeight = Math.floor(Dimensions.get('window').height);
const screenWidth = Math.floor(Dimensions.get('window').width);

type joinUs = {
  id: string;
  packageId: string;
  name: string;
  image: string;
  amount: number;
  days: number;
  mainSchedule: Array<object>
};

type relatedPackage = {
  id: string;
  packageId: string;
  name: string;
  description: string;
  image: string;
}

type datesDataType = {
  month: string;
  year: number;
  dates: number[];
};


const Event = ({ navigation, route }: { navigation: any, route: any}) => {
  const [selectedPackage, setSelectedPackage] = useState<joinUs>({
    id: '',
    packageId: '',
    name: '',
    image: '',
    amount: 0,
    days: 0,
    mainSchedule: [{}],
  });
  const [opentModal, setOpenModal] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [mainSchedule, setMainSchedule] = useState([{}]);
  const [relatedPackages, setRelatedPackages] = useState([]);

  useEffect(()=>{
    console.log("getting scheulde ", route.params.data.id);
    (async()=>{
     await getSchedule();
     await getRelatedEvents();
    })()
  }, [])

  const getSchedule = async ()=> {
    try {
      const payload = { 
        packageId: route.params.data.id 
      }
      const res = await api('/v1/getSchedule', payload, 'post', 'token')
      // console.log("response of schedule ", res.data);
      if(res.status === 200) {
        setSchedule(res.data);
        setMainSchedule(res.data[0].mainSchedule);
        setSelectedPackage(res.data[0]);
        // console.log('mainSchedule ', res.data[0].mainSchedule);
      }
      if(res.status === 404){
        console.log("no schedule found for this pacakge.");      
      }
    } catch (error) {
      console.log("error in getting schedule ", error);
      
    }
  }

  const getRelatedEvents = async ()=> {
    try {
      const payload = { 
        packageId: route.params.data.id 
      }
      const res = await api('/v1/getRelatedPackages', payload, 'post', 'token');
      console.log(`All related events ${res}`);
      res.status === 200 ? setRelatedPackages(res.data) : setRelatedPackages([]);
    } catch (error) {
      console.log("Error getting related pacakges ", error);
      
    }
  }

  const relatedPackageItem = async ({item}: {item: relatedPackage})=> (
    <View>
      <Image source={{ uri: item.image}}  style={{ height: 30, width: 100}}/>
      <Text> { item.name } </Text>
    </View>
  )

  const bookNow = async () => {
    console.info(`You have to pay ${selectedPackage.amount} for per person`);
    navigation.navigate('RegisterPhone', { package_amount: selectedPackage.amount, package_name: route.params.data.name, packageId: route.params.data.id})
  };

  const renderJoinUsItem = ({item}: {item: joinUs}) => {
    return (
      <Pressable style={[styles.joinUsItem, selectedPackage.id === item.id && styles.selectedPackage]} onPress={()=> {
        setSelectedPackage(item);
        setMainSchedule(item.mainSchedule)
      }}>
        <Image source={{uri: item.image}} style={styles.joinUsImg} />
        <Text style={{fontSize: 20, fontWeight: '400'}}> {item.name} </Text>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <View style={styles.row}>
            <MaterialIcon
              name="currency-rupee"
              size={18}
              color={Colors.secondary}
            />
            <Text> {item.amount} /-</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome6 name="calendar" size={18} color={Colors.secondary} />
            <Text> {item.days} days</Text>
          </View>
        </View>
      </Pressable>
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
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false} stickyHeaderIndices={[6]}>
        <SliderBox
          images={route.params.data.crouselImages}
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
            <Text style={styles.packageName}> {route.params.data.name} </Text>
            <Text style={styles.tagline}>  {route.params.data.slogan} </Text>
          </View>

          <View style={styles.packgeInfo}>
            <View style={styles.row}>
              <View style={styles.singleInfo}>
                <FontAwesome6
                  name="calendar"
                  size={26}
                  color={Colors.secondary}
                />
                <View style={{marginHorizontal: 7}}>
                  <Text> Duration </Text>
                  <Text> {route.params.data.days} days / {route.params.data.nights} nights </Text>
                </View>
              </View>
              <View style={styles.singleInfo}>
                <MaterialIcon name="map" size={26} color={Colors.secondary} />
                <View style={{marginHorizontal: 7}}>
                  <Text> Difficulty </Text>
                  <Text> easy </Text>
                </View>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.singleInfo}>
                <MaterialIcon name="group" size={26} color={Colors.secondary} />
                <View style={{marginHorizontal: 7}}>
                  <Text> Age group </Text>
                  <Text> {route.params.data.minAge}-{route.params.data.maxAge} years </Text>
                </View>
              </View>
              <View style={styles.singleInfo}>
                <FontAwesome6
                  name="mountain-sun"
                  size={24}
                  color={Colors.secondary}
                />
                <View style={{marginHorizontal: 7}}>
                  <Text> Max Altitude </Text>
                  <Text> {route.params.data.maxAltitude} ft </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.hr}></View>

          <View style={styles.aboutInfo}>
            <Text style={styles.heading}> About </Text>
            <Text style={styles.secondaryText}>
              {route.params.data.description}
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
                  style={[styles.circle]}
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
              data={schedule}
              renderItem={renderJoinUsItem}
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        <View style={styles.scheduleContainer}>
          <Text style={styles.heading}> Schedule </Text>
          <Timeline
            data={mainSchedule}
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
          <View
            style={[
              styles.row,
              {justifyContent: 'space-evenly', marginVertical: 5, alignItems: 'center'},
            ]}>
            <View style={styles.row}>
              <Text style={styles.secondaryText}>From</Text>
              <MaterialIcon
                name="currency-rupee"
                size={16}
                color={Colors.primary}
                style={{}}
              />
              <Text style={{fontSize: 16}}> {selectedPackage.amount} / person</Text>
            </View>

            <CustomButton  btnStyle={{minWidth: 120}} onClick={bookNow} btnText={'Book Now'} />
          </View>
        </View>

        <View style={styles.attractionContainer}>
          <Text style={styles.heading}> Attractions </Text>
          <FlatList
            data={relatedPackages}
            renderItem={({item}: {item: relatedPackage})=> (<View style={styles.attractionItem}
            >
              <Image source={{ uri: item.image}}  style={styles.attractionImage} />
              <Text style={styles.attractionLabel}> { item.name } </Text>
            </View>)}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
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
    backgroundColor: Colors.secondary,
    width: 45,
    height: 45,
  },

  feeItem: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    marginHorizontal: 5,
    opacity: 0.5
  },

  feeItems: {
    marginVertical: 5,
  },

  joinUsContainer: {
    padding: 10,
  },

  joinUsItem: {
    width: screenWidth / 2 + 30,
    height: screenHeight / 3 ,
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

  selectedPackage: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'solid'
  },

  attractionContainer: {
    height: 240,
    marginVertical: 20,
  },

  attractionItem: { 
    width: screenWidth - 80, 
    height: '90%', 
    marginHorizontal: 10, 
    marginVertical: 10,
  },

  attractionImage: {
    flex: 1, 
    borderRadius: 30, 
    elevation: 5
  },

  attractionLabel: {
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 10,
  }

});
