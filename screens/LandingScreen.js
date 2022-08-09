import React, { useState, useEffect } from 'react';
import { RefreshControl, Image, StyleSheet, Text, View, StatusBar, Platform, SafeAreaView,ScrollView, TouchableOpacity } from 'react-native';
import { useFonts,Roboto_500Medium } from '@expo-google-fonts/roboto';

import { Storage } from 'expo-storage'
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
        onRefresh()
    }, []);

    if (!fontsLoaded) {
        return <><Text>Loading ...</Text></>;
      } else {
        return(
            <>
            <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, alignSelf: 'stretch'}}>

                <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>
                <ScrollView style={{ height: '100%'}} refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                        }>
                    <View style={{flex: 1, flexDirection: "column", flexWrap: "nowrap",textAlign: 'center'}}>
                        <View style={{ paddingTop: 5 ,alignItems: 'center'}}>
                            <Text style={{color: '#347464',height: 35,fontSize: 30,lineHeight: 35,fontFamily: 'Roboto_500Medium'}}>Welcome!</Text>
                        </View>
                        <View style={{ paddingTop: 20 ,alignSelf: 'stretch',alignItems: 'center'}}>
                            <Image source={require('../assets/main-logo_-_Copy-removebg-preview.png')} style={{height: 400}} />
                        </View>

                        <View style={{fontSize:22 ,paddingTop: 150 , alignItems: 'center'}}>
                            <Text>
                                <Text onPress={HandleChangeToEnglish}  style={{fontSize: 18 ,paddingLeft: 15,fontFamily: 'Roboto_500Medium'}}>English</Text> 
                                <Text>                                  </Text>
                                <Text onPress={HandleChangeToKinya} style={{fontSize: 18 ,left: 100,fontFamily: 'Roboto_500Medium'}}>Kinyarwanda</Text>
                            </Text>
                        </View>

                    </View>

                </ScrollView>
                
            </SafeAreaView>
            </>
        )
    }
}
