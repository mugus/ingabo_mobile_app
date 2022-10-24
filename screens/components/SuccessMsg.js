import React,{ useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, StatusBar, TouchableWithoutFeedback, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import color from '../layouts/color';
import { Storage } from 'expo-storage'
const KEY = '@@KEY';


export default function SuccessMsg({visible, onClose, navigation}) {
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
console.log("Modal lang", lang);
    useEffect(()=> {
        getLang()
      }, [])



    return(
        <>
            {
                 lang === 1 ?
                 <Modal animationType='fade' transparent={true} visible={visible}>
                    <View style={styles.modal}>
                        <Image source={require('../../assets/thanksms.png')} style={styles.image}/>
                        <TouchableWithoutFeedback onPress={onClose}>
                            <Text style={styles.ModalLink}>Subira Inyuma</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <TouchableWithoutFeedback onPress={onClose}>
                        <View style={styles.modalBG} />
                    </TouchableWithoutFeedback>
                </Modal>
                :
                <Modal animationType='fade' transparent={true} visible={visible}>
                    <View style={styles.modal}>
                        <Image source={require('../../assets/thanksms.png')} style={styles.image}/>
                        <TouchableWithoutFeedback onPress={onClose}>
                            <Text style={styles.ModalLink}>Back Home</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <TouchableWithoutFeedback onPress={onClose}>
                        <View style={styles.modalBG} />
                    </TouchableWithoutFeedback>
                </Modal>
            }
        </>

    )

}


const styles = StyleSheet.create({
    modal: {
        position: 'relative',
        top: '20%',
        alignContent: 'center',
        alignSelf: 'center',
        backgroundColor: color.APP_BG,
        borderRadius: 20,
        zIndex: 100
    },
    image:{
        width: Dimensions.get('window').width - 20,
        height:  Dimensions.get('window').height/2
    },
    ModalLink: {
        alignContent: 'center',
        alignSelf: 'center',
        fontSize: 17,
        color: color.APP_PRIMARY,
        padding: 10
    },
    modalBG: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: color.MODAL_BG 
    }
})