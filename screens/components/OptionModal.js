import React,{ useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, StatusBar, TouchableWithoutFeedback } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import color from '../layouts/color';
import { Storage } from 'expo-storage'
const KEY = '@@KEY';


export default function OptionModal({visible, onClose, onPressContinue}) {
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
                    <Text style={styles.title} numberOfLines={2}>Dufashe mu isuzuma ry'ibicuruzwa byacu</Text>
                    <View style={styles.optionContainer}>
                        <TouchableWithoutFeedback onPress={onPressContinue}>
                            <Text style={styles.option}>Komeza 
                                <AntDesign name="doubleright" size={14} color={color.APP_PRIMARY} />
                                <AntDesign name="doubleright" size={14} color={color.APP_PRIMARY} />
                                <AntDesign name="doubleright" size={14} color={color.APP_PRIMARY} />
                            </Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={onClose}>
                            <Text style={styles.optiondecline}>Bize nyuma</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={styles.modalBG} />
                </TouchableWithoutFeedback>
            </Modal>
            :
            <Modal animationType='fade' transparent={true} visible={visible}>
                <View style={styles.modal}>
                    <Text style={styles.title} numberOfLines={2}>Help us evaluate our products</Text>
                    <View style={styles.optionContainer}>
                        <TouchableWithoutFeedback onPress={onPressContinue}>
                            <Text style={styles.option}>Continue 
                                <AntDesign name="doubleright" size={14} color={color.APP_PRIMARY} />
                                <AntDesign name="doubleright" size={14} color={color.APP_PRIMARY} />
                                <AntDesign name="doubleright" size={14} color={color.APP_PRIMARY} />
                            </Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={onClose}>
                            <Text style={styles.optiondecline}>Ask me later</Text>
                        </TouchableWithoutFeedback>
                    </View>
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
        position: 'absolute',
        top: '30%',
        right: 15,
        left: 15,
        backgroundColor: color.APP_BG,
        borderRadius: 20,
        zIndex: 100
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        paddingBottom: 0,
        color: color.FONT_MEDIUM
    },
    optionContainer: {
        padding: 20
    },
    option: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.APP_PRIMARY,
        paddingVertical: 10,
        letterSpacing: 1,
        paddingLeft: 30
    },
    optiondecline: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.DANGER,
        paddingVertical: 10,
        letterSpacing: 1,
        paddingLeft: 30
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