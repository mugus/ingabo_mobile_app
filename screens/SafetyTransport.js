import React, { useState, useEffect } from 'react';
import { View, SafeAreaView,StatusBar,Dimensions,    Platform, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Storage } from 'expo-storage'
const KEY = '@@KEY';


export default function SafetyTransport ({navigation}){
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
            <>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', paddingTop: 15, paddingLeft: 15}}>
                        <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>Ubwirinzi, </Text>
                        <Text style={{fontSize: 17, fontWeight: 'bold',color: '#5d806e',fontFamily: 'Roboto'}}>Ubwikorezi</Text>
                    </View>
                    <View style={{paddingTop:20, paddingLeft: 10, paddingRight: 10}}>

                        <View style={{flex: 1, flexDirection: 'row',paddingTop: 7,paddingRight:5}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>1. </Text>
                            <Text style={{fontSize: 16, fontWeight: '600',fontFamily: 'Roboto'}}>
                                Uburyo bwiza bwo gutwara imiti yica udukoko ni inyuma mu ikamyo cyangwa ipikipiki, 
                                kandi ifunze neza mu makarito yayo. 
                            </Text>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row',paddingTop: 7,paddingRight:5}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>2. </Text>
                            <Text style={{fontSize: 16, fontWeight: '600',fontFamily: 'Roboto'}}>
                                Imiti yica udukoko itwarwa yose igomba kuba ifite ibirango bifatanye neza n'ikarito irimo mugihe itwawe
                            </Text>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row',paddingTop: 7,paddingRight:5}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>3. </Text>
                            <Text style={{fontSize: 16, fontWeight: '600',fontFamily: 'Roboto'}}>
                                Imiti yica udukoko ntigomba na rimwe gutwarwa mugice cyabagenzi cyikinyabiziga icyo aricyo cyose. 
                            </Text>
                        </View>

                    
                    </View>
                </View>
            </>
            :
            <>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', paddingTop: 15, paddingLeft: 15}}>
                        <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>Safety, </Text>
                        <Text style={{fontSize: 17, fontWeight: 'bold',color: '#5d806e',fontFamily: 'Roboto'}}>Transportation</Text>
                    </View>
                    <View style={{paddingTop:20, paddingLeft: 10, paddingRight: 10}}>

                        <View style={{flex: 1, flexDirection: 'row',paddingTop: 7,paddingRight:5}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>1. </Text>
                            <Text style={{fontSize: 16, fontWeight: '600',fontFamily: 'Roboto'}}>
                                The best way to transport pesticides is in the back of a truck or pickup, 
                                with the pesticides in their original containers. 
                            </Text>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row',paddingTop: 7,paddingRight:5}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>2. </Text>
                            <Text style={{fontSize: 16, fontWeight: '600',fontFamily: 'Roboto'}}>
                                All transported pesticides should have labels properly attached to containers during transportation 
                            </Text>
                        </View>

                        <View style={{flex: 1, flexDirection: 'row',paddingTop: 7,paddingRight:5}}>
                            <Text style={{fontSize: 17, fontWeight: 'bold',fontFamily: 'Roboto'}}>3. </Text>
                            <Text style={{fontSize: 16, fontWeight: '600',fontFamily: 'Roboto'}}>
                                Pesticides should never be carried in the passenger section of any vehicle. 
                            </Text>
                        </View>

                    
                    </View>
                </View>
            </>
            }
                
            </ScrollView>
        </SafeAreaView>
    )
}