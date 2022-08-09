import React, { useState, useEffect } from 'react';

import { Image,Modal,Pressable, StyleSheet, Text, View, StatusBar, Platform, SafeAreaView,ScrollView, TouchableOpacity } from 'react-native';

export default function Browser ({navigation}){
    // const { url, name } = route.params;
    const [modalVisible, setModalVisible] = useState(false);


useEffect(()=> {
    setModalVisible(true)
  }, [])


    return(
        <SafeAreaView style={{flex:1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Choose Language</Text>
                        
                        <View style={{fontSize:22 ,paddingTop: 40,paddingBottom: 15, alignItems: 'center'}}>
                            <Text>
                                <Text  style={{fontSize: 18 ,paddingLeft: 15}}>English</Text> 
                                <Text>                                  </Text>
                                <Text style={{fontSize: 18 ,left: 100}}>Kinyarwanda</Text>
                            </Text>
                        </View>
                        {/* <Text>English</Text>
                        <Text>Kinyarwanda</Text> */}
                        {/* <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable> */}
                    </View>
                    </View>
                </Modal>
                {/* <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </Pressable> */}
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: "center"
    }
  });
  