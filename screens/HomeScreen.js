import react, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, StatusBar, Platform, SafeAreaView,ScrollView, Button,TouchableOpacity,  requireNativeComponent  } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { Avatar, Badge, Icon, withBadge } from '@rneui/themed';
import { Storage } from 'expo-storage'
const KEY = '@@KEY';
import {
    useFonts,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  } from '@expo-google-fonts/roboto';

const width = '47%';
export default function Home({navigation}){
    let [fontsLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_100Thin_Italic,
        Roboto_300Light,
        Roboto_300Light_Italic,
        Roboto_400Regular,
        Roboto_400Regular_Italic,
        Roboto_500Medium,
        Roboto_500Medium_Italic,
        Roboto_700Bold,
        Roboto_700Bold_Italic,
        Roboto_900Black,
        Roboto_900Black_Italic,
      });


    const [lang, setLang] = useState("");
    const getLang = async() => {
        try {
            const item = JSON.parse(
                await Storage.getItem({ key: KEY })
              )
              setLang(item)
            
        } catch(err) {
            console.log(" No Value", err);
        }
    }


    useEffect(() => {
        getLang()
    }, []);

    
  
    const OpenStore = async () => {
        Linking.openURL('https://ingabo.store');
        // navigation.navigate(
        //     'Browser',
        //     { url: 'https://ingabo.store' }
        // )
    }
  
    console.log("Lang: ",lang);

 if (!fontsLoaded) {
    return <><Text>Loading ...</Text></>;
  } else {
    return(
        <SafeAreaView style={{flex:1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
            <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>
            <ScrollView>
            {
            lang === 1 ? 
            <>
                <View style={{flex: 1, flexDirection: 'row',paddingTop: 70, fontFamily: 'Roboto_300Light'}}>

                    <TouchableOpacity  style={{padding: 30,height:160,borderRadius: 10, margin: 5,backgroundColor: "#5d806f", width:width,alignItems: 'center', justifyContent: 'center'}} onPress={()=> navigation.navigate('CropsScreen', { name: 'CropsScreen' })}>
                        <View styles={{padding: 10, alignItems: 'center'}}>
                            <MaterialCommunityIcons name="bee-flower" size={50} color="#fff" style={{ paddingLeft: 23 }} />
                            <Text style={{color: '#fff', fontWeight: 'bold',padding:5, fontSize: 20}}>Ibihingwa</Text>
                        </View>
                        {/* <Badge
                            value={20}
                            containerStyle={{ position: 'absolute'}}
                        /> */}
                        
                    </TouchableOpacity>

                    <TouchableOpacity  style={{padding: 30,height:160,borderRadius: 10, margin: 5,backgroundColor: "#5d806f", width:width,alignItems: 'center', justifyContent: 'center'}} onPress={()=> navigation.navigate('ProductScreen', { name: 'ProductScreen' })}>
                        <View styles={{padding: 10, alignItems: 'center'}}>
                            <MaterialCommunityIcons name="clipboard-list-outline" size={50} color="#fff" />
                            <Text style={{color: '#fff', fontWeight: 'bold',padding:5, fontSize: 20}}>Imiti</Text>
                        </View>
                        {/* <Badge
                        style={{backgroundColor: '#fff'}}
                            value={15}
                            containerStyle={{ position: 'absolute'}}
                        /> */}
                    </TouchableOpacity>

                    </View>

                    <View style={{flex: 1, flexDirection: 'row', paddingTop: 10}}>
                    <TouchableOpacity style={{padding: 30,height:160,borderRadius: 10, margin: 5,backgroundColor: "#5d806f", width:width,alignItems: 'center', justifyContent: 'center'}} onPress={ OpenStore }>
                        <View styles={{padding: 10, alignItems: 'center'}}>
                            <MaterialCommunityIcons name="cart-arrow-right" size={50} color="#fff" style={{ paddingLeft: 10 }} />
                            <Text style={{color: '#fff', fontWeight: 'bold',padding:5, fontSize: 20}}>Iguriro</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 30,height:160,borderRadius: 10, margin: 5,backgroundColor: "#5d806f", width:width,alignItems: 'center', justifyContent: 'center'}} onPress={()=> navigation.navigate('SafetyScreen', { name: 'SafetyScreen' })}>
                        <View styles={{padding: 10, alignItems: 'center'}}>
                            <MaterialCommunityIcons name="safe-square" size={50} color="#fff" style={{ paddingLeft: 20 }} />
                            <Text style={{color: '#fff', fontWeight: 'bold',padding:5, fontSize: 20}}>Ubwirinzi</Text>
                        </View>
                        {/* <Badge
                            value={3}
                            containerStyle={{ position: 'absolute'}}
                        /> */}
                    </TouchableOpacity>
                </View>
            </>
            :
            <>
                <View style={{flex: 1, flexDirection: 'row',paddingTop: 70}}>

                    <TouchableOpacity  style={{padding: 30,height:160,borderRadius: 10, margin: 5,backgroundColor: "#5d806f", width:width,alignItems: 'center', justifyContent: 'center'}} onPress={()=> navigation.navigate('CropsScreen', { name: 'CropsScreen' })}>
                        <View styles={{padding: 10, alignItems: 'center'}}>
                            <MaterialCommunityIcons name="bee-flower" size={50} color="#fff" style={{ paddingLeft: 10 }} />
                            <Text style={{color: '#fff', fontWeight: 'bold',padding:5, fontSize: 20}}>Crops</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity  style={{padding: 30,height:160,borderRadius: 10, margin: 5,backgroundColor: "#5d806f", width:width,alignItems: 'center', justifyContent: 'center'}} onPress={()=> navigation.navigate('ProductScreen', { name: 'ProductScreen' })}>
                        <View styles={{padding: 10, alignItems: 'center'}}>
                            <MaterialCommunityIcons name="clipboard-list-outline" size={50} color="#fff"  style={{ paddingLeft: 18 }}/>
                            <Text style={{color: '#fff', fontWeight: 'bold',padding:5, fontSize: 20}}>Products</Text>
                        </View>
                    </TouchableOpacity>

                    </View>

                    <View style={{flex: 1, flexDirection: 'row', paddingTop: 10}}>
                    <TouchableOpacity style={{padding: 30,height:160,borderRadius: 10, margin: 5,backgroundColor: "#5d806f", width:width,alignItems: 'center', justifyContent: 'center'}} onPress={ OpenStore }>
                        <View styles={{padding: 10, alignItems: 'center'}}>
                            <MaterialCommunityIcons name="cart-arrow-right" size={50} color="#fff" style={{ paddingLeft: 23 }}/>
                            <Text style={{color: '#fff', fontWeight: 'bold',padding:5, fontSize: 20}}>Our Shop</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 30,height:160,borderRadius: 10, margin: 5,backgroundColor: "#5d806f", width:width,alignItems: 'center', justifyContent: 'center'}} onPress={()=> navigation.navigate('SafetyScreen', { name: 'SafetyScreen' })}>
                        <View styles={{padding: 10}}>
                            <MaterialCommunityIcons name="safe-square" size={50} color="#fff"  style={{ paddingLeft: 10 }}/>
                            <Text style={{color: '#fff', fontWeight: 'bold',padding:5, fontSize: 20}}>Safety</Text>
                        </View>
                        {/* <Badge
                            value={3}
                            containerStyle={{ position: 'absolute'}}
                        /> */}
                    </TouchableOpacity>
                </View>
            </>
            }
                

            </ScrollView>
        </SafeAreaView>
        
    );
}
}