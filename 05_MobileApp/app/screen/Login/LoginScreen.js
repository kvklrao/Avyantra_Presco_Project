import React, { Component, createRef, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator, Image, Switch } from 'react-native';
import { Label, Card, Button, Icon } from 'native-base';
import styles from '../../GlobalStyling';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";


export default class LoginScreen extends Component {

    constructor() {
        super();
        this.state = {
            usename: '',
            password: '',
            isLoading: false,
            contact_number: '',
            code: null,
            showPassword: true,
        }
        this.toggleSwitch = this.toggleSwitch.bind(this);
    }

    toggleSwitch() {
        this.setState({ showPassword: !this.state.showPassword });
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }
    async componentDidMount() {
        let loginStatus=await AsyncStorage.getItem('isLoggedIn')
        this.props.navigation.navigate(loginStatus == "true" ? 'Drawer':'LoginScreen')
    }
    userLogin = async () => {

        if (this.state.usename === '' && this.state.password === '') {
            Alert.alert('Enter details to signin!')
        } else {
            let loginParams =  { 
                username: this.state.usename,
                password: this.state.password 
            }
            
            let response;

            try{
                response = await axios.post(Constants.manifest.extra.URL+ '/login', loginParams);
            }
            catch(e){
                Alert.alert("Unable to login. Network Error.")
                return;
            }

            if (response && response.data.error != true) {
                
                let phone = '+91' + String(response.data.response.phone).substr(-10);

                await AsyncStorage.setItem('userId', JSON.stringify(response.data.response.user_id));
                await AsyncStorage.setItem('username', JSON.stringify(response.data.response.username));

                if (response.data.response.hospital_id == "" || response.data.response.hospital_id == null
                || response.data.response.hospital_id == undefined)  {
                    Alert.alert("Only ASHA users should login, Please contact us for further details.")
                   return;
                } 

                else {
                                        
                    await AsyncStorage.setItem('hospitalId', JSON.stringify(response.data.response.hospital_id));
                    this.props.navigation.navigate('OTPScreen', { phone: phone, username: '', password: '' })
                }
            } 
            else {
                Alert.alert(response.data.message)
            }
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (
            <KeyboardAwareScrollView>
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
                            WELCOME!</Text>
                        <Text style={styles.continueToLoginText}>
                            Login to continue</Text>
                    </View>
                    <View style={{ position: 'absolute', top: 180, padding: 25, width: '100%' }}>

                        <Card style={{ padding: 20, borderRadius: 10 }} bordered>
                            <Label style={styles.titleStyle}>Username</Label>
                            <TextInput
                                style={styles.inputStyle}
                                // placeholder="usename"
                                underlineColorAndroid="transparent"
                                value={this.state.usename}
                                onChangeText={(val) => this.updateInputVal(val, 'usename')}
                            />
                            <Label style={styles.titleStyle}>Password</Label>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={[styles.inputStylePassword]}
                                    // placeholder="Password"
                                    underlineColorAndroid="transparent"
                                    value={this.state.password}
                                    onChangeText={(val) => this.updateInputVal(val, 'password')}
                                    maxLength={15}
                                    secureTextEntry={this.state.showPassword}
                                />
                                
                                <Switch
                                    onValueChange={this.toggleSwitch}
                                    value={!this.state.showPassword}
                                />
                            </View>
                            <Text style={styles.forgotPassword}>Forgot Password?</Text>
                        </Card>

                        <Button
                            style={[styles.loginButton]}
                            onPress={() => this.userLogin()}
                        ><Text style={styles.buttonText}>Login</Text></Button>

                        <Text
                            style={styles.loginText}
                            onPress={() => this.props.navigation.navigate('Disclaimer')}>
                            Don't have an account?{"\n"}
                                Signup
                            </Text>
                    </View >
                </View >
            </KeyboardAwareScrollView>

        );
    }
}
