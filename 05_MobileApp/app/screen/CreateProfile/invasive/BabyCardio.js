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


class BabyCardio extends Component {


    constructor(props) {
        super(props)
        this.state = {

            date1: new Date(),
            mode1: 'date',
            show1: false,

            date2: new Date(),
            mode2: 'date',
            show2: false,

            //by default assuming create form
            editable: true,
            viewForm: false,
            editForm: false,
            createForm: true,

            editablecolor: 'white',

            form: {
                baby_blood_pressure_lower_limb: ""
                , baby_blood_pressure_mean_arterial_bp: ""
                , baby_blood_pressure_upper_limb: ""
                , baby_on_ionotropes: "Yes"
                , capillary_refill_unit: "> 3 Sec"
                , central_line: "No"
                , central_line_insert_date: ""
                , central_line_removed_date: ""
                , central_line_value: "PERIPHERAL LINE"
                , cool_peripheries: "No"
                , heart_rate: ""
                , infusion_of_blood_products: "Yes"
                , low_peripheral_pulse_volume: "Yes"
                , reading: "R1"
                , study_id: ""
                , two_d_echo_done: "Yes"
                , two_d_echo_done_if_yes: ""
                , urine_output: "High"
            },

            //controllers
            NA1: true,//heart rate
            NA2: true,//bp systolic
            NA3: true,//bp diastolic
            NA4: true,//bp mean arterial,
            NA5: true,//2d echo result
            NA6: true,//insert date
            NA7: true,//removed date

            //button colors
            peripheralBtn1: '#6572e4',
            peripheralBtn2: '#eaeaea',
            coolPeripheralBtn1: '#6572e4',
            coolPeripheralBtn2: '#eaeaea',
            echoBtn1: '#6572e4',
            echoBtn2: '#eaeaea',
            ionotropesBtn1: '#6572e4',
            ionotropesBtn2: '#eaeaea',
            centralLinesBtn1: '#6572e4',
            centralLinesBtn2: '#eaeaea',
            infusionBtn1: '#6572e4',
            infusionBtn2: '#eaeaea',
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
        this.setState({ form: { ...this.state.form, central_line_insert_date: formattedDate } })
    }

    setDate2 = (event, date2) => {

        date2 = date2 || this.state.date2;

        this.setState({
            //show: Platform.OS === 'ios' ? true : false,
            show2: false,
            date2,
        });

        var x = this.state.date2;
        var formattedDate = x.getDate() + "/" + (x.getMonth() + 1) + "/" + x.getFullYear();
        this.setState({ form: { ...this.state.form, central_line_removed_date: formattedDate } })
    }

    show1 = mode => {
        this.setState({
            show1: true,
            mode,
        });
    }

    show2 = mode => {
        this.setState({
            show2: true,
            mode,
        });
    }

    datepicker1 = () => {
        this.show1('date');
        // this.setState({ show: !this.state.show });
    }

    datepicker2 = () => {
        this.show2('date');
        // this.setState({ show: !this.state.show });
    }

    componentDidMount = () => {

        // if in view mode
        if (this.context != null) {
            this.editableAndColor();
            this.loadData();
        }
        // the below is new create of baby cardio for that particular studyid
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

        await AsyncStorage.setItem('babycardio', JSON.stringify(this.state.form))
            .then(() => {
                console.log('baby cardio data saved 1');
            })
            .catch((error) => {
                console.log(error);
            });

        this.setState({ editable: false, editablecolor: '#eaeaea', createForm: false, viewForm: true });

    }

    async setColors() {
        // set the background color of buttons acccording to state


        if (this.state.form.low_peripheral_pulse_volume == "Yes") {
            await this.setState({ peripheralBtn1: '#6572e4', peripheralBtn2: '#eaeaea' });
        } else {
            await this.setState({ peripheralBtn2: '#6572e4', peripheralBtn1: '#eaeaea' })
        }

        if (this.state.form.cool_peripheries == "Yes") {
            await this.setState({ coolPeripheralBtn1: '#6572e4', coolPeripheralBtn2: '#eaeaea' });
        } else {
            await this.setState({ coolPeripheralBtn2: '#6572e4', coolPeripheralBtn1: '#eaeaea' })
        }

        if (this.state.form.two_d_echo_done == "Yes") {
            await this.setState({ echoBtn1: '#6572e4', echoBtn2: '#eaeaea' });
        } else {
            await this.setState({ echoBtn2: '#6572e4', echoBtn1: '#eaeaea' })
        }

        if (this.state.form.baby_on_ionotropes == "Yes") {
            await this.setState({ ionotropesBtn1: '#6572e4', ionotropesBtn2: '#eaeaea' });
        } else {
            await this.setState({ ionotropesBtn2: '#6572e4', ionotropesBtn1: '#eaeaea' })
        }

        if (this.state.form.central_line == "Yes") {
            await this.setState({ centralLinesBtn1: '#6572e4', centralLinesBtn2: '#eaeaea' });
        } else {
            await this.setState({ centralLinesBtn2: '#6572e4', centralLinesBtn1: '#eaeaea' })
        }

        if (this.state.form.infusion_of_blood_products == "Yes") {
            await this.setState({ infusionBtn1: '#6572e4', infusionBtn2: '#eaeaea' });
        } else {
            await this.setState({ infusionBtn2: '#6572e4', infusionBtn1: '#eaeaea' })
        }

    }


    async loadData() {

        await this.setState({ viewForm: true, createForm: false });
        await this.setState({ form: { ...this.state.form, study_id: this.context } });

        var hospitalId = await AsyncStorage.getItem('hospitalId');
        var config = {
            method: 'get',
            url: Constants.manifest.extra.URL  + '/patient/baby_cv/' + this.context + '/' + hospitalId + '/1/R1',
            headers: {}
        };

        axios(config)
            .then(response => {

                var thisdata = response.data.response[0];

                if(!thisdata){
                    Alert.alert('You have not saved the Baby Cardio data yet. Please do so.')
                }

                this.setState({
                    form: {
                        ...this.state.form,
                        baby_blood_pressure_lower_limb: thisdata.baby_blood_pressure_lower_limb
                        , baby_blood_pressure_mean_arterial_bp: thisdata.baby_blood_pressure_mean_arterial_bp
                        , baby_blood_pressure_upper_limb: thisdata.baby_blood_pressure_upper_limb
                        , baby_on_ionotropes: thisdata.baby_on_ionotropes
                        , capillary_refill_unit: thisdata.capillary_refill_unit
                        , central_line: thisdata.central_line
                        , central_line_insert_date: thisdata.central_line_insert_date
                        , central_line_removed_date: thisdata.central_line_removed_date
                        , central_line_value:thisdata.central_line_value
                        , cool_peripheries: thisdata.cool_peripheries
                        , heart_rate: thisdata.heart_rate
                        , infusion_of_blood_products: thisdata.infusion_of_blood_products
                        , low_peripheral_pulse_volume: thisdata.low_peripheral_pulse_volume
                        , reading: "R1"
                        , two_d_echo_done: thisdata.two_d_echo_done
                        , two_d_echo_done_if_yes: thisdata.two_d_echo_done_if_yes
                        , urine_output: thisdata.urine_output    
                    }
                })
                this.setColors();
            })
            .catch(error => {
                console.log(error);
            });

            await AsyncStorage.setItem('babycardio', JSON.stringify(this.state.form))
            .then(() => {
                console.log('baby cardio data saved 2');
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
            url: Constants.manifest.extra.URL + '/patient/update/baby_cv/' + this.context + '/R1/' + userId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        
        let res;

        try{
            res = await axios(config);

            Alert.alert("updated baby cardio")
            this.setState({ editable: false, editablecolor: '#eaeaea', editForm: false, viewForm: true, createForm: false });
        }
        catch(error){
            Alert.alert(error.response.data.errors[0].param + ' --> ' + error.response.data.errors[0].msg)
            console.log(error.response);
        }

        await AsyncStorage.setItem('babycardio', JSON.stringify(this.state.form));
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


                    {/* Heart rate and urine output */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    style={styles.checkbox}
                                    checked={this.state.NA1}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ NA1: !this.state.NA1, form: { ...this.state.form, heart_rate: 'NA' } })}
                                />
                                <Text style={styles.label}>Heart Rate (beats/min)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={this.state.NA1 && this.state.editable}
                                keyboardType='numeric'
                                value={`${this.state.form.heart_rate}`}
                                onChangeText={(value) => this.setState({ form: { ...this.state.form, heart_rate: value } })}
                            />
                        </View>

                        <View style={{ width: '47%',marginTop:-8,height:85 }}>
                            <Label style={styles.titleStyle}>Urine Output</Label>

                            <View style={styles.searchSection}>

                                <Picker
                                    selectedValue={this.state.form.urine_output}
                                    style={{ height: 40, width: '100%' }}
                                    mode={'dropdown'}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ form: { ...this.state.form, urine_output: itemValue } })}
                                >
                                    <Picker.Item label="Low" value="Low" />
                                    <Picker.Item label="High" value="High" />
                                    <Picker.Item label="Normal" value="Normal" />
                                </Picker>

                            </View>
                        </View>
                    </View>


                    {/* bp( systolic ) and diastolic */}
                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    style={styles.checkbox}
                                    checked={this.state.NA2}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ NA2: !this.state.NA2, form: { ...this.state.form, baby_blood_pressure_upper_limb: 'NA' } })}
                                />
                                <Text style={styles.label}>BP (Systolic)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={this.state.NA2 && this.state.editable}
                                keyboardType='numeric'
                                value={`${this.state.form.baby_blood_pressure_upper_limb}`}
                                onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_blood_pressure_upper_limb: value } })}
                            />
                        </View>

                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    style={styles.checkbox}
                                    checked={this.state.NA3}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ NA3: !this.state.NA3, form: { ...this.state.form, baby_blood_pressure_lower_limb: 'NA' } })}
                                />
                                <Text style={styles.label}>BP (Diastolic)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={this.state.NA3 && this.state.editable}
                                keyboardType='numeric'
                                value={`${this.state.form.baby_blood_pressure_lower_limb}`}
                                onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_blood_pressure_lower_limb: value } })}
                            />
                        </View>

                    </View>


                    {/* bp mean arterial and capillary refil */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    style={styles.checkbox}
                                    checked={this.state.NA4}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ NA4: !this.state.NA4, form: { ...this.state.form, baby_blood_pressure_mean_arterial_bp: 'NA' } })}
                                />
                                <Text style={styles.label}>BP (Mean Arterial)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={this.state.NA4 && this.state.editable}
                                keyboardType='numeric'
                                value={`${this.state.form.baby_blood_pressure_mean_arterial_bp}`}
                                onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_blood_pressure_mean_arterial_bp: value } })}
                            />
                        </View>

                        <View style={{ width: '47%' ,marginTop:-8,height:85}}>
                            <Label style={styles.titleStyle}>Capillary Refill</Label>

                            <View style={styles.searchSection}>

                                <Picker
                                    selectedValue={this.state.form.capillary_refill_unit}
                                    style={{ height: 40, width: '100%' }}
                                    mode={'dropdown'}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ form: { ...this.state.form, capillary_refill_unit: itemValue } })}
                                >
                                    <Picker.Item label="> 3 Sec" value="> 3 Sec" />
                                    <Picker.Item label="< 3 Sec" value="< 3 Sec" />
                                    <Picker.Item label="= 3 Sec" value="= 3 Sec" />
                                    <Picker.Item label="= 0 Sec" value="= 0 Sec" />
                                </Picker>

                            </View>
                        </View>
                    </View>

                    {/* low peripheral and cool peripheries */}
                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }}>

                            <Label style={styles.titleStyle}>Low Peripheral Pulse Volume</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.peripheralBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, low_peripheral_pulse_volume: "Yes" }, peripheralBtn1: '#6572e4', peripheralBtn2: '#eaeaea' })}>
                                    <Text style={styles.textButton}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.peripheralBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, low_peripheral_pulse_volume: "No" }, peripheralBtn2: '#6572e4', peripheralBtn1: '#eaeaea' })}>
                                    <Text style={styles.textButton}>No</Text></Button>

                            </View>

                        </View>

                        <View style={{ width: '47%' }} >

                            <Label style={styles.titleStyle}>Cool Peripheries</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.coolPeripheralBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, cool_peripheries: "Yes" }, coolPeripheralBtn1: '#6572e4', coolPeripheralBtn2: '#eaeaea' })}>
                                    <Text style={styles.textButton}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.coolPeripheralBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, cool_peripheries: "No" }, coolPeripheralBtn2: '#6572e4', coolPeripheralBtn1: '#eaeaea' })}>
                                    <Text style={styles.textButton}>No</Text></Button>

                            </View>

                        </View>

                    </View>

                    {/* 2D Echo Done and its result */}
                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }}>

                            <Label style={styles.titleStyle}>2D Echo (Done)</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.echoBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, two_d_echo_done: "Yes" }, echoBtn1: '#6572e4', echoBtn2: '#eaeaea' })}>
                                    <Text style={styles.textButton}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.echoBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, two_d_echo_done: "No" }, echoBtn2: '#6572e4', echoBtn1: '#eaeaea' })}>
                                    <Text style={styles.textButton}>No</Text></Button>

                            </View>

                        </View>

                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    style={styles.checkbox}
                                    checked={this.state.NA5}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ NA5: !this.state.NA5, form: { ...this.state.form, two_d_echo_done_if_yes: 'NA' } })}
                                />
                                <Text style={styles.label}>2D Echo Result (If Yes)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={this.state.NA5 && this.state.editable}
                                value={`${this.state.form.two_d_echo_done_if_yes}`}
                                onChangeText={(value) => this.setState({ form: { ...this.state.form, two_d_echo_done_if_yes: value } })}
                            />
                        </View>

                    </View>

                    {/* Ionotropes and central lines */}
                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }}>

                            <Label style={styles.titleStyle}>Ionotropes</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.ionotropesBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, baby_on_ionotropes: "Yes" }, ionotropesBtn1: '#6572e4', ionotropesBtn2: '#eaeaea' })}>
                                    <Text style={styles.textButton}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.ionotropesBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, baby_on_ionotropes: "No" }, ionotropesBtn2: '#6572e4', ionotropesBtn1: '#eaeaea' })}>
                                    <Text style={styles.textButton}>No</Text></Button>

                            </View>

                        </View>

                        <View style={{ width: '47%' ,marginTop:-8,height:80}} >

                            <Label style={styles.titleStyle}>Central Lines(Yes/No)</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.centralLinesBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, central_line: "Yes" }, centralLinesBtn1: '#6572e4', centralLinesBtn2: '#eaeaea' })}>
                                    <Text style={styles.textButton}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.centralLinesBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, central_line: "No" }, centralLinesBtn2: '#6572e4', centralLinesBtn1: '#eaeaea' })}>
                                    <Text style={styles.textButton}>No</Text></Button>

                            </View>

                        </View>

                    </View>

                    {this.state.form.central_line === 'Yes' ? 
                        <View style={styles.partitionView}>

                            <View style={{ width: '47%' }}>
                                <Label style={styles.titleStyle}>Central Lines</Label>

                                <View style={styles.searchSection}>

                                    <Picker
                                        selectedValue={this.state.form.central_line_value}
                                        style={{ height: 40, width: '100%' }}
                                        mode={'dropdown'}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ form: { ...this.state.form, central_line_value: itemValue } })}
                                    >
                                        <Picker.Item label="UMBLICAL LINE" value="UMBLICAL LINE" />
                                        <Picker.Item label="PERIPHERAL LINE" value="PERIPHERAL LINE" />
                                        <Picker.Item label="NA" value="NA" />
                                    </Picker>

                                </View>
                            </View>

                            <View style={{ width: '47%', marginLeft: 10 }} >
                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        style={styles.checkbox}
                                        checked={this.state.NA6}
                                        disabled={!this.state.editable}
                                        onPress={() => this.setState({ NA6: !this.state.NA6, form: { ...this.state.form, central_line_insert_date: 'NA' } })}
                                    />
                                    <Text style={styles.label}>Central Lines(Insert Date)</Text>
                                </View>
                                {this.state.show1 && <DateTimePicker
                                    value={this.state.date1}
                                    mode={this.state.mode1}
                                    display="default"
                                    onChange={this.setDate1}
                                />}

                                <TextInput
                                    style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                    value={`${this.state.form.central_line_insert_date}`}
                                    onFocus={this.datepicker1}
                                    editable={this.state.NA6 && this.state.editable}
                                />

                            </View>
                        </View>
                        :  null
                    }

                    {/* central lines removed date and infusion of blood products */}
                    <View style={styles.partitionView}>
                        
                        {this.state.central_line === 'Yes' ? 
                            <View style={{ width: '47%', marginLeft: 10 }} >
                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        style={styles.checkbox}
                                        checked={this.state.NA7}
                                        disabled={!this.state.editable}
                                        onPress={() => this.setState({ NA7: !this.state.NA7, form: { ...this.state.form, central_line_removed_date: 'NA' } })}
                                    />
                                    <Text style={styles.label}>Central Lines(Removed Date)</Text>
                                </View>
                                {this.state.show2 && <DateTimePicker
                                    value={this.state.date2}
                                    mode={this.state.mode2}
                                    display="default"
                                    onChange={this.setDate2}
                                />}

                                <TextInput
                                    style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                    value={`${this.state.form.central_line_removed_date}`}
                                    onFocus={this.datepicker2}
                                    editable={this.state.NA7 && this.state.editable}
                                />

                            </View>
                        : null}

                        <View style={{ width: '47%' }} >

                            <Label style={styles.titleStyle}>Infusion of Blood Products</Label>

                            <View style={[styles.viewContainer, { marginTop: 8 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.infusionBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, infusion_of_blood_products: "Yes" }, infusionBtn1: '#6572e4', infusionBtn2: '#eaeaea' })}>
                                    <Text style={styles.textButton}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.infusionBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, infusion_of_blood_products: "No" }, infusionBtn2: '#6572e4', infusionBtn1: '#eaeaea' })}>
                                    <Text style={styles.textButton}>No</Text></Button>

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

BabyCardio.contextType = UserContext

export default BabyCardio;