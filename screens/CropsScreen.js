import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, SafeAreaView,ScrollView, TouchableOpacity,StatusBar } from 'react-native';
import { useFonts,Roboto_500Medium } from '@expo-google-fonts/roboto';
import axios from 'axios';
import { SpeedDial, Input, Icon, BottomSheet, Button, ListItem  } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Storage } from 'expo-storage'
const KEY = '@@KEY';



export default function CropsScreen({navigation}){
    let [fontsLoaded] = useFonts({Roboto_500Medium});
    const [crop, setCrop] = useState([]);
    const [cropkin, setCropkin] = useState([]);
    const [cropeng, setCropeng] = useState([]);
    const [lang, setLang] = useState("");

    const [open, setOpen] = React.useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const [fullname, setFullname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

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


const OpenStore = async () => {
    await Linking.openURL('https://ingabo.store');
}


const handleContactTeam = async () => {
    let sms = '';
    lang === 1 ? sms = `Message from Ingabo App!\n\nHello \nNitwa is ${fullname} ntuye ${address}.\n${message}.\nMwamvugisha kuri ${phone}`: sms = `Message from Ingabo App!\n\nHello \nMy name is ${fullname} from ${address}.\n${message}\nContact me on ${phone}`
    // let sms = `Hello \nMy name is ${fullname} from ${address}.\n${message}`
    // console.log("fullname:" , data)
    const link = `whatsapp://send?text=${sms}&phone=+250787265587`;
    Linking.openURL(link).then((data) => {
        console.log('WhatsApp Opened');
        }).catch(() => {
        lang === 1 ?
        alert('Ntago WhatsApp Igaragara muri Telefoni yawe! Duhamagare kuri +250787265587')
        :
        alert('Make sure WhatsApp installed on your device and try again! Or Call +250787265587')

        });
    setIsVisible(false)
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


<BottomSheet modalProps={{}} isVisible={isVisible}>
    <ScrollView style={{backgroundColor:"#edefea"}}>
            
        <View style={{flex: 1, flexDirection: 'column', paddingTop: 10}}>
            <Text style={{fontSize: 17, padding: 10,textAlign: 'center',textTransform: 'uppercase', fontWeight: 'bold',color: '#347464', fontFamily: 'Roboto_500Medium'}}>Contact Sales Team</Text>
            {/* <Input placeholder='Add Full Names' value={fullname} onChange={e => setFullname(e.target.value)} leftIcon={ <MaterialCommunityIcons  name='account-cancel' size={24} color='black' /> } /> */}
            <Input placeholder='Add Full Names' onChangeText={(value) => setFullname(value)} leftIcon={ <MaterialCommunityIcons  name='account-cancel' size={24} color='black' /> } />
            <Input placeholder='Add Address' value={address} onChangeText={(value) => setAddress(value)} leftIcon={ <Icon  name='map' size={24} color='black' /> } />
            <Input keyboardType="numeric" placeholder='Add Phone' leftIcon={ <Icon  name='phone' size={24} color='black' /> } value={phone} onChangeText={(value) => setPhone(value)} />
            <Input multiline numberOfLines={5} placeholder='Add Message' leftIcon={ <Icon  name='mail' size={24} color='black' /> } onChangeText={(value) => setMessage(value)} />
            {/* <input  type='text' value={fullname} onChange={(e) => setFullname(e.target.value)}/> */}
            {/* <TextInput  value={fullname} onChange={(e) => setFullname(e.target.value)}/> */}
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Button 
                        type="submit"
                    onPress={handleContactTeam} 
                    buttonStyle={{
                        backgroundColor: '#347464',
                        borderWidth: 1,
                        color: '#fff',
                        borderColor: '#347464',
                        borderRadius: 5,
                    }}><MaterialCommunityIcons name='whatsapp' size={24} color="#fff" /></Button>
                </View>
                <View style={{flex: 0.7}}>
                    <Button 
                    onPress={() => setIsVisible(false)} 
                    buttonStyle={{
                        backgroundColor: 'red',
                        borderWidth: 1,
                        borderColor: '#347464',
                        borderRadius: 5,
                    }}><MaterialCommunityIcons name='cancel' size={24} color="#fff" /></Button>
                </View>
            </View>

        </View>
    </ScrollView>
    
        
        
</BottomSheet>

            {
                lang === 1 ?
                <SpeedDial
                    isOpen={open}
                    icon={<MaterialCommunityIcons name='send-circle-outline' size={28} color="#347464"/>}
                    openIcon={{ name: 'close', color: '#fff' }}
                    onOpen={() => setOpen(!open)}
                    onClose={() => setOpen(!open)}
                >
                    <SpeedDial.Action
                    icon={{ name: 'shopping-cart', color: '#fff' }}
                    title="Sura iguriro"
                    onPress={OpenStore}
                    />
                    <SpeedDial.Action
                    icon={<MaterialCommunityIcons name='whatsapp' size={24} color="#fff" />}
                    title="Vugisha uwagufasha"
                        onPress={() => setIsVisible(true)}
                    // onPress={()=> navigation.navigate('ContactSalesTeam', {name: 'ContactSalesTeam' })}
                    />
                </SpeedDial>
                :
                <SpeedDial
                    isOpen={open}
                    icon={<MaterialCommunityIcons name='send-circle-outline' size={28} color="#347464" />}
                    openIcon={{ name: 'close', color: '#fff' }}
                    onOpen={() => setOpen(!open)}
                    onClose={() => setOpen(!open)}
                >
                    <SpeedDial.Action
                    icon={{ name: 'shopping-cart', color: '#fff' }}
                    title="Visit Webshop"
                    onPress={OpenStore}
                    />
                    <SpeedDial.Action
                    icon={<MaterialCommunityIcons name='whatsapp' size={24} color="#fff" />}
                    title="Contact sales team"
                        onPress={() => setIsVisible(true)}
                    // onPress={()=> navigation.navigate('ContactSalesTeam', {name: 'ContactSalesTeam' })}
                    />
                </SpeedDial>
            }


        </SafeAreaView>
        );
    }
}