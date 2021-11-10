import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spiner from '../Componentes/Spiner';


const url = "http://proj13.ruppin-tech.co.il/"
var bcrypt = require('bcryptjs');

export default function Registration({ navigation }) {
  const defaultImg = "http://proj13.ruppin-tech.co.il/Assets/DamdiPI4.png"
  const [personalId, onChangeId] = useState();
  const [email, onChangeEmail] = useState();
  const [pass, onChangePass] = useState();
  const [confirmPass, onChangeCPass] = useState();
  const [loading, setLoading] = useState(false);

  componentDidMount = () => {
    this._unsubscribeFocus = this.props.navigation.addListener('focus', (payload) => {
      console.log('will focus', payload);
      this.setState({ stam: 'will focus ' + new Date().getSeconds() });
    });
  }
  componentWillUnmount = () => {
    this._unsubscribeFocus();
  }

  const storeData = async (data) => {
    try {
      var loggedUser = JSON.stringify(data);
      await AsyncStorage.setItem('loggedUser', loggedUser)
    } catch (e) {
      console.error(e)
    }
  }

  const validationInput = () => {
    if (Platform.OS !== 'web') {
      setLoading(true);
    }
    // var emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // var pasRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    // if (PersonalId == null || PersonalId == "" || Email == null || Email == "" || Pass == null || Pass == "" || CPass == null || CPass == "") {
    //   Alert.alert("אנא מלא/י את כל השדות");
    //   console.log('====================================');
    //   console.log("Error, Empty fields");
    //   console.log('====================================');
    //   return
    // }
    // if (!(emailregex.test(Email))) {
    //   Alert.alert("אופס", "האימייל שהוכנס לא חוקי אנא נסה בפורמט הבא: name@example.com")
    //   onChangeEmail("")
    //   return
    // }
    // if (!(pasRegex.test(Pass))) {
    //   Alert.alert("סיסמא לא חוקית", "הסיסמה צריכה להכיל לפחות: 8 תווים , אות גדולה , אות קטנה ,תו , ומספר")
    //   onChangePass("")
    //   return
    // }
    // if (Pass !== CPass) {
    //   Alert.alert("שגיאת סיסמא", "הסיסמאות אינם תואמות, אנא הזן שנית!");
    //   onChangePass("")
    //   onChangeCPass("")
    //   return
    // }
    // else {
    SignUp();
  }


  const GetUserFormDB = async () => {
    try {
      let result_user = await fetch(url + "api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: personalId,
          Email: email
        })
      });
      let user = await result_user.json();
      await storeData(user)
      navigation.navigate("PersonalFormA", { route: user, modalStatus: "info" })
    } catch (error) {
      Alert.alert("בעיה בשרת,משתמש אינו נרשם במערכת, נסה מאוחר יותר", "שגיאה")
    }
  }



  const SignUp = async () => {
    try {
      let salt = bcrypt.genSaltSync(10);
      let saltedHash = bcrypt.hashSync(pass, salt);
      let result_register = await fetch(url + "api/add/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Personal_id: personalId,
          Email: email,
          Salted_hash: saltedHash,
          Profile_img: defaultImg
        })
      })
      let rsponse = await result_register.json()
      if (rsponse == 'User created successfully') {
        GetUserFormDB();
      }
    }
    catch (error) {
      Alert.alert("שגיאת הרשמה", "מצטערים ההרשמה נכשלה אנא נסו מאוחר יותר")
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeId}
              value={personalId}
              placeholder="תעודת זהות"
              maxLength={9}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="אימייל"
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangePass}
              value={pass}
              secureTextEntry={true}
              placeholder="סיסמה"
              maxLength={8}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeCPass}
              secureTextEntry={true}
              value={confirmPass}
              placeholder="אשר סיסמה"
              maxLength={8}
            />
            <TouchableOpacity onPress={() => {
              setLoading(false)
              validationInput()
            }}>
              <View style={styles.button_normal}>
                <Text >סיים הרשמה</Text>
              </View>
            </TouchableOpacity>
            {loading && <Spiner loading={loading} />}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    padding: 60,
    flex: 1,
    justifyContent: "center"
  },
  input: {
    height: 40,
    width: 160,
    margin: 12,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
  },
  button_normal: {
    alignItems: 'center',
    margin: 15,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#633689"
  },
});