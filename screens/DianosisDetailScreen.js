import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { useFonts,Roboto_500Medium } from '@expo-google-fonts/roboto';
import { SpeedDial, Input, Icon, BottomSheet, Button, ListItem  } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
    const OpenStore = async () => {
        Linking.openURL('https://ingabo.store');
    }

    const handleContactTeam = async () => {
        let sms = '';
        if(fullname === '' || phone === '' || message === ''|| address === ''){
            lang === 1 ?
            alert('Ntago wujuje imyanya yose')
            :
            alert('All fields are required')
        }else{
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
        }
        setIsVisible(false)
    }


    useEffect(() => {
        axios.get(`http://197.243.14.102:4000/api/v1/diagnosis/${diagnosis_id}`).then(res => {
            res.data.diagnosis.cause === null ? setDetails("No Data") : setDetails(res.data.diagnosis)
            // setDetails(res.data.diagnosis);

           
        }).catch(err=>{
            console.log(err);
        })
        getLang()
    }, []);
    console.log('test ',details);

if (!fontsLoaded) {
    return <><Text style={{fontFamily: 'Roboto_500Medium'}}>Loading ...</Text></>;
} else {
    return(
        <SafeAreaView>
            <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>
            {
            lang === 1 ?
                <ScrollView style={{padding: 2, height: '100%'}}>

                {details === 'No Data'? 
                <>
                    <Text style={{color: '#347464', fontSize: 18, paddingTop: '50%',fontFamily: 'Roboto_500Medium', textAlign: 'center'}}>Nta Bimenyetso byabonetse</Text>
                    {/* <Button title="Solid" type="solid" loading /> */}
                    <View style={{alignItems: 'center'}}>
                        <Button
                            buttonStyle={{
                                width: 170,
                                backgroundColor: 'black',
                                borderWidth: 2,
                                borderColor: '#fff',
                            }}
                            type="solid"
                            size="sm"
                            title="Subira inyuma"
                            onPress={()=> navigation.navigate('DianosisScreen', {name: 'DianosisScreen' })}
                            />

                    </View>
                </>
                :
                    <>
                    <View style={{flex: 1, flexDirection: 'row',top: 10, height: '100%'}}>
                        <View style={{height:300,padding: 10,width:190, alignItems: 'center'}}>
                            {/* <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 14}}>JACKMAX</Text> */}
                            <Image  source={{uri: `http://197.243.14.102:4000/uploads/${details.image}`}} style={{width: '100%', height: '100%', borderRadius: 10}} />
                        </View>
                        <View style={{flex: 1, flexDirection: 'column',padding: 5, width:'100%'}}>
                            <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 16}}>{details.diagnosis_name}</Text>
                            <Text style={{color: '#347464', fontSize: 15, left: 10, fontStyle: 'italic'}}>Ibimenyetso</Text>
                            <View style={{top: 10}}>
                                <ScrollView nestedScrollEnabled={true} style={{height: 200}}>
                                    <Text style={{fontSize: 12, paddingRight: 5}}>
                                        {details.symptoms}
                                    </Text>
                                </ScrollView>
                                <Text></Text>
                                        <Button
                                            buttonStyle={{
                                                backgroundColor: '#347464',
                                                borderWidth: 2,
                                                borderColor: '#fff',
                                                borderRadius: 5,
                                            }}
                                            type="solid"
                                            size="sm"
                                            title="Gura imiti"
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
                                    buttonStyle={{
                                        backgroundColor: '#347464',
                                        borderWidth: 2,
                                        bborderColor: '#fff',
                                        borderRadius: 5,
                                    }}
                                    type="solid"
                                    size="sm"
                                    title="Gura imiti wakoresha"
                                    onPress={OpenStore}
                                />

                            </View>

                        </View>
                    </View>
                    </>
                }
                

                </ScrollView>
            :

            <ScrollView style={{padding: 2, height: '100%'}}>
                {details === 'No Data'? 
                <>
                    <Text style={{color: '#347464', fontSize: 18, paddingTop: '20%',fontFamily: 'Roboto_500Medium', textAlign: 'center'}}>Details Not Found</Text>
                    <View style={{alignItems: 'center'}}>
                        <Button
                            buttonStyle={{
                                width: 170,
                                backgroundColor: 'black',
                                borderWidth: 2,
                                borderRadius: 5,
                            }}
                            type="solid"
                            size="sm"
                            title="Back to Diagnosis"
                            onPress={()=> navigation.navigate('DianosisScreen', {name: 'DianosisScreen' })}
                        />

                    </View>
                </>
                :
                <>
                <View style={{flex: 1, flexDirection: 'row',top: 10, height: '100%'}}>
                    <View style={{height:300,padding: 10,width:190, alignItems: 'center'}}>
                        {/* <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 14}}>JACKMAX</Text> */}
                        <Image  source={{uri: `http://197.243.14.102:4000/uploads/${details.image}`}} style={{width: '100%', height: '100%', borderRadius: 10}} />
                    </View>
                    <View style={{flex: 1, flexDirection: 'column',padding: 5, width:'100%'}}>
                        <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 16,fontFamily: 'Roboto_500Medium'}}>{details.diagnosis_name}</Text>
                        <Text style={{color: '#347464', fontSize: 15, left: 10, fontStyle: 'italic'}}>Symptoms</Text>
                            <View style={{top: 10}}>
                                <ScrollView nestedScrollEnabled={true} style={{height: 200}}>
                                <Text style={{fontSize: 12, paddingRight: 5,fontFamily: 'Roboto_500Medium'}}>
                                    {details.symptoms}
                                </Text>
                                </ScrollView>
                                <Text></Text>
                                <Button
                                    buttonStyle={{
                                        backgroundColor: '#347464',
                                        borderWidth: 2,
                                        borderColor: '#fff',
                                        borderRadius: 5,
                                    }}
                                    type="solid"
                                    size="sm"
                                    title="Shop Product"
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
                                 buttonStyle={{
                                    backgroundColor: '#347464',
                                    borderWidth: 2,
                                    borderColor: '#fff',
                                    borderRadius: 5,
                                }}
                                type="solid"
                                size="sm"
                                title="Shop Product"
                                onPress={OpenStore}
                            />

                        </View>

                    </View>
                </View>
                </>
                }
                

            </ScrollView>

            }
            
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