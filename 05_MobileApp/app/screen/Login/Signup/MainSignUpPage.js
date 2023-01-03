import React, { Component, createRef, useRef } from 'react';
import {
    StyleSheet, Text, View, TextInput, Alert, ActivityIndicator,
    Dimensions, Image, ScrollView, Picker, Linking, TouchableOpacity
} from 'react-native';
import firebase from './../../../database/firebase';
import styles from './../../../GlobalStyling';
import axios from 'axios';
import { Label, Segment, Card, CardItem, Button, Body, Content, Container, Icon, Item, Input } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Constants from "expo-constants";

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const buttonTextStyle1 = {
    backgroundColor: '#f48351',
    //border: 'none',
    color: 'white',
    padding: 10,
    left: -32,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 16,
    width: 130,
    marginBottom: 80,
    borderRadius: 5
};
const buttonTextStyle2 = {
    backgroundColor: '#f48351',
    // border: 'none',
    color: 'white',
    padding: 10,
    left: 32,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
    width: 130,
    marginBottom: 80,
    borderRadius: 5,
};
const buttonTextStyle0 = {
    backgroundColor: '#f48351',
    // border: 'none',
    color: 'white',
    padding: 10,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 16,
    width: 130,
    marginBottom: 90,
    marginRight: 55,
    borderRadius: 5,
};


const progressStepStyle = {
    nextBtnText: 'Continue',
    previousBtnText: 'Back',
    finishBtnText: 'Done'
}

/***
 * 
 * Global image variable.
 * 
 */
let img = null;
/**
 * 
 * End.
 * 
 */

export default class MainSignUpPage extends Component {

    constructor() {

        super();

        this.state = {
            // main signup page
            progressStepThreeSubSteps: 1,
            enableNext1: true,

            // signup first step
            usename: '',
            password: '',
            email_address: '',

            contact_number: '',
            errors: false,

            //signup second step
            profession: '',
            instituion: '',
            type_of_institution: 'Government',
            location: '',
            identity: '',
            instituionBt1: '#eaeaea',
            instituionBt2: 'white',

            imageSource: null,
            hasCameraPermission: null,
            isLoading: false,
            tag: 'Loading',
            uploaded: false,
            stats: 'uploading',
            enableNext2: true,

            //signup third step
            enableNext3: true,
            userIdCreated: false,

            activeStep: 0,
            uri: null
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    componentDidMount() {
        this._requestCameraPermission();
    }

    /**
     * Validations and signup -first step
     */
    validation = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email_address) === false) {
            Alert.alert('Enter valid email id')
        } else {
            const reg1 = /^[0]?[789]\d{9}$/;
            if (reg1.test(this.state.contact_number) === false) {
                Alert.alert('Enter valid contact number')
            } else {
                if (this.state.usename == "" || this.state.usename.length < 6) {
                    Alert.alert('Username should have minimum 6 characters')
                } else {
                    if (this.state.password == "" || this.state.password.length < 6) {
                        Alert.alert('Password should have minimum 6 characters')
                    }
                    this.userExistsCheck()
                }
            }
        }
    }

    userExistsCheck = async () => {

        let loginParams = {
            username: this.state.usename,
            password: this.state.password,
        };

        try{
            let response = await axios.post(Constants.manifest.extra.URL+ '/login', loginParams);

            if (response.data.status == 200) {
                Alert.alert("username or password already exists")

            } else {
                this.setState({ enableNext1: false, activeStep: 1 })
            }
        }
        catch(err){
            Alert.alert('Network error. Please ensure that you have a stable data connection. Unable to continue.')
        }
    }

    goToBeginning = () =>{

        this.setState({
            uploaded: false, enableNext1: true, enableNext2: true,
        })

        img = null;
        image_url = null;
        
        this.setState({activeStep: 0 })
    }

    goToStepThree = () =>{
        this.setState({ activeStep: 2 })
    }

    userSignup = async () => {

        var data = JSON.stringify({
            "email": this.state.email_address,
            "mobile": this.state.contact_number,
            "username": this.state.usename,
            "password": this.state.password,
            "hospitalType": 7,
            "profession": this.state.profession,
            "institution_name": this.state.institution,
            "institution_type": this.state.type_of_institution,
            "state": this.state.location,
            "user_type_id": 7,
            "isMobile": true
        });

        var config = {
            method: 'post',
            url: Constants.manifest.extra.URL + '/hospital/signUp/aasha',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(async (response) => {

                if (response.data.success) {

                    await this.setState({ 
                        userIdCreated: true, 
                        enableNext2: false,
                        isLoading: false
                    });
                    
                    this.goToStepThree();

                } else {
                    
                    Alert.alert(response.data.message);

                    img = null;
                    this.setState({
                        profession: '',
                        institution: '',
                        type_of_institution: 'Government',
                        location: '',
                        identity: '',
                        instituion: '',
                        instituionBt1: '#eaeaea',
                        instituionBt2: 'white',
                        imageSource: null,
                        uploaded: false,
                        isLoading: false
                    })
                }
            })
            .catch((error) => {
                Alert.alert("Failed to create the account");
                this.setState({ isLoading: false })
            });
    }
    /**
     * Validations and signup -first step end
     */

    /**
     * pic upload part - in second step
     * 
     */

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    pic = async () => {
        const permissions = Permissions.CAMERA_ROLL;
        const { status } = await Permissions.askAsync(permissions);
        if (status === 'granted') {
            let image = await ImagePicker.launchImageLibraryAsync({ mediaTypes: 'Images', quality: 0.75 });
            // if user did not cancel the image picker it should return a uri
            // then upload happens here
            if (!image.cancelled) {
                // upload function
                // this has 3 params (image uri, image height and image width)
                img = image.uri

                try{
                    await this.upload(image.uri, image.height, image.width);
                    this.userSignup();
                    this.setState({ uploadingimage: false,  uploadprogress: 'done' });
                }
                catch(e){
                    console.log(e.message);
                    console.log(JSON.stringify(e));

                    Alert.alert('Error while uploading your identity document');
                    return this.setState({ uploadingimage: false });
                }
            }
            // if image picker was cancelled
            if (image.cancelled) {
                alert('you did not select any image')
                this.setState({ isLoading: false })
            }
            this.setState({ isLoading: true })
        }
    }

    // image upload function 
    upload = async (uri, h, w) => {

        // function to generate a random int which will be used for image name
        this.setState({ uri: uri });

        let bodyFormData = new FormData();
        let i = {
            uri: uri,
            type: 'multipart/form-data',
            name: `image.jpg`,
        };

        bodyFormData.append('file', i);
        bodyFormData.append('file_type', 'ID');
        bodyFormData.append('path', this.state.usename);

        return  await axios({
                    method: 'post',
                    url: Constants.manifest.extra.URL + '/upload_file',
                    data: bodyFormData,
                    headers: {'Content-Type': 'multipart/form-data' }
                });
}

    /**
     * pic upload part - in second step end
     * 
     */


    /**
     * third step verification
     */

    stepThreeNext = () => {
        
        try {
            axios.post(
                Constants.manifest.extra.URL + '/login',
                {
                    username: this.state.usename,
                    password: this.state.password,
                }
            ).then((response) => {
                
                if (response.data.error != true) {
                    this.setState({ progressStepThreeSubSteps: 2 })
                } else {
                    this.setState({ enableNext3: false })
                    this.setState({ progressStepThreeSubSteps: 1 })
                }
            });
        } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
        }

    }
    /**
     * third step verification end
     */


    /**
     * Next and previous steps
     * 
     */
    onNextStep = () => {
        console.log('called next step');
        this.setState({ enableNext1: false })
    };

    onPrevStep = () => {
        console.log('called previous step');
        this.setState({ progressStepThreeSubSteps: 1 })
        img = null;
    };

    onSubmitSteps = () => {
        console.log('called on submit step.');
    };
    /**
    * Next and previous steps end
    * 
    */


    render() {
        if (this.props.route.params != undefined && this.state.activeStep != this.props.route.params.activeStep) {
            this.setState({ activeStep: this.props.route.params.activeStep })
        }

        const progressStepsStyle = {
            activeStepIconBorderColor: '#6572e4',
            activeLabelColor: '#6572e4',
            activeStepNumColor: 'white',
            activeStepIconColor: '#6572e4',
            completedStepIconColor: '#6572e4',
            completedProgressBarColor: '#6572e4',
            completedCheckColor: 'white',
            activeStep: this.state.activeStep
            // ,enable
            // activeStep: 3
        };

        return (
            <KeyboardAwareScrollView>
                <View>
                    <CardItem header>
                        <Text style={{ fontSize: 20, left: 80, marginTop: 20, color: '#3e3e3e' }}
                        >CREATE AN ACCOUNT</Text>
                    </CardItem>
                    <View
                        style={{
                            borderBottomColor: '#d3d3d3',
                            borderBottomWidth: 1,
                        }}
                    />
                    <View style={styles.signUpContainer}>
                        <View style={{ flex: 1 }}>
                            <ProgressSteps  {...progressStepsStyle}>
                                {/* setup */}
                                <ProgressStep label="Set Up" nextBtnTextStyle={buttonTextStyle0} {...progressStepStyle}
                                    nextBtnDisabled={this.state.enableNext1}
                                    removeBtnRow={this.state.enableNext1}
                                // onPrevious={this.onPrevStep}
                                >
                                    <View style={{ alignItems: 'center' }}>

                                        <Card style={{ borderRadius: 10, width: '90%', padding: 8, marginTop: 15 }}>
                                            <View>
                                                <Label style={{ top: 8 }}>Choose User Type</Label>
                                                <View style={styles.viewContainer}>
                                                    <Button style={styles.buttonContainerSignup} diasbled>
                                                        <Text style={[styles.buttonText, { color: '#000' }]}>Hospital</Text>
                                                    </Button>
                                                    <Button style={styles.buttonContainerSignup} disabled>
                                                        <Text style={[styles.buttonText, { color: '#000' }]}>Referral Doctor</Text>
                                                    </Button>
                                                    <Button style={[styles.buttonContainerSignup, { backgroundColor: '#eaeaea', borderWidth: 1, }]} >
                                                        <Text style={[styles.buttonText, { color: '#000' }]}>ASHA/PHC</Text>
                                                    </Button>
                                                </View>
                                                <View style={{ top: 10 }}>
                                                    <Label style={styles.titleStyle}>Email Address</Label>
                                                    <TextInput
                                                        style={styles.inputStyle}
                                                        value={this.state.email_address}
                                                        onChangeText={(val) => this.updateInputVal(val, 'email_address')}
                                                    />

                                                    <Label style={styles.titleStyle}>Mobile Number</Label>
                                                    <View>
                                                        <Input
                                                            style={styles.inputStyle}
                                                            ref='mobileNo'
                                                            keyboardType="numeric"
                                                            value={this.state.contact_number}
                                                            onChangeText={(val) => this.updateInputVal(val, 'contact_number')}
                                                        />
                                                    </View>

                                                    <Label style={styles.titleStyle}>Username</Label>
                                                    <TextInput
                                                        style={styles.inputStyle}
                                                        value={this.state.usename}
                                                        onChangeText={(val) => this.updateInputVal(val, 'usename')}
                                                    />
                                                    <Label style={styles.titleStyle}>Password</Label>
                                                    <TextInput
                                                        style={styles.inputStyle}
                                                        value={this.state.password}
                                                        onChangeText={(val) => this.updateInputVal(val, 'password')}
                                                        maxLength={15}
                                                        secureTextEntry={true}
                                                    />

                                                </View>
                                            </View>
                                        </Card>
                                    </View>

                                    {this.state.enableNext1 ?
                                        <Button style={[buttonTextStyle0, {
                                            marginTop: 10, height: 42, marginRight: 0,
                                            left: 0, marginBottom: -30,
                                        }]}
                                            onPress={this.validation}
                                        >
                                            <Text style={[styles.buttonText]}>Start</Text>
                                        </Button> : null}


                                    <Text
                                        style={[styles.loginText, { marginTop: 70 }]}
                                        onPress={() => this.props.navigation.navigate('Login')}>
                                        Already have an account? {'\n'}Login
                                                </Text>
                                </ProgressStep>


                                {/* additional info */}
                                <ProgressStep label="Additional Information"
                                    nextBtnTextStyle={buttonTextStyle2}
                                    previousBtnTextStyle={buttonTextStyle1}
                                    nextBtnDisabled={!img}
                                    {...progressStepStyle} 
                                    removeBtnRow>

                                    <View style={{ alignItems: 'center' }}>
                                        <Card style={{ borderRadius: 10, width: '90%', padding: 8, top: 15 }}>
                                            <Container style={{ height: '80%' }}>
                                                <ScrollView>
                                                    <Label style={styles.titleStyle}>Profession</Label>
                                                    <TextInput
                                                        style={styles.inputStyle}
                                                        underlineColorAndroid="transparent"
                                                        value={this.state.profession}
                                                        onChangeText={(val) => this.updateInputVal(val, 'profession')}
                                                    />
                                                    <Label style={styles.titleStyle}>Institution Name</Label>
                                                    <TextInput
                                                        style={styles.inputStyle}
                                                        underlineColorAndroid="transparent"
                                                        value={this.state.instituion}
                                                        onChangeText={(val) => this.updateInputVal(val, 'instituion')}
                                                    />
                                                    <Label style={styles.titleStyle}>Type of institution</Label>
                                                    <View style={[styles.viewContainer, { marginTop: -5 }]}>
                                                        <Button style={[styles.buttonContainer, { borderColor: '#6572e4', backgroundColor: this.state.instituionBt1 }]}
                                                            onPress={() => this.setState({
                                                                type_of_institution: "Government",
                                                                instituionBt1: '#c4c4c4', instituionBt2: 'white'
                                                            })}>
                                                            <Text style={[styles.buttonText, { color: '#000' }]}>Government</Text>
                                                        </Button>
                                                        <Button style={[styles.buttonContainer, { borderColor: '#6572e4', backgroundColor: this.state.instituionBt2 }]}
                                                            onPress={() => this.setState({
                                                                type_of_institution: "Private",
                                                                instituionBt2: '#c4c4c4', instituionBt1: 'white'
                                                            })}
                                                        >
                                                            <Text style={[styles.buttonText, { color: '#000' }]}>Private</Text></Button>
                                                    </View>
                                                    <Label style={styles.titleStyle}>Location (State)</Label>
                                                    <View>
                                                        <View style={[styles.inputStyle, { padding: 0 }]}>
                                                            <Picker
                                                                selectedValue={this.state.location}
                                                                // style={[styles.inputStyle]}
                                                                onValueChange={(val) => this.updateInputVal(val, 'location')}
                                                            >
                                                                <Picker.Item label="Andhra Pradesh" value="Andhra Pradesh" />
                                                                <Picker.Item label="Arunachal Pradesh" value="Arunachal Pradesh" />
                                                                <Picker.Item label="Assam" value="Assam" />
                                                                <Picker.Item label="Bihar" value="Bihar" />
                                                                <Picker.Item label="Chhattisgarh" value="Chhattisgarh" />
                                                                <Picker.Item label="Goa" value="Goa" />
                                                                <Picker.Item label="Gujarath" value="Gujarath" />
                                                                <Picker.Item label="Haryana" value="Haryana" />
                                                                <Picker.Item label="Himachal Pradesh" value="Himachal Pradesh" />
                                                                <Picker.Item label="Jharkhand" value="Jharkhand" />
                                                                <Picker.Item label="Karnataka" value="Karnataka" />
                                                                <Picker.Item label="Kerala" value="Kerala" />
                                                                <Picker.Item label="Madhya Pradesh" value="Madhya Pradesh" />
                                                                <Picker.Item label="Maharashtra" value="Maharashtra" />
                                                                <Picker.Item label="Manipur" value="Manipur" />
                                                                <Picker.Item label="Meghalaya" value="Meghalaya" />
                                                                <Picker.Item label="Mizoram" value="Mizoram" />
                                                                <Picker.Item label="Nagaland" value="Nagaland" />
                                                                <Picker.Item label="Odisha" value="Odisha" />
                                                                <Picker.Item label="Punjab" value="Punjab" />
                                                                <Picker.Item label="Rajasthan" value="Rajasthan" />
                                                                <Picker.Item label="Sikkim" value="Sikkim" />
                                                                <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
                                                                <Picker.Item label="Telangana" value="Telangana" />
                                                                <Picker.Item label="Tripura" value="Tripura" />
                                                                <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
                                                                <Picker.Item label="Uttarakhand" value="Uttarakhand" />
                                                                <Picker.Item label="West Bengal" value="West Bengal" />
                                                            </Picker>
                                                        </View>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.titleStyle}>Verify Identity</Text>
                                                        <View style={[styles.viewContainer, { marginTop: -5, width: '50%', marginTop: 10, marginBottom: 10 }]}>
                                                            {!img && (this.state.profession && this.state.instituion)
                                                            ? <Button style={[styles.buttonContainer, {
                                                                borderColor: '#6572e4',
                                                                backgroundColor: '#6572e4', borderRadius: 5
                                                            }]}
                                                                onPress={this.pic}>
                                                                {this.state.isLoading ? <ActivityIndicator size="large" color="#9E9E9E" /> :
                                                                    <Text style={[styles.buttonText]}>
                                                                        Upload Identity</Text>}
                                                            </Button> :
                                                                <Button style={[styles.buttonContainer, {
                                                                    borderColor: '#6572e4',
                                                                    borderRadius: 5, backgroundColor: '#aeaeae'
                                                                }]}
                                                                    disabled
                                                                >
                                                                    {this.state.isLoading ? <ActivityIndicator size="large" color="#9E9E9E" /> :
                                                                        <Text style={[styles.buttonText, { color: '#000' }]}>
                                                                            {(this.state.profession && this.state.instituion) ? 'Uploaded Identity' : 'Fill in remaining fields'}
                                                                        </Text>}
                                                                </Button>}
                                                            {img && <Image source={{ uri: img }} style={{ borderRadius: 5, left: 10, width: 45, height: 45 }} />}
                                                        </View>
                                                    </View>
                                                </ScrollView>
                                            </Container>
                                        </Card>

                                        <View style={[styles.viewContainer]}>

                                            <Button style={[buttonTextStyle0, {
                                                marginTop: 10, height: 42, marginRight: 50,
                                                left: 0, marginBottom: -30,
                                                backgroundColor: this.state.userIdCreated ? '#aeaeae' :  '#f48351'
                                                }]}
                                                disabled={this.state.userIdCreated}
                                                onPress={this.goToBeginning}
                                            >
                                                <Text style={[styles.buttonText]}>Go Back</Text>
                                            </Button>

                                            <Button style={[buttonTextStyle0,{
                                                marginTop: 10, height: 42, marginLeft:0,
                                                left: 55, marginBottom: -30, 
                                                backgroundColor: !this.state.userIdCreated ? '#aeaeae' :  '#f48351'
                                                }]}
                                                disabled={ !this.state.userIdCreated}
                                                onPress={() => this.goToStepThree}
                                            >
                                                <Text style={[styles.buttonText]}>{this.state.userIdCreated}</Text>
                                            </Button>
                                            
                                        </View>

                                        <Text
                                            style={[styles.loginText]}
                                            onPress={() => this.props.navigation.navigate('Login')}>
                                            Already have an account? {'\n'}Login
                                        </Text>
                                    </View>
                                    
                                </ProgressStep>


                                {/* verification */}
                                {this.state.progressStepThreeSubSteps == 1 ?
                                    <ProgressStep label="Verification" removeBtnRow>
                                        <View style={{ alignItems: 'center' }}>
                                            <Card style={{ borderRadius: 10, width: '90%', padding: 8, marginTop: 15, marginBottom: -50 }} bordered>

                                                <CardItem header>
                                                    <Text style={{ fontSize: 22 }}>Identity Verification</Text>
                                                </CardItem>
                                                <View
                                                    style={{
                                                        borderBottomColor: '#d3d3d3',
                                                        borderBottomWidth: 1,
                                                    }}
                                                />
                                                <CardItem>

                                                    <Body>
                                                        <Text style={{ fontSize: 14, marginTop: 10 }}>
                                                            Dear User,
                                                            </Text>
                                                        <Text style={{ fontSize: 14, marginTop: 10, textAlign: "justify" }}>
                                                            As a security measure, the app requires verification of your identity and place of work. The verification process may take some time.
                                                            </Text>
                                                        <Text style={{ fontSize: 14, marginTop: 10, textAlign: "justify" }}>
                                                            You will receive an email after pressing Continue button in Step 3 and complete the email account verification through the link sent to your registered mail id .
                                                        </Text>
                                                        <Text style={{ fontSize: 14, marginTop: 10, textAlign: "justify" }}>
                                                            After completion of email account verification, you will need to relogin with the User name and Password to proceed to step 4 ie Subscription process to access the application.
                                                            </Text>
                                                        <Text style={{ fontSize: 14, marginTop: 10, textAlign: "justify" }}>
                                                            You may contact our support team at
                                                        </Text>
                                                        <TouchableOpacity onPress={() => Linking.openURL('mailto:avyantra@gmail.com?subject=Avyantra help&body=Your Concern')}>
                                                            <Text style={{ color: 'blue' }}>avyantra@gmail.com</Text>
                                                        </TouchableOpacity>
                                                        <Text style={{ fontSize: 14, textAlign: "justify" }}>
                                                            or at our helpline no : +91 9014458976 for any specific support or assistance.
                                                        </Text>
                                                        <Text style={{ fontSize: 14, marginTop: 10, textAlign: "justify" }}>
                                                            Thank you for your patience.</Text>
                                                        <Text style={{ fontSize: 14, marginTop: 10 }}>
                                                            Team Avyantra
                                                    </Text>
                                                    </Body>

                                                </CardItem>
                                            </Card>
                                        </View>
                                        <View style={[styles.viewContainer, { marginTop: -5 }]}>
                                            <Button style={[buttonTextStyle2, { top: 103, height: 42 }]}
                                                onPress={this.onPrevStep}>
                                                <Text style={[styles.buttonText]}>Back</Text>
                                            </Button>
                                            {this.state.enableNext3 ?
                                                <Button style={[buttonTextStyle2, { top: 103, left: -40, height: 42 }]}
                                                    onPress={this.stepThreeNext}
                                                >
                                                    <Text style={[styles.buttonText]}>Done</Text></Button> :
                                                <Button style={[buttonTextStyle2, { top: 103, left: -40, height: 42, backgroundColor: '#aeaeae' }]}
                                                    onPress={this.stepThreeNext} disabled
                                                >
                                                    <Text style={[styles.buttonText, { color: '#000' }]}>Done</Text></Button>}
                                        </View>
                                        <Text
                                            style={[styles.loginText, { marginTop: 60 }]}
                                            onPress={() => this.props.navigation.navigate('Login')}>
                                            Already have an account? {'\n'}Login
                                                </Text>


                                    </ProgressStep> :
                                    <ProgressStep label="Verification"
                                        onPrevious={this.onPrevStep}
                                        nextBtnTextStyle={buttonTextStyle2}
                                        previousBtnTextStyle={buttonTextStyle1} {...progressStepStyle}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Card style={{ borderRadius: 10, width: '90%', padding: 8, marginTop: 15 }} bordered>

                                                <CardItem header>
                                                    <Text style={{ fontSize: 22 }}>Identity Verification</Text>
                                                </CardItem>
                                                <View
                                                    style={{
                                                        borderBottomColor: '#d3d3d3',
                                                        borderBottomWidth: 1,
                                                    }}
                                                />
                                                <CardItem>
                                                    <Body>
                                                        <View style={styles.checkboxContainer}>
                                                            <Icon name='checkmark-circle' color='#6ed870' style={{ marginTop: 20 }} />
                                                            <Text style={[styles.label, { fontSize: 20 }]}>Congratulations! Your account has been verified!</Text>
                                                        </View>
                                                    </Body>
                                                </CardItem>
                                            </Card>
                                        </View>
                                        <Text
                                            style={[styles.loginText, { marginTop: 60 }]}
                                            onPress={() => this.props.navigation.navigate('Login')}>
                                            Already have an account? {'\n'}Login
                                                </Text>

                                    </ProgressStep>}

                                {/* Subscription */}

                                <ProgressStep label="Subscription"
                                    removeBtnRow
                                    {...progressStepStyle}>
                                    <View>
                                        <Text style={styles.uploadHeadingText}>Select a Subscription Plan</Text>
                                        <Card transparent style={{ flex: 1, justifyContent: 'space-between', borderColor: 'none' }}>
                                            <Card style={[styles.ButtonStyleSubscription, { borderWidth: 5, borderColor: '#6572e4', elevation: 5 }]} >
                                                <View style={{
                                                    width: 20, height: 120, borderTopLeftRadius: 10,
                                                    borderBottomLeftRadius: 10, backgroundColor: '#53ccf2',
                                                }} />
                                                <View style={{ width: 130, height: 120, alignItems: 'center', backgroundColor: '#eaeaea' }} >
                                                    <Text style={{ color: '#53ccf2', fontSize: 30, marginTop: 10 }}>Rs. 0</Text>
                                                    <Text style={{ color: '#53ccf2', fontSize: 15 }}>For 1 Month</Text>
                                                    <Text>(Billed Monthly)</Text>
                                                </View>
                                                <View style={{
                                                    width: '59%', height: 120, borderTopRightRadius: 10,
                                                    borderBottomRightRadius: 10, alignItems: 'center', justifyContent: 'center',
                                                    backgroundColor: '#eaeaea'
                                                }} >
                                                    <Button style={{ backgroundColor: '#fff', borderWidth: 1, margin: 15, borderColor: '#53ccf2', width: 130, height: 30, alignItems: 'center', justifyContent: 'center' }} >
                                                        <Text style={{ color: '#53ccf2', textAlign: 'center' }}>FREE PLAN</Text></Button>
                                                    {/* <Text style={{ margin: 10, marginTop: 2 }}>Lorem ipsum dolor sit amet, consectetur */}
                                                    {/* Ut enim ad minim</Text> */}
                                                </View>
                                            </Card>
                                            <Card style={styles.ButtonStyleSubscription} >
                                                <View style={{
                                                    width: 20, height: 120, borderTopLeftRadius: 10,
                                                    borderBottomLeftRadius: 10, backgroundColor: '#f8ca50'
                                                }} />
                                                <View style={{ width: 130, height: 120, alignItems: 'center' }} >
                                                    <Text style={{ color: '#f8ca50', fontSize: 30, marginTop: 10 }}>Rs. 120</Text>
                                                    <Text style={{ color: '#f8ca50', fontSize: 15 }}>For 3 Months</Text>
                                                    <Text>(Billed Monthly)</Text>
                                                </View>
                                                <View style={{
                                                    width: '60%', height: 120, borderTopRightRadius: 10,
                                                    borderBottomRightRadius: 10, alignItems: 'center', justifyContent: 'center'
                                                }} >
                                                    <Button style={{ backgroundColor: '#fff', borderWidth: 1, margin: 15, borderColor: '#f8ca50', width: 130, height: 30, alignItems: 'center', justifyContent: 'center' }} >
                                                        <Text style={{ color: '#f8ca50', textAlign: 'center' }}>STANDARD PLAN</Text></Button>
                                                    {/* <Text style={{ margin: 10, marginTop: 2 }}>Lorem ipsum dolor sit amet, consectetur
                                                    Ut enim ad minim</Text> */}
                                                </View>
                                            </Card>
                                            <Card style={styles.ButtonStyleSubscription} >
                                                <View style={{
                                                    width: 20, height: 120, borderTopLeftRadius: 10,
                                                    borderBottomLeftRadius: 10, backgroundColor: '#ee6f53'
                                                }} />
                                                <View style={{ width: 130, height: 120, alignItems: 'center' }} >
                                                    <Text style={{ color: '#ee6f53', fontSize: 30, marginTop: 10 }}>Rs. 500</Text>
                                                    <Text style={{ color: '#ee6f53', fontSize: 15 }}>For 6 Months</Text>
                                                    <Text>(Billed Monthly)</Text>
                                                </View>
                                                <View style={{
                                                    width: '60%', height: 120, borderTopRightRadius: 10,
                                                    borderBottomRightRadius: 10, alignItems: 'center', justifyContent: 'center'
                                                }} >
                                                    <Button style={{ backgroundColor: '#fff', borderWidth: 1, margin: 15, borderColor: '#ee6f53', width: 130, height: 30, alignItems: 'center', justifyContent: 'center' }} >
                                                        <Text style={{ color: '#ee6f53', textAlign: 'center' }}>PREMIUM PLAN</Text></Button>
                                                    {/* <Text style={{ margin: 10, marginTop: 2 }}>Lorem ipsum dolor sit amet, consectetur
                                                    Ut enim ad minim</Text> */}
                                                </View>
                                            </Card>

                                        </Card>
                                        <View style={[styles.viewContainer]}>
                                            <Button style={[buttonTextStyle2, { height: 42 }]} disabled>
                                                <Text style={[styles.buttonText]}>Back</Text>
                                            </Button>

                                            <Button style={[buttonTextStyle2, { left: -40, height: 42 }]}
                                                onPress={() => this.props.navigation.navigate('Drawer')}
                                            >
                                                <Text style={[styles.buttonText]}>Continue</Text></Button>
                                        </View>
                                    </View>
                                </ProgressStep>
                            </ProgressSteps>
                        </View>
                    </View>
                    {/* </Body>
                    </CardItem> */}
                </View>
            </KeyboardAwareScrollView >
        );
    }
}

