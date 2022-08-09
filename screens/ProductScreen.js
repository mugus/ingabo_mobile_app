import React, { useState, useEffect } from 'react';
import { Image, View, SafeAreaView,Linking, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useFonts,Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Text, Card, Button, Icon } from '@rneui/themed';
import { Storage } from 'expo-storage'
const KEY = '@@KEY';
import axios from 'axios';
const width = '47%';


export default function ProductScreen({navigation}){
    let [fontsLoaded] = useFonts({Roboto_500Medium});
    const [product, setProduct] = useState([]);
    const [ isloading, setIsloading ] = useState(true);
    const [productkin, setProductkin] = useState([]);
    const [producteng, setPriducteng] = useState([]);
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

const getKinyaProducts = () => {
    axios.get('http://197.243.14.102:4000/api/v1/products/kin').then(res => {
        setProductkin(res.data.products);
        setIsloading(false);
        // setLang(language)
        productkin ? setisready(true) : setisready(false)
            console.log("Kinya products");
            // console.log("products", res.data.products);
        }).catch(err=>{
            console.log(err);
        })
}
const getEngProducts = () => {
    axios.get('http://197.243.14.102:4000/api/v1/products/en').then(res => {
        setPriducteng(res.data.products);
        // setLang(language)
        setIsloading(false);
        producteng ? setisready(true) : setisready(false)
            console.log("products English");
            // console.log("products", res.data.products);
        }).catch(err=>{
            console.log(err);
        })
}


    useEffect(()=> {
        getLang()
        getKinyaProducts()
        getEngProducts()
      }, [])


    console.log("Lang: ",lang);
if (!fontsLoaded) {
    return <><Text style={{fontFamily: 'Roboto_500Medium'}}>Loading ...</Text></>;
} else {
    return(
        <SafeAreaView>
            <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>

            {
                lang === 1 ?
            <ScrollView>
                {
                isloading ? (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text style={{ fontSize: 18, padding: 20, fontWeight: 'bold'}}>Birimo gukorwa ... </Text></View> ):
                (
                        <View style={{flex: 1, flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'space-around', top: 5,paddingTop: 10, paddingBottom: 10,  }}>
                            {
                                productkin.map((product)=>{
                                    return (

                                        <TouchableOpacity key={product.product_id} style={{padding: 10,height:250,borderRadius: 10, margin: 5,backgroundColor: "#edefea", width:width}} onPress={()=> navigation.navigate('ProductDetails', {product_id: product.product_id, name: 'ProductDetails' })}>
                                            <View styles={{padding: 10, alignItems: 'center'}}>
                                                <Image source={{uri: `http://197.243.14.102:4000/uploads/${product.image}`}} style={{ borderRadius: 5,width: 150, height: 170}} />
                                                <Text style={{color: '#000', fontWeight: 'bold',padding:10, fontSize: 13, textTransform: 'uppercase',fontFamily: 'Roboto_500Medium'}}>{product.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        
           
                                    )
                                })
                            }
                            
                        </View>
                        
                        )
                    } 
            </ScrollView>
                :

            <ScrollView>
                {
                isloading ? (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text style={{ fontSize: 18, padding: 20, fontWeight: 'bold'}}>Loading ... </Text></View> ):
                (
                        <View style={{flex: 1, flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'space-around', top: 5,paddingTop: 10, paddingBottom: 10,  }}>
                            {
                                producteng.map((product)=>{
                                    return (

                                        <TouchableOpacity key={product.product_id} style={{padding: 20,height:250,borderRadius: 10, margin: 5,backgroundColor: "#edefea", width:width}} onPress={()=> navigation.navigate('ProductDetails', {product_id: product.product_id, name: 'ProductDetails' })}>
                                            <View styles={{padding: 10, alignItems: 'center'}}>
                                                <Image source={{uri: `http://197.243.14.102:4000/uploads/${product.image}`}} style={{ borderRadius: 5,width: 150, height: 170}} />
                                                <Text style={{color: '#000', fontWeight: 'bold',padding:10, fontSize: 13, textTransform: 'uppercase',textAlign: 'center' ,fontFamily: 'Roboto_500Medium'}}>{product.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        
           
                                    )
                                })
                            }
                            
                        </View>
                        
                        )
                    } 
            </ScrollView>
            }
            
            
            </SafeAreaView>
        );
    }
}