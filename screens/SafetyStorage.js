import React, { useState, useEffect } from 'react';

import { View, SafeAreaView,StatusBar, Platform, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Storage } from 'expo-storage'
const KEY = '@@KEY';

export default function SafetyStorage ({navigation}){
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
            <ScrollView>
            {
            lang === 1 ?
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', paddingTop: 15, paddingLeft: 15}}>
                        <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>Ubwirinzi, </Text>
                        <Text style={{fontSize: 17, fontWeight: 'bold',color: '#5d806e',fontFamily: 'Roboto'}}>Ububiko</Text>
                    </View>
                    <View style={{paddingTop:20, paddingLeft: 10, paddingRight: 10}}>

                        <View style={{flex: 1, flexDirection: 'row',paddingTop: 7,paddingRight:5}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>1. </Text>
                            <Text style={{fontSize: 16, fontWeight: '600',fontFamily: 'Roboto'}}>
                                Buri gihe ujye ubika imiti yica udukoko mubikoresho imiti yajemo. 
                            </Text>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row',paddingTop: 7,paddingRight:5}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>2. </Text>
                            <Text style={{fontSize: 16, fontWeight: '600',fontFamily: 'Roboto'}}>
                                Uyibike itandukanije, ahantu hafunze neza kandi kure y'abana n'amatungo
                            </Text>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row',paddingTop: 7,paddingRight:5}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>3. </Text>
                            <Text style={{fontSize: 16, fontWeight: '600',fontFamily: 'Roboto'}}>
                            Ntuzigere ubika imiti yica udukoko mu kabati hamwe n’ibiryo cyangwa hafi yabyo, ibiryo by'amatungo, 
                            ibikoresho byo kwa muganga, n'ibikoresho by'amazi. 
                            </Text>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row',paddingTop: 7,paddingRight:5}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>4. </Text>
                            <Text style={{fontSize: 16, fontWeight: '600',fontFamily: 'Roboto'}}>
                            Bika imiti yica udukoko ahantu hakonje, humye, hahumeka neza
                            </Text>
                        </View>

                    
                    </View>
                    {/* <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15, paddingLeft: 15, width: '50%'}} /> */}
                </View>
                :
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', paddingTop: 15, paddingLeft: 15}}>
                        <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>Safety </Text>
                        <Text style={{fontSize: 17, fontWeight: 'bold',color: '#5d806e',fontFamily: 'Roboto'}}>Storage</Text>
                    </View>
                    <View style={{paddingTop:20, paddingLeft: 10, paddingRight: 10}}>

                        <View style={{flex: 1, flexDirection: 'row',paddingTop: 7,paddingRight:5}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>1. </Text>
                            <Text style={{fontSize: 16, fontWeight: '600',fontFamily: 'Roboto'}}>
                                Always store pesticides in their original labelled containers. 
                            </Text>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row',paddingTop: 7,paddingRight:5}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>2. </Text>
                            <Text style={{fontSize: 16, fontWeight: '600',fontFamily: 'Roboto'}}>
                                Store in a separate, locked cabinet or other secure structure, away from children and pets 
                            </Text>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row',paddingTop: 7,paddingRight:5}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>3. </Text>
                            <Text style={{fontSize: 16, fontWeight: '600',fontFamily: 'Roboto'}}>
                                Never store pesticides in cabinets with or near food, animal feed, medical supplies, and water supplies. 
                            </Text>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row',paddingTop: 7,paddingRight:5}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>4. </Text>
                            <Text style={{fontSize: 16, fontWeight: '600',fontFamily: 'Roboto'}}>
                                Store pesticides in a cool, dry, well-ventilated area 
                            </Text>
                        </View>

                    
                    </View>
                    {/* <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15, paddingLeft: 15, width: '50%'}} /> */}
                </View>
            }
            </ScrollView>
        </SafeAreaView>
    )
}