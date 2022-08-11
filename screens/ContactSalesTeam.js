import React, { useState, useEffect } from 'react';
import { SpeedDial, Input, Icon,Button } from '@rneui/themed';
import { View, SafeAreaView,StatusBar, Platform, ScrollView , Text } from 'react-native';


export default function ContactSalesTeam ({navigation}){
    const [message, setMessage] = useState("");

    return(
        <SafeAreaView>
            <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>
            <ScrollView style={{backgroundColor:"#edefea"}}>
                
                    <View style={{flex: 1, flexDirection: 'column', paddingTop: 10}}>
                        <Text style={{fontSize: 17, fontWeight: 'bold', fontFamily: 'Roboto'}}>Contact Sales Team</Text>
                        <Input placeholder='Add Full Names' value={message} onChange={(e) => setMessage(e.target.value)} />
                        <Input placeholder='Add Address' leftIcon={ <Icon  name='map' size={24} color='black' /> }/>
                        <Input keyboardType="numeric" placeholder='Add Phone' leftIcon={ <Icon  name='phone' size={24} color='black' /> }/>
                        <Input multiline numberOfLines={5} placeholder='Add Message' leftIcon={ <Icon  name='mail' size={24} color='black' /> }/>
                        
                    </View>
                    <View style={{flex: 1}}></View>
            </ScrollView>
        </SafeAreaView>
    )
}