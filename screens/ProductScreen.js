import React, { useState, useEffect } from 'react';
import { Image, View, SafeAreaView,Linking, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Dimensions, TextInput } from 'react-native';
import { useFonts,Roboto_500Medium } from '@expo-google-fonts/roboto';
import { SpeedDial, Input, Icon, BottomSheet, Button, Text  } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Storage } from 'expo-storage'
const KEY = '@@KEY';
import axios from 'axios';
// const width = '47%';
const width = Dimensions.get('window').width / 2 - 15;


export default function ProductScreen({navigation}){
    let [fontsLoaded] = useFonts({Roboto_500Medium});
    const [product, setProduct] = useState([]);
    const [ categoryIndex, setCategoryIndex ] = React.useState(0);
    const [ isloading, setIsloading ] = useState(true);
    const [productkin, setProductkin] = useState([]);
    const [producteng, setProducteng] = useState([]);
    const [productsearch, setProductsearch] = useState([]);
    const [lang, setLang] = useState("");
    
    const [open, setOpen] = React.useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const [fullname, setFullname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const [searchkey, setSearchkey] = useState("");

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


    const KinyaCategory = [
        "All",
        "Fungicide",
        "Ifumbire",
        "Imiti ihungira",
        "Imiti yica udukoko",
    ];
    const EngCategory = [
        "All",
        "Fungicide",
        "Fertilizer",
        "Pesticide",
        "Seed Coating"
    ];
    
const handleSearch = async() => {
    // alert("Ready: "+searchkey)
    await axios.get(`http://197.243.14.102:4000/api/v1/products/search/${lang}/${searchkey}`).then(res => {
        setProductkin(res.data.products);
        setProducteng(res.data.products);
        setProductsearch(res.data.products)
        setIsloading(false);
        // setLang(language)
        producteng ? setisready(false) : setisready(true)
        productkin ? setisready(false) : setisready(true)
        }).catch(err=>{
            console.log(err);
        })
        // Keyboard.dismiss()
    }

// productkin.length == 0 ? alert("No Data") :  alert("Data") 



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
        setProducteng(res.data.products);
        // setLang(language)
        setIsloading(false);
        producteng ? setisready(true) : setisready(false)
            console.log("products English");
            // console.log("products", res.data.products);
        }).catch(err=>{
            console.log(err);
        })
}


const OpenStore = async () => {
    await Linking.openURL('https://ingabo.store');
}


const handleContactTeam = async () => {
    let sms = '';
    lang === 1 ? sms = `Message from Ingabo App!\n\nHello \nNitwa is ${fullname} ntuye ${address}.\n${message}.\nMwamvugisha kuri ${phone}`: sms = `Message from Ingabo App!\n\nHello \nMy name is ${fullname} from ${address}.\n${message}\nContact me on ${phone}`
    // let sms = `Hello \nMy name is ${fullname} from ${address}.\n${message}`
    // console.log("fullname:" , data)
    const link = `whatsapp://send?text=${sms}&phone=+250787265587`;
    Linking.openURL(link).then((data) => {
        console.log('WhatsApp Opened');
        }).catch(() => {
        lang === 1 ?
        alert('Ntago WhatsApp Igaragara muri Telefoni yawe! Duhamagare kuri +250787265587')
        :
        alert('Make sure WhatsApp installed on your device and try again! Or Call +250787265587')

        });
    setIsVisible(false)
}


    useEffect(()=> {
        getLang()
        getKinyaProducts()
        getEngProducts()
        // SortCategory()
      }, [])


    console.log("Lang: ",lang);
if (!fontsLoaded) {
    return <><Text style={{fontFamily: 'Roboto_500Medium'}}>Loading ...</Text></>;
} else {
    return(
        <SafeAreaView>
            <StatusBar backgroundColor = "#fff" barStyle = "dark-content" hidden = {false} translucent = {true}/>

            {/* <View style={style.header}>
                <View>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Welcome to</Text>
                    <Text style={{fontSize: 25, color: '#347464', fontWeight: 'bold'}}>
                        Plant Health Products
                    </Text>
                </View>
            </View> */}
            <View style={{padding: 10, flexDirection: 'row'}}>
                <View style={style.searchContainer}>
                    <Icon name="search" size={20} style={{marginLeft: 20}} />
                    <TextInput placeholder="Search" onChangeText={newText => setSearchkey(newText)} defaultValue={searchkey} style={style.input} />
                </View>
                <TouchableOpacity onPress={handleSearch} style={style.sortBtn}>
                    <Icon name="search" size={25} color="#fff" />
                </TouchableOpacity>
            </View>
            {lang === 1 ?
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} automaticallyAdjustContentInsets={true} style={{flexDirection: 'row', paddingLeft:5,marginTop: 10,marginBottom: 10}}>
                        {
                            KinyaCategory.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.8}
                                    // onPress={
                                    //     SortCategory(index)
                                    // }
                                    onPress={() => 
                                        setCategoryIndex(index)
                                        // console.log("Category", item)
                                    }
                                    >
                                    <Text
                                    style={[
                                        style.TextCategory,
                                        categoryIndex === index && style.categoryTextSelected,
                                    ]}>
                                    {item}
                                    </Text>
                                </TouchableOpacity>
                                ))}
                        </ScrollView>
                :
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} automaticallyAdjustContentInsets={true} style={{flexDirection: 'row', paddingLeft:5,marginTop: 10,marginBottom: 10}}>
                {
                    EngCategory.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.8}
                            onPress={() => setCategoryIndex(index)}
                            >
                            <Text
                            style={[
                                style.TextCategory,
                                categoryIndex === index && style.categoryTextSelected,
                            ]}>
                            {item}
                            </Text>
                        </TouchableOpacity>
                        ))}
                </ScrollView>
            }



            {
                lang === 1 ?
            <ScrollView>
                {
                isloading ? (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text style={{ fontSize: 18, padding: 20, fontWeight: 'bold'}}>Birimo gukorwa ... </Text></View> ):
                (
                 
                        <View style={{flex: 1, flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'space-around', top: 5,paddingTop: 5, paddingBottom: 100,  }}>
                            {
                                productkin.map((product)=>{
                                    return (

                                        <TouchableOpacity key={product.product_id} style={{padding: 10,height:250,borderRadius: 10, margin: 5,backgroundColor: "#edefea", width:width}} onPress={()=> navigation.navigate('ProductDetails', {product_id: product.product_id, name: 'ProductDetails' })}>
                                            <View styles={{padding: 10, alignItems: 'center'}}>
                                                <Image source={{uri: `http://197.243.14.102:4000/uploads/${product.image}`}} style={{ borderRadius: 5,width: 150, height: 170}} />
                                                <Text style={{color: '#000', fontWeight: 'bold',paddingLeft:10,paddingTop:10, fontSize: 13, textTransform: 'uppercase',fontFamily: 'Roboto_500Medium'}}>{product.name}</Text>
                                                <Text style={{color: '#000', fontWeight: 'bold',paddingLeft:10, fontSize: 10, textTransform: 'capitalize',fontFamily: 'Roboto_500Medium'}}>{product.category}</Text>
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
                   
                        <View style={{flex: 1, flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'space-around', top: 5,paddingTop: 5, paddingBottom: 100}}>
                            {
                                producteng.map((product)=>{
                                    return (

                                        <TouchableOpacity key={product.product_id} style={{padding: 20,height:250,borderRadius: 10, margin: 5,backgroundColor: "#edefea", width:width}} onPress={()=> navigation.navigate('ProductDetails', {product_id: product.product_id, name: 'ProductDetails' })}>
                                            <View styles={{padding: 10, alignItems: 'center'}}>
                                                <Image source={{uri: `http://197.243.14.102:4000/uploads/${product.image}`}} style={{ borderRadius: 5,width: 150, height: 170}} />
                                                <Text style={{color: '#000', fontWeight: 'bold',paddingLeft:10,paddingTop:10, fontSize: 13, textTransform: 'uppercase',fontFamily: 'Roboto_500Medium'}}>{product.name}</Text>
                                                <Text style={{color: '#000', fontWeight: 'bold',paddingLeft:10, fontSize: 10, textTransform: 'capitalize',fontFamily: 'Roboto_500Medium'}}>{product.category}</Text>
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
            

       <BottomSheet modalProps={{}} isVisible={isVisible}>
    <ScrollView style={{backgroundColor:"#edefea"}}>
            
        <View style={{flex: 1, flexDirection: 'column', paddingTop: 10}}>
            <Text style={{fontSize: 17, padding: 10,textAlign: 'center',textTransform: 'uppercase', fontWeight: 'bold',color: '#347464', fontFamily: 'Roboto_500Medium'}}>Contact Sales Team</Text>
            {/* <Input placeholder='Add Full Names' value={fullname} onChange={e => setFullname(e.target.value)} leftIcon={ <MaterialCommunityIcons  name='account-cancel' size={24} color='black' /> } /> */}
            <Input placeholder='Add Full Names' onChangeText={(value) => setFullname(value)} leftIcon={ <MaterialCommunityIcons  name='account-cancel' size={24} color='black' /> } />
            <Input placeholder='Add Address' value={address} onChangeText={(value) => setAddress(value)} leftIcon={ <Icon  name='map' size={24} color='black' /> } />
            <Input keyboardType="numeric" placeholder='Add Phone' leftIcon={ <Icon  name='phone' size={24} color='black' /> } value={phone} onChangeText={(value) => setPhone(value)} />
            <Input multiline numberOfLines={5} placeholder='Add Message' leftIcon={ <Icon  name='mail' size={24} color='black' /> } onChangeText={(value) => setMessage(value)} />
            {/* <input  type='text' value={fullname} onChange={(e) => setFullname(e.target.value)}/> */}
            {/* <TextInput  value={fullname} onChange={(e) => setFullname(e.target.value)}/> */}
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                    <Button 
                        type="submit"
                    onPress={handleContactTeam} 
                    buttonStyle={{
                        backgroundColor: '#347464',
                        borderWidth: 1,
                        color: '#fff',
                        borderColor: '#347464',
                        borderRadius: 5,
                    }}><MaterialCommunityIcons name='whatsapp' size={24} color="#fff" /></Button>
                </View>
                <View style={{flex: 0.7}}>
                    <Button 
                    onPress={() => setIsVisible(false)} 
                    buttonStyle={{
                        backgroundColor: 'red',
                        borderWidth: 1,
                        borderColor: '#347464',
                        borderRadius: 5,
                    }}><MaterialCommunityIcons name='cancel' size={24} color="#fff" /></Button>
                </View>
            </View>

        </View>
    </ScrollView>
    
        
        
</BottomSheet>

            {
                lang === 1 ?
                <SpeedDial
                    isOpen={open}
                    icon={<MaterialCommunityIcons name='send-circle-outline' size={28} color="#347464"/>}
                    openIcon={{ name: 'close', color: '#fff' }}
                    onOpen={() => setOpen(!open)}
                    onClose={() => setOpen(!open)}
                >
                    <SpeedDial.Action
                    icon={{ name: 'shopping-cart', color: '#fff' }}
                    title="Sura iguriro"
                    onPress={OpenStore}
                    />
                    <SpeedDial.Action
                    icon={<MaterialCommunityIcons name='whatsapp' size={24} color="#fff" />}
                    title="Vugisha uwagufasha"
                        onPress={() => setIsVisible(true)}
                    // onPress={()=> navigation.navigate('ContactSalesTeam', {name: 'ContactSalesTeam' })}
                    />
                </SpeedDial>
                :
                <SpeedDial
                    isOpen={open}
                    icon={<MaterialCommunityIcons name='send-circle-outline' size={28} color="#347464" />}
                    openIcon={{ name: 'close', color: '#fff' }}
                    onOpen={() => setOpen(!open)}
                    onClose={() => setOpen(!open)}
                >
                    <SpeedDial.Action
                    icon={{ name: 'shopping-cart', color: '#fff' }}
                    title="Visit Webshop"
                    onPress={OpenStore}
                    />
                    <SpeedDial.Action
                    icon={<MaterialCommunityIcons name='whatsapp' size={24} color="#fff" />}
                    title="Contact sales team"
                        onPress={() => setIsVisible(true)}
                    // onPress={()=> navigation.navigate('ContactSalesTeam', {name: 'ContactSalesTeam' })}
                    />
                </SpeedDial>
            }

            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    categoryContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 20,
        justifyContent : 'space-between'
    },
    categoryText: {
        fontSize: 16,
        color: "black",
        fontWeight: "bold"
    },
    categorySelectedText: {
        color: "#347464",
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderColor: "#fff"
    },
    header: {
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchContainer: {
    height: 35,
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    },
    sortBtn: {
        marginLeft: 10,
        height: 35,
        width: 50,
        backgroundColor: "#347464",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10
      },

    input: {
    fontSize: 13,
    fontWeight: 'bold',
    flex: 1,
    color: "#000",
    marginLeft: 20
    },
    TextCategory:{
        fontSize: 15,
        textTransform: 'uppercase',
        textDecorationColor: '#347464',
        // textDecorationLine: 'underline',
        paddingLeft:10,
        paddingTop: 5,
        paddingRight: 10,
        height: 30,
        color: "black",
        fontWeight: "bold", 
        // backgroundColor:"gray",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
categoryTextSelected: {
    color: '#347464',
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: '#347464',
    },
})