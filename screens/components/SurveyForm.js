import React,{ useState, useEffect } from 'react'
import { Text, View,SafeAreaView, StatusBar, ScrollView, Platform, TextInput, Dimensions, StyleSheet, Button, Alert,ActivityIndicator } from 'react-native'
import { Storage } from 'expo-storage'
import {
    useFonts,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  } from '@expo-google-fonts/roboto';
import color from '../layouts/color';
import axios from 'axios';


const KEY = '@@KEY';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import SuccessMsg from './SuccessMsg';
import {Picker} from '@react-native-picker/picker';
import * as Device from 'expo-device';







export default function SurveyForm({navigation, route}) {
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold,
      });


    const { customer, name } = route.params;
    const [lang, setLang] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [improve, setImprove] = useState("");
    const [oftenusage, setOftenusage] = useState("");
    const [comparison, setComparison] = useState("");
    const [missing, setMissing] = useState("");
    const [solutions, setSolutions] = useState("");
    const [typeproduct, setTypeproduct] = useState("");
    const [usage, setUsage] = useState("");
    const [recommendation, setRecommendation] = useState("");
    const [hear_about, setHear_about] = useState('');

    const [loadingButton, setLoadingButton] = useState(false);


    const [showModal, setShowModal] = useState(false)

    const getLang = async() => {
        try {
            const item = JSON.parse(
                await Storage.getItem({ key: KEY })
              )
              setLang(item)
        } catch(err) {
            console.log("Error at Selecting Lang", err);
        }
    }



console.log("Device Survey: ",Device.osBuildId);

    const handleSuryeySubmit = () => {
        if(customer === 1){
            // Guest
            if(fname === "" || lname === "" || hear_about === "" || improve === ""){
                alert("All field are required")
            }else{
                let data = {
                    firstname: fname,
                    lastname: lname,
                    lan_id: lang,
                    hear_about: hear_about,
                    improvement: improve,
                    deviceID: Device.osBuildId
                }
                axios.post('http://197.243.14.102:4000/api/v1/surveys/guest', data)
                .then(res => {
                    setLoadingButton(true)
                    setShowModal(true)
                  // console.log('Axios response: ', res)
                }).catch(function (error) {
                  if(error.response.data.status===403){
                    console.log("Message: ",error.response.data.message);
                    // setMsg(error.response.data.message)
                    setMsg(error.response.data.message)
                    setAlertclass("error")
                  }else{
                    console.log(error);
                  }
              });


                
            }
            // console.log(fname);

        }else{
            if(fname === "" || lname === "" || recommendation === "" || usage === "" || typeproduct === "" || solutions === "" || missing === "" || comparison === "" || oftenusage === "" || improve === ""){
                alert("All field are required")
            }else{
                let data = {
                    firstname: fname,
                    lastname: lname,
                    lan_id: lang,
                    recommendation: recommendation,
                    easy_usage: usage,
                    typeproduct: typeproduct,
                    solutions: solutions,
                    missing: missing,
                    comparison: comparison,
                    oftenusage: oftenusage,
                    improve: improve,
                    deviceID: Device.osBuildId
                }
                axios.post('http://197.243.14.102:4000/api/v1/surveys/customer', data)
                .then(res => {
                    setShowModal(true)
                    setLoadingButton(true)
                  // console.log('Axios response: ', res)
                }).catch(function (error) {
                  if(error.response.data.status===403){
                    console.log("Message: ",error.response.data.message);
                    // setMsg(error.response.data.message)
                    setMsg(error.response.data.message)
                    setAlertclass("error")
                  }else{
                    console.log(error);
                  }
              });
                // setShowModal(true)
            }
            // Customer
            // setShowModal(true)

        }
        // console.log("Submitted");
        // return <SuccessMsg visible={true} onClose={()=> console.log("Opened")}/>
        // alert('Submitted')
    }

    const handleCloseModal = () => {
        setShowModal(false)
        navigation.navigate('Home')
    }
    


    useEffect(()=> {
        getLang()
      }, [])



if (!fontsLoaded) {
    return <><Text>Loading ...</Text></>;
} else {
  return (
    <SafeAreaView style={{flex:1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
        <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>
        <ScrollView>
            {
                customer === 1 ? 
                <>
                {
                    lang === 1 ?
                    <>
                        <View style={{flex: 1, flexDirection: 'row',padding: 5}}>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={{fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', alignSelf: 'center', paddingBottom: 20 ,color: color.APP_PRIMARY}}>
                                    Umushyitsi
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={styles.namesContainer}>
                                        <TextInput placeholder="Izina" onChangeText={(value) => setFname(value)} style={styles.names}/>
                                    </View>
                                    <Text>  </Text>
                                    <TextInput placeholder="Andi mazina" onChangeText={(value) => setLname(value)} style={styles.names} />
                                </View>
                                <View style={styles.msgContainer}>
                                    <Text style={styles.client}>Watwimvise ute?</Text>

                                    <Picker
                                        selectedValue={hear_about}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setHear_about(itemValue)
                                        }>
                                        <Picker.Item label="Select" value="" />
                                        <Picker.Item label="Social Media" value="Social Media" />
                                        <Picker.Item label="Friends" value="Friends" />
                                        <Picker.Item label="INGABO staff" value="INGABO staff" />
                                        <Picker.Item label="Others" value="Others" />
                                    </Picker>

                                </View>

                                <View>
                                    <TextInput onChangeText={(value) => setImprove(value)} multiline placeholder="Twahindura dute imikorere?" numberOfLines={4} style={styles.message} />
                                </View>

                                <View style={styles.submitButton}>
                                    {
                                        loadingButton ? 
                                            <ActivityIndicator size="small" color="#0000ff" /> 
                                            :
                                            <Button
                                                title='Emeza'
                                                    onPress={handleSuryeySubmit}
                                                    buttonStyle={{
                                                        backgroundColor: color.APP_PRIMARY,
                                                        borderWidth: 1,
                                                        color: '#fff',
                                                        borderColor: color.APP_PRIMARY,
                                                        borderRadius: 5,
                                                    }}/>
                                    }
                                </View>
                            </View>
                        </View>
                    </>:
                    <>
                        <View style={{flex: 1, flexDirection: 'row',padding: 5}}>

                            <View style={{flexDirection: 'column'}}>
                                <Text style={{fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', alignSelf: 'center', paddingBottom: 20 ,color: color.APP_PRIMARY}}>
                                    Survey Form as Guest
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={styles.namesContainer}>
                                        <TextInput placeholder="Firstname" onChangeText={(value) => setFname(value)} style={styles.names}/>
                                    </View>
                                    <Text>  </Text>
                                    <TextInput placeholder="Lastname" onChangeText={(value) => setLname(value)} style={styles.names} />
                                </View>
                                <View style={styles.msgContainer}>
                                    <Text style={styles.client}>How Did You Hear About Us?</Text>

                                    <Picker
                                        selectedValue={hear_about}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setHear_about(itemValue)
                                        }>
                                        <Picker.Item label="Select" value="" />
                                        <Picker.Item label="Social Media" value="Social Media" />
                                        <Picker.Item label="Friends" value="Friends" />
                                        <Picker.Item label="INGABO staff" value="INGABO staff" />
                                        <Picker.Item label="Others" value="Others" />
                                    </Picker>

                                </View>

                                <View>
                                    <TextInput onChangeText={(value) => setImprove(value)} multiline placeholder="How could we improve?" numberOfLines={4} style={styles.message} />
                                </View>

                                <View style={styles.submitButton}>
                                {
                                        loadingButton ? 
                                            <ActivityIndicator size="small" color="#0000ff" /> 
                                            :
                                            <Button
                                                title='Emeza'
                                                    onPress={handleSuryeySubmit}
                                                    buttonStyle={{
                                                        backgroundColor: color.APP_PRIMARY,
                                                        borderWidth: 1,
                                                        color: '#fff',
                                                        borderColor: color.APP_PRIMARY,
                                                        borderRadius: 5,
                                                    }}/>
                                    }
                                </View>
                            </View>

                        </View>
                    </>
                }
                </>
                :
                <>
                {
                    lang === 1 ?
                    <>
                        <View style={{flex: 1, flexDirection: 'row',padding: 5}}>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={{fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', alignSelf: 'center', paddingBottom: 20 ,color: color.APP_PRIMARY}}>
                                    Umukiriya
                                </Text>
                                <View style={{flexDirection: 'row', width: width-30,paddingLeft: 10}}>

                                    <View style={styles.namesContainer}>
                                        <TextInput placeholder="Izina" onChangeText={(value) => setFname(value)} style={styles.names}/>
                                    </View>
                                    <Text>  </Text>
                                    <View style={styles.namesContainer}>
                                        <TextInput placeholder="Andi mazina" onChangeText={(value) => setLname(value)} style={styles.names} />
                                    </View>
                                </View>
                                
                                <View style={styles.messageContainer}>

                                    <Text style={styles.client}>Ni gihe ki ukoresha imiti yacu?</Text>
                                    <Picker
                                        style={styles.message}
                                        selectedValue={hear_about}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setOftenusage(itemValue)
                                        }>
                                        <Picker.Item label="Hitamo" value="" />
                                        <Picker.Item label="Hejuru y'inshuro 3 mu mwaka" value="Hejuru y'inshuro 3 mu mwaka" />
                                        <Picker.Item label="Inshuro 3 mu mwaka" value="Inshuro 3 mu mwaka" />
                                        <Picker.Item label="Inshuro 2 mu mwaka" value="Inshuro 2 mu mwaka" />
                                        <Picker.Item label="Nibura inshuro imwe mu mawaka" value="Nibura inshuro imwe mu mawaka" />
                                        <Picker.Item label="Ntago ndayikoresha" value="Ntago ndayikoresha" />
                                    </Picker>

                                    {/* <TextInput multiline onChangeText={(value) => setOftenusage(value)} placeholder="Ni gihe ki ukoresha imiti yacu?" numberOfLines={4} style={styles.message} /> */}
                                </View>

                                <View style={styles.messageContainer}>
                                    <TextInput multiline onChangeText={(value) => setComparison(value)} placeholder="Ni gute wagereranya ibicuruzwa byacu nabandi bacuruza nkibyacu?" numberOfLines={4} style={styles.message} />
                                </View>

                                <View style={styles.messageContainer}>
                                    <TextInput multiline onChangeText={(value) => setMissing(value)} placeholder="Ni ibihe bintu by'ingenzi tubura(Twakongera kuri serivisi dutanga)?" numberOfLines={4} style={styles.message} />
                                </View>

                                <View style={styles.messageContainer}>
                                    <TextInput multiline onChangeText={(value) => setSolutions(value)} placeholder="Ni iki ugerageza gukemura ukoresheje imiti yacu?" numberOfLines={4} style={styles.message} />
                                </View>

                                <View style={styles.messageContainer}>
                                    <TextInput multiline onChangeText={(value) => setTypeproduct(value)} placeholder="Ni abahe bantu bandi imiti yacu ubona ishobora kugirira akamaro?" numberOfLines={4} style={styles.message} />
                                </View>

                                <View style={styles.messageContainer}>

                                    <Text style={styles.client}>Biroroshye gukoresha imiti yacu?</Text>
                                    <Picker
                                        style={styles.message}
                                        selectedValue={hear_about}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setUsage(itemValue)
                                        }>
                                        <Picker.Item label="Hitamo" value="" />
                                        <Picker.Item label="Yego biroroshye" value="Biroroshye" />
                                        <Picker.Item label="Hakenerwa umukozi wa INGABO" value="Hakenerwa umukozi wa INGABO" />
                                        <Picker.Item label="Biragoye cyane" value="Biragoye cyane" />
                                        <Picker.Item label="Ibindi" value="Ibindi" />
                                    </Picker>
                                    {/* <TextInput multiline onChangeText={(value) => setUsage(value)} placeholder="Biroroshye gukoresha imiti yacu?" numberOfLines={4} style={styles.message} /> */}
                                </View>

                                <View style={styles.messageContainer}>

                                    <Text style={styles.client}>Ubona imiti yacu wayirangira abandi batayikoresha?</Text>
                                    <Picker
                                        style={styles.message}
                                        selectedValue={hear_about}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setRecommendation(itemValue)
                                        }>
                                        <Picker.Item label="Hitamo" value="" />
                                        <Picker.Item label="Yego" value="Yego" />
                                        <Picker.Item label="Oya" value="Oya" />
                                    </Picker>
                                    {/* <TextInput multiline onChangeText={(value) => setRecommendation(value)} placeholder="Ubona imiti yacu wayirangira abandi batayikoresha?" numberOfLines={4} style={styles.message} /> */}
                                </View>

                                <View style={styles.messageContainer}>
                                    <TextInput multiline onChangeText={(value) => setImprove(value)} placeholder="Ni gute dushobora kunoza imikorere kugirango duhuze neza ibyo ukeneye?" numberOfLines={4} style={styles.message} />
                                </View>

                                <View style={styles.submitButton}>
                                {
                                        loadingButton ? 
                                            <ActivityIndicator size="small" color="#0000ff" /> 
                                            :
                                            <Button
                                                title='Emeza'
                                                    onPress={handleSuryeySubmit}
                                                    buttonStyle={{
                                                        backgroundColor: color.APP_PRIMARY,
                                                        borderWidth: 1,
                                                        color: '#fff',
                                                        borderColor: color.APP_PRIMARY,
                                                        borderRadius: 5,
                                                    }}/>
                                    }
                                </View>
                            </View>
                        </View>

                    </>:
                    <>
                        <View style={{flex: 1, flexDirection: 'row',padding: 5}}>

                            <View style={{flexDirection: 'column'}}>
                                <Text style={{fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', alignSelf: 'center', paddingBottom: 20 ,color: color.APP_PRIMARY}}>
                                    Customer
                                </Text>

                                <View style={{flexDirection: 'row', width: width-30,paddingLeft: 10}}>
                                    <View style={styles.namesContainer}>
                                        <TextInput placeholder="Firstname" onChangeText={(value) => setFname(value)} style={styles.names}/>
                                    </View>
                                    <Text>  </Text>
                                    <TextInput placeholder="Lastname" onChangeText={(value) => setLname(value)} style={styles.names} />
                                </View>

                                
                                
                                <View style={styles.messageContainer}>

                                    <Text style={styles.client}>How often do you use our products?</Text>
                                    <Picker
                                        style={styles.message}
                                        selectedValue={hear_about}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setOftenusage(itemValue)
                                        }>
                                        <Picker.Item label="Select" value="" />
                                        <Picker.Item label="More than 3 times every year" value="More than 3 times every year" />
                                        <Picker.Item label="Quarterly" value="Quarterly" />
                                        <Picker.Item label="2 Times every year" value="2 Times every year" />
                                        <Picker.Item label="Once every year" value="Once every year" />
                                        <Picker.Item label="Never" value="Never" />
                                    </Picker>

                                    {/* <TextInput multiline onChangeText={(value) => setOftenusage(value)} placeholder="How often do you use our products?" numberOfLines={4} style={styles.message} /> */}
                                </View>

                                <View style={styles.messageContainer}>
                                    <TextInput multiline onChangeText={(value) => setComparison(value)} placeholder="How would you compare our products to our competitors?" numberOfLines={4} style={styles.message} />
                                </View>

                                <View style={styles.messageContainer}>
                                    <TextInput multiline onChangeText={(value) => setMissing(value)} placeholder="What important features are we missing?" numberOfLines={4} style={styles.message} />
                                </View>

                                <View style={styles.messageContainer}>
                                    <TextInput multiline onChangeText={(value) => setSolutions(value)} placeholder="What are you trying to solve by using our product?" numberOfLines={4} style={styles.message} />
                                </View>

                                <View style={styles.messageContainer}>
                                    <TextInput multiline onChangeText={(value) => setTypeproduct(value)} placeholder="What other types of people could find our product useful?" numberOfLines={4} style={styles.message} />
                                </View>

                                <View style={styles.messageContainer}>

                                    <Text style={styles.client}>How easy is it to use our product?</Text>
                                    <Picker
                                        selectedValue={hear_about}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setUsage(itemValue)
                                        }>
                                        <Picker.Item label="Select" value="" />
                                        <Picker.Item label="Very Easy" value="Very Easy" />
                                        <Picker.Item label="Require assistances from INGABO team" value="Require assistances from INGABO" />
                                        <Picker.Item label="Very hard to use" value="Very hard to use" />
                                        <Picker.Item label="Others" value="Others" />
                                    </Picker>

                                    {/* <TextInput multiline onChangeText={(value) => setUsage(value)} placeholder="How easy is it to use our product?" numberOfLines={4} style={styles.message} /> */}
                                </View>

                                <View style={styles.messageContainer}>
                                    <Text style={styles.client}>Would you recommend our products to others?</Text>
                                    <Picker
                                        style={styles.message}
                                        selectedValue={hear_about}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setRecommendation(itemValue)
                                        }>
                                        <Picker.Item label="Select" value="" />
                                        <Picker.Item label="Yes" value="Yes" />
                                        <Picker.Item label="No" value="No" />
                                    </Picker>
                                    {/* <TextInput multiline onChangeText={(value) => setRecommendation(value)} placeholder="Would you recommend our products to others?" numberOfLines={4} style={styles.message} /> */}
                                </View>

                                <View style={styles.messageContainer}>
                                    <TextInput multiline onChangeText={(value) => setImprove(value)} placeholder="How could we improve our product to better meet your needs?" numberOfLines={4} style={styles.message} />
                                </View>

                                <View style={styles.submitButton}>
                                {
                                        loadingButton ? 
                                            <ActivityIndicator size="small" color="#0000ff" /> 
                                            :
                                            <Button
                                                title='Emeza'
                                                    onPress={handleSuryeySubmit}
                                                    buttonStyle={{
                                                        backgroundColor: color.APP_PRIMARY,
                                                        borderWidth: 1,
                                                        color: '#fff',
                                                        borderColor: color.APP_PRIMARY,
                                                        borderRadius: 5,
                                                    }}/>
                                    }
                                </View>
                            </View>

                        </View>
                    </>
                }
                </>
            }
            

        </ScrollView>
            <SuccessMsg visible = {showModal} onClose={handleCloseModal}/>

    </SafeAreaView>
  )
}
}
const styles =  StyleSheet.create({
    namesContainer:{

    },
    names: {
        width: (width/2)-20,
        // borderWidth: 0.5,
        // borderRadius: 5,
        borderBottomWidth: 1,
        borderColor: color.APP_PRIMARY,
        paddingLeft: 10,
        padding: 2,
        fontSize: 14,
        fontWeight: 'bold',
        color: color.FONT_MEDIUM
    },
    msgContainer : {
        paddingTop: 6,
        color: color.APP_PRIMARY
    },
    messageContainer:{
        width: width-30,
        paddingLeft: 10
    },
    message: {
        paddingTop: 10,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderColor: color.APP_PRIMARY,
        fontSize: 14,
        fontWeight: 'bold',
        color: color.FONT_MEDIUM
    },
    client: {
        paddingTop: 20,
        paddingLeft: 2,
        fontSize: 14,
        fontWeight: 'bold',
        color: color.FONT_MEDIUM
    },
    submitButton :{
        paddingTop: 20,
        width: width-30,
        paddingLeft: 10,
        color: color.APP_PRIMARY,
        backgroundColor: color.APP_PRIMARY
    }
})
