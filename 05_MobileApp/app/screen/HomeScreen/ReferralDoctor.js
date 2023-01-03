import React, { Component } from 'react';
import {
    Label,
    Button,
    Text,
    Icon,
    View, Card,
} from "native-base";
import {
    Alert,
    Picker
} from 'react-native';
import styles from '../../GlobalStyling';
import RadioButtonRN from 'radio-buttons-react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import Constants from "expo-constants";

let labelsArray = []
export default class RefferalDoctor extends Component {
    constructor(props) {
        super();
        this.state = {
            isModalVisible: false,
            location: '',
            speciality: '',
            referralDoctorNames: {
                label: ''
            },
            referralDoctorsArray: '',
        }
    }
    componentDidMount() {
        this.getDoctorsList();
    }
    getDoctorsList() {
        labelsArray = []
        let dynamicUrl = Constants.manifest.extra.URL + '/patient/referralDoctorsList'
        if (this.state.location != "" & this.state.speciality != "") {
            dynamicUrl = Constants.manifest.extra.URL+ '/patient/referralDoctorsList?state=' + this.state.location + '&speciality=' + this.state.speciality
        } else if (this.state.location == "" & this.state.speciality != "") {
            dynamicUrl = Constants.manifest.extra.URL + '/patient/referralDoctorsList?speciality=' + this.state.speciality
        } else if (this.state.location != "" & this.state.speciality == "") {
            dynamicUrl = Constants.manifest.extra.URL + '/patient/referralDoctorsList?state=' + this.state.location
        } else {
            dynamicUrl = Constants.manifest.extra.URL + '/patient/referralDoctorsList'
        }

        var config = {
            method: 'get',
            url: dynamicUrl,
        };

        axios(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data));
                this.setState({ referralDoctorsArray: response.data.response })
                for (let i = 0; i < response.data.response.length; i++) {
                    this.setState({ referralDoctorNames: { ...this.state.referralDoctorNames, label: response.data.response[i].first_name + " " + response.data.response[i].last_name } })
                    labelsArray.push(this.state.referralDoctorNames)
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
        this.getDoctorsList();
    }

    sendEmailData = (e) => {
        for (let j = 0; j < this.state.referralDoctorsArray.length; j++) {
            if (e.label == this.state.referralDoctorsArray[j].first_name + " " + this.state.referralDoctorsArray[j].last_name) {
                // Alert.alert(this.state.referralDoctorsArray[j].email_address)
                this.props.parentCallback(this.state.referralDoctorsArray[j].email_address)
            }
        }
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };
    render() {
        const data =
            labelsArray

        return (
            <View style={{ margin: 10 }}>
                <Modal isVisible={this.state.isModalVisible}
                    style={{
                        backgroundColor: '#fff',
                        padding: 20,
                        height: 400,
                        flex: 0
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text style={styles.uploadHeadingText}>Filter</Text>
                        <Label style={styles.titleStyle}>Location (State)</Label>
                        <View>
                            <View style={[styles.inputStyle, { padding: 0 }]}>
                                <Picker
                                    selectedValue={this.state.location}
                                    onValueChange={(val) => this.updateInputVal(val, 'location')}
                                >
                                    <Picker.Item label="Select State (All)" value="" />
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
                        <Label style={styles.titleStyle}>Speciality</Label>
                        <View>
                            <View style={[styles.inputStyle, { padding: 0 }]}>
                                <Picker
                                    selectedValue={this.state.speciality}
                                    onValueChange={(val) => this.updateInputVal(val, 'speciality')}
                                >
                                    <Picker.Item label="Select Speciality (All)" value="" />
                                    <Picker.Item label="Physician" value="Physician" />
                                    <Picker.Item label="Neonatal Specialist" value="Neonatal Specialist" />
                                    <Picker.Item label="Pediatrician" value="Pediatrician" />
                                    <Picker.Item label="Pediatrician Surgeon" value="Pediatrician Surgeon" />
                                    <Picker.Item label="Child Specialist" value="Child Specialist" />
                                </Picker>
                            </View>
                        </View>
                        <Button onPress={this.toggleModal} style={[styles.uploadDocumentButton,
                        { alignSelf: 'center', justifyContent: 'center', margin: 20 }]} >
                            <Text style={{ color: '#fff' }}>Close</Text></Button>
                    </View>
                </Modal>

                <Text>Select a referral doctor and the required reports to submit
                     them for the doctor’s opinion</Text>
                <View style={styles.partitionView}>
                    <Text style={[styles.uploadHeadingText, { padding: 0, marginTop: 8 }]}>
                        Select a Referral Doctor</Text>
                    <Icon name="ios-funnel" style={{ marginRight: '5%' }} onPress={() => this.toggleModal()} />
                </View>
                <Card style={{ borderRadius: 10, width: '100%', marginTop: 25, padding: 10 }} bordered>

                    <RadioButtonRN
                        style={{ marginBottom: 10 }}
                        data={data}
                        box={false}
                        selectedBtn={(e) => this.sendEmailData(e)}
                        activeColor="#f39167"
                    />
                </Card>
            </View>
        )
    }
}