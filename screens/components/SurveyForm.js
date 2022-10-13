import React,{ useState, useEffect } from 'react'
import { Text, View,SafeAreaView, StatusBar, ScrollView, Platform } from 'react-native'
import { Storage } from 'expo-storage'
const KEY = '@@KEY';

export default function SurveyForm({navigation, route}) {
    const { customer, name } = route.params;
    const [lang, setLang] = useState("");

    const getLang = async() => {
        try {
            const item = JSON.parse(
                await Storage.getItem({ key: KEY })
              )
              setLang(item)
            
        } catch(err) {
            console.log("Error at Selecting Lang", err);
        }
    }

console.log('lang ',lang);

    useEffect(()=> {
        getLang()
      }, [])




  return (
    <SafeAreaView style={{flex:1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
        <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>
        <ScrollView>
            {
                customer === 1 ? 
                <>
                {
                    lang === 1 ?
                    <>
                        <View style={{flex: 1, flexDirection: 'row',padding: 5}}>
                            <Text>Wemeje ko uri Umushyitsi</Text>
                        </View>
                    </>:
                    <>
                        <View style={{flex: 1, flexDirection: 'row',padding: 5}}>
                            <Text>Survey Form as Guest</Text>
                        </View>
                    </>
                }
                </>
                :
                <>
                {
                    lang === 1 ?
                    <>
                        <View style={{flex: 1, flexDirection: 'row',padding: 5}}>
                            <Text>Wemeje ko uri Umukiriya</Text>
                        </View>
                    </>:
                    <>
                        <View style={{flex: 1, flexDirection: 'row',padding: 5}}>
                            <Text>Survey Form as Customer</Text>
                        </View>
                    </>
                }
                    
                </>
            }
            

        </ScrollView>

    </SafeAreaView>
  )
}
