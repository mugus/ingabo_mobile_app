import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View,StatusBar, Platform, SafeAreaView,Button, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts,Roboto_500Medium,Roboto_500Medium_Italic} from '@expo-google-fonts/roboto';
import axios from 'axios';
import * as Linking from 'expo-linking';
import { Storage } from 'expo-storage'
const KEY = '@@KEY';


export default function ProductDetails({route, navigation}){
    let [fontsLoaded] = useFonts({Roboto_500Medium, Roboto_500Medium_Italic});
    const { product_id, name } = route.params;
    const [productdetails, setProductdetails] = useState([]);
    const [ isloading, setIsloading ] = useState(true);
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
    const OpenStore = async () => {
        Linking.openURL('https://ingabo.store');
        // navigation.navigate(
        //     'Browser',
        //     { url: 'https://ingabo.store' }
        // )
    }
    // console.log("Data: ",product_id);

    const GetData = async () => {
        await axios.get(`http://197.243.14.102:4000/api/v1/products/${product_id}`).then(res => {
            setProductdetails(res.data.product);
            setIsloading(false);
          }).catch(err=>{
              console.log(err);
          })
    }

    useEffect(()=> {
        GetData()
        getLang()
      }, [])


if (!fontsLoaded) {
    return <><Text style={{fontFamily: 'Roboto_500Medium'}}>Loading ...</Text></>;
} else {
    return(
        <SafeAreaView style={{flex:1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
            <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>
            {
                lang === 1 ?
                <>
                    {
                        isloading ? <Text style={{fontSize: 12, left: 15, paddingTop: 60,fontFamily: 'Roboto_500Medium'}}>Tegereza gato......</Text> : 
                        (
                            
                            <ScrollView key={productdetails.product_id} style={{padding: 2, height: '100%'}}>

                                <View style={{flex: 1, flexDirection: 'row', height: '100%'}}>
                                    <View style={{height:300,padding: 10,width:190, alignItems: 'center'}}>
                                        <Image style={{width: '100%', height: '100%', borderRadius: 10}} source={{uri: `http://197.243.14.102:4000/uploads/${productdetails.image}`}}/>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'column',padding: 5, width:'100%'}}>
                                        <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 14,fontFamily: 'Roboto_500Medium'}}>{productdetails.name}</Text>
                                        <Text style={{color: '#347455', fontWeight: 'bold', fontSize: 12,fontFamily: 'Roboto_500Medium_Italic'}}>({productdetails.category})</Text>
                                        <View style={{top: 10}}>
                                            <Text style={{fontSize: 12, paddingRight: 5}}>
                                                {productdetails.description}
                                            </Text>
                                            <Text></Text>
                                            <Button
                                                style={{fontFamily: 'Roboto_500Medium'}}
                                                title="Gura umuti"
                                                color= "#347464"
                                                onPress={OpenStore}
                                                />

                                        </View>
                                    </View>
                                </View>

                                <View style={{flex: 1, flexDirection: 'column',padding: 5}}>
                                    <View style={{width:'100%', height: '100%'}}>
                                        <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 15,textDecorationLine: 'underline'}}>Uko ukoreshwa</Text>
                                        <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 13, left: 10,fontStyle: 'italic'}}>Itondere ibi mbere</Text>
                                        <Text style={{fontSize: 12, left: 15,paddingRight:15,fontFamily: 'Roboto_500Medium'}}>
                                            {productdetails.pre_condition}
                                        </Text>
                                        <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 13, left: 10,fontStyle: 'italic'}}>Ukora ute</Text>
                                        <Text style={{fontSize: 12, left: 15,paddingTop: 10,paddingRight:15,fontFamily: 'Roboto_500Medium'}}>
                                            {productdetails.application}</Text>
                                    </View>
                                </View>
                                
                            </ScrollView>
                        )
                    }
                </>
                :
                <>
                    {
                        isloading ? <Text style={{fontSize: 12, left: 15, paddingTop: 60,fontFamily: 'Roboto_500Medium'}}>Loading......</Text> : 
                        (
                            
                            <ScrollView key={productdetails.product_id} style={{padding: 2, height: '100%'}}>

                                <View style={{flex: 1, flexDirection: 'row', height: '100%'}}>
                                    <View style={{height:300,padding: 10,width:190, alignItems: 'center'}}>
                                        <Image style={{width: '100%', height: '100%',borderRadius: 10}} source={{uri: `http://197.243.14.102:4000/uploads/${productdetails.image}`}}/>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'column',padding: 5, width:'100%'}}>
                                        <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 14,fontFamily: 'Roboto_500Medium'}}>{productdetails.name}</Text>
                                        <Text style={{color: '#347455', fontWeight: 'bold', fontSize: 12,fontFamily: 'Roboto_500Medium_Italic'}}>({productdetails.category})</Text>
                                        <View style={{top: 10}}>
                                            <Text style={{fontSize: 12, paddingRight: 5,fontFamily: 'Roboto_500Medium'}}>
                                                {productdetails.description}
                                            </Text>
                                            <Text></Text>
                                            <Button
                                                style={{fontFamily: 'Roboto_500Medium'}}
                                                title="Shop Product"
                                                color= "#347464"
                                                onPress={OpenStore}
                                                />

                                        </View>
                                    </View>
                                </View>

                                <View style={{flex: 1, flexDirection: 'column',padding: 5}}>
                                    <View style={{width:'100%', height: '100%'}}>
                                        <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 15,textDecorationLine: 'underline'}}>How to use</Text>
                                        <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 13, left: 10,fontStyle: 'italic'}}>Pre-Conditions</Text>
                                        <Text style={{fontSize: 12, left: 15,paddingRight:15,fontFamily: 'Roboto_500Medium'}}>
                                            {productdetails.pre_condition}
                                        </Text>
                                        <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 13, left: 10,fontStyle: 'italic'}}>Application</Text>
                                        <Text style={{fontSize: 12, left: 15,paddingTop: 10,paddingRight:15,fontFamily: 'Roboto_500Medium'}}>
                                            {productdetails.application}</Text>
                                    </View>
                                </View>
                                
                            </ScrollView>
                        )
                    }
                </>
            }

            
            
            </SafeAreaView>
        );
    }
}