// import * as React from 'react';
import React, { useState, useRef, useEffect } from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView,Button, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts,Roboto_500Medium } from '@expo-google-fonts/roboto';
import axios from 'axios';
import { Storage } from 'expo-storage'
const KEY = '@@KEY';


export default function DianosisScreen({route, navigation}){
    let [fontsLoaded] = useFonts({Roboto_500Medium});
    const [errMsg, setErrMsg] = useState("");
    const [isReady, setisready] = useState(false);
    const { crop_id, name } = route.params;
    const [diagnosisdetails, setDiagnosisdetails] = useState([]);
    const [lang, setLang] = useState("");



    let cameraRef = useRef();
    const [hasPermission, setHasPermission] = useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();
    const [type, setType] = useState(Camera.Constants.Type.back);
  
    const OpenCamera = async() => {
        // alert('Camera')
        const { status } = await Camera.requestCameraPermissionsAsync();
        const { mediaLibraryPermission } = await MediaLibrary.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        setHasMediaLibraryPermission(mediaLibraryPermission === 'granted');

    }
    
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

    useEffect(()=> {
        axios.get(`http://197.243.14.102:4000/api/v1/crops/${crop_id}`).then(res => {
            setDiagnosisdetails(res.data.diag);
        }).catch(err=>{
            setErrMsg(err.response.data.message)
            console.log(err);
        })
        diagnosisdetails ? setisready(true) : setisready(false)
        getLang()
      }, [])

console.log(diagnosisdetails);
    if (hasPermission === false) {
        return <Text>{lang === 1 ? <Text>Kwinjira kuri kamera ntibyemejwe</Text> : <Text>Sorry, No access to camera granted</Text> }</Text>;
      }
    if (hasPermission === true) {
        const takePic = async() => {
            let options = {
                quality: 1,
                base64: true,
                exif: false
            };
            let newPhoto = await cameraRef.current.takePictureAsync(options);
            setPhoto(newPhoto);
          };
        if(photo){
            let sharePic = () => {
                shareAsync(photo.uri).then(()=> {
                    setPhoto(undefined);
                });
            };
            let savePhoto = () => {
                MediaLibrary.saveToLibraryAsync(photo.uri).then(()=>{
                    setPhoto(undefined);
                })
            };

            
            return (
                <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
                    <Image style={{flex: 1, alignSelf: 'stretch'}} source={{ uri: "data:image/jpg;base64,"+photo.base64}} />
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View>
                            <TouchableOpacity onPress={sharePic}>
                                <MaterialCommunityIcons name="share-variant-outline" size={30} color="#000"/>
                            </TouchableOpacity>
                            {/* <Button title="Share" onPress={sharePic} /> */}
                            {lang === 1 ? <Text style={{ fontSize: 11}}>Ohereza</Text> : <Text style={{ fontSize: 11}}>Share</Text>}
                            
                        </View>
                        <Text>         </Text>
                        <View>
                            {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
                            <TouchableOpacity onPress={()=> setPhoto(undefined)}>
                                <MaterialCommunityIcons name="share-off-outline" size={30} color="#000"/>
                            </TouchableOpacity>
                            {/* <Button title="Discard" onPress={()=> setPhoto(undefined)} /> */}
                            {lang === 1 ? <Text style={{ fontSize: 11}}>Hagarika</Text> : <Text style={{ fontSize: 11}}>Discard</Text>}
                        </View>
                    </View>
                    
                    
                    
                </SafeAreaView>
            );
        }
        return (
            <>
            <View>
                <Camera type={type} style={{width: '100%', height: '85%'}} ref={cameraRef}>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                                );
                                }}>
                                <MaterialCommunityIcons name="camera-retake-outline" size={30} color="#000"/>
                                {/* <Text> Flip </Text> */}
                            </TouchableOpacity>
                            
                        </View>
                    </Camera>
                    <View 
                        style={{
                            alignSelf: 'center',
                            alignItems:'flex-end',
                            
                            }}>
                                <TouchableOpacity onPress={takePic} style={{ paddingTop: 5, backgroundColor: '#edefea'}}>
                                    <MaterialCommunityIcons name="camera" size={50} color="#000"/>
                                </TouchableOpacity>
                                {/* <Button title="Take Pic" onPress={takePic} style={{ borderRadius: 70 }}/> */}
                    </View>
            </View>
            </>
        );
      }

if (!fontsLoaded) {
    return <><Text style={{fontFamily: 'Roboto_500Medium'}}>Loading ...</Text></>;
} else {
    return(
        <SafeAreaView>
            <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>
            <ScrollView>
                {
                errMsg ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text style={{ fontSize: 18, padding: 20, fontWeight: 'bold',fontFamily: 'Roboto_500Medium'}}>{errMsg}</Text></View>
                ) : (
                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', top: 10, justifyContent: 'space-around'}}>
                {
                    diagnosisdetails.length > 0 &&
                        diagnosisdetails.map((diag)=>{
                            return (
                            <TouchableOpacity style={{width: 170, height: 220, backgroundColor: '#edefea', borderRadius: 10}}  key={diag.diagnosis_id} onPress={()=>  navigation.navigate('DianosisDetailScreen', {diagnosis_id: diag.diagnosis_id, name: 'DianosisDetailScreen' })}>
                                <View style={{width: 150, height: 210}}>
                                    <Image source={{uri: `http://197.243.14.102:4000/uploads/${diag.diag_image}`}} style={{width: 170, height: 190, borderRadius: 5}} />
                                    <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 12, paddingBottom: 10, padding: 5,textTransform: 'uppercase',fontFamily: 'Roboto_500Medium'}}>{diag.diagnosis_name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }



                </View>    
                    )
                }
                


                <View style={{flex: 1, flexDirection: 'row', paddingTop: 35}}>
                    <TouchableOpacity>

                        <View style={{padding: 10,left: 20}}>
                        {lang === 1 ?
                        <Text onPress={OpenCamera} style={{color: '#347464', fontWeight: 'bold', fontSize: 14, top: 10,fontFamily: 'Roboto_500Medium'}}> <MaterialCommunityIcons name="camera" size={24}/> Fungura Camera</Text>
                        :
                        <Text onPress={OpenCamera} style={{color: '#347464', fontWeight: 'bold', fontSize: 14, top: 10,fontFamily: 'Roboto_500Medium'}}> <MaterialCommunityIcons name="camera" size={24}/> Open Camera</Text>
                        }
                            
                        </View>
                    </TouchableOpacity>
                </View>

                    
            </ScrollView>
        </SafeAreaView>
    );
}
}