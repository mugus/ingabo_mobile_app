import React, { Component, createContext } from 'react'
import { View, Text } from 'react-native'


export const AppContext = createContext()
export default class Provider extends Component {
    constructor (props) {
        super(props)
        this.state = {
            lang: 'en',
        }
    }

  render() {
    return (
        <View>
            <Text>Provider</Text>
        </View>
    )
  }
}






















// import React,{ useState, useEffect } from 'react'
// import { Text, View,SafeAreaView, StatusBar, ScrollView, Platform, TextInput, Dimensions, StyleSheet, Button } from 'react-native'
// import { Storage } from 'expo-storage'
// import {
//     useFonts,
//     Roboto_400Regular,
//     Roboto_500Medium,
//     Roboto_700Bold,
//   } from '@expo-google-fonts/roboto';
// import RadioGroup from 'react-native-radio-buttons-group';
// import color from '../layouts/color';
// const KEY = '@@KEY';
// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;
// import SuccessMsg from './SuccessMsg';
// // import Slider from '@react-native-community/slider';




// const radioButtonsData = [
// {
//     id: '1',
//     label: 'Social Media',
//     value: 'social_media',
//     color: color.APP_PRIMARY
// },
// {
//     id: '2',
//     label: 'Friends',
//     value: 'friends',
//     color: color.APP_PRIMARY
// },
// {
//     id: '3',
//     label: 'Other',
//     value: 'Other',
//     color: color.APP_PRIMARY
// }
// ]




// export default function SurveyForm({navigation, route}) {
//     let [fontsLoaded] = useFonts({
//         Roboto_400Regular,
//         Roboto_500Medium,
//         Roboto_700Bold,
//       });
//       const [radioButtons, setRadioButtons] = useState(radioButtonsData)


//     const { customer, name } = route.params;
//     const [lang, setLang] = useState("");
//     const [fname, setFname] = useState("");
//     const [lname, setLname] = useState("");
//     const [improve, setImprove] = useState("");
//     const [oftenusage, setOftenusage] = useState("");
//     const [comparison, setComparison] = useState("");
//     const [missing, setMissing] = useState("");
//     const [solutions, setSolutions] = useState("");
//     const [typeproduct, setTypeproduct] = useState("");
//     const [usage, setUsage] = useState("");
//     const [recommendation, setRecommendation] = useState("");
//     const [radiovalue, setRadiovalue] = useState('');

//     const [showModal, setShowModal] = useState(false)
    
    
//     function onPressRadioButton(radioButtonsArray) {
//         setRadioButtons(radioButtonsArray);

//         radioButtonsArray.map((data)=> {
//             if(data.selected){
//                 setRadiovalue(data.value)
//             }else{
//                 setRadiovalue('')
//             }
//         })
        
//     }

//     const getLang = async() => {
//         try {
//             const item = JSON.parse(
//                 await Storage.getItem({ key: KEY })
//               )
//               setLang(item)
//         } catch(err) {
//             console.log("Error at Selecting Lang", err);
//         }
//     }





//     const handleSuryeySubmit = () => {
//         if(customer === 1){
//             // Guest
//             if(fname === '' && lname === '' && radiovalue === '' && improve === ''){
//                 alert("All field are required")
//             }else{

//                 setShowModal(true)
//             }
//             // console.log(fname);

//         }else{
//             if(fname === '' && lname === '' && radiovalue === '' && recommendation === '' && usage === '' && typeproduct === '' && solutions === '' && missing === '' && comparison === '' && oftenusage === '' && improve === ''){
//                 alert("All field are required")
//             }else{

//                 setShowModal(true)
//             }
//             // Customer
//             // setShowModal(true)

//         }
//         // console.log("Submitted");
//         // return <SuccessMsg visible={true} onClose={()=> console.log("Opened")}/>
//         // alert('Submitted')
//     }

//     const handleCloseModal = () => {
//         setShowModal(false)
//         navigation.navigate('Home')
//     }
    


//     useEffect(()=> {
//         getLang()
//       }, [])



// if (!fontsLoaded) {
//     return <><Text>Loading ...</Text></>;
// } else {
//   return (
//     <SafeAreaView style={{flex:1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
//         <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>
//         <ScrollView>
//             {
//                 customer === 1 ? 
//                 <>
//                 {
//                     lang === 1 ?
//                     <>
//                         <View style={{flex: 1, flexDirection: 'row',padding: 5}}>
//                             <View style={{flexDirection: 'column'}}>
//                                 <Text style={{fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', alignSelf: 'center', paddingBottom: 20 ,color: color.APP_PRIMARY}}>
//                                     Umushyitsi
//                                 </Text>
//                                 <View style={{flexDirection: 'row'}}>
//                                     <View style={styles.namesContainer}>
//                                         <TextInput placeholder="Izina" onChangeText={(value) => setFname(value)} style={styles.names}/>
//                                     </View>
//                                     <Text>  </Text>
//                                     <TextInput placeholder="Andi mazina" onChangeText={(value) => setLname(value)} style={styles.names} />
//                                 </View>
//                                 <View style={styles.msgContainer}>
//                                     <Text style={styles.client}>Watwimvise ute?</Text>
//                                     <RadioGroup 
//                                         radioButtons={radioButtons}
//                                         onPress={onPressRadioButton}
//                                         layout='row'
//                                     />
//                                 </View>

//                                 <View>
//                                     <TextInput onChangeText={(value) => setImprove(value)} multiline placeholder="Twahindura dute imikorere?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.submitButton}>
//                                     <Button title='Emeza'

//                                             onPress={handleSuryeySubmit}
//                                             buttonStyle={{
//                                                 backgroundColor: color.APP_PRIMARY,
//                                                 borderWidth: 1,
//                                                 color: '#fff',
//                                                 borderColor: color.APP_PRIMARY,
//                                                 borderRadius: 5,
//                                             }}/>
//                                 </View>
//                             </View>
//                         </View>
//                     </>:
//                     <>
//                         <View style={{flex: 1, flexDirection: 'row',padding: 5}}>

//                             <View style={{flexDirection: 'column'}}>
//                                 <Text style={{fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', alignSelf: 'center', paddingBottom: 20 ,color: color.APP_PRIMARY}}>
//                                     Survey Form as Guest
//                                 </Text>
//                                 <View style={{flexDirection: 'row'}}>
//                                     <View style={styles.namesContainer}>
//                                         <TextInput placeholder="Firstname" onChangeText={(value) => setFname(value)} style={styles.names}/>
//                                     </View>
//                                     <Text>  </Text>
//                                     <TextInput placeholder="Lastname" onChangeText={(value) => setLname(value)} style={styles.names} />
//                                 </View>
//                                 <View style={styles.msgContainer}>
//                                     <Text style={styles.client}>How Did You Hear About Us?</Text>
//                                     <RadioGroup 
//                                         radioButtons={radioButtons}
//                                         onPress={onPressRadioButton}
//                                         layout='row'
//                                     />
//                                 </View>

//                                 <View>
//                                     <TextInput onChangeText={(value) => setImprove(value)} multiline placeholder="How could we improve?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.submitButton}>
//                                     <Button title='Submit'
//                                             onPress={handleSuryeySubmit}
//                                             buttonStyle={{
//                                                 backgroundColor: color.APP_PRIMARY,
//                                                 borderWidth: 1,
//                                                 color: '#fff',
//                                                 borderColor: color.APP_PRIMARY,
//                                                 borderRadius: 5,
//                                             }}/>
//                                 </View>
//                             </View>

//                         </View>
//                     </>
//                 }
//                 </>
//                 :
//                 <>
//                 {
//                     lang === 1 ?
//                     <>
//                         <View style={{flex: 1, flexDirection: 'row',padding: 5}}>
//                             <View style={{flexDirection: 'column'}}>
//                                 <Text style={{fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', alignSelf: 'center', paddingBottom: 20 ,color: color.APP_PRIMARY}}>
//                                     Umukiriya
//                                 </Text>
//                                 <View style={{flexDirection: 'row', width: width-30,paddingLeft: 10}}>

//                                     <View style={styles.namesContainer}>
//                                         <TextInput placeholder="Izina" onChangeText={(value) => setFname(value)} style={styles.names}/>
//                                     </View>
//                                     <Text>  </Text>
//                                     <View style={styles.namesContainer}>
//                                         <TextInput placeholder="Andi mazina" onChangeText={(value) => setLname(value)} style={styles.names} />
//                                     </View>
//                                 </View>
                                
//                                 <View style={styles.messageContainer}>
//                                     <TextInput multiline onChangeText={(value) => setOftenusage(value)} placeholder="Ni gihe ki ukoresha imiti yacu?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.messageContainer}>
//                                     <TextInput multiline onChangeText={(value) => setComparison(value)} placeholder="Ni gute wagereranya ibicuruzwa byacu nabandi bacuruza nkibyacu?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.messageContainer}>
//                                     <TextInput multiline onChangeText={(value) => setMissing(value)} placeholder="Ni ibihe bintu by'ingenzi tubura(Twakongera kuri serivisi dutanga)?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.messageContainer}>
//                                     <TextInput multiline onChangeText={(value) => setSolutions(value)} placeholder="Ni iki ugerageza gukemura ukoresheje imiti yacu?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.messageContainer}>
//                                     <TextInput multiline onChangeText={(value) => setTypeproduct(value)} placeholder="Ni abahe bantu bandi imiti yacu ubona ishobora kugirira akamaro?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.messageContainer}>
//                                     <TextInput multiline onChangeText={(value) => setUsage(value)} placeholder="Biroroshye gukoresha imiti yacu?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.messageContainer}>
//                                     <TextInput multiline onChangeText={(value) => setRecommendation(value)} placeholder="Ubona imiti yacu wayirangira abandi batayikoresha?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.messageContainer}>
//                                     <TextInput multiline onChangeText={(value) => setImprove(value)} placeholder="Ni gute dushobora kunoza imikorere kugirango duhuze neza ibyo ukeneye?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.submitButton}>
//                                     <Button title='Submit'
//                                             onPress={handleSuryeySubmit}
//                                             buttonStyle={{
//                                                 backgroundColor: color.APP_PRIMARY,
//                                                 borderWidth: 1,
//                                                 color: '#fff',
//                                                 borderColor: color.APP_PRIMARY,
//                                                 borderRadius: 5,
//                                             }}/>
//                                 </View>
//                             </View>
//                         </View>

//                     </>:
//                     <>
//                         <View style={{flex: 1, flexDirection: 'row',padding: 5}}>

//                             <View style={{flexDirection: 'column'}}>
//                                 <Text style={{fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', alignSelf: 'center', paddingBottom: 20 ,color: color.APP_PRIMARY}}>
//                                     Customer
//                                 </Text>

//                                 <View style={{flexDirection: 'row', width: width-30,paddingLeft: 10}}>
//                                     <View style={styles.namesContainer}>
//                                         <TextInput placeholder="Firstname" onChangeText={(value) => setFname(value)} style={styles.names}/>
//                                     </View>
//                                     <Text>  </Text>
//                                     <TextInput placeholder="Lastname" onChangeText={(value) => setLname(value)} style={styles.names} />
//                                 </View>

                                
                                
//                                 <View style={styles.messageContainer}>
//                                     <TextInput multiline onChangeText={(value) => setOftenusage(value)} placeholder="How often do you use our products?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.messageContainer}>
//                                     <TextInput multiline onChangeText={(value) => setComparison(value)} placeholder="How would you compare our products to our competitors?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.messageContainer}>
//                                     <TextInput multiline onChangeText={(value) => setMissing(value)} placeholder="What important features are we missing?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.messageContainer}>
//                                     <TextInput multiline onChangeText={(value) => setSolutions(value)} placeholder="What are you trying to solve by using our product?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.messageContainer}>
//                                     <TextInput multiline onChangeText={(value) => setTypeproduct(value)} placeholder="What other types of people could find our product useful?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.messageContainer}>
//                                     <TextInput multiline onChangeText={(value) => setUsage(value)} placeholder="How easy is it to use our product?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.messageContainer}>
//                                     <TextInput multiline onChangeText={(value) => setRecommendation(value)} placeholder="How likely are you to recommend this product to others?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.messageContainer}>
//                                     <TextInput multiline onChangeText={(value) => setImprove(value)} placeholder="How could we improve our product to better meet your needs?" numberOfLines={4} style={styles.message} />
//                                 </View>

//                                 <View style={styles.submitButton}>
//                                     <Button title='Submit'
//                                             onPress={handleSuryeySubmit}
//                                             buttonStyle={{
//                                                 backgroundColor: color.APP_PRIMARY,
//                                                 borderWidth: 1,
//                                                 color: '#fff',
//                                                 borderColor: color.APP_PRIMARY,
//                                                 borderRadius: 5,
//                                             }}/>
//                                 </View>
//                             </View>

//                         </View>
//                     </>
//                 }
//                 </>
//             }
            

//         </ScrollView>
//             <SuccessMsg visible = {showModal} onClose={handleCloseModal}/>

//     </SafeAreaView>
//   )
// }
// }
// const styles =  StyleSheet.create({
//     namesContainer:{

//     },
//     names: {
//         width: (width/2)-20,
//         // borderWidth: 0.5,
//         // borderRadius: 5,
//         borderBottomWidth: 1,
//         borderColor: color.APP_PRIMARY,
//         paddingLeft: 10,
//         padding: 2,
//         fontSize: 14,
//         fontWeight: 'bold',
//         color: color.FONT_MEDIUM
//     },
//     msgContainer : {
//         paddingTop: 6,
//         color: color.APP_PRIMARY
//     },
//     messageContainer:{
//         width: width-30,
//         paddingLeft: 10
//     },
//     message: {
//         paddingTop: 10,
//         paddingLeft: 10,
//         borderBottomWidth: 1,
//         borderColor: color.APP_PRIMARY,
//         fontSize: 14,
//         fontWeight: 'bold',
//         color: color.FONT_MEDIUM
//     },
//     client: {
//         paddingTop: 20,
//         paddingLeft: 2,
//         fontSize: 14,
//         fontWeight: 'bold',
//         color: color.FONT_MEDIUM
//     },
//     submitButton :{
//         paddingTop: 20,
//         width: width-30,
//         paddingLeft: 10,
//         color: color.APP_PRIMARY
//     }
// })