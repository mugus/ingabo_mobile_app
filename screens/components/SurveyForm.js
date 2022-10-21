import React,{ useState, useEffect } from 'react'
import { Text, View,SafeAreaView, StatusBar, ScrollView, Platform, TextInput, Dimensions, StyleSheet, Button } from 'react-native'
import { Storage } from 'expo-storage'
import {
    useFonts,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  } from '@expo-google-fonts/roboto';
import RadioGroup from 'react-native-radio-buttons-group';
import color from '../layouts/color';
// import Slider from '@react-native-community/slider';

const KEY = '@@KEY';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const radioButtonsData = [
{
    id: '1',
    label: 'Social Media',
    value: 'social_media',
    color: color.APP_PRIMARY
},
{
    id: '2',
    label: 'Friends',
    value: 'friends',
    color: color.APP_PRIMARY
},
{
    id: '3',
    label: 'Other',
    value: 'Other',
    color: color.APP_PRIMARY
}
]




export default function SurveyForm({navigation, route}) {
    let [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold,
      });
      const [radioButtons, setRadioButtons] = useState(radioButtonsData)


    const { customer, name } = route.params;
    const [lang, setLang] = useState("");
    const [radiovalue, setRadiovalue] = useState('');

    
    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);

        radioButtonsArray.map((data)=> {
            if(data.selected){
                setRadiovalue(data.value)
            }else{
                setRadiovalue('')
            }
        })
        
    }

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

console.log('lang ',lang);

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
                                    Uzuza nk'umushyitsi
                                </Text>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={styles.namesContainer}>
                                        <TextInput placeholder="Izina" style={styles.names}/>
                                    </View>
                                    <Text>  </Text>
                                    <TextInput placeholder="Andi mazina" style={styles.names} />
                                </View>
                                <View style={styles.msgContainer}>
                                    <Text style={styles.client}>Watwimvise ute?</Text>
                                    <RadioGroup 
                                        radioButtons={radioButtons}
                                        onPress={onPressRadioButton}
                                        layout='row'
                                    />
                                </View>

                                <View>
                                    <TextInput multiline placeholder="Twahindura dute imikorere?" numberOfLines={4} style={styles.message} />
                                </View>

                                <View style={styles.submitButton}>
                                    <Button title='Emeza'
                                            buttonStyle={{
                                                backgroundColor: color.APP_PRIMARY,
                                                borderWidth: 1,
                                                color: '#fff',
                                                borderColor: color.APP_PRIMARY,
                                                borderRadius: 5,
                                            }}/>
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
                                        <TextInput placeholder="Firstname" style={styles.names}/>
                                    </View>
                                    <Text>  </Text>
                                    <TextInput placeholder="Lastname" style={styles.names} />
                                </View>
                                <View style={styles.msgContainer}>
                                    <Text style={styles.client}>How Did You Hear About Us?</Text>
                                    <RadioGroup 
                                        radioButtons={radioButtons}
                                        onPress={onPressRadioButton}
                                        layout='row'
                                    />
                                </View>

                                <View>
                                    <TextInput multiline placeholder="How could we improve?" numberOfLines={4} style={styles.message} />
                                </View>

                                <View style={styles.submitButton}>
                                    <Button title='Submit'
                                            buttonStyle={{
                                                backgroundColor: color.APP_PRIMARY,
                                                borderWidth: 1,
                                                color: '#fff',
                                                borderColor: color.APP_PRIMARY,
                                                borderRadius: 5,
                                            }}/>
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
                            <Text>Wemeje ko uri Umukiriya</Text>
                        </View>
                    </>:
                    <>
                        <View style={{flex: 1, flexDirection: 'row',padding: 5}}>
                            <Text>Survey Form as Customer</Text>
                        </View>
                    </>
                }
                    
                </>
            }
            

        </ScrollView>

    </SafeAreaView>
  )
}
}
const styles =  StyleSheet.create({
    namesContainer:{

    },
    names: {
        width: (width/2)-10,
        borderWidth: 0.5,
        borderRadius: 5,
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
        width: width- 50,
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    }
})