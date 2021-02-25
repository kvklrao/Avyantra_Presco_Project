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

class BabyAppearance extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date1: new Date(),
            mode1: 'date',
            show1: false,

            //by default assuming create form
            editable: true,
            viewForm: false,
            editForm: false,
            createForm: true,

            editablecolor: 'white',

            form: {
                study_id: ""
                , baby_appearance: "Lethargic"
                , baby_cry_sound: "Low Pitch"
                , baby_cry_sound_status: ""
                , baby_feeding_status: "Poor"
                , baby_jaundice: "Yes"
                , baby_presence_of_convulsions: "Yes"
                , baby_skin_colour: "Central Cyanosis"
                , baby_weight_at_birth: ""
                , baby_weight_at_birth_unit: "KG"
                , breast_feeding_initiation: "Yes"
                , excessive_sleeping: "Yes"
                , hypothermia: "Yes"
                , hypothermia_status: "Centigrade"
                , hypothermia_status_value: ""
                , hypotonia_muscular_response_five_min_after_birth: "Yes"
                , hypotonia_muscular_response_one_min_after_birth: "Yes"
                , kangaroo_mother_care: "Yes"
                , reading: "R1"
                , reading_date: ''
                , skin_pustules: "Yes"
                , time_of_reading_hours: ""
                , time_of_reading_minute: ""
                , umbilical_discharge: "Yes"
                , umbilical_enduration: "Yes"
                , umbilical_redness: "Yes"
            },

            //controllers
            NA1: true,//reading date checkbox
            NA2: true, //time of reading checkbox
            NA3: true,//cry sound checkbox

            //button colors
            hypotonia1Button1: '#6572e4',
            hypotonia1Button2: '#eaeaea',
            hypotonia2Button1: '#6572e4',
            hypotonia2Button2: '#eaeaea',
            excessiveSleepingBtn1: '#6572e4',
            excessiveSleepingBtn2: '#eaeaea',
            hypothermiaBtn1: '#6572e4',
            hypothermiaBtn2: '#eaeaea',
            convulsionsBtn1: '#6572e4',
            convulsionsBtn2: '#eaeaea',
            jaundiceBtn1: '#6572e4',
            jaundiceBtn2: '#eaeaea',
            breastFeedingBtn1: '#6572e4',
            breastFeedingBtn2: '#eaeaea',
            kangarooBtn1: '#6572e4',
            kangarooBtn2: '#eaeaea',
            umbRedBtn1: '#6572e4',
            umbRedBtn2: '#eaeaea',
            umbEndBtn1: '#6572e4',
            umbEndBtn2: '#eaeaea',
            umbDisBtn1: '#6572e4',
            umbDisBtn2: '#eaeaea',
            skinPustBtn1: '#6572e4',
            skinPustBtn2: '#eaeaea'
        },
            this.editableAndColor = this.editableAndColor.bind(this);
        this.setColors = this.setColors.bind(this);
        this.loadData = this.loadData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.forCreateForm = this.forCreateForm.bind(this);
    }

    setDate1 = (event, date1) => {

        date1 = date1 || this.state.date1;

        this.setState({
            //show: Platform.OS === 'ios' ? true : false,
            show1: false,
            date1,
        });

        var x = this.state.date1;
        var formattedDate = x.getDate() + "/" + (x.getMonth() + 1) + "/" + x.getFullYear();
        this.setState({ form: { ...this.state.form, reading_date: formattedDate } })

    }

    show1 = mode => {
        this.setState({
            show1: true,
            mode,
        });
    }

    datepicker1 = () => {
        this.show1('date');
        // this.setState({ show: !this.state.show });
    }

    componentDidMount = () => {

        if (this.context != null) {
            this.editableAndColor();
            this.loadData();
        }
        // the below is new create of baby appearnace for that particular studyid
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

        await AsyncStorage.setItem('babyappearance', JSON.stringify(this.state.form))
            .then(() => {
            })
            .catch((error) => {
            });

        this.setState({ editable: false, editablecolor: '#eaeaea', createForm: false, viewForm: true });
    }


    async setColors() {
        // set the background color of buttons acccording to state

        if (this.state.form.hypotonia_muscular_response_one_min_after_birth == "Yes") {
            await this.setState({ hypotonia1Button1: '#6572e4', hypotonia1Button2: '#eaeaea' });
        } else {
            await this.setState({ hypotonia1Button2: '#6572e4', hypotonia1Button1: '#eaeaea' })
        }

        if (this.state.form.hypotonia_muscular_response_five_min_after_birth == "Yes") {
            await this.setState({ hypotonia2Button1: '#6572e4', hypotonia2Button2: '#eaeaea' });
        } else {
            await this.setState({ hypotonia2Button2: '#6572e4', hypotonia2Button1: '#eaeaea' })
        }

        if (this.state.form.excessive_sleeping == "Yes") {
            await this.setState({ excessiveSleepingBtn1: '#6572e4', excessiveSleepingBtn2: '#eaeaea' });
        } else {
            await this.setState({ excessiveSleepingBtn2: '#6572e4', excessiveSleepingBtn1: '#eaeaea' })
        }

        if (this.state.form.hypothermia == "Yes") {
            await this.setState({ hypothermiaBtn1: '#6572e4', hypothermiaBtn2: '#eaeaea' });
        } else {
            await this.setState({ hypothermiaBtn2: '#6572e4', hypothermiaBtn1: '#eaeaea' })
        }

        if (this.state.form.baby_presence_of_convulsions == "Yes") {
            await this.setState({ convulsionsBtn1: '#6572e4', convulsionsBtn2: '#eaeaea' });
        } else {
            await this.setState({ convulsionsBtn2: '#6572e4', convulsionsBtn1: '#eaeaea' })
        }

        if (this.state.form.baby_jaundice == "Yes") {
            await this.setState({ jaundiceBtn1: '#6572e4', jaundiceBtn2: '#eaeaea' });
        } else {
            await this.setState({ jaundiceBtn2: '#6572e4', jaundiceBtn1: '#eaeaea' })
        }

        if (this.state.form.breast_feeding_initiation == "Yes") {
            await this.setState({ breastFeedingBtn1: '#6572e4', breastFeedingBtn2: '#eaeaea' });
        } else {
            await this.setState({ breastFeedingBtn2: '#6572e4', breastFeedingBtn1: '#eaeaea' })
        }

        if (this.state.form.kangaroo_mother_care == "Yes") {
            await this.setState({ kangarooBtn1: '#6572e4', kangarooBtn2: '#eaeaea' });
        } else {
            await this.setState({ kangarooBtn2: '#6572e4', kangarooBtn1: '#eaeaea' })
        }

        if (this.state.form.umbilical_redness == "Yes") {
            await this.setState({ umbRedBtn1: '#6572e4', umbRedBtn2: '#eaeaea' });
        } else {
            await this.setState({ umbRedBtn2: '#6572e4', umbRedBtn1: '#eaeaea' })
        }

        if (this.state.form.umbilical_enduration == "Yes") {
            await this.setState({ umbEndBtn1: '#6572e4', umbEndBtn2: '#eaeaea' });
        } else {
            await this.setState({ umbEndBtn2: '#6572e4', umbEndBtn1: '#eaeaea' })
        }

        if (this.state.form.umbilical_discharge == "Yes") {
            await this.setState({ umbDisBtn1: '#6572e4', umbDisBtn2: '#eaeaea' });
        } else {
            await this.setState({ umbDisBtn2: '#6572e4', umbDisBtn1: '#eaeaea' })
        }

        if (this.state.form.skin_pustules == "Yes") {
            await this.setState({ skinPustBtn1: '#6572e4', skinPustBtn2: '#eaeaea' });
        } else {
            await this.setState({ skinPustBtn2: '#6572e4', skinPustBtn1: '#eaeaea' })
        }

    }


    async loadData() {

        await this.setState({ viewForm: true, createForm: false });
        await this.setState({ form: { ...this.state.form, study_id: this.context } });

        var hospitalId = await AsyncStorage.getItem('hospitalId');
        var config = {
            method: 'get',
            ///:studyId/:hospitalId/:pageNo/:readingId
            url: Constants.manifest.extra.URL + '/patient/baby_appears/' + this.context + '/' + hospitalId + '/1/R1',
            headers: {}
        };

        axios(config)
            .then(response => {

                var thisdata = response.data.response[0];

                if(!thisdata){
                    Alert.alert('You have not saved the Baby appearance data yet. Please do so.')
                }

                this.setState({
                    form: {
                        ...this.state.form
                        , baby_appearance: thisdata.baby_appearance
                        , baby_cry_sound: thisdata.baby_cry_sound
                        , baby_cry_sound_status: thisdata.baby_cry_sound_status
                        , baby_feeding_status: thisdata.baby_feeding_status
                        , baby_jaundice: thisdata.baby_jaundice
                        , baby_presence_of_convulsions: thisdata.baby_presence_of_convulsions
                        , baby_skin_colour: thisdata.baby_skin_colour
                        , baby_weight_at_birth: thisdata.baby_weight_at_birth
                        , baby_weight_at_birth_unit: thisdata.baby_weight_at_birth_unit
                        , breast_feeding_initiation: thisdata.breast_feeding_initiation
                        , excessive_sleeping: thisdata.excessive_sleeping
                        , hypothermia: thisdata.hypothermia
                        , hypothermia_status: thisdata.hypothermia_status
                        , hypothermia_status_value: thisdata.hypothermia_status_value
                        , hypotonia_muscular_response_five_min_after_birth: thisdata.hypotonia_muscular_response_five_min_after_birth
                        , hypotonia_muscular_response_one_min_after_birth: thisdata.hypotonia_muscular_response_one_min_after_birth
                        , kangaroo_mother_care: thisdata.kangaroo_mother_care
                        , reading: "R1"
                        , reading_date: thisdata.reading_date
                        , skin_pustules: thisdata.skin_pustules
                        , time_of_reading_hours: thisdata.time_of_reading_hours
                        , time_of_reading_minute: thisdata.time_of_reading_minute
                        , umbilical_discharge: thisdata.umbilical_discharge
                        , umbilical_enduration: thisdata.umbilical_enduration
                        , umbilical_redness: thisdata.umbilical_redness
                    }
                })
                this.setColors();
            })
            .catch(error => {
                console.log(error);
            });

        await AsyncStorage.setItem('babyappearance', JSON.stringify(this.state.form))
            .then(() => {
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async handleUpdate() {

        // await this.setState({ form: { ...this.state.form, isCreateForm: false, is_update: true } })

        var data = JSON.stringify(this.state.form);
        var userId = await AsyncStorage.getItem('userId');
        var config = {
            method: 'put',
            url: Constants.manifest.extra.URL + '/patient/update/baby_appears/' + this.context + '/R1/' + userId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(response => {
                Alert.alert("Updated baby appearance")
                this.setState({ editable: false, editablecolor: '#eaeaea', editForm: false, viewForm: true, createForm: false });
            })
            .catch(error => {
                Alert.alert(error.response.data.errors[0].param + ' --> ' + error.response.data.errors[0].msg)
                console.log(error.response);
            });

        await AsyncStorage.setItem('babyappearance', JSON.stringify(this.state.form))
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



                    {/* Reading Date */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            checked={this.state.NA1}
                            disabled={!this.state.editable}
                            onPress={() => this.setState({ NA1: !this.state.NA1, form: { ...this.state.form, reading_date: 'NA' } })}
                        />
                        <Text style={styles.label}>Reading Date</Text>
                    </View>
                    {this.state.show1 && <DateTimePicker
                        value={this.state.date1}
                        mode={this.state.mode1}
                        display="default"
                        onChange={this.setDate1}
                    />}

                    <TextInput
                        style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                        value={`${this.state.form.reading_date}`}
                        onFocus={this.datepicker1}
                        editable={this.state.NA1 && this.state.editable}
                    />


                    {/* time of reading */}
                    <View style={{ width: '100%' }} >

                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                checked={this.state.NA2}
                                disabled={!this.state.editable}
                                onPress={() => this.setState({ NA2: !this.state.NA2, form: { ...this.state.form, time_of_reading_hours: 'NA', time_of_reading_minute: 'NA' } })}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>Time of Reading</Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#fff',
                            }}>
                                <TextInput
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    editable={this.state.NA2 && this.state.editable}
                                    value={`${this.state.form.time_of_reading_hours}`}
                                    keyboardType='numeric'
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, time_of_reading_hours: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={10} color="#000" >
                                    <Text style={styles.iconText}>Hrs</Text></Icon>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    editable={this.state.NA2 && this.state.editable}
                                    value={`${this.state.form.time_of_reading_minute}`}
                                    keyboardType='numeric'
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, time_of_reading_minute: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={10} color="#000" >
                                    <Text style={styles.iconText}>Min</Text></Icon>
                            </View>

                        </View>

                    </View>

                    {/* weight of baby */}
                    <View >
                        <Label style={styles.titleStyle}>Weight of Baby</Label>
                        <View style={styles.searchSection}>
                            <TextInput
                                style={[styles.input2, { backgroundColor: this.state.editablecolor, borderColor: '#6572e4' }]}
                                editable={this.state.editable}
                                keyboardType='numeric'
                                value={`${this.state.form.baby_weight_at_birth}`}
                                onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_weight_at_birth: value } })}
                                underlineColorAndroid="transparent"
                            />

                            <Picker
                                selectedValue={this.state.form.baby_weight_at_birth_unit}
                                style={{ height: 50, width: 150 }}
                                mode={'dialog'}
                                onValueChange={(itemValue, itemIndex) => this.setState({ form: { ...this.state.form, baby_weight_at_birth_unit: itemValue } })}
                            >
                                <Picker.Item label="Kgs" value="Kgs" />
                                <Picker.Item label="Lbs" value="Lbs" />
                            </Picker>

                        </View>
                    </View>

                    {/* appearane and skin color */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ width: '45%' }} >
                            <Label style={styles.titleStyle}>Appearance</Label>
                            <View style={styles.searchSection}>

                                <Picker
                                    selectedValue={this.state.form.baby_appearance}
                                    style={{ height: 50, width: 150 }}
                                    mode={'dropdown'}

                                    onValueChange={(itemValue, itemIndex) => this.setState({ form: { ...this.state.form, baby_appearance: itemValue } })}
                                >
                                    <Picker.Item label="Dull" value="Dull" />
                                    <Picker.Item label="Lethargic" value="Lethargic" />
                                    <Picker.Item label="Normal" value="Normal" />
                                </Picker>

                            </View>
                        </View>

                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Skin Color</Label>

                            <View style={styles.searchSection}>

                                <Picker
                                    selectedValue={this.state.form.baby_skin_colour}
                                    style={{ height: 50, width: '100%' }}
                                    mode={'dropdown'}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ form: { ...this.state.form, baby_skin_colour: itemValue } })}
                                >
                                    <Picker.Item label="Pink" value="Pink" />
                                    <Picker.Item label="Central Cyanosis" value="Central Cyanosis" />
                                    <Picker.Item label="Peripheral Duskiness" value="Peripheral Duskiness" />
                                    <Picker.Item label="Acrocyanosis" value="Acrocyanosis" />
                                    <Picker.Item label="Pale" value="Pale" />
                                </Picker>
                            </View>
                        </View>
                    </View>



                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ width: '47%',height:85,marginTop:10 }} >
                            <Label style={styles.titleStyle}>Cry Sound</Label>
                            <View style={styles.searchSection}>

                                <Picker
                                    selectedValue={this.state.form.baby_cry_sound}
                                    style={{ height: 50, width: 150 }}
                                    mode={'dropdown'}

                                    onValueChange={(itemValue, itemIndex) => this.setState({ form: { ...this.state.form, baby_cry_sound: itemValue } })}
                                >
                                    <Picker.Item label="Low Pitch" value="Low Pitch" />
                                    <Picker.Item label="High Pitch" value="High Pitch" />
                                    <Picker.Item label="Normal" value="Normal" />
                                    <Picker.Item label="Not Cried" value="Not Cried" />
                                </Picker>

                            </View>
                        </View>

                        <View style={{ width: '45%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    style={styles.checkbox}
                                    checked={this.state.NA3}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ NA1: !this.state.NA3, form: { ...this.state.form, baby_cry_sound_status: 'NA' } })}
                                />
                                <Text style={styles.label}>Baby Sound (if not cried) TIme (in sec)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={this.state.NA1 && this.state.editable}
                                keyboardType='numeric'
                                value={`${this.state.form.baby_cry_sound_status}`}
                                onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_cry_sound_status: value } })}
                            />
                        </View>
                    </View>


                    {/* all two hypotonia */}
                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }}>

                            <Label style={styles.titleStyle}>Hypotonia Muscular Response (1 min after birth)</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.hypotonia1Button1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, hypotonia_muscular_response_one_min_after_birth: "Yes" }, hypotonia1Button1: '#6572e4', hypotonia1Button2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.hypotonia1Button2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, hypotonia_muscular_response_five_min_after_birth: "No" }, hypotonia1Button2: '#6572e4', hypotonia1Button1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                        <View style={{ width: '47%' }} >

                            <Label style={styles.titleStyle}>Hypotonia Muscular Response (5 min after birth)</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.hypotonia2Button1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, hypotonia_muscular_response_five_min_after_birth: "Yes" }, hypotonia2Button1: '#6572e4', hypotonia2Button2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.hypotonia2Button2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, hypotonia_muscular_response_five_min_after_birth: "No" }, hypotonia2Button2: '#6572e4', hypotonia2Button1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                    </View>


                    {/* excessive sleeping and hypothermia */}
                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }}>

                            <Label style={styles.titleStyle}>Excessive Sleeping</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.excessiveSleepingBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, excessive_sleeping: "Yes" }, excessiveSleepingBtn1: '#6572e4', excessiveSleepingBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.excessiveSleepingBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, excessive_sleeping: "No" }, excessiveSleepingBtn2: '#6572e4', excessiveSleepingBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                        <View style={{ width: '47%' }} >

                            <Label style={styles.titleStyle}>Hypothermia</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.hypothermiaBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, hypothermia: "Yes" }, hypothermiaBtn1: '#6572e4', hypothermiaBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.hypothermiaBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, hypothermia: "No" }, hypothermiaBtn2: '#6572e4', hypothermiaBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                    </View>

                    {/* hypothermia units and feeding status */}
                    <View >
                        <Label style={styles.titleStyle}>Hypothermia (Units)</Label>
                        <View style={styles.searchSection}>
                            <TextInput
                                style={[styles.input2, { backgroundColor: this.state.editablecolor, borderColor: '#6572e4' }]}
                                editable={this.state.editable}
                                keyboardType='numeric'
                                value={`${this.state.form.hypothermia_status_value}`}
                                onChangeText={(value) => this.setState({ form: { ...this.state.form, hypothermia_status_value: value } })}
                                underlineColorAndroid="transparent"
                            />

                            <Picker
                                selectedValue={this.state.form.hypothermia_status}
                                style={{ height: 50, width: 150 }}
                                mode={'dropdown'}
                                onValueChange={(itemValue, itemIndex) => this.setState({ form: { ...this.state.form, hypothermia_status: itemValue } })}
                            >
                                <Picker.Item label="Centigrade" value="Centigrade" />
                                <Picker.Item label="Fahrenheit" value="Fahrenheit" />
                            </Picker>

                        </View>
                    </View>

                    <View style={{ width: '100%' }}>
                        <Label style={styles.titleStyle}>Feeding Status</Label>

                        <View style={styles.searchSection}>

                            <Picker
                                selectedValue={this.state.form.baby_feeding_status}
                                style={{ height: 50, width: '100%' }}
                                mode={'dropdown'}
                                onValueChange={(itemValue, itemIndex) => this.setState({ form: { ...this.state.form, baby_feeding_status: itemValue } })}
                            >
                                <Picker.Item label="Poor" value="Poor" />
                                <Picker.Item label="Normal" value="Normal" />
                                <Picker.Item label="No Feeding" value="No Feeding" />
                            </Picker>

                        </View>
                    </View>


                    {/* presence of convulsions and jaundice */}
                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }}>

                            <Label style={styles.titleStyle}>Presence of Convulsions</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.convulsionsBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, baby_presence_of_convulsions: "Yes" }, convulsionsBtn1: '#6572e4', convulsionsBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.convulsionsBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, baby_presence_of_convulsions: "No" }, convulsionsBtn2: '#6572e4', convulsionsBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                        <View style={{ width: '47%' }} >

                            <Label style={styles.titleStyle}>Jaundice (Present)</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.jaundiceBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, baby_jaundice: "Yes" }, jaundiceBtn1: '#6572e4', jaundiceBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text>
                                </Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.jaundiceBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, baby_jaundice: "No" }, jaundiceBtn2: '#6572e4', jaundiceBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text>
                                </Button>

                            </View>

                        </View>

                    </View>

                    {/* breast feeding initiation and kangaroo_mother_care */}

                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }}>

                            <Label style={styles.titleStyle}>Breast Feeding Initiation </Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.breastFeedingBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, breast_feeding_initiation: "Yes" }, breastFeedingBtn1: '#6572e4', breastFeedingBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.breastFeedingBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, breast_feeding_initiation: "No" }, breastFeedingBtn2: '#6572e4', breastFeedingBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                        <View style={{ width: '47%' }} >

                            <Label style={styles.titleStyle}>Kangaroo Mother Care</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.kangarooBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, kangaroo_mother_care: "Yes" }, kangarooBtn1: '#6572e4', kangarooBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.kangarooBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, kangaroo_mother_care: "No" }, kangarooBtn2: '#6572e4', kangarooBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                    </View>


                    {/* umbilical_redness and umbilical_enduration */}

                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }}>

                            <Label style={styles.titleStyle}>Umbilical Redness</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.umbRedBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, umbilical_redness: "Yes" }, umbRedBtn1: '#6572e4', umbRedBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.umbRedBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, umbilical_redness: "No" }, umbRedBtn2: '#6572e4', umbRedBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                        <View style={{ width: '47%' }} >

                            <Label style={styles.titleStyle}>Umbilical Enduration</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.umbEndBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, umbilical_enduration: "Yes" }, umbEndBtn1: '#6572e4', umbEndBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.umbEndBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, umbilical_enduration: "No" }, umbEndBtn2: '#6572e4', umbEndBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                    </View>


                    {/* umbilical_discharge and skin_pustules */}
                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }}>

                            <Label style={styles.titleStyle}>Umbilical Discharge</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.umbDisBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, umbilical_discharge: "Yes" }, umbDisBtn1: '#6572e4', umbDisBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.umbDisBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, umbilical_discharge: "No" }, umbDisBtn2: '#6572e4', umbDisBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                        <View style={{ width: '47%' }} >

                            <Label style={styles.titleStyle}>Skin Pustules (&lt;5)</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.skinPustBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, skin_pustules: "Yes" }, skinPustBtn1: '#6572e4', skinPustBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.skinPustBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, skin_pustules: "No" }, skinPustBtn2: '#6572e4', skinPustBtn1: '#eaeaea' })}>
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

BabyAppearance.contextType = UserContext

export default BabyAppearance;