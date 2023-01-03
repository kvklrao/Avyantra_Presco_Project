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
    { label: 'Amikacin', value: '1' },
    { label: 'Piptaz', value: '2' },
    { label: 'Vancomycin', value: '3' },
    { label: 'Augmentic', value: '4' },
    { label: 'Cefotaxim', value: '5' },
    { label: 'Tozobactum', value: '5' },
    { label: 'Others', value: '7' },
]


class BabyAntibiotic extends Component {


    constructor(props) {
        super(props)
        this.state = {
            date1: new Date(),
            mode1: 'date',
            show1: false,

            date2: new Date(),
            mode2: 'date',
            show2: false,

            selectedItemsAntibioticName: [],
            isShownPickerAN: false,

            //by default assuming create form
            editable: true,
            viewForm: false,
            editForm: false,
            createForm: true,
            editablecolor: 'white',

            form: {
                antibiotic_given: "Yes"
                , antibiotic_name: "[]"
                , antibiotic_name_if_other: ""
                , blood_sample_taken_prior_to_antiobiotic_administration: "Yes"
                , date_of_administration_of_antiobiotic: "NA"
                , date_of_blood_samples_sent_for_culture_test: "NA"
                , reading: "R1"
                , study_id: ""
                , time_of_administration_of_antiobiotic_hours: "NA"
                , time_of_administration_of_antiobiotic_minute: "NA"
                , time_of_blood_samples_sent_for_culture_test_hours: "NA"
                , time_of_blood_samples_sent_for_culture_test_minute: "NA"
            },

            //controllers
            NA1: true,
            NA2: true,
            NA3: true,
            NA4: true,// time of blood samples
            AntibioticNameNA: true,

            //button colors
            antibioticBtn1: '#6572e4',
            antibioticBtn2: '#eaeaea',
            bloodSampleBtn1: '#6572e4',
            bloodSampleBtn2: '#eaeaea'

        },

        this.editableAndColor = this.editableAndColor.bind(this);
        this.setColors = this.setColors.bind(this);
        this.loadData = this.loadData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.saveReading = this.saveReading.bind(this);
        this.forCreateForm = this.forCreateForm.bind(this);
        this.populateSelectedValues = this.populateSelectedValues.bind(this);
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


    async handleSubmit(event) {

        event.preventDefault();

        this.saveReading();
        this.setState({ editable: false, viewForm: true, createForm: false, editablecolor: '#c4c4c4' });
        await AsyncStorage.setItem('babyantibiotic', JSON.stringify(this.state.form))
            .then(() => {
                console.log('baby antibiotic data saved 1');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async saveReading() {
        var form1 = await AsyncStorage.getItem('babyappearance')
            .then((value) => {
                let data = JSON.parse(value);
                return data
            })
            .catch((error) => {
                console.log(error);
            });

        var form2 = await AsyncStorage.getItem('babyrespiratory')
            .then((value) => {
                let data = JSON.parse(value);
                return data
            })
            .catch((error) => {
                console.log(error);
            });

        var form3 = await AsyncStorage.getItem('babycardio')
            .then((value) => {
                let data = JSON.parse(value);
                return data
            })
            .catch((error) => {
                console.log(error);
            });

        var form4 = await AsyncStorage.getItem('babycns')
            .then((value) => {
                let data = JSON.parse(value);
                return data
            })
            .catch((error) => {
                console.log(error);
            });

        var form5 = await AsyncStorage.getItem('babygit')
            .then((value) => {
                let data = JSON.parse(value);
                return data
            })
            .catch((error) => {
                console.log(error);
            });

        var form6 = await AsyncStorage.getItem('babyinvestigation')
            .then((value) => {
                let data = JSON.parse(value);
                return data
            })
            .catch((error) => {
                console.log(error);
            });

        var form7 = await this.state.form;
        var studyId = await AsyncStorage.getItem('studyId');

        var readingData = {
            baby_appears: form1,
            baby_resp: form2,
            baby_cv: form3,
            baby_cns: form4,
            baby_git: form5,
            baby_investigation: form6,
            baby_antibiotic: form7,
            baby_final: {
                study_id: studyId,
                days_of_stay_in_hospital: 'NA',
                final_diagnosis_sepsis: 'NA',
                final_diagnosis_rds: 'NA',
                final_diagnosis_ttnb: 'NA',
                final_diagnosis_jaundice: 'NA',
                final_diagnosis_lbw: 'NA',
                final_diagnosis_lga: 'NA',
                final_diagnosis_aga: 'NA',
                final_diagnosis_anemia: 'NA',
                final_diagnosis_dextochordia: 'NA',
                final_diagnosis_hypoglycemia: 'NA',
                final_diagnosis_hypocalcemia: 'NA',
                final_diagnosis_gastroenteritis: 'NA',
                final_diagnosis_perinatal_respiratory_depression: 'NA',
                final_diagnosis_shock: 'NA',
                final_diagnosis_feeding_intolerence: 'NA',
                baby_discharge_date: 'NA',
                final_diagnosis_sga: 'NA',
                final_diagnosis_eos_los: 'NA',
                final_diagnosis_other: 'NA',
                reading: 'R1'
            }
        }

        const userId = await AsyncStorage.getItem('userId');
        var data1 = JSON.stringify(readingData);

        var config = {
            method: 'post',
            url: Constants.manifest.extra.URL + '/patient/models/save/' + userId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data1
        };

        axios(config)
            .then(response => {
                Alert.alert('All invasive forms reading submitted!')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async setColors() {

        // set the background color of buttons acccording to state
        if (this.state.form.skin_pustules == "Yes") {
            await this.setState({ antibioticBtn1: '#6572e4', antibioticBtn2: '#eaeaea' });
        } else {
            await this.setState({ antibioticBtn2: '#6572e4', antibioticBtn1: '#eaeaea' })
        }

        if (this.state.form.blood_sample_taken_prior_to_antiobiotic_administration == "Yes") {
            await this.setState({ bloodSampleBtn1: '#6572e4', bloodSampleBtn2: '#eaeaea' });
        } else {
            await this.setState({ bloodSampleBtn2: '#6572e4', bloodSampleBtn1: '#eaeaea' })
        }

    }

    renameKeys(obj, newKeys) {
        const keyValues = Object.keys(obj).map(key => {
            const newKey = newKeys[key] || key;
            return { [newKey]: obj[key] };
        });
        return Object.assign({}, ...keyValues);
    }

    selectedValuesAN(ele) {
        let temp = []
        this.setState({ selectedItemsAntibioticName: ele })
        for (let i = 0; i < ele.length; i++) {
            const obj = ele[i];
            const newKeys = { label: "itemValue", value: "id" };
            const renamedObj = this.renameKeys(obj, newKeys);
            temp.push(renamedObj)
        }
        this.setState({ form: { ...this.state.form, antibiotic_name: temp } })
    }

    populateSelectedValues(elems) {

        let selectedVals = [];

        for (let i = 0; i < elems.length; i++) {
            const obj = elems[i];
            const newKeys = { itemValue: "label", id: "value" }; 
            const renamedObj = this.renameKeys(obj, newKeys);
            selectedVals.push(renamedObj)
        }

        this.setState({ selectedItemsAntibioticName: selectedVals });
    }

    async loadData() {

        await this.setState({ viewForm: true, createForm: false });
        await this.setState({ form: { ...this.state.form, study_id: this.context } });

        var hospitalId = await AsyncStorage.getItem('hospitalId');
        
        var config = {
            method: 'get',
            url: Constants.manifest.extra.URL + '/patient/baby_antibiotic/' + this.context + '/' + hospitalId + '/1/R1',
            headers: {}
        };

        axios(config)
            .then(response => {

                var thisdata = response.data.response[0];

                if(!thisdata){
                    Alert.alert('You have not saved the Antibiotic data yet. Please do so.')
                }

                var antibiotics = JSON.parse(thisdata.antibiotic_name)
                this.populateSelectedValues(antibiotics);

                this.setState({
                    form: {
                        ...this.state.form,
                        antibiotic_given: thisdata.antibiotic_given
                        , antibiotic_name: antibiotics
                        , antibiotic_name_if_other: thisdata.antibiotic_name_if_other
                        , blood_sample_taken_prior_to_antiobiotic_administration: thisdata.blood_sample_taken_prior_to_antiobiotic_administration
                        , date_of_administration_of_antiobiotic: thisdata.date_of_administration_of_antiobiotic
                        , date_of_blood_samples_sent_for_culture_test: thisdata.date_of_blood_samples_sent_for_culture_test
                        , reading: "R1"
                        , time_of_administration_of_antiobiotic_hours: thisdata.time_of_administration_of_antiobiotic_hours
                        , time_of_administration_of_antiobiotic_minute: thisdata.time_of_administration_of_antiobiotic_minute
                        , time_of_blood_samples_sent_for_culture_test_hours: thisdata.time_of_blood_samples_sent_for_culture_test_hours
                        , time_of_blood_samples_sent_for_culture_test_minute: thisdata.time_of_blood_samples_sent_for_culture_test_minute

                    }
                })
                this.setColors();
            })
            .catch(error => {
                console.log(error);
            });

        await AsyncStorage.setItem('babyantibiotic', JSON.stringify(this.state.form))
            .then(() => {
                console.log('baby antibiotic data saved 2');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async handleUpdate() {

        // take data and fireup update api request
        var data = JSON.stringify(this.state.form);
        var apiData = JSON.parse(data); // We need to transform some of the data before calling the API. Copy to a new var, so as not to modify the state.
        apiData['antibiotic_name'] = JSON.stringify(apiData['antibiotic_name']);

        var userId = await AsyncStorage.getItem('userId');
        var config = {
            method: 'put',
            url: Constants.manifest.extra.URL  + '/patient/update/baby_antibiotic/' + this.context + '/R1/' + userId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: apiData
        };

        let res;

        try{
            res = await AsyncStorage.setItem('babyantibiotic', JSON.stringify(this.state.form));
            res = await axios(config);

            Alert.alert("Updated baby antibiotic data.")
            this.setState({ editable: false, editablecolor: '#c4c4c4', editForm: false, viewForm: true, createForm: false });
        }
        catch(error){
            Alert.alert(error.response.data.errors[0].param + ' --> ' + error.response.data.errors[0].msg)
            console.log(error.response);
        }
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

                    {/* antibiotic given and date of administration */}
                    <View style={styles.partitionView}>

                        <View style={{ width: '45%' }}  >

                            <Label style={styles.titleStyle}>Antibiotic Given</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.antibioticBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, antibiotic_given: "Yes" }, antibioticBtn1: '#6572e4', antibioticBtn2: '#eaeaea' })}
                                >
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.antibioticBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, antibiotic_given: "No" }, antibioticBtn2: '#6572e4', antibioticBtn1: '#eaeaea' })}
                                >
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>


                        <View style={{ width: '47%', marginLeft: 10 }} >
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    style={styles.checkbox}
                                    checked={this.state.NA1}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ NA1: !this.state.NA1, form: { ...this.state.form, date_of_administration_of_antiobiotic: 'NA' } })}
                                />
                                <Text style={styles.label}>Date of Administration</Text>
                            </View>
                            {this.state.show1 && <DateTimePicker
                                value={this.state.date1}
                                mode={this.state.mode1}
                                display="default"
                                onChange={this.setDate1}
                            />}

                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                value={`${this.state.form.date_of_administration_of_antiobiotic}`}
                                onFocus={this.datepicker1}
                                editable={this.state.NA1 && this.state.editable}
                            />

                        </View>
                    </View>

                    {/* time of administration */}
                    <View style={{ width: '100%' }} >

                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                checked={this.state.NA2}
                                disabled={!this.state.editable}
                                onPress={() => this.setState({ NA2: !this.state.NA2, form: { ...this.state.form, time_of_administration_of_antiobiotic_hours: 'NA', time_of_administration_of_antiobiotic_minute: 'NA' } })}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>Time of administration (0-23 Hours)</Text>
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
                                    value={`${this.state.form.time_of_administration_of_antiobiotic_hours}`}
                                    keyboardType='numeric'
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, time_of_administration_of_antiobiotic_hours: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={10} color="#000" >
                                    <Text style={styles.iconText}>Hrs</Text></Icon>
                            </View>
                            <View style={[styles.searchSection, { marginLeft: '8%' }]}>
                                <TextInput
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    editable={this.state.NA2 && this.state.editable}
                                    value={`${this.state.form.time_of_administration_of_antiobiotic_minute}`}
                                    keyboardType='numeric'
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, time_of_administration_of_antiobiotic_minute: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={10} color="#000" >
                                    <Text style={styles.iconText}>Min</Text></Icon>
                            </View>

                        </View>

                    </View>

                    {/* Antibiotic Name and other */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '100%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.AntibioticNameNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        AntibioticNameNA: !this.state.AntibioticNameNA,
                                        form: { ...this.state.form, antibiotic_name: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Antibiotic Name</Text>
                            </View>
                            <Button iconRight light
                                disabled={!this.state.editable || !this.state.AntibioticNameNA}
                                onPress={() => {
                                    this.setState({
                                        isShownPickerAN: !this.state.isShownPickerAN
                                    })
                                }}
                                style={{
                                    width: '100%', backgroundColor: this.state.editablecolor,
                                    borderColor: '#6572e4', borderWidth: 1, alignItems: 'center', justifyContent: 'center'
                                }}>
                                {(this.state.selectedItemsAntibioticName.length == 0) ? <Text>Select</Text> :
                                    <Text>{(this.state.selectedItemsAntibioticName || []).map((item, index) => {
                                        return <Text key={index} style={{ backgroundColor: '#aeaeae' }}>
                                            {item.label}{" "}
                                        </Text>
                                    })}</Text>}
                                {this.state.isShownPickerAN ? <Icon name='close' /> : <Icon name='arrow-down' />}
                            </Button>

                            {this.state.isShownPickerAN ?
                                <MultipleSelectPicker
                                    items={items}
                                    onSelectionsChange={(ele) => { this.selectedValuesAN(ele) }}
                                    selectedItems={this.state.selectedItemsAntibioticName}
                                    buttonStyle={{ height: 100, justifyContent: 'left', alignItems: 'left' }}
                                    checkboxStyle={{ height: 20, width: 20 }}
                                />
                                : null
                            }
                        </View>
                    </View>

                    <View style={styles.partitionView}>
                        <View style={{ width: '100%', }}>
                            <Label style={styles.titleStyle}>Antibiotic Name (Other)</Label>
                            <View style={styles.searchSection}>
                                <TextInput
                                    editable={this.state.editable}
                                    value={`${this.state.form.antibiotic_name_if_other}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, antibiotic_name_if_other: value } })}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        </View>
                    </View>


                    {/* Blood Samples for Culture Test */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            checked={this.state.NA3}
                            disabled={!this.state.editable}
                            onPress={() => this.setState({ NA3: !this.state.NA3, form: { ...this.state.form, date_of_blood_samples_sent_for_culture_test: 'NA' } })}
                        />
                        <Text style={styles.label}>Blood Samples for Culture Test</Text>
                    </View>
                    {this.state.show2 && <DateTimePicker
                        value={this.state.date2}
                        mode={this.state.mode2}
                        display="default"
                        onChange={this.setDate2}
                    />}

                    <TextInput
                        style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                        value={`${this.state.form.date_of_blood_samples_sent_for_culture_test}`}
                        onFocus={this.datepicker2}
                        editable={this.state.NA3 && this.state.editable}
                    />


                    {/* time of blood samples */}
                    <View style={{ width: '100%' }} >

                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                checked={this.state.NA4}
                                disabled={!this.state.editable}
                                onPress={() => this.setState({ NA4: !this.state.NA4, form: { ...this.state.form, time_of_blood_samples_sent_for_culture_test_hours: 'NA', time_of_blood_samples_sent_for_culture_test_minute: 'NA' } })}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>Time of Blood Samples(0-23 Hours)</Text>
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
                                    editable={this.state.NA4 && this.state.editable}
                                    value={`${this.state.form.time_of_blood_samples_sent_for_culture_test_hours}`}
                                    keyboardType='numeric'
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, time_of_blood_samples_sent_for_culture_test_hours: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={10} color="#000" >
                                    <Text style={styles.iconText}>Hrs</Text></Icon>
                            </View>
                            <View style={[styles.searchSection, { marginLeft: '8%' }]}>
                                <TextInput
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    editable={this.state.NA4 && this.state.editable}
                                    value={`${this.state.form.time_of_blood_samples_sent_for_culture_test_minute}`}
                                    keyboardType='numeric'
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, time_of_blood_samples_sent_for_culture_test_minute: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={10} color="#000" >
                                    <Text style={styles.iconText}>Min</Text></Icon>
                            </View>

                        </View>

                    </View>

                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>

                            <Label style={styles.titleStyle}>Blood Sample Taken Prior to Antibiotic administration</Label>

                            <View style={[styles.viewContainer, { marginTop: -10 }]}>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.bloodSampleBtn1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, blood_sample_taken_prior_to_antiobiotic_administration: "Yes" }, bloodSampleBtn1: '#6572e4', bloodSampleBtn2: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>Yes</Text></Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.bloodSampleBtn2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, blood_sample_taken_prior_to_antiobiotic_administration: "No" }, bloodSampleBtn2: '#6572e4', bloodSampleBtn1: '#eaeaea' })}>
                                    <Text style={{ color: 'black' }}>No</Text></Button>

                            </View>

                        </View>
                        <View style={{ marginTop: 45, width: '47%' }}>
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
                </View>
            </ScrollView >

        );
    }
}

BabyAntibiotic.contextType = UserContext

export default BabyAntibiotic;