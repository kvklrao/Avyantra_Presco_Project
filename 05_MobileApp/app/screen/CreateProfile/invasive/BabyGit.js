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


class BabyGit extends Component {


    constructor(props) {
        super(props)
        this.state = {

            //by default assuming create form
            editable: true,
            viewForm: true,
            editForm: false,
            createForm: true,

            editablecolor: 'white',

            form: {
                abdominal_dystension: "yes"
                , diarrhea: "Yes"
                , feeding_intolerance: "Yes"
                , frequency_of_stools: "NA"
                , reading: "R1"
                , study_id: ""
                , tab_name: "baby_git"
                , vomiting: "Yes"
            },

            //controllers
            NA1: true,

            //button colors
            abdominalBtn1: '#6572e4',
            abdominalBtn2: '#eaeaea',
            diarrheaBtn1: '#6572e4',
            diarrheaBtn2: '#eaeaea',
            vomitingBtn1: '#6572e4',
            vomitingBtn2: '#eaeaea',
            feedingBtn1: '#6572e4',
            feedingBtn2: '#eaeaea'
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
        // the below is new create of mother profile for that particular studyid
        // as study id is created in baby profile it is set there and get(fetched) here
        else {
            this.forCreateForm();
        }
    }

    async forCreateForm() {

        const studyId = await AsyncStorage.getItem('studyId');
        console.log(studyId, "study id for creating mother profile");
        await this.setState({ form: { ...this.state.form, study_id: studyId } });
    }

    async handleSubmit(event) {

        event.preventDefault();

        await AsyncStorage.setItem('babygit', JSON.stringify(this.state.form))
            .then(() => {
                console.log('baby git data saved 1');
            })
            .catch((error) => {
                console.log(error);
            });

        this.setState({ editable: false, editablecolor: '#eaeaea', createForm: false, viewForm: true });
    }


    async setColors() {
        // set the background color of buttons acccording to state


        if (this.state.form.abdominal_dystension == "Yes") {
            await this.setState({ abdominalBtn1: '#6572e4', abdominalBtn2: '#eaeaea' });
        } else {
            await this.setState({ abdominalBtn2: '#6572e4', abdominalBtn1: '#eaeaea' })
        }


        if (this.state.form.diarrhea == "Yes") {
            await this.setState({ diarrheaBtn1: '#6572e4', diarrheaBtn2: '#eaeaea' });
        } else {
            await this.setState({ diarrheaBtn2: '#6572e4', diarrheaBtn1: '#eaeaea' })
        }


        if (this.state.form.vomiting == "Yes") {
            await this.setState({ vomitingBtn1: '#6572e4', vomitingBtn2: '#eaeaea' });
        } else {
            await this.setState({ vomitingBtn2: '#6572e4', vomitingBtn1: '#eaeaea' })
        }


        if (this.state.form.feeding_intolerance == "Yes") {
            await this.setState({ feedingBtn1: '#6572e4', feedingBtn2: '#eaeaea' });
        } else {
            await this.setState({ feedingBtn2: '#6572e4', feedingBtn1: '#eaeaea' })
        }

    }


    async loadData() {

        await this.setState({ viewForm: true, createForm: false });
        await this.setState({ form: { ...this.state.form, study_id: this.context } });

        var hospitalId = await AsyncStorage.getItem('hospitalId');
        var config = {
            method: 'get',
            url: Constants.manifest.extra.URL + '/patient/baby_git/' + this.context + '/' + hospitalId + '/1/R1',
            headers: {}
        };

        axios(config)
            .then(response => {

                var thisdata = response.data.response[0];

                if(!thisdata){
                    Alert.alert('You have not saved the Baby GI Tract data yet. Please do so.')
                }
                this.setState({
                    form: {
                        ...this.state.form,
                        abdominal_dystension: thisdata.abdominal_dystension
                        , diarrhea: thisdata.diarrhea
                        , feeding_intolerance: thisdata.feeding_intolerance
                        , frequency_of_stools: thisdata.frequency_of_stools
                        , reading: "R1"
                        , tab_name: "baby_git"
                        , vomiting: thisdata.vomiting
                    }
                })
                this.setColors();
            })
            .catch(error => {
                console.log(error);
            });

        await AsyncStorage.setItem('babygit', JSON.stringify(this.state.form))
            .then(() => {
                console.log('baby git data saved 2');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async handleUpdate() {

        // take data and fireup update api request
        // await this.setState({ form: { ...this.state.form, isCreateForm: false, is_update: true } })

        var data = JSON.stringify(this.state.form);
        var userId = await AsyncStorage.getItem('userId');
        var config = {
            method: 'put',
            url: Constants.manifest.extra.URL + '/patient/update/baby_git/' + this.context + '/R1/' + userId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(response => {
                Alert.alert("updated baby git")
                this.setState({ editable: false, editablecolor: '#eaeaea', editForm: false, viewForm: true, createForm: false });
            })
            .catch(error => {
                Alert.alert(error.response.data.errors[0].param + ' --> ' + error.response.data.errors[0].msg)
                console.log(error.response);
            });

        await AsyncStorage.setItem('babygit', JSON.stringify(this.state.form))
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

        this.state.editable ? await this.setState({ editablecolor: 'white' }) : await this.setState({ editablecolor: '#eaeaea' })
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

                    <View style={{ width: '100%' }}>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                style={styles.checkbox}
                                checked={this.state.NA1}
                                disabled={!this.state.editable}
                                onPress={() => this.setState({ NA1: !this.state.NA1, form: { ...this.state.form, frequency_of_stools: 'NA' } })}
                            />
                            <Text style={styles.label}>Frequency of Stools</Text>
                        </View>
                        <TextInput
                            style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                            editable={this.state.NA1 && this.state.editable}
                            keyboardType='numeric'
                            value={`${this.state.form.frequency_of_stools}`}
                            onChangeText={(value) => this.setState({ form: { ...this.state.form, frequency_of_stools: value } })}
                        />
                    </View>


                    {/* abdominal distension and diarrhea */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>

                            <Label style={styles.titleStyle}>Abdominal Distension</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.abdominalBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, abdominal_dystension: "Yes" }, abdominalBtn1: '#6572e4', abdominalBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.abdominalBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, abdominal_dystension: "No" }, abdominalBtn2: '#6572e4', abdominalBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                        <View style={{ width: '47%' }} >

                            <Label style={styles.titleStyle}>Diarrhea</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.diarrheaBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, diarrhea: "Yes" }, diarrheaBtn1: '#6572e4', diarrheaBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.diarrheaBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, diarrhea: "No" }, diarrheaBtn2: '#6572e4', diarrheaBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                    </View>


                    {/* vomiting and feeding intolerance */}
                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }}>

                            <Label style={styles.titleStyle}>Vomiting</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.vomitingBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, vomiting: "Yes" }, vomitingBtn1: '#6572e4', vomitingBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.vomitingBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, vomiting: "No" }, vomitingBtn2: '#6572e4', vomitingBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                        <View style={{ width: '47%' }} >

                            <Label style={styles.titleStyle}>Feeding Intolerance</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.feedingBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, feeding_intolerance: "Yes" }, feedingBtn1: '#6572e4', feedingBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.feedingBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, feeding_intolerance: "No" }, feedingBtn2: '#6572e4', feedingBtn1: '#eaeaea' })}>
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

BabyGit.contextType = UserContext

export default BabyGit;