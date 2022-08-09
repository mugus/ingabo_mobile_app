import react, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, SafeAreaView,Button,ScrollView, TouchableOpacity,StatusBar } from 'react-native';
import { useFonts,Roboto_500Medium } from '@expo-google-fonts/roboto';
import axios from 'axios';
import { Storage } from 'expo-storage'
const KEY = '@@KEY';



export default function CropsScreen({navigation}){
    let [fontsLoaded] = useFonts({Roboto_500Medium});
    const [crop, setCrop] = useState([]);
    const [cropkin, setCropkin] = useState([]);
    const [cropeng, setCropeng] = useState([]);
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

        const getKinyaCrops = () => {
            axios.get('http://197.243.14.102:4000/api/v1/crops/kin').then(res => {
                setCropkin(res.data.crops);
                    console.log("Kinya crops");
                    // console.log("crops", res.data.crops);
                }).catch(err=>{
                    console.log(err);
                })
        }
        const getEngCrops = () => {
            axios.get('http://197.243.14.102:4000/api/v1/crops/en').then(res => {
                setCropeng(res.data.crops);
                    console.log("crops English");
                    // console.log("crops", res.data.crops);
                }).catch(err=>{
                    console.log(err);
                })
        }


    useEffect(()=> {
        getLang()
        getKinyaCrops()
        getEngCrops()
      }, [])

if (!fontsLoaded) {
    return <><Text style={{fontFamily: 'Roboto_500Medium'}}>Loading ...</Text></>;
} else {
    return(
        <SafeAreaView>
            <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>
            <ScrollView style={{paddingRight: 10}}>
        
                {
                    lang === 1 ?
                    <View style={{flex: 1, flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'space-around', top: 10}}>
                    {
                        cropkin.map((crop)=>{
                            return (
                                
                        <TouchableOpacity style={{width: 170, height: 240, backgroundColor: '#edefea', borderRadius: 10, padding: 10}} key={crop.crop_id} onPress={()=> navigation.navigate('DianosisScreen', {crop_id: crop.crop_id, name: 'DianosisScreen' })}>

                            <View style={{width: 150, height: 210,alignItems: 'center'}}>
                                <Image source={{uri: `http://197.243.14.102:4000/uploads/${crop.image}`}} style={{width: 150, height: 170,borderRadius: 5}} />
                                <Text style={{color: '#347464', fontWeight: 'bold',textTransform: 'uppercase', fontSize: 13, paddingBottom: 10, padding: 10,fontFamily: 'Roboto_500Medium'}}>{crop.name}</Text>
                            </View>    
                        </TouchableOpacity>
                            )
                        })
                    }

                    </View>
                    :
                    <View style={{flex: 1, flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'space-around', top: 10}}>
                    {
                        cropeng.map((crop)=>{
                            return (
                                
                        <TouchableOpacity style={{width: 170, height: 240, backgroundColor: '#edefea', borderRadius: 10, padding: 10}} key={crop.crop_id} onPress={()=> navigation.navigate('DianosisScreen', {crop_id: crop.crop_id, name: 'DianosisScreen' })}>

                                    <View style={{width: 150, height: 210,alignItems: 'center'}}>
                                        <Image source={{uri: `http://197.243.14.102:4000/uploads/${crop.image}`}} style={{width: 150, height: 170}} />
                                        <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 13,textTransform: 'uppercase', paddingBottom: 10, padding: 10}}>{crop.name}</Text>
                                    </View>    
                        </TouchableOpacity>
                            )
                        })
                    }

                    </View>

                }
                    
           
            </ScrollView>

        </SafeAreaView>
        );
    }
}