import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  Image,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { Card, Button } from 'native-base';
import OTPTextInput from 'react-native-otp-textinput';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
// import * as firebase from 'firebase';
import firebase from '../../database/firebase'
import axios from 'axios';
import styles from '../../GlobalStyling';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function otpScreen(props) {
  const recaptchaVerifier = React.useRef(null);
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const [isLoading, setLoading] = React.useState();
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === 'web'
      ? {
        text:
          'Hi',
      }
      : undefined
  );
  const intToArray = (verificationId) => {
    return String(verificationId).match(/-?\d/g).map(Number)
  }

  const setVerificationCodeAndCloseKeyboard = (text) => {
    setVerificationCode(text);
    if (verificationCode != undefined && verificationCode.length == 5) {
      Keyboard.dismiss()
    }
  }

  const handleClick = async () => {

    setLoading(true);

    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      
      await firebase.auth().signInWithCredential(credential)
      await AsyncStorage.setItem('isLoggedIn', "true")
      props.navigation.navigate('Signup', { activeStep: 3 })

    } catch (err) {

      setLoading(false);
      props.navigation.navigate('OTPScreen')

      showMessage({ text: `Error: ${err.message}`, color: 'red' });
    }
  }

  if (isLoading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    )
  } else {

    return (
      <View style={styles.loginContainer}>
        <View style={styles.leftContainer}>
        </View>
        <View style={styles.rightContainer}>
        </View>
        <View style={{
          flex: 1, position: 'absolute', flexDirection: 'column', alignItems: 'center',
          alignSelf: 'center', top: 90,
        }}>
          <Text style={styles.welcomeText}>
            VERIFICATION</Text>
          <Text style={styles.continueToLoginText}>
            Send Verification code to continue</Text>
        </View>
        <View style={{ position: 'absolute', top: 180, padding: 25, width: '100%' }}>

          <Card style={{ padding: 8, borderRadius: 10 }} bordered>
            <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
            <View style={{ top: 20 }}>
              <Text style={[styles.textButton, { fontSize: 15 }]}>
                Please click send verification code, to send code to your registered mobile number: {props.route.params.phone}
              </Text>
              <Button
                style={{ backgroundColor: '#f48351', margin: 15, width: 250, alignSelf: 'center' }}
                // disabled={!phoneNumber}
                onPress={async () => {
                  try {
                    const phoneProvider = new firebase.auth.PhoneAuthProvider();
                    const verificationId = await phoneProvider.verifyPhoneNumber(
                      props.route.params.phone,
                      recaptchaVerifier.current
                    );
                    setVerificationId(verificationId);
                    Alert.alert('Verification code has been sent to your phone.')
                  } catch (err) {
                    showMessage({ text: `Error: ${err.message}`, color: 'red' });
                  }
                }}
              ><Text style={[styles.buttonText]}>Send Verification Code</Text></Button>
              {/* <Text style={[styles.textButton, { fontSize: 18 }]}>Please enter Verification code</Text> */}
              <OTPTextInput
                height={40}
                width={40}
                // handleTextChange={text => setVerificationCode(text)}
                handleTextChange={text => setVerificationCodeAndCloseKeyboard(text)}
                keyboardType="numeric"
                inputCount={6}
                tintColor="#DCDCDC"
                containerStyle={textInputContainer}
                textInputStyle={[roundedTextInput, { borderRadius: 0, borderWidth: 1 }]}>
              </OTPTextInput>
            </View>
            {message ? (
              <TouchableOpacity
                style={[
                  StyleSheet.absoluteFill,
                  { backgroundColor: 0xffffffee, justifyContent: 'center' },
                ]}
                onPress={() => showMessage(undefined)}>
                <Text
                  style={{
                    color: message.color || 'blue',
                    fontSize: 17,
                    textAlign: 'center',
                    margin: 20,
                  }}>
                  {message.text}
                </Text>
              </TouchableOpacity>
            ) : (
                undefined
              )}

            <Text style={[styles.forgotPassword, { margin: 10 }]}>Didn't get the code? Resend</Text>
          </Card>

          <Button
            style={!verificationCode ? [styles.loginButton, { backgroundColor: '#afafaf' }] : [styles.loginButton]}
            disabled={!verificationId}
            onPress={handleClick.bind(this)}
          ><Text style={styles.buttonText}>Login</Text></Button>

        </View >
      </View >
    );
  }
}
const otpBoxesContainer = {
  flexDirection: 'row'
}
const otpBox = {
  padding: 10,
  marginRight: 10,
  borderWidth: 1,
  borderColor: 'lightGrey',
  height: 45,
  width: 45,
  textAlign: 'center'
}
const textInputContainer = {
  marginBottom: 20,
  // width:'20%'
}
const roundedTextInput = {
  // borderRadius: 10,
  // borderWidth: 4,
}