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
import { MultipleSelectPicker } from 'react-native-multi-select-picker';
import Constants from "expo-constants";

const items = [
    { label: 'Ventilator', value: '1' },
    { label: 'CPAP', value: '2' },
    { label: 'HFNC', value: '3' },
    { label: 'Nasal High Flow', value: '4' },
    { label: 'Nasal Prongs', value: '5' },
    { label: 'IMV', value: '6' },
    { label: 'NIPPV', value: '7' },
    { label: 'Other', value: '8' },
]


class BabyRespiratory extends Component {


    constructor(props) {
        super(props)
        this.state = {
            date1: new Date(),
            mode1: 'date',
            show1: false,

            date2: new Date(),
            mode2: 'date',
            show2: false,

            selectedRespiratory: [],
            isShownPicker: false,

            //by default assuming create form
            editable: true,
            viewForm: false,
            editForm: false,
            createForm: true,

            editablecolor: 'white',


            form: {
                apnea_diagnosis: "Central Apnea"
                , apnea_status: "Yes"
                , baby_chest_indrawing: "Yes"
                , baby_respiratory_support: ""
                , baby_respiratory_support_if_yes: "Yes"
                , breathing_rate: "NA"
                , fast_breathing: "Yes"
                , groaning: "Yes"
                , grunting: "Yes"
                , oxygen_saturation: "NA"
                , reading: "R1"
                , retraction: "Yes"
                , stridor: "Yes"
                , study_id: ""
                , tab_name: "baby_resp_add"
                , x_ray_diagnosis_any_other: ""
                , x_ray_result: "Normal"
                , x_ray_status: "Unilateral Haziness"
                , x_ray_status_done: "Yes"
            },

            //controllers
            NA1: true,
            NA2: true,
            NA3: true,

            //button colors
            groaningBtn1: '#6572e4',
            groaningBtn2: '#eaeaea',
            gruntingBtn1: '#6572e4',
            gruntingBtn2: '#eaeaea',
            stidorBtn1: '#6572e4',
            stidorBtn2: '#eaeaea',
            retractionBtn1: '#6572e4',
            retractionBtn2: '#eaeaea',
            fastBreathBtn1: '#6572e4',
            fastBreathBtn2: '#eaeaea',
            chestBtn1: '#6572e4',
            chestBtn2: '#eaeaea',
            xrayStatBtn1: '#6572e4',
            xrayStatBtn2: '#eaeaea',
            xrayResultBtn1: '#6572e4',
            xrayResultBtn2: '#eaeaea',
            apneaStatBtn1: '#6572e4',
            apneaStatBtn2: '#eaeaea',
            respiratoryBtn1: '#6572e4',
            respiratoryBtn2: '#eaeaea'

        },
            this.editableAndColor = this.editableAndColor.bind(this);
        this.setColors = this.setColors.bind(this);
        this.loadData = this.loadData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.forCreateForm = this.forCreateForm.bind(this);
        this.populateSelectedValues = this.populateSelectedValues.bind(this);
    }

    renameKeys(obj, newKeys) {
        const keyValues = Object.keys(obj).map(key => {
            const newKey = newKeys[key] || key;
            return { [newKey]: obj[key] };
        });
        return Object.assign({}, ...keyValues);
    }


    populateSelectedValues(elems) {

        let selectedVals = [];

        for (let i = 0; i < elems.length; i++) {
            const obj = elems[i];
            const newKeys = { itemValue: "label", id: "value" }; 
            const renamedObj = this.renameKeys(obj, newKeys);
            selectedVals.push(renamedObj)
        }

        this.setState({ selectedRespiratory: selectedVals });
    }


    selectedRespiratoryValues(ele) {
        let temp_gpb = []
        this.setState({ selectedRespiratory: ele })
        for (let i = 0; i < ele.length; i++) {
            const obj = ele[i];
            const newKeys = { label: "itemValue", value: "id" };
            const renamedObj = this.renameKeys(obj, newKeys);
            temp_gpb.push(renamedObj)
        }
        this.setState({ form: { ...this.state.form, baby_respiratory_support: temp_gpb } })
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
        this.setState({ form: { ...this.state.form, date_of_administration_of_antiobiotic: formattedDate } })
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
        this.setState({ form: { ...this.state.form, date_of_blood_samples_sent_for_culture_test: formattedDate } })
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

    async handleSubmit(event) {

        event.preventDefault();
        await AsyncStorage.setItem('babyrespiratory', JSON.stringify(this.state.form))
            .then(() => {
            })
            .catch((error) => {
                console.log(error);
            });

        this.setState({ editable: false, editablecolor: '#eaeaea', createForm: false, viewForm: true });
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
        await this.setState({ form: { ...this.state.form, study_id: studyId } });
    }

    async setColors() {

        // set the background color of buttons acccording to state

        let colorsObj = {}

        if (this.state.form.groaning == "Yes") {
            colorsObj = {  ...colorsObj, groaningBtn1: '#6572e4', groaningBtn2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, groaningBtn2: '#6572e4', groaningBtn1: '#eaeaea' }
        }

        if (this.state.form.grunting == "Yes") {
            colorsObj = {  ...colorsObj, gruntingBtn1: '#6572e4', gruntingBtn2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, gruntingBtn2: '#6572e4', gruntingBtn1: '#eaeaea' }
        }

        if (this.state.form.retraction == "Yes") {
            colorsObj = {  ...colorsObj, retractionBtn1: '#6572e4', retractionBtn2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, retractionBtn2: '#6572e4', retractionBtn1: '#eaeaea' };
        }

        if (this.state.form.fast_breathing == "Yes") {
            colorsObj = {  ...colorsObj, fastBreathBtn1: '#6572e4', fastBreathBtn2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, fastBreathBtn2: '#6572e4', fastBreathBtn1: '#eaeaea' };
        }

        if (this.state.form.stridor == "Yes") {
            colorsObj = {  ...colorsObj, stidorBtn1: '#6572e4', stidorBtn2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, stidorBtn2: '#6572e4', stidorBtn1: '#eaeaea' };
        }

        if (this.state.form.baby_chest_indrawing == "Yes") {
            colorsObj = {  ...colorsObj, chestBtn1: '#6572e4', chestBtn2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, chestBtn2: '#6572e4', chestBtn1: '#eaeaea' };
        }

        if (this.state.form.x_ray_status_done == "Yes") {
            colorsObj = {  ...colorsObj, xrayStatBtn1: '#6572e4', xrayStatBtn2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, xrayStatBtn2: '#6572e4', xrayStatBtn1: '#eaeaea' };
        }

        if (this.state.form.x_ray_result == "Normal") {
            colorsObj = {  ...colorsObj, xrayResultBtn1: '#6572e4', xrayResultBtn2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, xrayResultBtn2: '#6572e4', xrayResultBtn1: '#eaeaea' };
        }

        if (this.state.form.apnea_status == "Yes") {
            colorsObj = {  ...colorsObj, apneaStatBtn1: '#6572e4', apneaStatBtn2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, apneaStatBtn2: '#6572e4', apneaStatBtn1: '#eaeaea' }
        }

        if (this.state.form.baby_respiratory_support_if_yes == "Yes") {
            colorsObj = {  ...colorsObj, respiratoryBtn1: '#6572e4', respiratoryBtn2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, respiratoryBtn2: '#6572e4', respiratoryBtn1: '#eaeaea' };
        }

        await this.setState({ ...colorsObj });
    }


    async loadData() {

        await this.setState({ viewForm: true, createForm: false });
        await this.setState({ form: { ...this.state.form, study_id: this.context } });

        var hospitalId = await AsyncStorage.getItem('hospitalId');
        var config = {
            method: 'get',
            url: Constants.manifest.extra.URL + '/patient/baby_resp/' + this.context + '/' + hospitalId + '/1/R1',
            headers: {}
        };

        try{

            let response = await axios(config);
            var thisdata = response.data.response[0];

            if(!thisdata){
                Alert.alert('You have not saved the Baby Respiratory function data yet. Please do so.')
            }

            var baby_respiratory_support = JSON.parse(thisdata.baby_respiratory_support)
            this.populateSelectedValues(baby_respiratory_support);

            this.setState({
                form: {
                    ...this.state.form,
                    apnea_diagnosis: thisdata.apnea_diagnosis
                    , apnea_status: thisdata.apnea_status
                    , baby_chest_indrawing: thisdata.baby_chest_indrawing
                    , baby_respiratory_support: baby_respiratory_support
                    , baby_respiratory_support_if_yes: thisdata.baby_respiratory_support_if_yes
                    , breathing_rate: thisdata.breathing_rate
                    , fast_breathing: thisdata.fast_breathing
                    , groaning: thisdata.groaning
                    , grunting: thisdata.grunting
                    , oxygen_saturation: thisdata.oxygen_saturation
                    , reading: "R1"
                    , retraction: thisdata.retraction
                    , stridor: thisdata.stridor
                    , tab_name: "baby_resp_add"
                    , x_ray_diagnosis_any_other: thisdata.x_ray_diagnosis_any_other
                    , x_ray_result: thisdata.x_ray_result
                    , x_ray_status: thisdata.x_ray_status
                    , x_ray_status_done: thisdata.x_ray_status_done

                }
            });
            
            this.setColors();
        }
        catch(error) {
            console.log(error);
            Alert.alert('Unable to fetch data. Please check if mobile data is available.')
        };

        await AsyncStorage.setItem('babyrespiratory', JSON.stringify(this.state.form))
            .then(() => {
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async handleUpdate() {

        // take data and fireup update api request

        var data = JSON.stringify(this.state.form);
        var apiData = JSON.parse(data); // We need to transform some of the data before calling the API. Copy to a new var, so as not to modify the state.
        apiData['baby_respiratory_support'] = JSON.stringify(apiData['baby_respiratory_support']);
        
        var userId = await AsyncStorage.getItem('userId');
        var config = {
            method: 'put',
            url: Constants.manifest.extra.URL + '/patient/update/baby_resp/' + this.context + '/R1/' + userId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: apiData
        };

        axios(config)
            .then(response => {
                Alert.alert("Updated Baby respiratory functions!")
                this.setState({ editable: false, editablecolor: '#eaeaea', editForm: false, viewForm: true, createForm: false });
            })
            .catch(error => {
                Alert.alert(error.response.data.errors[0].param + ' --> ' + error.response.data.errors[0].msg)
                console.log(error.response);
            });

        await AsyncStorage.setItem('babyrespiratory', JSON.stringify(this.state.form))
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


                    {/* groaning and grunting */}
                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }}>

                            <Label style={styles.titleStyle}>Groaning</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.groaningBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, groaning: "Yes" }, groaningBtn1: '#6572e4', groaningBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.groaningBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, groaning: "No" }, groaningBtn2: '#6572e4', groaningBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                        <View style={{ width: '47%' }} >

                            <Label style={styles.titleStyle}>Grunting</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.gruntingBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, hypothermia: "Yes" }, gruntingBtn1: '#6572e4', gruntingBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.gruntingBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, hypothermia: "No" }, gruntingBtn2: '#6572e4', gruntingBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                    </View>

                    {/* stridor and retraction */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>

                            <Label style={styles.titleStyle}>Stridor</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.stidorBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, stridor: "Yes" }, stidorBtn1: '#6572e4', stidorBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.stidorBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, stridor: "No" }, stidorBtn2: '#6572e4', stidorBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                        <View style={{ width: '47%' }} >

                            <Label style={styles.titleStyle}>Retraction</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.retractionBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, retraction: "Yes" }, retractionBtn1: '#6572e4', retractionBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.retractionBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, retraction: "No" }, retractionBtn2: '#6572e4', retractionBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>

                    </View>


                    {/* fast breathing and oxygen saturation  */}
                    <View style={[styles.partitionView, { marginTop: 10 }]}>

                        <View style={{ width: '47%' }} >

                            <Label style={styles.titleStyle}>Fast Breathing</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.fastBreathBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, fast_breathing: "Yes" }, fastBreathBtn1: '#6572e4', fastBreathBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.fastBreathBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, fast_breathing: "No" }, fastBreathBtn2: '#6572e4', fastBreathBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.NA1}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        NA1: !this.state.NA1,
                                        form: { ...this.state.form, oxygen_saturation: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>Oxygen Saturation (%)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editable && this.state.NA1 ? 'white' : '#eaeaea' }]}
                                editable={this.state.NA1 && this.state.editable}
                                keyboardType='numeric'
                                value={`${this.state.form.oxygen_saturation}`}
                                onChangeText={(value) => this.setState({
                                    form: { ...this.state.form, oxygen_saturation: value }
                                })}
                            />

                        </View>
                    </View>


                    {/* breathing rate and chest in drawing */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.NA2}
                                    disabled={!this.state.editable}
                                    style={styles.checkbox}
                                    onPress={() => this.setState({
                                        NA2: !this.state.NA2,
                                        form: { ...this.state.form, breathing_rate: 'NA' }
                                    })}
                                />
                                <Text style={styles.label}>Breathing Rate (per minute)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editable && this.state.NA2 ? 'white' : '#eaeaea' }]}
                                editable={this.state.NA2 && this.state.editable}
                                keyboardType='numeric'
                                value={`${this.state.form.breathing_rate}`}
                                onChangeText={(value) => this.setState({
                                    form: { ...this.state.form, breathing_rate: value }
                                })}
                            />
                        </View>

                        <View style={{ width: '47%' }}>

                            <Label style={styles.titleStyle}>Chest In-drawing</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.chestBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, baby_chest_indrawing: "Yes" }, chestBtn1: '#6572e4', chestBtn2: '#eaeaea' })}>
                                    <Text style={styles.textButton}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.chestBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, baby_chest_indrawing: "No" }, chestBtn2: '#6572e4', chestBtn1: '#eaeaea' })}>
                                    <Text style={styles.textButton}>No</Text></Button>

                            </View>

                        </View>


                    </View>

                    {/* x-ray status and x-ray result */}

                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }} >

                            <Label style={styles.titleStyle}>X-Ray Status (Done)</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.xrayStatBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, x_ray_status_done: "Yes" }, xrayStatBtn1: '#6572e4', xrayStatBtn2: '#eaeaea' })}>
                                    <Text style={styles.textButton}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.xrayStatBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, x_ray_status_done: "No" }, xrayStatBtn2: '#6572e4', xrayStatBtn1: '#eaeaea' })}>
                                    <Text style={styles.textButton}>No</Text></Button>

                            </View>
                        </View>


                        <View style={{ width: '47%' }} >

                            <Label style={styles.titleStyle}>X-Ray Result</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.xrayResultBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, x_ray_result: "Normal" }, xrayResultBtn1: '#6572e4', xrayResultBtn2: '#eaeaea' })}>
                                    <Text style={styles.textButton}>Normal</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.xrayResultBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, x_ray_result: "Abnormal" }, xrayResultBtn2: '#6572e4', xrayResultBtn1: '#eaeaea' })}>
                                    <Text style={styles.textButton}>Abnormal</Text></Button>

                            </View>

                        </View>

                    </View>

                    {/* x-ray diagnosis if abnormal */}
                    {this.state.form.x_ray_result == 'Abnormal' && 
                        <View style={{ width: '100%',marginTop:10 }}>
                            <Label style={styles.titleStyle}>X-Ray Diagnosis (if Abnormal) {this.state.form.x_ray_result}</Label>

                            <View style={styles.searchSection}>

                                <Picker
                                    selectedValue={this.state.form.x_ray_status}
                                    style={{ height: 50, width: '100%' }}
                                    mode={'dropdown'}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ form: { ...this.state.form, x_ray_status: itemValue } })}
                                >
                                    <Picker.Item label="Unilateral Haziness" value="Unilateral Haziness" />
                                    <Picker.Item label="Bilateral Haziness" value="Bilateral Haziness" />
                                    <Picker.Item label="Pneumonia" value="Pneumonia" />
                                    <Picker.Item label="Pulmonary Hemorrage" value="Pulmonary Hemorrage" />
                                    <Picker.Item label="TTNB" value="TTNB" />
                                    <Picker.Item label="MAS" value="MAS" />
                                    <Picker.Item label="RDS" value="RDS" />
                                    <Picker.Item label="Other" value="Other" />
                                </Picker>

                            </View>
                        </View>
                    }


                    {/* x-ray diagnosis if other */}
                    <View style={styles.partitionView}>

                        {this.state.form.x_ray_result == 'Abnormal' && this.state.form.x_ray_status == 'Other' ?
                            <View style={{ width: '100%' }} >
                                <Label style={styles.titleStyle}>X-Ray Diagnosis (if other)</Label>
                                <TextInput
                                    style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                    value={`${this.state.form.x_ray_diagnosis_any_other}`}
                                    editable={this.state.editable}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, x_ray_diagnosis_any_other: value } })}

                                />
                            </View> : null
                        }
                    </View>
                    
                    {/* apnea status && apnea diagnosis */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }} >
                            <Label style={styles.titleStyle}>Apnea Status (Presence)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.apneaStatBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, apnea_status: "Yes" }, apneaStatBtn1: '#6572e4', apneaStatBtn2: '#eaeaea' })}>
                                    <Text style={styles.textButton}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.apneaStatBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, apnea_status: "No" }, apneaStatBtn2: '#6572e4', apneaStatBtn1: '#eaeaea' })}>
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>


                        <View style={{ width: '47%',height:80 }}>
                            <Label style={styles.titleStyle}>Apnea Diagnosis</Label>

                            <View style={styles.searchSection}>

                                <Picker
                                    selectedValue={this.state.form.apnea_diagnosis}
                                    style={{ height: 50, width: '100%' }}
                                    mode={'dropdown'}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ form: { ...this.state.form, apnea_diagnosis: itemValue } })}
                                >
                                    <Picker.Item label="Cental Apnea" value="Cental Apnea" />
                                    <Picker.Item label="Obstructive Apnea" value="Obstructive Apnea" />
                                    <Picker.Item label="Mixed Apnea" value="Mixed Apnea" />
                                    <Picker.Item label="NA" value="NA" />
                                </Picker>

                            </View>
                        </View>

                    </View>


                    {/* apnea diagnosis and respiratory support yes/no */}
                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }} >
                            <Label style={styles.titleStyle}>Respiratory Support</Label>
                            <View style={[styles.viewContainer, { marginTop: -5 }]}>
                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.respiratoryBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, baby_respiratory_support_if_yes: "Yes" }, respiratoryBtn1: '#6572e4', respiratoryBtn2: '#eaeaea' })}>
                                    <Text style={styles.textButton}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.respiratoryBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, baby_respiratory_support_if_yes: "No" }, respiratoryBtn2: '#6572e4', respiratoryBtn1: '#eaeaea' })}>
                                    <Text style={styles.textButton}>No</Text></Button>

                            </View>
                        </View>
                    </View>

                    {this.state.form.baby_respiratory_support_if_yes === 'Yes' ? 
                        <View style={styles.partitionView}>
                            <View style={{ width: '100%' }}>
                                <Label style={styles.titleStyle}>Respiratory Support (Type)</Label>
                                <Button iconRight light
                                    disabled={!this.state.editable}
                                    onPress={() => {
                                        this.setState({
                                            isShownPicker: !this.state.isShownPicker
                                        })
                                    }}
                                    style={{
                                        width: '100%', backgroundColor: this.state.editablecolor,
                                        borderColor: '#6572e4', borderWidth: 1, alignItems: 'center', justifyContent: 'center'
                                    }}>
                                    {(this.state.selectedRespiratory.length == 0) ? <Text>Select</Text> :
                                        <Text>{(this.state.selectedRespiratory || []).map((item, index) => {
                                            return <Text key={index} style={{ backgroundColor: '#aeaeae' }}>
                                                {item.label}{" "}
                                            </Text>
                                        })}</Text>}
                                    {this.state.isShownPicker ? <Icon name='close' /> : <Icon name='arrow-down' />}
                                </Button>

                                {this.state.isShownPicker ?
                                    <MultipleSelectPicker
                                        items={items}
                                        onSelectionsChange={(ele) => { this.selectedRespiratoryValues(ele) }}
                                        selectedItems={this.state.selectedRespiratory}
                                        buttonStyle={{ height: 100, justifyContent: 'left', alignItems: 'left' }}
                                        checkboxStyle={{ height: 20, width: 20 }}
                                    />
                                    : null
                                }
                            </View>
                        </View>
                        :  null
                    }

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

BabyRespiratory.contextType = UserContext

export default BabyRespiratory;