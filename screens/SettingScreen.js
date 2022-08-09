import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView,Button, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Storage } from 'expo-storage'
const KEY = '@@KEY';

export default function SettingScreen({navigation}){
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
        <SafeAreaView>
            <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>
            {
            lang === 1 ?
            <ScrollView>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', padding: 50}}>
                        <Text style={{fontSize: 25, fontWeight: 'bold'}}>Manage Settings</Text>
                    </View>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 0.5}} />
                    <View style={{flex:1, flexDirection: 'row', padding: 20}}>
                        <Text style={{fontSize: 15, fontWeight: '600', color: '#5d806e'}}>
                            <MaterialCommunityIcons name="wifi" size={28} color="#000" />
                            <Text>                                                  </Text>
                            Display
                        </Text>
                    </View>
                    <View style={{flex:1, flexDirection: 'row', padding: 20}}>
                        <Text style={{fontSize: 15, fontWeight: '600', color: '#5d806e'}}>
                            <MaterialCommunityIcons name="message" size={28} color="#000" />
                            <Text>                                                  </Text>
                            Kumenyesha
                        </Text>
                    </View>
                    <View style={{flex:1, flexDirection: 'row', padding: 20}}>
                        <Text style={{fontSize: 15, fontWeight: '600', color: '#5d806e'}}>
                            <MaterialCommunityIcons name="lock" size={28} color="#000" />
                            <Text>                                                  </Text>
                            Umutekano
                        </Text>
                    </View>
                    <View style={{flex:1, flexDirection: 'row', padding: 20}}>
                        <Text style={{fontSize: 15, fontWeight: '600', color: '#5d806e'}}>
                            <MaterialCommunityIcons name="account" size={28} color="#000" />
                            <Text>                                                  </Text>
                            Konti
                        </Text>
                    </View>
                </View>
            </ScrollView>
            :
            <ScrollView>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{alignItems: 'center', padding: 50}}>
                        <Text style={{fontSize: 25, fontWeight: 'bold'}}>Manage Settings</Text>
                    </View>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 0.5}} />
                    <View style={{flex:1, flexDirection: 'row', padding: 20}}>
                        <Text style={{fontSize: 15, fontWeight: '600', color: '#5d806e'}}>
                            <MaterialCommunityIcons name="wifi" size={28} color="#000" />
                            <Text>                                                  </Text>
                            Display
                        </Text>
                    </View>
                    <View style={{flex:1, flexDirection: 'row', padding: 20}}>
                        <Text style={{fontSize: 15, fontWeight: '600', color: '#5d806e'}}>
                            <MaterialCommunityIcons name="message" size={28} color="#000" />
                            <Text>                                                  </Text>
                            Notifications
                        </Text>
                    </View>
                    <View style={{flex:1, flexDirection: 'row', padding: 20}}>
                        <Text style={{fontSize: 15, fontWeight: '600', color: '#5d806e'}}>
                            <MaterialCommunityIcons name="lock" size={28} color="#000" />
                            <Text>                                                  </Text>
                            Security
                        </Text>
                    </View>
                    <View style={{flex:1, flexDirection: 'row', padding: 20}}>
                        <Text style={{fontSize: 15, fontWeight: '600', color: '#5d806e'}}>
                            <MaterialCommunityIcons name="account" size={28} color="#000" />
                            <Text>                                                  </Text>
                            Account
                        </Text>
                    </View>
                </View>
            </ScrollView>
            }
        </SafeAreaView>
    );
}