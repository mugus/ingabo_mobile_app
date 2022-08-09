import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView,Button, ScrollView, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { useFonts,Roboto_500Medium } from '@expo-google-fonts/roboto';
import * as Linking from 'expo-linking';
import axios from 'axios';
import { Storage } from 'expo-storage'
const KEY = '@@KEY';


// const database = require('../../database.json');
export default function DianosisDetailScreen({route, navigation}){
    let [fontsLoaded] = useFonts({Roboto_500Medium});
    const [diagnosis, setDiagnosis] = useState('');
    const { diagnosis_id, name } = route.params;
    const [details, setDetails] = useState([]);
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

    useEffect(() => {
        axios.get(`http://197.243.14.102:4000/api/v1/diagnosis/${diagnosis_id}`).then(res => {
            setDetails(res.data.diagnosis);
            // console.log('test ',res.data.diagnosis.diagnosis_name);
        }).catch(err=>{
            console.log(err);
        })
        getLang()
    }, []);

if (!fontsLoaded) {
    return <><Text style={{fontFamily: 'Roboto_500Medium'}}>Loading ...</Text></>;
} else {
    return(
        <SafeAreaView>
            <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>
            {
            lang === 1 ?
                <ScrollView style={{padding: 2, height: '100%'}}>

                <View style={{flex: 1, flexDirection: 'row',top: 10, height: '100%'}}>
                    <View style={{height:300,padding: 10,width:190, alignItems: 'center'}}>
                        {/* <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 14}}>JACKMAX</Text> */}
                        <Image  source={{uri: `http://197.243.14.102:4000/uploads/${details.image}`}} style={{width: '100%', height: '100%', borderRadius: 10}} />
                    </View>
                    <View style={{flex: 1, flexDirection: 'column',padding: 5, width:'100%'}}>
                        <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 16}}>{details.diagnosis_name}</Text>
                        <Text style={{color: '#347464', fontSize: 15, left: 10, fontStyle: 'italic'}}>Ibimenyetso</Text>
                        <View style={{top: 10}}>
                            <Text style={{fontSize: 12, paddingRight: 5}}>
                                {details.symptoms}
                            </Text>
                            <Text></Text>
                                    <Button
                                        title="Gura imiti"
                                        color= "#347464"
                                        onPress={OpenStore}                                        
                                        />

                        </View>
                    </View>
                    {/* <TouchableOpacity onPress={()=> navigation.navigate('DianosisScreen', { name: 'DianosisScreen' })}>
                    </TouchableOpacity> */}
                </View>

                <View style={{flex: 1, flexDirection: 'column',padding: 10}}>
                    <View style={{width:'100%', height: '100%'}}>
                        <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 16}}>Indwara: {details.diagnosis_name}</Text>

                        <Text style={{color: '#347464', fontSize: 15, left: 10, top: 10,fontStyle: 'italic',fontFamily: 'Roboto_500Medium'}}>Iterwa niki?</Text>
                        <Text style={{fontSize: 12, left: 15, top: 15,paddingRight:15,fontFamily: 'Roboto_500Medium'}}>
                            {details.cause}
                        </Text>

                        <Text style={{color: '#347464', fontSize: 15, left: 10, top: 20,fontStyle: 'italic',fontFamily: 'Roboto_500Medium'}}>Yirirwa ite?</Text>
                        <Text style={{fontSize: 12, left: 15, top: 25,paddingRight:15,fontFamily: 'Roboto_500Medium'}}>
                            {details.prevention}
                        </Text>

                        <Text style={{color: '#347464', fontSize: 15, left: 10, top: 30,fontStyle: 'italic',fontFamily: 'Roboto_500Medium'}}>Imiti wakoresha</Text>
                        <Text style={{fontSize: 12, left: 15, top: 35,paddingRight:15,fontFamily: 'Roboto_500Medium'}}>
                            {details.recommendation_products}
                        </Text>

                        <View style={{left: 15,top: 55, width: 250}}>
                            <Button
                                title="Gura imiti wakoresha"
                                color= "#347464"
                                onPress={OpenStore}
                            />

                        </View>

                    </View>
                </View>

                </ScrollView>
            :

            <ScrollView style={{padding: 2, height: '100%'}}>

                <View style={{flex: 1, flexDirection: 'row',top: 10, height: '100%'}}>
                    <View style={{height:300,padding: 10,width:190, alignItems: 'center'}}>
                        {/* <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 14}}>JACKMAX</Text> */}
                        <Image  source={{uri: `http://197.243.14.102:4000/uploads/${details.image}`}} style={{width: '100%', height: '100%', borderRadius: 10}} />
                    </View>
                    <View style={{flex: 1, flexDirection: 'column',padding: 5, width:'100%'}}>
                        <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 16,fontFamily: 'Roboto_500Medium'}}>{details.diagnosis_name}</Text>
                        <Text style={{color: '#347464', fontSize: 15, left: 10, fontStyle: 'italic'}}>Symptoms</Text>
                        <View style={{top: 10}}>
                            <Text style={{fontSize: 12, paddingRight: 5,fontFamily: 'Roboto_500Medium'}}>
                                {details.symptoms}
                            </Text>
                            <Text></Text>
                                    <Button
                                        title="Get Recommended Product"
                                        color= "#347464"
                                        onPress={OpenStore}
                                        />

                        </View>
                    </View>
                    {/* <TouchableOpacity onPress={()=> navigation.navigate('DianosisScreen', { name: 'DianosisScreen' })}>
                    </TouchableOpacity> */}
                </View>

                <View style={{flex: 1, flexDirection: 'column',padding: 10}}>
                    <View style={{width:'100%', height: '100%'}}>
                        <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 16}}>Diagnosis</Text>

                        <Text style={{color: '#347464', fontSize: 15, left: 10, top: 10,fontStyle: 'italic',fontFamily: 'Roboto_500Medium'}}>Cause</Text>
                        <Text style={{fontSize: 12, left: 15, top: 15,paddingRight:15,fontFamily: 'Roboto_500Medium'}}>
                            {details.cause}
                        </Text>

                        <Text style={{color: '#347464', fontSize: 15, left: 10, top: 20,fontStyle: 'italic',fontFamily: 'Roboto_500Medium'}}>Prevention</Text>
                        <Text style={{fontSize: 12, left: 15, top: 25,paddingRight:15,fontFamily: 'Roboto_500Medium'}}>
                            {details.prevention}
                        </Text>

                        <Text style={{color: '#347464', fontSize: 15, left: 10, top: 30,fontStyle: 'italic',fontFamily: 'Roboto_500Medium'}}>Recommended Product</Text>
                        <Text style={{fontSize: 12, left: 15, top: 35,paddingRight:15,fontFamily: 'Roboto_500Medium'}}>
                            {details.recommendation_products}
                        </Text>

                        <View style={{left: 15,top: 55, width: 250}}>
                            <Button
                                title="Get Recommended Product"
                                color= "#347464"
                                onPress={OpenStore}
                            />

                        </View>

                    </View>
                </View>

            </ScrollView>

            }
            

        </SafeAreaView>
    );
}
}