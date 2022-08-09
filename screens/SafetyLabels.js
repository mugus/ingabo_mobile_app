import React, { useState, useEffect } from 'react';

import { View, SafeAreaView,StatusBar, Platform, ScrollView, TouchableOpacity, Text } from 'react-native';


export default function SafetyLabels ({navigation}){

    return(
        <SafeAreaView>
            <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>
            <ScrollView>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', paddingTop: 15, paddingLeft: 15}}>
                        <Text style={{fontSize: 17, fontWeight: 'bold', fontFamily: 'Roboto'}}>Not Available</Text>
                    </View>
                   
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}