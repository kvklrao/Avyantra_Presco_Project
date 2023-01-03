import React, { Component } from 'react';
import styles from '../../../GlobalStyling';
import {

    Button,
    Text,
    Icon,
    Item, Label,
    View, Tab, CheckBox, ListItem
} from "native-base";
import { TextInput, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import UserContext from '../../context/studyidContext';
import { Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";


class BabyCNS extends Component {


    constructor(props) {
        super(props)
        this.state = {

            //by default assuming create form
            editable: true,
            viewForm: false,
            editForm: false,
            createForm: true,

            editablecolor: 'white',

            form: {
                abnormal_movements_like_tonic_posturing: "Yes"
                , af_bulge: "Yes"
                , baby_movement: "Yes"
                , features_of_encephalopathy: "Normal"
                , reading: "R1"
                , seizures: "Yes"
                , study_id: ""
                , tab_name: "baby_cns_add"
            },

            //button colors

            seizuresBtn1: '#6572e4',
            seizuresBtn2: '#eaeaea',
            abnormalBtn1: '#6572e4',
            abnormalBtn2: '#eaeaea',
            afbulgeBtn1: '#6572e4',
            afbulgeBtn2: '#eaeaea',
            babymovementBtn1: '#6572e4',
            babymovementBtn2: '#eaeaea'
        },
            this.editableAndColor = this.editableAndColor.bind(this);
        this.setColors = this.setColors.bind(this);
        this.loadData = this.loadData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.forCreateForm = this.forCreateForm.bind(this);
    }


    componentDidMount = () => {

       // if in view mode
       if (this.context != null) {
        this.editableAndColor();
        this.loadData();
    }
    // the below is new create of baby cns for that particular studyid
    // as study id is created in baby profile it is set there and get(fetched) here
    else {
        this.forCreateForm();
    }

    }

    async forCreateForm() {

        const studyId = await AsyncStorage.getItem('studyId');
        await this.setState({ form: { ...this.state.form, study_id: studyId } });
    }


    async handleSubmit(event) {

        event.preventDefault();

        await AsyncStorage.setItem('babycns', JSON.stringify(this.state.form))
            .then(() => {
            })
            .catch((error) => {
                console.log(error);
            });

        this.setState({ editable: false, editablecolor: '#eaeaea', createForm: false, viewForm: true });
    }


    async setColors() {
        // set the background color of buttons acccording to state

        if (this.state.form.seizures == "Yes") {
            await this.setState({ seizuresBtn1: '#6572e4', seizuresBtn2: '#eaeaea' });
        } else {
            await this.setState({ seizuresBtn2: '#6572e4', seizuresBtn1: '#eaeaea' })
        }

        if (this.state.form.abnormal_movements_like_tonic_posturing == "Yes") {
            await this.setState({ abnormalBtn1: '#6572e4', abnormalBtn2: '#eaeaea' });
        } else {
            await this.setState({ abnormalBtn2: '#6572e4', abnormalBtn1: '#eaeaea' })
        }

        if (this.state.form.af_bulge == "Yes") {
            await this.setState({ afbulgeBtn1: '#6572e4', afbulgeBtn2: '#eaeaea' });
        } else {
            await this.setState({ afbulgeBtn2: '#6572e4', afbulgeBtn1: '#eaeaea' })
        }

        if (this.state.form.baby_movement == "Yes") {
            await this.setState({ babymovementBtn1: '#6572e4', babymovementBtn2: '#eaeaea' });
        } else {
            await this.setState({ babymovementBtn2: '#6572e4', babymovementBtn1: '#eaeaea' })
        }

    }


    async loadData() {

        await this.setState({ viewForm: true, createForm: false });
        await this.setState({ form: { ...this.state.form, study_id: this.context } });

        var hospitalId = await AsyncStorage.getItem('hospitalId');
        var config = {
            method: 'get',
            url: Constants.manifest.extra.URL + '/patient/baby_cns/' + this.context + '/' + hospitalId + '/1/R1',
            headers: {}
        };

        axios(config)
            .then(response => {

                var thisdata = response.data.response[0];

                if(!thisdata){
                    Alert.alert('You have not saved the Baby CNS data yet. Please do so.')
                }

                this.setState({
                    form: {
                        ...this.state.form,
                        abnormal_movements_like_tonic_posturing: thisdata.abnormal_movements_like_tonic_posturing
                        , af_bulge: thisdata.af_bulge
                        , baby_movement: thisdata.baby_movement
                        , features_of_encephalopathy: thisdata.features_of_encephalopathy
                        , reading: "R1"
                        , seizures: thisdata.seizures
                        , tab_name: "baby_cns_add"
                    }
                })
                this.setColors();
            })
            .catch(error => {
                console.log(error);
            });

            await AsyncStorage.setItem('babycns', JSON.stringify(this.state.form))
            .then(() => {
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async handleUpdate() {

        var data = JSON.stringify(this.state.form);
        var userId = await AsyncStorage.getItem('userId');
        var config = {
            method: 'put',
            url: Constants.manifest.extra.URL + '/patient/update/baby_cns/' + this.context + '/R1/' + userId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(response => {

                Alert.alert("baby cns updated")
                this.setState({ editable: false, editablecolor: '#eaeaea', editForm: false, viewForm: true, createForm: false });
            })
            .catch(error => {
                Alert.alert(error.response.data.errors[0].param + ' --> ' + error.response.data.errors[0].msg)
                console.log(error.response);
            });

            await AsyncStorage.setItem('babycns', JSON.stringify(this.state.form))
            .then(() => {
            })
            .catch((error) => {
                console.log(error);
            });

    }

    async editableAndColor() {

        await this.setState({ editable: !this.state.editable });

        if (this.state.editable) {
            await this.setState({ editForm: true })
        }

        this.state.editable ? await this.setState({ editablecolor: '#eaeaea' }) : await this.setState({ editablecolor: '#6572e4' })
    }

    render() {
        return (
            <ScrollView>
                <View padder>

                    {/* edit checkbox */}
                    {this.state.viewForm &&
                        <View
                            style={{
                                flexDirection: "row",
                                color: '#626262',
                                justifyContent: 'flex-end'
                            }}>

                            <CheckBox
                                style={styles.checkbox}
                                disabled={this.state.editable}
                                checked={this.state.editable}
                                onPress={this.editableAndColor}
                            />
                            <Text
                                style={styles.label}>Edit</Text>
                        </View>
                    }

                    {/* record id */}
                    <Label style={styles.titleStyle}>Record Id</Label>
                    <TextInput
                        style={[styles.inputStyle, { backgroundColor: '#eaeaea' }]}
                        editable={false}
                        keyboardType='numeric'
                        value={`${this.state.form.study_id}`}
                    />

                    <View style={{ width: '100%' ,height:80}} >
                        <Label style={styles.titleStyle}>Features of Encephalopathy</Label>
                        <View style={styles.searchSection}>

                            <Picker
                                selectedValue={this.state.form.features_of_encephalopathy}
                                style={{ height: 50, width: 150 }}
                                mode={'dropdown'}

                                onValueChange={(itemValue, itemIndex) => this.setState({ form: { ...this.state.form, features_of_encephalopathy: itemValue } })}
                            >
                                <Picker.Item label="Lethargy" value="Lethargy" />
                                <Picker.Item label="Stupor" value="Stupor" />
                                <Picker.Item label="Coma" value="Coma" />
                                <Picker.Item label="Normal" value="Normal" />
                            </Picker>

                        </View>
                    </View>

                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }}>

                            <Label style={styles.titleStyle}>Seizures</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.seizuresBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, seizures: "Yes" }, seizuresBtn1: '#6572e4', seizuresBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.seizuresBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, seizures: "No" }, seizuresBtn2: '#6572e4', seizuresBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>
                        <View style={{ width: '47%' }}>

                            <Label style={styles.titleStyle}>AF Bulge</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.afbulgeBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, af_bulge: "Yes" }, afbulgeBtn1: '#6572e4', afbulgeBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.afbulgeBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, af_bulge: "No" }, afbulgeBtn2: '#6572e4', afbulgeBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                    </View>


                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }} >

                            <Label style={styles.titleStyle}>Abnormal Movements like Tonic Posturing</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.abnormalBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, abnormal_movements_like_tonic_posturing: "Yes" }, abnormalBtn1: '#6572e4', abnormalBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.abnormalBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, abnormal_movements_like_tonic_posturing: "No" }, abnormalBtn2: '#6572e4', abnormalBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>


                        <View style={{ width: '47%' }} >

                            <Label style={styles.titleStyle}>Baby Movement with Stimulation</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.babymovementBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, baby_movement: "Yes" }, babymovementBtn1: '#6572e4', babymovementBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.babymovementBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, baby_movement: "No" }, babymovementBtn2: '#6572e4', babymovementBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                    </View>


                    <View style={{ marginTop: 15, marginLeft: '60%' }}>
                        {this.state.createForm &&
                            <Button onPress={this.handleSubmit} style={{ backgroundColor: '#6572e4', width: '100%', justifyContent: 'center' }}>
                                <Text>Submit</Text></Button>
                        }
                        {/* {!this.state.editable &&
                            <Button style={{ backgroundColor: '#6572e4', width: '100%', justifyContent: 'center' }}>
                                <Text>Next</Text></Button>
                        } */}
                        {this.state.editForm &&
                            <Button onPress={this.handleUpdate} style={{ backgroundColor: '#6572e4', width: '100%', justifyContent: 'center' }}>
                                <Text>Update</Text></Button>
                        }
                    </View>


                </View>
            </ScrollView >

        );
    }
}

BabyCNS.contextType = UserContext

export default BabyCNS;