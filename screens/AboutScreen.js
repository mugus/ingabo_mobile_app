import { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, SafeAreaView,ScrollView,Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
    useFonts,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  } from '@expo-google-fonts/roboto';
  import { Storage } from 'expo-storage'
  const KEY = '@@KEY';


export default function AboutScreen({navigation}){
    const [lang, setLang] = useState("");
    let [fontsLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_100Thin_Italic,
        Roboto_300Light,
        Roboto_300Light_Italic,
        Roboto_400Regular,
        Roboto_400Regular_Italic,
        Roboto_500Medium,
        Roboto_500Medium_Italic,
        Roboto_700Bold,
        Roboto_700Bold_Italic,
        Roboto_900Black,
        Roboto_900Black_Italic,
      });
    

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


    useEffect(()=> {
        getLang()
        }, [])
        console.log(" Lang", lang);

if (!fontsLoaded) {
    return <><Text>Loading ...</Text></>;
} else {
    return(
        <SafeAreaView>
            <ScrollView>
                {
                    lang === 1 ? 
                    
                    // Kinyarwanda
                    <View style={{flex: 1, fontFamily: "Roboto_500Medium"}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 15}}>
                            <Text style={{fontSize: 25, fontWeight: 'bold'}}>About </Text>
                            <Text style={{fontSize: 25, fontWeight: 'bold',color: '#5d806e'}}>Ingabo Plant Health</Text>
                        </View>

                        <View style={{paddingTop:20, paddingLeft: 10, paddingRight: 10}}>

                            <Text style={{textAlign: 'justify', fontWeight: '500', fontSize: 16}}>
                                Ingabo Plant Health ltd ni kompanyi(Ikigo) itanga ibisubizo ku bahinzi mu rwego rwo kugabanya ibihombo, 
                                bakongera umusaruro n'imibereho myiza yabahinzi. 
                                Ubu dukorera mu turere twose tw' U Rwanda.
                            </Text>
                            <Text style={{textAlign: 'justify', fontWeight: '500', fontSize: 16, paddingTop: 10}}>
                                INGABO PlantHealth ltd, itanga inama n'imiti ku bahinzi bato ibinyujije mu bafashamyumvire b'ubuhinzi(Agro-dealers) bahuguwe.
                                Intego yacu ni ukongera ikoreshwa neza ry'imiti yica ibyonnyi n'udusimba mu rwego rwo kugabanya ibihombo tukongera umusaruro.
                            </Text>
                            <Text style={{textAlign: 'justify', fontWeight: '500', fontSize: 16,paddingTop: 30}}>
                                Ingabo itanga ibisubizo bikurikira kubahinzi:
                            </Text>

                            <View style={{flex: 1, flexDirection: 'column', flexWrap: 'wrap', paddingTop: 25}}>
                                <View style={{height: 350}}>
                                    <Text style={{fontSize: 18, fontWeight: '700', textAlign: 'center'}}>
                                        <MaterialCommunityIcons name="gift" size={24} color="#000" /> POROMOSIYO
                                    </Text>
                                    <Text style={{paddingTop: 10,fontWeight: '500',fontSize: 16}}>
                                        Gushyiraho uburyo bworoshye bwo kwegereza abahinzi inyongeramusaruro
                                    </Text>

                                    

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Radio Advert
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Gutera amarangi amaduka
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Ubufasha nyuma yo kugura
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Field Extension services
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Free USSD application access for Farmer on Plant Health
                                    </Text>
                                    
                                </View>

                                <View style={{height: 300}}>
                                    <Text style={{fontSize: 18, fontWeight: '700', textAlign: 'center', textTransform: 'uppercase'}}>
                                        <MaterialCommunityIcons name="school" size={24} color="#000" />Amahugurwa kuri ba AGRO-DEALERs
                                    </Text>
                                    <Text style={{paddingTop: 10,fontWeight: '500',fontSize: 16}}>
                                        Guhugura abakora ubuhinzi ubuzima bwibihingwa no kubisesengura mu turere twabo
                                    </Text>

                                    

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Two Days Course
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Diagnostic Manual
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Follow-up Support
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Android SmartPhone Application
                                    </Text>
                                    
                                </View>

                                <View style={{height: 250}}>
                                    <Text style={{fontSize: 18, fontWeight: '700', textAlign: 'center'}}>
                                        <MaterialCommunityIcons name="door-open" size={24} color="#000" /> INPUT SUPPLY
                                    </Text>
                                    <Text style={{paddingTop: 10,fontWeight: '500',fontSize: 16}}>
                                        Import high-quality agricultural inputs customized for plant health issues in Rwanda
                                    </Text>

                                    

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Direct from manufacturer
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Appropriate pack sizes
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Delivered to the door
                                    </Text>
                                    
                                </View>
                            </View>
                        </View>
                    </View>


                    : 
                    // English
                    <View style={{flex: 1, fontFamily: "Roboto_500Medium"}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 15}}>
                            <Text style={{fontSize: 25, fontWeight: 'bold'}}>About </Text>
                            <Text style={{fontSize: 25, fontWeight: 'bold',color: '#5d806e'}}>Ingabo Plant Health</Text>
                        </View>

                        <View style={{paddingTop:20, paddingLeft: 10, paddingRight: 10}}>

                            <Text style={{textAlign: 'justify', fontWeight: '500', fontSize: 16}}>
                                Ingabo Plant Health is an enterprise that provides solutions for Rwandan farmers to reduce crop losses, 
                                increase crop yields and increase their household incomes. 
                                We currently operate in all provinces of Rwanda.
                            </Text>
                            <Text style={{textAlign: 'justify', fontWeight: '500', fontSize: 16, paddingTop: 10}}>
                                INGABO provides plant health advice and appropriate treatments 
                                to smallholder farmers through our network of trained village agrodealers.
                                Our mission is to increase the use of appropriate agrochemicals 
                                to reduce losses and increase incomes
                            </Text>
                            <Text style={{textAlign: 'justify', fontWeight: '500', fontSize: 16,paddingTop: 30}}>
                                Ingabo provides the following solutions to rwandan farmers:
                            </Text>

                            <View style={{flex: 1, flexDirection: 'column', flexWrap: 'wrap', paddingTop: 25}}>
                                <View style={{height: 350}}>
                                    <Text style={{fontSize: 18, fontWeight: '700', textAlign: 'center'}}>
                                        <MaterialCommunityIcons name="gift" size={24} color="#000" /> PROMOTION
                                    </Text>
                                    <Text style={{paddingTop: 10,fontWeight: '500',fontSize: 16}}>
                                        Establish convenient distribution networks for farmers to access and use these inputs
                                    </Text>

                                    

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Radio Advert
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Shop front Painted
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        After sell Support
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Field Extension services
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Free USSD application access for Farmer on Plant Health
                                    </Text>
                                    
                                </View>

                                <View style={{height: 300}}>
                                    <Text style={{fontSize: 18, fontWeight: '700', textAlign: 'center'}}>
                                        <MaterialCommunityIcons name="school" size={24} color="#000" /> AGRO-DEALER TRAINING
                                    </Text>
                                    <Text style={{paddingTop: 10,fontWeight: '500',fontSize: 16}}>
                                        Train village level agricultural practitioners in plant health diagnosis and analysis
                                    </Text>

                                    

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Two Days Course
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Diagnostic Manual
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Follow-up Support
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Android SmartPhone Application
                                    </Text>
                                    
                                </View>

                                <View style={{height: 250}}>
                                    <Text style={{fontSize: 18, fontWeight: '700', textAlign: 'center'}}>
                                        <MaterialCommunityIcons name="door-open" size={24} color="#000" /> INPUT SUPPLY
                                    </Text>
                                    <Text style={{paddingTop: 10,fontWeight: '500',fontSize: 16}}>
                                        Import high-quality agricultural inputs customized for plant health issues in Rwanda
                                    </Text>

                                    

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Direct from manufacturer
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Appropriate pack sizes
                                    </Text>
                                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 15}} />

                                    <Text style={{paddingTop: 10,fontWeight: 'bold',fontSize: 16, textAlign: 'center'}}>
                                        Delivered to the door
                                    </Text>
                                    
                                </View>
                            </View>
                        </View>
                    </View>
                }
                

            </ScrollView>
        </SafeAreaView>
    );
}
}