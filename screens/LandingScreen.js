import React, { useState, useEffect } from 'react';
import { RefreshControl, Image, StyleSheet,Alert, Text, View, StatusBar, Platform, SafeAreaView,ScrollView, TouchableWithoutFeedback,Dimensions } from 'react-native';
import { useFonts,Roboto_500Medium } from '@expo-google-fonts/roboto';
const height = Dimensions.get('window').height;
import { Storage } from 'expo-storage';

import color from "./layouts/color";
const KEY = '@@KEY';



const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  

export default function LandingScreen({navigation}){
    let [fontsLoaded] = useFonts({Roboto_500Medium});
    const [language, setLanguage] = useState("en")
    const [refreshing, setRefreshing] = React.useState(false);



    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);

    // Set languages
    const HandleChangeToEnglish= async ()=>{
        try {
            await Storage.setItem({
                key: KEY,
                value: JSON.stringify(2)
            })
            navigation.navigate('Home')
        } catch (e) {
            console.log(e);
        }
    }
    
    const HandleChangeToKinya = async ()=>{
        try {
            await Storage.setItem({
                key: KEY,
                value: JSON.stringify(1)
            })
            navigation.navigate('Home')
        } catch (e) {
            console.log(e);
        }
    }



    useEffect(() => {
        // setShowModal(true)
        onRefresh()
    }, []);


    if (!fontsLoaded) {
        return <><Text>Loading ...</Text></>;
      } else {
        return(
            <>
            <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, alignSelf: 'stretch'}}>

                <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>
                <ScrollView refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                        }>
                    <View style={{flex: 1, flexDirection: "column", flexWrap: "nowrap",textAlign: 'center', height: height }}>
                        <View style={{ padding:20, alignItems: 'center'}}>
                            <Text style={{color: color.APP_PRIMARY, height: 35,fontSize: 30,lineHeight: 35,fontFamily: 'Roboto_500Medium'}}>Welcome!</Text>
                        </View>
                        <View style={{ alignSelf: 'stretch',alignItems: 'center'}}>
                            <Image source={require('../assets/last_main_logo.png')} style={{height: 305, width: 150}} />
                        </View>

                        <View style={{padding: 0, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: color.APP_PRIMARY, fontSize: 50,fontWeight: 'bold',fontFamily: 'Roboto_500Medium'}}>INGABO</Text>                        
                            <Text style={{color: color.APP_PRIMARY, fontSize: 32,fontFamily: 'Roboto_500Medium'}}>Plant Health</Text>
                        </View>

                    </View>

                    
                    <View style={styles.modal}>
                        <View style={styles.modalheader}>
                            <Text style={styles.modalheadertext}>Choose language/Hitamo ururimi</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', marginBottom: 30, fontSize:22 ,bottom: 10, alignItems: 'center', justifyContent: 'flex-end'}}>
                            <TouchableWithoutFeedback onPress={HandleChangeToEnglish}>
                                <View style={{flex: 1, paddingLeft: '10%'}}>
                                    <Text style={styles.button}>En</Text>
                                    <View style={styles.imageContainer}>
                                        <Image source={require('../assets/en.png')} style={styles.image}/>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={HandleChangeToKinya}>
                                <View style={{flex: 1, paddingLeft: '50%'}}>
                                    <Text style={styles.button}>RW</Text>
                                    <View style={styles.imageContainer}>
                                        <Image source={require('../assets/rwanda.png')} style={styles.image}/>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                </ScrollView>
                
                
            </SafeAreaView>
            </>
        )
    }
}




const styles = StyleSheet.create({
modal: {
position: 'absolute',
bottom: '3%',
right: 10,
left: 10,
height: 150,
backgroundColor: color.APP_BG,
borderRadius: 10,
zIndex: 100
},
modalheader: {
flex: 1,
padding: 20,
alignItems: 'center'
},
modalheadertext: {
fontFamily: 'Roboto_500Medium',
fontSize: 16,
fontWeight: 'bold',
color: color.APP_PRIMARY
},
button: {
fontSize: 18,
color: color.FONT,
fontWeight: 'bold',
textTransform: 'uppercase',
fontFamily: 'Roboto_500Medium'
},
imageContainer: {
width: 30,
height: 20
},
image: {
width: '100%',
height: '100%'
}
})