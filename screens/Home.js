import react, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, SafeAreaView,ScrollView, Button,TouchableOpacity,  StatusBar, requireNativeComponent  } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Svg, { Rect } from 'react-native-svg';
// import ContentLoader from 'react-native-masked-loader';
// import { Linking, Platform } from "react-native-web";

// function getMaskedElement() {
//     return (
//         <ScrollView>
//             <View style={{flex: 1, flexDirection: 'row',top: 10}}>
//                 <View style={{height:150, margin: 7,backgroundColor: "#f0eff0", width:190, alignItems: 'center'}} />
//                 <View style={{height:150, margin: 7,backgroundColor: "#f0eff0", width:190, alignItems: 'center'}} />
//             </View>
//             <View style={{flex: 1, flexDirection: 'row',top: 10}}>
//                 <View style={{height:150, margin: 7,backgroundColor: "#f0eff0", width:190, alignItems: 'center'}} />
//                 <View style={{height:150, margin: 7,backgroundColor: "#f0eff0", width:190, alignItems: 'center'}} />
//             </View>

//             <View style={{top: 120, alignItems: 'center'}}>
//                 <Svg height={250} width="100%" fill={'black'}>
//                 <Rect x="140" y="0" rx="8" ry="8" width="30%" height="16" />
//                 <Rect x="0" y="30" rx="9" ry="9" width="100%" height="50" />
//                 </Svg>
//             </View>

      
//         </ScrollView>
//     );
//   }


export default function Home({route,navigation}){
    // const { lang, name } = route.params;
    const [isReady, setisready] = useState(false);

    const OpenStore = async () => {
        navigation.navigate(
            'Browser',
            { url: 'https://ingabo.store' }
        )
    }
    useEffect(()=>{
        let timer = setTimeout( ()=> setisready(true), 2000);
        return () => {
            clearTimeout(timer);
        };
    }, []);
    console.log("Language", lang);

    if(lang === 'kinya'){
        console.log("Kinya");
    }else{
        console.log("Eng");
    }
    // const MaskedElement = getMaskedElement();
    return(
        <SafeAreaView>
        {/* {
            isReady ? ( */}
            <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>
                <ScrollView>
                    
                    <View style={{flex: 1, flexDirection: 'row',top: 10}}>
    
                        <TouchableOpacity onPress={()=> navigation.navigate('ProductScreen', { name: 'ProductScreen' })}>
                            <View style={{padding: 40,height:150, margin: 5,backgroundColor: "#f0eff0", width:190, alignItems: 'center'}}>
                                <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 14}}>Ingabo Product</Text>
                                <MaterialCommunityIcons name="clipboard-list-outline" size={50} color="#347464" />
                            </View>
                        </TouchableOpacity>
    
                        <TouchableOpacity onPress={ OpenStore }>
                            <View style={{padding: 40,height:150, margin: 5,backgroundColor: "#f0eff0", width:190, alignItems: 'center'}}>
                                <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 14}}>Visit Shop</Text>
                                <MaterialCommunityIcons name="cart-arrow-right" size={50} color="#347464" />
                            </View>
                        </TouchableOpacity>
    
                    </View>
    
                    <View style={{flex: 1, flexDirection: 'row', top: 10}}>
                        <TouchableOpacity onPress={()=> navigation.navigate('SafetyScreen', { name: 'SafetyScreen' })}>
                            <View style={{padding: 40,height:150, margin: 5,backgroundColor: "#f0eff0", width:190, alignItems: 'center'}}>
                                <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 14}}>Safety Measures</Text>
                                <MaterialCommunityIcons name="safe-square" size={50} color="#347464" />
                            </View>
                        </TouchableOpacity>
    
    
                        <TouchableOpacity onPress={()=> navigation.navigate('CropsScreen', { name: 'CropsScreen' })}>
                            <View style={{padding: 40,height:150, margin: 5,backgroundColor: "#f0eff0", width:190, alignItems: 'center'}}>
                                <Text style={{color: '#347464', fontWeight: 'bold', fontSize: 14}}>Crops</Text>
                                <MaterialCommunityIcons name="bee-flower" size={50} color="#347464" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    
    
    
                    <View style={{top: 70, alignItems: 'center'}}>
                        <Text style={{color: '#347464', fontSize: 16, fontWeight: 'bold'}}>Our Partners</Text>
                    </View>
                    <ScrollView horizontal={true} style={{top: 100, left: 11, height: 250}}>
                        <Image  source={require('../assets/bk.jpg')} style={{width: 250,height: 60}} /> 
                        <Image  source={require('../assets/bk.jpg')} style={{width: 250,height: 60, left: 10, right: 10}} /> 
                        <Image  source={require('../assets/bk.jpg')} style={{width: 250,height: 60, left: 10, right: 10}} /> 
                    </ScrollView>
                </ScrollView>
            {/* ) : (
                <ContentLoader MaskedElement={MaskedElement} />
                
            )
        } */}
        </SafeAreaView>
        
    );
}