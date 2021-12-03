import React, { useState, useEffect } from 'react';
import { View, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { url } from '../Utils'


export default function Home({ navigation, route }) {
  const [Donator, onChangeDonator] = useState(route.params.route)
  const [roleModal, setRoleModal] = useState(false);
  const [siteModal, setSiteModal] = useState(false);
  const [selectedSiteDonation, setSelectedSiteDonation] = useState("");
  const [stations, setStations] = useState()

  useEffect(() => {
    GetStationList();
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRoleModal(false)
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setRoleModal(false)
  }, [navigation]);

  const GetStationList = async () => {
    try {
      let result = await fetch(url + "api/all/stations", {
        method: 'GET'
      });
      let data = [...await result.json()];
      setStations(data);
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <SafeAreaView>
      <View style={styles.container_top_text}>
        <TouchableOpacity onPress={() => navigation.navigate("DonatorsLogin")}>
          <View style={styles.button_logout}>
            <Ionicons name="exit-outline" size={24} color="white" />
            <Text style={styles.button_text_exit} >התנתק</Text>
          </View>
        </TouchableOpacity>
        <View >
          <Text style={styles.text_top_user}>{selectedSiteDonation}אתר התרמה:  </Text>
          <Text style={styles.text_top_user}> מחובר כעת {Donator.First_name} {Donator.Last_name} (פארמדיק)</Text>
        </View>
      </View>
      <View style={styles.containr_btn}>
        <TouchableOpacity onPress={() => setRoleModal(true)}>
          <View style={styles.button_normal}>
            <AntDesign name="select1" size={24} color="white" />
            <Text style={styles.button_text} >בחירת עמדה</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSiteModal(true)}>
          <View style={styles.button_normal}>
            <FontAwesome name="exchange" size={24} color="white" />
            <Text style={styles.button_text} >שינוי אתר התרמה</Text>
          </View>
        </TouchableOpacity>
      </View>
      {roleModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={roleModal}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.modalView} >
            <View >
              <Text style={styles.modalText}>{Donator.First_name + " " + Donator.Last_name}</Text>
              <Text style={styles.modalText} >בחר עמדה</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.navigate('UnitOne', { route: Donator })}>
                <Text style={styles.textStyle}>עמדה 1           קבלת תורמים ותשאול</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.navigate('UnitTwo', { route: Donator })}>
                <Text style={styles.textStyle}>עמדה 2           בדיקת לחץ דם והמוגלובין</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => navigation.navigate('UnitThree', { route: Donator })}>
                <Text style={styles.textStyle}>עמדה 3            לקיחת תרומות דם</Text>
              </Pressable>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setRoleModal(!roleModal)}>
              <Text style={styles.textStyle}>סגור</Text>
            </Pressable>
          </View>
        </Modal>
      )}
      {siteModal && (// TODO: add a dropdown to the site modal
        <Modal
          animationType="slide"
          transparent={true}
          visible={siteModal}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.modalView} >
            <View >
              <Text style={styles.modalText} >בחר אתר התרמה {Donator.First_name + " " + Donator.Last_name} : </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setSiteModal(!siteModal)
                  setSiteDonation()
                }}>
                <Text style={styles.textStyle}>בחר</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  containr_btn: {
    alignSelf: 'center',
    marginTop: 35,
    flexDirection: 'row'
  },
  ButtonContainer: {
    flexDirection: 'row'
  },
  container_top_text: {
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  input: {
    height: 40,
    width: 220,
    margin: 14,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button_normal: {
    alignItems: 'center',
    width: 90,
    height: 90,
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  button_text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header_img: {
    marginBottom: 40,
    width: 260,
    height: 75,
    alignSelf: 'center',
    resizeMode: 'stretch'
  },
  //Modal
  modalView: {
    margin: 20,
    backgroundColor: '#757c94',
    borderRadius: 20,
    padding: 25,
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
  list: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 16,
    padding: 28,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: 'grey',
    backgroundColor: "#fcfff9",
    color: "black",
  },
  modal_buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  button: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    padding: 15,
    elevation: 2,

  },
  buttonOpen: {
    backgroundColor: "#F194FF",

  },
  buttonClose: {
    width: 120,
    backgroundColor: "white",
    opacity: 0.8,

  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  text_top_user: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  modalText: {
    color: "black",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold"
  },
  button_logout: {
    alignItems: 'center',
    width: 100,
    margin: 10,
    marginTop: -10,
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#757c94",
    opacity: 0.8,
    shadowColor: 'black',
    shadowRadius: 5,
    flexDirection: 'row'
  },
  button_text_exit: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
});