import React, { Component } from 'react';
import {
    createStackNavigator
} from '@react-navigation/stack';
import PopupExamples from './popups/PopupExamples';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './screen/HomeScreen/HomeScreen';

import CreateNewProfile from './screen/CreateProfile/createNewProfile';
import LoginScreen from './screen/Login/LoginScreen';
import otpScreen from './screen/Login/otpScreen';
import MainSignUpPage from './screen/Login/Signup/MainSignUpPage';
import UploadDocument from './screen/UploadDocuments/UploadDocument';
import Score from './screen/HomeScreen/Score';

import { Icon } from 'native-base';
import Sidebar from './CustomDrawer';
import Disclaimer from './screen/Login/Signup/Disclaimer';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Creating a Stack Navigator
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

let isConnected;

class HomeScreenNavigator extends Component {

    render() {
        // console.log(this.props)
        return (
            <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}
                //drawerType={'permanent'}
                hideStatusBar={false}
                drawerStyle={{
                    backgroundColor: "#fff",
                    width: 240,
                }}
                drawerContentOptions={{
                    activeTintColor: '#6572e4',
                    itemStyle: { marginVertical: 2 },
                }}>
                <Drawer.Screen name="Dashboard" component={HomeScreen}
                    options={{
                        headerShown: false,
                        drawerIcon: ({ focused, color, size }) => (
                            <Icon name="list" style={{ fontsize: size, color: color }} />
                        ),
                        swipeEnabled: false,
                    }} />
                <Drawer.Screen name="DataEntry" component={CreateNewProfile}
                    options={{
                        headerShown: false,
                        drawerIcon: ({ focused, color, size }) => (
                            <Icon name="book" style={{ fontsize: size, color: color }} />
                        ),
                        swipeEnabled: false,
                    }}
                />
            </Drawer.Navigator>
        )
    }
}


class Navigator extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Adding Stack Navigations to the App
        return (
            <Stack.Navigator>
                <Stack.Screen name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                        drawerIcon: ({ focused, color, size }) => (
                            <Icon name="people" style={{ fontsize: size, color: color }} />
                        ),
                        swipeEnabled: false,
                    }} />
                <Stack.Screen name="OTPScreen" options={{ headerShown: false }} component={otpScreen} />
                <Stack.Screen name="Drawer" options={{ headerShown: false }} component={HomeScreenNavigator} />
                <Drawer.Screen name="Disclaimer" options={{ headerShown: false }} component={Disclaimer} />
                <Stack.Screen name="Signup" options={{ headerShown: false }} component={MainSignUpPage} />
                <Stack.Screen name="Dashboard" options={{ headerShown: false }} component={HomeScreen} />
                <Stack.Screen name="DataEntry" options={{ headerShown: false }} component={CreateNewProfile} />
                <Drawer.Screen name="Score" options={{ headerShown: false }} component={Score} />
                <Drawer.Screen name="Upload" options={{ headerShown: false }} component={UploadDocument} />
                <Stack.Screen name="Popups" options={{ headerShown: false }} component={PopupExamples} />
            </Stack.Navigator>
        );
    }
}


export default Navigator;

