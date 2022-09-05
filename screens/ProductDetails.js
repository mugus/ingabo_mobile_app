import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View,StatusBar, Platform, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useFonts,Roboto_500Medium,Roboto_500Medium_Italic} from '@expo-google-fonts/roboto';
import axios from 'axios';
import * as Linking from 'expo-linking';
import { Storage } from 'expo-storage'
import { SpeedDial, Input, Icon, BottomSheet, Button, ListItem  } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const KEY = '@@KEY';


export default function ProductDetails({route, navigation}){
    let [fontsLoaded] = useFonts({Roboto_500Medium, Roboto_500Medium_Italic});
    const { product_id, name } = route.params;
    const [productdetails, setProductdetails] = useState([]);
    const [ isloading, setIsloading ] = useState(true);
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
        await Linking.openURL('https://ingabo.store');
        // navigation.navigate(
        //     'Browser',
        //     { url: 'https://ingabo.store' }
        // )
    }
    // console.log("Data: ",product_id);


    const handleContactTeam = async () => {

        let sms = '';

        console.log("fullname: ",fullname);
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
                // english
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