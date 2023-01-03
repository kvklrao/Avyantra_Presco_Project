import React, { Component } from 'react';
import styles from '../../GlobalStyling';
import {
    Button,
    Text,
    Icon,
    Item, Label,
    View, Tab, CheckBox
} from "native-base";
import { TextInput, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import UserContext from '../context/studyidContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";

class BabyProfile extends Component {

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
                study_id: ""
                , record_type: "NA"
                , babyMedicalRecord: ""
                , babyMotherMedicalRecord: ""
                , baby_admission_type: "Inborn"
                , baby_age_of_admission: ""
                , baby_birth_date: ""
                , baby_birth_time_hours: ""
                , baby_birth_time_minit: ""
                , baby_date_of_admission: ""
                , baby_gender: "Male"
                , baby_gestational_age: ""
                , baby_gestational_age_unit: "week"
                , baby_mother_name: ""
                , baby_name: ""
                , baby_place_of_birth_name: ""
                , baby_preterm: "Yes"
                , baby_weight_at_admission: ""
                , baby_weight_at_admission_unit: "Kgs"
                , baby_weight_at_birth: ""
                , baby_weight_at_birth_unit: "Kgs"
                , birth_facility: "NICU"
                , hospital_branch_name: ""
                , hospital_id: ""
                , hospital_name: "ASHA"
                , isCreateForm: true
                , is_update: false
                , tab_name: "genral"

                , place_of_delivery: "NA"
                , asphyxia: "NA"
                , baby_apgar_score_five_min: "NA"
                , baby_apgar_score_one_min: "NA"
                , baby_apgar_score_ten_min: "NA"
                , baby_condition_anemia_suspect: "NA"
                , baby_condition_dextrocordia_suspect: "NA"
                , baby_condition_jaundice_suspect: "NA"
                , baby_condition_lbw_suspect: "NA"
                , baby_condition_other_if_suspect: "NA"
                , baby_condition_rds_yes_no: "NA"
                , baby_condition_suspect: "NA"
                , baby_condition_ttnb_suspect: "NA"
                , baby_condition_yes_eos_los: "NA"
                , baby_day_of_event: "NA"
                , baby_lga_sga_aga_suspect: "NA"
                , baby_place_of_birth_pin_code: "NA"
                , baby_shock_aga_suspect: "NA"
                , bleeding_manifestation: "NA"
                , central_peripheral: "NA"
                , coagulopathy: "NA"
                , endocarditis: "NA"
                , hypoxia: "NA"
                , meningitis: "NA"
                , metabolic_acidosis: "NA"
                , peritonitis: "NA"
                , pneumonia: "NA"
                , prelim_diagnosis_feeding_intolerence: "NA"
                , prelim_diagnosis_gastroenteritis: "NA"
                , prelim_diagnosis_hypocalcemia: "NA"
                , prelim_diagnosis_hypoglycemia: "NA"
                , prelim_diagnosis_perinatal: "NA"
                , pulmonary_hemorrhage: "NA"

                , seizures: "NA"
                , septic_arthritis: "NA"
                , skin_pustules: "NA"
                , soft_tissue_abscess: "NA"
                , thrombocytopenia: "NA"
                , umblical_sepsis: "NA"
                , uti: "NA"
                , record_type: "NA"
            },

            //controllers
            NA1: true,//mother medical record number checkbox
            NA2: true, //baby name checkbox
            NA3: true,//mother name checkbox
            NA4: true,//date of admission
            NA5: true,//place of birth
            NA6: true,//date of birth
            NA7: true,//time of birth
            NA8: true,//age at admission
            NA9: true,//gestational age

            //button colors
            admissionTypeBt1: '#6572e4',
            admissionTypeBt2: '#eaeaea',
            babygenderBt1: '#6572e4',
            babygenderBt2: '#eaeaea',
            birthFacilityBt1: '#6572e4',
            birthFacilityBt2: '#eaeaea',
            babyPreTermBt1: '#6572e4',
            babyPreTermBt2: '#eaeaea',

        },

        this.editableAndColor = this.editableAndColor.bind(this);
        this.setColors = this.setColors.bind(this);
        this.loadData = this.loadData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
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
        this.setState({ form: { ...this.state.form, baby_date_of_admission: formattedDate } })

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
        this.setState({ form: { ...this.state.form, baby_birth_date: formattedDate } })
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

        if (this.context != null) {
            this.editableAndColor();
            this.loadData();
        }
    }

    async loadData() {

        await this.setState({ viewForm: true, createForm: false });
        await this.setState({ form: { ...this.state.form, study_id: this.context } });

        var hospitalId = await AsyncStorage.getItem('hospitalId');

        var config = {
            method: 'post',
            url: Constants.manifest.extra.URL + '/patient/get_general/' + this.context + '/' + hospitalId + '/1',
            headers: {}
        };

        axios(config)
            .then(response => {
                var thisdata = response.data.response[0];
                this.setState({
                    form: {
                        ...this.state.form,
                        babyMedicalRecord: thisdata.baby_medical_record_number
                        , babyMotherMedicalRecord: thisdata.baby_mother_medical_record_number
                        , baby_admission_type: thisdata.baby_admission_type
                        , baby_age_of_admission: thisdata.baby_age_of_admission
                        , baby_birth_date: thisdata.baby_birth_date
                        , baby_birth_time_hours: thisdata.baby_birth_time_hours
                        , baby_birth_time_minit: thisdata.baby_birth_time_minit
                        , baby_date_of_admission: thisdata.baby_date_of_admission
                        , baby_gender: thisdata.baby_gender
                        , baby_gestational_age: thisdata.baby_gestational_age
                        // // , baby_gestational_age_unit: "week"
                        , baby_mother_name: thisdata.mother_name
                        , baby_name: thisdata.baby_name
                        , baby_place_of_birth_name: thisdata.baby_place_of_birth_name
                        , baby_preterm: thisdata.baby_preterm
                        , baby_weight_at_admission: thisdata.baby_weight_at_admission
                        // //, baby_weight_at_admission_unit: "Kgs"
                        , baby_weight_at_birth: thisdata.baby_weight_at_birth
                        // // , baby_weight_at_birth_unit: "Kgs"
                        , birth_facility: thisdata.birth_facility
                        , hospital_branch_name: thisdata.hospital_branch_name
                        , hospital_id: thisdata.hospital_id
                        , hospital_branch_id: thisdata.hospital_branch_id
                        // , hospital_name: "ASHA"
                        , isCreateForm: true
                        , is_update: false
                        // , tab_name: "genral"

                    }
                })
                this.setColors();
            })
            .catch(error => {
                console.log(error);
            });

        await AsyncStorage.setItem('babyprofileNonInvasive', JSON.stringify(this.state.form));
    }

    async handleSubmit(event) {

        event.preventDefault();

        var hospitalId = await AsyncStorage.getItem('hospitalId');
        var data = {
            "baby_medical_record_number": this.state.form.babyMedicalRecord,
            "baby_mother_medical_record_number": this.state.form.babyMotherMedicalRecord,
            "baby_mother_name": this.state.form.baby_mother_name,
            "baby_name": this.state.form.baby_name,
            "hospitalType": 7,
            "hospital_id": hospitalId,
            "hospital_type_id": 7
        }

        var config = {
            method: 'post',
            url: Constants.manifest.extra.URL  + '/patient/create',
            data: data
        };

        axios(config)
            .then(async response => {

                if (response.data.error) {
                    Alert.alert('medical record already exists');

                } else {
                    
                    var hospitalId = await AsyncStorage.getItem('hospitalId');

                    await this.setState({ form: { ...this.state.form, study_id: response.data.response.id, hospital_id: hospitalId } });

                    /***
                     * 
                     * Save the new Study ID created in ASYNC storage. IMP ** 
                     * 
                     */
                    await AsyncStorage.setItem('studyId', JSON.stringify(response.data.response.id));
                    /**
                     * 
                     * END Note
                     * 
                     */

                    var data2 = await JSON.stringify(this.state.form);
                    var userId = await AsyncStorage.getItem('userId');

                    var config2 = {
                        method: 'post',
                        url: Constants.manifest.extra.URL + '/patient/general/add/' + userId,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: data2
                    };

                    await axios(config2)
                        .then(response => {
                            Alert.alert('Baby profile and Patient details created.');
                            this.setState({ editable: false, viewForm: true, createForm: false, editablecolor: '#c4c4c4' });
                        })
                        .catch(function (error) {
                            Alert.alert('Unable to create baby profile');
                            console.log(error)
                        });
                }
            })
            .catch(error => {
                Alert.alert('Unable to create patient details');
                console.log(error)

            });

        await AsyncStorage.setItem('babyprofileNonInvasive', JSON.stringify(this.state.form));

    }

    async setColors() {
        // set the background color of buttons acccording to state

        if (this.state.form.baby_admission_type == "Inborn") {
            await this.setState({ admissionTypeBt1: '#6572e4', admissionTypeBt2: '#eaeaea' });
        } else {
            await this.setState({ admissionTypeBt2: '#6572e4', admissionTypeBt1: '#eaeaea' })
        }

        if (this.state.form.baby_gender == "Male") {
            await this.setState({ babygenderBt1: '#6572e4', babygenderBt2: '#eaeaea' });
        } else {
            await this.setState({ babygenderBt2: '#6572e4', babygenderBt1: '#eaeaea' })
        }

        if (this.state.form.birth_facility == "NICU") {
            await this.setState({ birthFacilityBt1: '#6572e4', birthFacilityBt2: '#eaeaea' });
        } else {
            await this.setState({ birthFacilityBt2: '#6572e4', birthFacilityBt1: '#eaeaea' })
        }

        if (this.state.form.baby_preterm == "Yes") {
            await this.setState({ babyPreTermBt1: '#6572e4', babyPreTermBt2: '#eaeaea' });
        } else {
            await this.setState({ babyPreTermBt2: '#6572e4', babyPreTermBt1: '#eaeaea' })
        }

    }


    async handleUpdate() {

        // take data and fireup update api request
        await this.setState({ form: { ...this.state.form, isCreateForm: false, is_update: true } });

        var userId = await AsyncStorage.getItem('userId');
        var data = JSON.stringify(this.state.form);

        var config = {
            method: 'put',
            url: Constants.manifest.extra.URL  + '/patient/update/babyProfile/' + this.context + '/' + userId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(response => {
                Alert.alert("updated baby profile")
                this.setState({ editable: false, editablecolor: '#eaeaea', viewForm: true, editForm: false, createForm: false });
                this.setState({ form: { ...this.state.form, isCreateForm: true, is_update: false } })
            })
            .catch(error => {
                console.log(error);
            });

        await AsyncStorage.setItem('babyprofileNonInvasive', JSON.stringify(this.state.form));

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


                    {/* bmr number */}
                    <Label style={styles.titleStyle}>Baby Medical Record Number</Label>
                    <TextInput
                        style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                        value={`${this.state.form.babyMedicalRecord}`}
                        editable={this.state.editable}
                        keyboardType='numeric'
                        onChangeText={(value) => this.setState({ form: { ...this.state.form, babyMedicalRecord: value } })}

                    />


                    {/* mother record number */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            checked={this.state.NA1}
                            disabled={!this.state.editable}
                            onPress={() => this.setState({ NA1: !this.state.NA1, form: { ...this.state.form, babyMotherMedicalRecord: 'NA' } })}
                        />
                        <Text style={styles.label}>Mother Medical Record Number</Text>
                    </View>
                    <TextInput
                        style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                        editable={this.state.NA1 && this.state.editable}
                        keyboardType='numeric'
                        value={`${this.state.form.babyMotherMedicalRecord}`}
                        onChangeText={(value) => this.setState({ form: { ...this.state.form, babyMotherMedicalRecord: value } })}
                    />

                    {/* baby name */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            checked={this.state.NA2}
                            disabled={!this.state.editable}
                            onPress={() => this.setState({ NA2: !this.state.NA2, form: { ...this.state.form, baby_name: 'NA' } })}
                        />
                        <Text style={styles.label}>Baby Name</Text>
                    </View>
                    <TextInput
                        style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                        editable={this.state.NA2 && this.state.editable}
                        value={`${this.state.form.baby_name}`}
                        onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_name: value } })}
                    />


                    {/* mother name */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            checked={this.state.NA3}
                            disabled={!this.state.editable}
                            onPress={() => this.setState({ NA3: !this.state.NA3, form: { ...this.state.form, baby_mother_name: 'NA' } })}
                        />
                        <Text style={styles.label}>Mother Name</Text>
                    </View>
                    <TextInput
                        style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                        editable={this.state.NA3 && this.state.editable}
                        value={`${this.state.form.baby_mother_name}`}
                        onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_mother_name: value } })}
                    />


                    {/* admission type and date of admission */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '45%' }}  >
                            <Label style={[styles.titleStyle]}>Admission Type</Label>
                            <View style={[styles.viewContainer, { marginTop: -5 }]}>
                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.admissionTypeBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, baby_admission_type: "Inborn" }, admissionTypeBt1: '#6572e4', admissionTypeBt2: '#eaeaea' })}
                                >
                                    <Text style={styles.textButton}>Inborn</Text>
                                </Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.admissionTypeBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, baby_admission_type: "Outborn" }, admissionTypeBt2: '#6572e4', admissionTypeBt1: '#eaeaea' })}
                                >
                                    <Text style={styles.textButton}>Outborn</Text></Button>
                            </View>
                        </View>


                        <View style={{ width: '47%', marginLeft: 10 }} >
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    style={styles.checkbox}
                                    checked={this.state.NA4}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ NA4: !this.state.NA4, form: { ...this.state.form, baby_date_of_admission: 'NA' } })}
                                />
                                <Text style={styles.label}>Date of Admission</Text>
                            </View>
                            {this.state.show1 && <DateTimePicker
                                value={this.state.date1}
                                mode={this.state.mode1}
                                display="default"
                                onChange={this.setDate1}
                            />}

                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                value={`${this.state.form.baby_date_of_admission}`}
                                onFocus={this.datepicker1}
                                editable={this.state.NA4 && this.state.editable}
                            />

                        </View>
                    </View>


                    {/* baby gender and birth facility */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Baby Gender</Label>
                            <View style={styles.viewContainer}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.babygenderBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_gender: "Male" },
                                        babygenderBt1: '#6572e4', babygenderBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Male</Text>
                                </Button>

                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.babygenderBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, baby_gender: "Female" }, babygenderBt2: '#6572e4', babygenderBt1: '#eaeaea' })}>
                                    <Text style={styles.textButton}>Female</Text></Button>

                            </View>
                        </View>

                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Birth Facility</Label>
                            <View style={[styles.viewContainer]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.birthFacilityBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, birth_facility: "NICU" },
                                        birthFacilityBt1: '#6572e4', birthFacilityBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>NICU</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.birthFacilityBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, birth_facility: "ICU" },
                                        birthFacilityBt2: '#6572e4', birthFacilityBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>ICU</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* place of birth */}
                    <View style={{ backgroundColor: '##eaeaea', marginTop: 10 }}>

                        <View style={{ width: '100%' }} >
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    style={styles.checkbox}
                                    checked={this.state.NA6}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ NA6: !this.state.NA6, form: { ...this.state.form, baby_birth_date: 'NA' } })}
                                />
                                <Text style={styles.label}>Date of Birth</Text>
                            </View>
                            {this.state.show2 && <DateTimePicker
                                value={this.state.date2}
                                mode={this.state.mode2}
                                display="default"
                                onChange={this.setDate2}
                            />}

                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={this.state.NA6 && this.state.editable}
                                value={`${this.state.form.baby_birth_date}`}
                                onFocus={this.datepicker2}
                            />

                        </View>
                    </View>

                    {/* time of birth */}
                    <View style={{ width: '100%' }} >

                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                checked={this.state.NA7}
                                disabled={!this.state.editable}
                                onPress={() => this.setState({ NA7: !this.state.NA7, form: { ...this.state.form, baby_birth_time_hours: 'NA', baby_birth_time_minit: 'NA' } })}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>Time of Birth</Text>
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
                                    editable={this.state.NA7 && this.state.editable}
                                    value={`${this.state.form.baby_birth_time_hours}`}
                                    keyboardType='numeric'
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_birth_time_hours: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={10} color="#000" >
                                    <Text style={styles.iconText}>Hrs</Text></Icon>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    editable={this.state.NA7 && this.state.editable}
                                    value={`${this.state.form.baby_birth_time_minit}`}
                                    keyboardType='numeric'
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_birth_time_minit: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={10} color="#000" >
                                    <Text style={styles.iconText}>Min</Text></Icon>
                            </View>

                        </View>

                    </View>


                    {/* age at admission and gestational age */}
                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.NA8}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ NA8: !this.state.NA8, form: { ...this.state.form, baby_age_of_admission: 'NA' } })}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>Age at Admission</Text>
                            </View>

                            <View style={styles.searchSection}>
                                <TextInput
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    editable={this.state.NA8 && this.state.editable}
                                    value={`${this.state.form.baby_age_of_admission}`}
                                    keyboardType='numeric'
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_age_of_admission: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={10} color="#000" >
                                    <Text style={styles.iconText}>days</Text></Icon>
                            </View>
                        </View>
                        <View style={{ width: '47%', }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.NA9}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ NA9: !this.state.NA9, form: { ...this.state.form, baby_gestational_age: 'NA' } })}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>Gestational Age</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    editable={this.state.NA9 && this.state.editable}
                                    value={`${this.state.form.baby_gestational_age}`}
                                    keyboardType='numeric'
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_gestational_age: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={10} color="#000" >
                                    <Text style={styles.iconText}>week</Text></Icon>
                            </View>
                        </View>

                    </View>


                    {/* weight at birth and weight at admission */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Weight at Birth</Label>
                            <View style={styles.searchSection}>
                                <TextInput
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    editable={this.state.editable}
                                    keyboardType='numeric'
                                    value={`${this.state.form.baby_weight_at_birth}`}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_weight_at_birth: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={10} color="#000" >
                                    <Text style={styles.iconText}>Kgs</Text></Icon>
                            </View>
                        </View>
                        <View style={{ width: '47%', }}>
                            <Label style={styles.titleStyle}>Weight at Admission</Label>
                            <View style={styles.searchSection}>
                                <TextInput
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    editable={this.state.editable}
                                    value={`${this.state.form.baby_weight_at_admission}`}
                                    keyboardType='numeric'
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_weight_at_admission: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={10} color="#000" >
                                    <Text style={styles.iconText}>kgs</Text></Icon>
                            </View>
                        </View>
                    </View>

                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Preterm</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.babyPreTermBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_preterm: "Yes" },
                                        babyPreTermBt1: '#6572e4', babyPreTermBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.babyPreTermBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_preterm: "No" },
                                        babyPreTermBt2: '#6572e4', babyPreTermBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%',marginTop:20 }} >
                            <View style={[styles.viewContainer
                            ]}>
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

                </View>
            </ScrollView >

        );
    }
}

BabyProfile.contextType = UserContext

export default BabyProfile