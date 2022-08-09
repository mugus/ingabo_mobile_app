import react, { useState, useEffect } from "react";
import { Image, Platform, Text, View,StatusBar, SafeAreaView,TouchableOpacity,Button,ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Storage } from 'expo-storage'
const KEY = '@@KEY';


const width = '47%';
export default function SafetyScreen({navigation}){
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



    return(
        <SafeAreaView style={{flex:1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
            <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>
            <ScrollView>
            {
            lang === 1 ?
                <>
                    <View style={{flex: 1, flexDirection: 'row',paddingTop: 70}}>

                        <TouchableOpacity onPress={()=> navigation.navigate('SafetyTransport', { name: 'SafetyTransport' })} style={{padding: 30 ,alignItems: 'center', justifyContent: 'center' ,height:160,borderRadius: 10, margin: 5,backgroundColor: "#5d806f", width:width}}>
                            <View styles={{padding: 10,}}>
                                <MaterialCommunityIcons name="truck-check" size={50} color="#fff" style={{ paddingLeft: 24 }}/>
                                <Text style={{color: '#fff', fontWeight: 'bold',padding:5, fontSize: 20}}>Uko bitwarwa</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> navigation.navigate('SafetyStorage', { name: 'SafetyStorage' })} style={{padding: 30,height:160 ,alignItems: 'center', justifyContent: 'center' ,borderRadius: 10, margin: 5,backgroundColor: "#5d806f", width:width}} >
                            <View styles={{padding: 10, alignItems: 'center'}}>
                                <MaterialCommunityIcons name="warehouse" size={50} color="#fff" style={{ paddingLeft: 14 }}/>
                                <Text style={{color: '#fff', fontWeight: 'bold',padding:5, fontSize: 20}}>Ububiko</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={{flex: 1, paddingTop: 10, alignItems: 'center'}}>
                        <TouchableOpacity onPress={()=> navigation.navigate('SafetyApplication', { name: 'SafetyApplication' })} style={{padding: 30,height:160 ,alignItems: 'center', justifyContent: 'center' ,borderRadius: 10, margin: 5,backgroundColor: "#5d806f", width:width}}>
                            <View styles={{padding: 10, alignItems: 'center'}}>
                                <MaterialCommunityIcons name="doctor" size={50} color="#fff" style={{ paddingLeft: 20 }}/>
                                <Text style={{color: '#fff', fontWeight: 'bold',padding:5, fontSize: 18}}>Uko bikora</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </>
                :
                <>
                <View style={{flex: 1, flexDirection: 'row',paddingTop: 70}}>

                    <TouchableOpacity onPress={()=> navigation.navigate('SafetyTransport', { name: 'SafetyTransport' })} style={{padding: 30 ,alignItems: 'center', justifyContent: 'center' ,height:160,borderRadius: 10, margin: 5,backgroundColor: "#5d806f", width:width}}>
                        <View styles={{padding: 10,}}>
                            <MaterialCommunityIcons name="truck-check" size={50} color="#fff"  style={{ paddingLeft: 20 }}/>
                            <Text style={{color: '#fff', fontWeight: 'bold',padding:5, fontSize: 20}}>Transport</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> navigation.navigate('SafetyStorage', { name: 'SafetyStorage' })} style={{padding: 30,height:160 ,alignItems: 'center', justifyContent: 'center' ,borderRadius: 10, margin: 5,backgroundColor: "#5d806f", width:width}} >
                        <View styles={{padding: 10, alignItems: 'center'}}>
                            <MaterialCommunityIcons name="warehouse" size={50} color="#fff" style={{ paddingLeft: 13 }}/>
                            <Text style={{color: '#fff', fontWeight: 'bold',padding:5, fontSize: 20}}>Storage</Text>
                        </View>
                    </TouchableOpacity>

                    </View>

                    <View style={{flex: 1, paddingTop: 10, alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=> navigation.navigate('SafetyApplication', { name: 'SafetyApplication' })} style={{padding: 30,height:160 ,alignItems: 'center', justifyContent: 'center' ,borderRadius: 10, margin: 5,backgroundColor: "#5d806f", width:width}}>
                        <View styles={{padding: 10, alignItems: 'center'}}>
                            <MaterialCommunityIcons name="doctor" size={50} color="#fff" style={{ paddingLeft: 23 }}/>
                            <Text style={{color: '#fff', fontWeight: 'bold',padding:5, fontSize: 18}}>Application</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </>
                }
            </ScrollView>
        </SafeAreaView>
        );

        

    
}
