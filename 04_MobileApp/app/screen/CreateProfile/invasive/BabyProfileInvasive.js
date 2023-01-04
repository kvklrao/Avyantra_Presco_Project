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

class BabyProfileInvasive extends Component {


    constructor(props) {
        super(props)
        this.state = {
            date1: new Date(),
            mode1: 'date',
            show1: false,

            date2: new Date(),
            mode2: 'date',
            show2: false,

            invasive: true,

            //by default assuming create form
            editable: true,
            viewForm: false,
            editForm: false,
            createForm: true,

            editablecolor: 'white',

            form: {
                study_id: ""
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
                , hospital_branch_name: null
                , hospital_id: ""
                , hospital_name: "ASHA"
                , isCreateForm: true
                , is_update: false
                , tab_name: "genral"
                , place_of_delivery: "Hospital"

                , asphyxia: "Yes"
                , baby_apgar_score_five_min: ""
                , baby_apgar_score_one_min: ""
                , baby_apgar_score_ten_min: ""
                , baby_day_of_event: ""
                , baby_place_of_birth_pin_code: ""

                , baby_condition_anemia_suspect: "Yes"
                , baby_condition_dextrocordia_suspect: "Yes"
                , baby_condition_jaundice_suspect: "Yes"
                , baby_condition_lbw_suspect: "Yes"
                , baby_condition_other_if_suspect: ""
                , baby_condition_rds_yes_no: "Yes"
                , baby_condition_suspect: "Yes"
                , baby_condition_ttnb_suspect: "Yes"
                , baby_condition_yes_eos_los: "Eos"

                , baby_lga_sga_aga_suspect: "LGA"

                , baby_shock_aga_suspect: "Yes"
                , bleeding_manifestation: "Yes"
                , central_peripheral: "Yes"
                , coagulopathy: "Yes"
                , endocarditis: "Yes"
                , hypoxia: "Yes"
                , meningitis: "Yes"
                , metabolic_acidosis: "Yes"
                , peritonitis: "Yes"
                , pneumonia: "Yes"
                , prelim_diagnosis_feeding_intolerence: "Yes"
                , prelim_diagnosis_gastroenteritis: "Yes"
                , prelim_diagnosis_hypocalcemia: "Yes"
                , prelim_diagnosis_hypoglycemia: "Yes"
                , prelim_diagnosis_perinatal: "Yes"
                , pulmonary_hemorrhage: "Yes"
                , record_type: "Current"
                , seizures: "Yes"
                , septic_arthritis: "Yes"
                , skin_pustules: "Yes"
                , soft_tissue_abscess: "Yes"
                , thrombocytopenia: "Yes"
                , umblical_sepsis: "Yes"
                , uti: "Yes"
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
            NA10: true, //pincode
            ApgarScore1NA: true,
            ApgarScore5NA: true,
            ApgarScore10NA: true,
            DiagnoEOSLOSNA: true,
            DiagnosisOthersNA: true,
            dayOfSepsisEventNA: true,

            //button colors
            admissionTypeBt1: '#6572e4',
            admissionTypeBt2: '#eaeaea',
            babygenderBt1: '#6572e4',
            babygenderBt2: '#eaeaea',
            birthFacilityBt1: '#6572e4',
            birthFacilityBt2: '#eaeaea',
            babyPreTermBt1: '#6572e4',
            babyPreTermBt2: '#eaeaea',
            DiagnoProbableSepsisBt1: '#6572e4',
            DiagnoProbableSepsisBt2: '#eaeaea',
            DiagnoEosLosBt1: '#6572e4',
            DiagnoEosLosBt2: '#eaeaea',
            DiagnoMeningitisBt1: '#6572e4',
            DiagnoMeningitisBt2: '#eaeaea',
            DiagnoUmblicalSepsisBt1: '#6572e4',
            DiagnoUmblicalSepsisBt2: '#eaeaea',
            DiagnoSkinPustulatesBt1: '#6572e4',
            DiagnoSkinPustulatesBt2: '#eaeaea',
            DiagnoRDSBt1: '#6572e4',
            DiagnoRDSBt2: '#eaeaea',
            DiagnoJaundiceBt1: '#6572e4',
            DiagnoJaundiceBt2: '#eaeaea',
            DiagnoLBWBt1: '#6572e4',
            DiagnoLBWBt2: '#eaeaea',
            DiagnoTTNBBt1: '#6572e4',
            DiagnoTTNBBt2: '#eaeaea',
            DiagnoShockBt1: '#6572e4',
            DiagnoShockBt2: '#eaeaea',
            DiagnoHeartBt1: '#6572e4',
            DiagnoHeartBt2: '#eaeaea',
            DiagnoAnemiaBt1: '#6572e4',
            DiagnoAnemiaBt2: '#eaeaea',
            DiagnoRespiratoryBt1: '#6572e4',
            DiagnoRespiratoryBt2: '#eaeaea',
            DiagnoHypoglycemiaBt1: '#6572e4',
            DiagnoHypoglycemiaBt2: '#eaeaea',
            DiagnoHypocalcemiaBt1: '#6572e4',
            DiagnoHypocalcemiaBt2: '#eaeaea',
            DiagnoFeedingIntolBt1: '#6572e4',
            DiagnoFeedingIntolBt2: '#eaeaea',
            DiagnoThrombocytopeniaBt1: '#6572e4',
            DiagnoThrombocytopeniaBt2: '#eaeaea',
            DiagnoSeizuresBt1: '#6572e4',
            DiagnoSeizuresBt2: '#eaeaea',
            DiagnoGasBt1: '#6572e4',
            DiagnoGasBt2: '#eaeaea',
            DiagnoAsphyxiaBt1: '#6572e4',
            DiagnoAsphyxiaBt2: '#eaeaea',
            DiagnoPneumoniaBt1: '#6572e4',
            DiagnoPneumoniaBt2: '#eaeaea',
            DiagnoSepticArthritisBt1: '#6572e4',
            DiagnoSepticArthritisBt2: '#eaeaea',
            DiagnoEndocarditisBt1: '#6572e4',
            DiagnoEndocarditisBt2: '#eaeaea',
            DiagnoPeritonitisBt1: '#6572e4',
            DiagnoPeritonitisBt2: '#eaeaea',
            DiagnoSoftTissueBt1: '#6572e4',
            DiagnoSofttissueBt2: '#eaeaea',
            DiagnoCoagulopathyBt1: '#6572e4',
            DiagnoCoagulopathyBt2: '#eaeaea',
            DiagnoUTIBt1: '#6572e4',
            DiagnoUTIBt2: '#eaeaea',
            DiagnoPulmonaryBt1: '#6572e4',
            DiagnoPulmonaryBt2: '#eaeaea',
            DiagnoBleedingManifestationBt1: '#6572e4',
            DiagnoBleedingManifestationBt2: '#eaeaea',
            DiagnoCentralPTBt1: '#6572e4',
            DiagnoCentralPTBt2: '#eaeaea',
            DiagnoHypoxiaBt1: '#6572e4',
            DiagnoHypoxiaBt2: '#eaeaea',
            DiagnoMetabolicAcidosisBt1: '#6572e4',
            DiagnoMetabolicAcidosisBt2: '#eaeaea',
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
                    await AsyncStorage.setItem('studyId', JSON.stringify(response.data.response.id));

                    var data2 = await JSON.stringify(this.state.form);
                    var userId = await AsyncStorage.getItem('userId');

                    var config2 = {
                        method: 'post',
                        url: Constants.manifest.extra.URL +'/patient/general/add/' + userId,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: data2
                    };

                    await axios(config2)
                        .then(response => {
                            Alert.alert('Form Succesfully submitted!')
                            this.setState({ editable: false, viewForm: true, createForm: false, editablecolor: '#c4c4c4' });
                        })
                        .catch(function (error) {
                        });
                }

            })
            .catch(error => {
                console.log("here in no")

            });

        await AsyncStorage.setItem('babyprofileInvasive', JSON.stringify(this.state.form));

    }

    componentDidMount = async () => {

        if (this.context != null) {
            this.editableAndColor();
            this.loadData();
        }
    }

    async setColors() {

        let colorsObj = {}

        if (this.state.form.baby_admission_type == "Inborn") {
            colorsObj = {admissionTypeBt1: '#6572e4', admissionTypeBt2: '#eaeaea'}
        } else {
            colorsObj = {admissionTypeBt2: '#6572e4', admissionTypeBt1: '#eaeaea'}
        }

        if (this.state.form.baby_gender == "Male") {
            colorsObj = { ...colorsObj, babygenderBt1: '#6572e4', babygenderBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, babygenderBt2: '#6572e4', babygenderBt1: '#eaeaea' };
        }

        if (this.state.form.birth_facility == "NICU") {
            colorsObj = { ...colorsObj, birthFacilityBt1: '#6572e4', birthFacilityBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, birthFacilityBt2: '#6572e4', birthFacilityBt1: '#eaeaea' }
        }

        if (this.state.form.baby_preterm == "Yes") {
            colorsObj = { ...colorsObj, babyPreTermBt1: '#6572e4', babyPreTermBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, babyPreTermBt2: '#6572e4', babyPreTermBt1: '#eaeaea' };
        }

        if (this.state.form.baby_condition_suspect == "Yes") {
            colorsObj = { ...colorsObj, DiagnoProbableSepsisBt1: '#6572e4', DiagnoProbableSepsisBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoProbableSepsisBt2: '#6572e4', DiagnoProbableSepsisBt1: '#eaeaea' };
        }

        if (this.state.form.baby_condition_yes_eos_los == "Eos") {
            colorsObj = { ...colorsObj, DiagnoEosLosBt1: '#6572e4', DiagnoEosLosBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoEosLosBt2: '#6572e4', DiagnoEosLosBt1: '#eaeaea' };
        }

        if (this.state.form.meningitis == "Yes") {
            colorsObj = { ...colorsObj, DiagnoMeningitisBt1: '#6572e4', DiagnoMeningitisBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoMeningitisBt2: '#6572e4', DiagnoMeningitisBt1: '#eaeaea' };
        }

        if (this.state.form.umblical_sepsis == "Yes") {
            colorsObj = { ...colorsObj,  DiagnoUmblicalSepsisBt1: '#6572e4', DiagnoUmblicalSepsisBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoUmblicalSepsisBt2: '#6572e4', DiagnoUmblicalSepsisBt1: '#eaeaea' };
        }

        if (this.state.form.skin_pustules == "Yes") {
            colorsObj = { ...colorsObj, DiagnoSkinPustulatesBt1: '#6572e4', DiagnoSkinPustulatesBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoSkinPustulatesBt2: '#6572e4', DiagnoSkinPustulatesBt1: '#eaeaea' };
        }

        if (this.state.form.baby_condition_rds_yes_no == "Yes") {
            colorsObj = { ...colorsObj, DiagnoRDSBt1: '#6572e4', DiagnoRDSBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoRDSBt2: '#6572e4', DiagnoRDSBt1: '#eaeaea' };
        }

        if (this.state.form.baby_condition_jaundice_suspect == "Yes") {
            colorsObj = { ...colorsObj, DiagnoJaundiceBt1: '#6572e4', DiagnoJaundiceBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoJaundiceBt2: '#6572e4', DiagnoJaundiceBt1: '#eaeaea' };
        }

        if (this.state.form.baby_condition_lbw_suspect == "Yes") {
            colorsObj = { ...colorsObj, DiagnoLBWBt1: '#6572e4', DiagnoLBWBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj,DiagnoLBWBt2: '#6572e4', DiagnoLBWBt1: '#eaeaea' };
        }

        if (this.state.form.baby_condition_ttnb_suspect == "Yes") {
            colorsObj = { ...colorsObj, DiagnoTTNBBt1: '#6572e4', DiagnoTTNBBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj,DiagnoTTNBBt2: '#6572e4', DiagnoTTNBBt1: '#eaeaea' };
        }

        if (this.state.form.final_diagnosis_shock == "Yes") {
            colorsObj = { ...colorsObj, DiagnoShockBt1: '#6572e4', DiagnoShockBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj,DiagnoShockBt2: '#6572e4', DiagnoShockBt1: '#eaeaea' };
        }

        if (this.state.form.baby_condition_dextrocordia_suspect == "Yes") {
            colorsObj = { ...colorsObj, DiagnoHeartBt1: '#6572e4', DiagnoHeartBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoHeartBt2: '#6572e4', DiagnoHeartBt1: '#eaeaea' };
        }

        if (this.state.form.baby_condition_anemia_suspect == "Yes") {
            colorsObj = { ...colorsObj, DiagnoAnemiaBt1: '#6572e4', DiagnoAnemiaBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj,  DiagnoAnemiaBt2: '#6572e4', DiagnoAnemiaBt1: '#eaeaea' };
        }

        if (this.state.form.final_diagnosis_perinatal_respiratory_depression == "Yes") {
            colorsObj = { ...colorsObj, DiagnoRespiratoryBt1: '#6572e4', DiagnoRespiratoryBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoRespiratoryBt2: '#6572e4', DiagnoRespiratoryBt1: '#eaeaea' };
        }

        if (this.state.form.prelim_diagnosis_hypoglycemia == "Yes") {
            colorsObj = { ...colorsObj, DiagnoHypoglycemiaBt1: '#6572e4', DiagnoHypoglycemiaBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoHypoglycemiaBt2: '#6572e4', DiagnoHypoglycemiaBt1: '#eaeaea' };
        }

        if (this.state.form.prelim_diagnosis_hypocalcemia == "Yes") {
            colorsObj = { ...colorsObj, DiagnoHypocalcemiaBt1: '#6572e4', DiagnoHypocalcemiaBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoHypocalcemiaBt2: '#6572e4', DiagnoHypocalcemiaBt1: '#eaeaea' };
        }

        if (this.state.form.prelim_diagnosis_feeding_intolerence == "Yes") {
            colorsObj = { ...colorsObj, DiagnoFeedingIntolBt1: '#6572e4', DiagnoFeedingIntolBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoFeedingIntolBt2: '#6572e4', DiagnoFeedingIntolBt1: '#eaeaea' };
        }

        if (this.state.form.thrombocytopenia == "Yes") {
            colorsObj = { ...colorsObj, DiagnoThrombocytopeniaBt1: '#6572e4', DiagnoThrombocytopeniaBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoThrombocytopeniaBt2: '#6572e4', DiagnoThrombocytopeniaBt1: '#eaeaea' };
        }

        if (this.state.form.seizures == "Yes") {
            colorsObj = { ...colorsObj, DiagnoSeizuresBt1: '#6572e4', DiagnoSeizuresBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoSeizuresBt2: '#6572e4', DiagnoSeizuresBt1: '#eaeaea' };
        }

        if (this.state.form.prelim_diagnosis_gastroenteritis == "Yes") {
            colorsObj = { ...colorsObj, DiagnoGasBt1: '#6572e4', DiagnoGasBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoGasBt2: '#6572e4', DiagnoGasBt1: '#eaeaea' };
        }

        if (this.state.form.asphyxia == "Yes") {
            colorsObj = { ...colorsObj, DiagnoAsphyxiaBt1: '#6572e4', DiagnoAsphyxiaBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoAsphyxiaBt2: '#6572e4', DiagnoAsphyxiaBt1: '#eaeaea' };
        }

        if (this.state.form.pneumonia == "Yes") {
            colorsObj = { ...colorsObj, DiagnoPneumoniaBt1: '#6572e4', DiagnoPneumoniaBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoPneumoniaBt2: '#6572e4', DiagnoPneumoniaBt1: '#eaeaea' };
        }

        if (this.state.form.septic_arthritis == "Yes") {
            colorsObj = { ...colorsObj, DiagnoSepticArthritisBt1: '#6572e4', DiagnoSepticArthritisBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoSepticArthritisBt2: '#6572e4', DiagnoSepticArthritisBt1: '#eaeaea' };
        }


        if (this.state.form.endocarditis == "Yes") {
            colorsObj = { ...colorsObj, DiagnoEndocarditisBt1: '#6572e4', DiagnoEndocarditisBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoEndocarditisBt2: '#6572e4', DiagnoEndocarditisBt1: '#eaeaea' };
        }

        if (this.state.form.peritonitis == "Yes") {
            colorsObj = { ...colorsObj, DiagnoPeritonitisBt1: '#6572e4', DiagnoPeritonitisBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj,DiagnoPeritonitisBt2: '#6572e4', DiagnoPeritonitisBt1: '#eaeaea' };
        }

        if (this.state.form.soft_tissue_abscess == "Yes") {
            colorsObj = { ...colorsObj,  DiagnoSoftTissueBt1: '#6572e4', DiagnoSofttissueBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoSofttissueBt2: '#6572e4', DiagnoSoftTissueBt1: '#eaeaea' };
        }

        if (this.state.form.coagulopathy == "Yes") {
            colorsObj = { ...colorsObj, DiagnoCoagulopathyBt1: '#6572e4', DiagnoCoagulopathyBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoCoagulopathyBt2: '#6572e4', DiagnoCoagulopathyBt1: '#eaeaea' };
        }

        if (this.state.form.uti == "Yes") {
            colorsObj = { ...colorsObj, DiagnoUTIBt1: '#6572e4', DiagnoUTIBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoUTIBt2: '#6572e4', DiagnoUTIBt1: '#eaeaea' };
        }

        if (this.state.form.pulmonary_hemorrhage == "Yes") {
            colorsObj = { ...colorsObj, DiagnoPulmonaryBt1: '#6572e4', DiagnoPulmonaryBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoPulmonaryBt2: '#6572e4', DiagnoPulmonaryBt1: '#eaeaea' };
        }

        if (this.state.form.bleeding_manifestation == "Yes") {
            colorsObj = { ...colorsObj, DiagnoBleedingManifestationBt1: '#6572e4', DiagnoBleedingManifestationBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoBleedingManifestationBt2: '#6572e4', DiagnoBleedingManifestationBt1: '#eaeaea' };
        }

        if (this.state.form.central_peripheral == "Yes") {
            colorsObj = { ...colorsObj, DiagnoCentralPTBt1: '#6572e4', DiagnoCentralPTBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoCentralPTBt2: '#6572e4', DiagnoCentralPTBt1: '#eaeaea' };
        }

        if (this.state.form.hypoxia == "Yes") {
            colorsObj = { ...colorsObj, DiagnoHypoxiaBt1: '#6572e4', DiagnoHypoxiaBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoHypoxiaBt2: '#6572e4', DiagnoHypoxiaBt1: '#eaeaea' };
        }

        if (this.state.form.metabolic_acidosis == "Yes") {
            colorsObj = { ...colorsObj, DiagnoMetabolicAcidosisBt1: '#6572e4', DiagnoMetabolicAcidosisBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, DiagnoMetabolicAcidosisBt2: '#6572e4', DiagnoMetabolicAcidosisBt1: '#eaeaea' };
        }

        await this.setState({ ...colorsObj });

    }


    async loadData() {

        await this.setState({ viewForm: true, createForm: false });
        await this.setState({ form: { ...this.state.form, study_id: this.context } });

        var hospitalId = await AsyncStorage.getItem('hospitalId');
        var config = {
            method: 'post',
            url: Constants.manifest.extra.URL  + '/patient/get_general/' + this.context + '/' + hospitalId + '/1',
            headers: {}
        };

        try{
            let response = await axios(config);

            await this.setState({
                form: {
                    ...this.state.form,
                    babyMedicalRecord: response.data.response[0].baby_medical_record_number
                    , babyMotherMedicalRecord: response.data.response[0].baby_mother_medical_record_number
                    , baby_admission_type: response.data.response[0].baby_admission_type
                    , baby_age_of_admission: response.data.response[0].baby_age_of_admission
                    , baby_birth_date: response.data.response[0].baby_birth_date
                    , baby_birthm_time_hours: response.data.response[0].baby_birth_time_hours
                    , baby_birth_time_minit: response.data.response[0].baby_birth_time_minit
                    , baby_date_of_admission: response.data.response[0].baby_date_of_admission
                    , baby_gender: response.data.response[0].baby_gender
                    , baby_gestational_age: response.data.response[0].baby_gestational_age
                    // // , baby_gestational_age_unit: "week"
                    , baby_mother_name: response.data.response[0].mother_name
                    , baby_name: response.data.response[0].baby_name
                    , baby_place_of_birth_name: response.data.response[0].baby_place_of_birth_name
                    , baby_preterm: response.data.response[0].baby_preterm
                    , baby_weight_at_admission: response.data.response[0].baby_weight_at_admission
                    // //, baby_weight_at_admission_unit: "Kgs"
                    , baby_weight_at_birth: response.data.response[0].baby_weight_at_birth
                    // // , baby_weight_at_birth_unit: "Kgs"
                    , birth_facility: response.data.response[0].birth_facility
                    // , hospital_branch_name: null
                    // , hospital_id: null
                    // , hospital_name: "ASHA"
                    , isCreateForm: true
                    , is_update: false
                    // , tab_name: "genral",
                    , place_of_delivery: response.data.response[0].place_of_delivery
                    , asphyxia: response.data.response[0].asphyxia
                    , baby_apgar_score_five_min: response.data.response[0].baby_apgar_score_five_min
                    , baby_apgar_score_one_min: response.data.response[0].baby_apgar_score_one_min
                    , baby_apgar_score_ten_min: response.data.response[0].baby_apgar_score_ten_min
                    , baby_condition_anemia_suspect: response.data.response[0].baby_condition_anemia_suspect
                    , baby_condition_dextrocordia_suspect: response.data.response[0].baby_condition_dextrocordia_suspect
                    , baby_condition_jaundice_suspect: response.data.response[0].baby_condition_jaundice_suspect
                    , baby_condition_lbw_suspect: response.data.response[0].baby_condition_lbw_suspect
                    , baby_condition_other_if_suspect: response.data.response[0].baby_condition_other_if_suspect
                    , baby_condition_rds_yes_no: response.data.response[0].baby_condition_rds_yes_no
                    , baby_condition_suspect: response.data.response[0].baby_condition_suspect
                    , baby_condition_ttnb_suspect: response.data.response[0].baby_condition_ttnb_suspect
                    , baby_condition_yes_eos_los: response.data.response[0].baby_condition_yes_eos_los
                    , baby_day_of_event: response.data.response[0].baby_day_of_event
                    , baby_lga_sga_aga_suspect: response.data.response[0].baby_lga_sga_aga_suspect
                    , baby_place_of_birth_pin_code: response.data.response[0].baby_place_of_birth_pin_code
                    , baby_shock_aga_suspect: response.data.response[0].baby_shock_aga_suspect
                    , bleeding_manifestation: response.data.response[0].bleeding_manifestation
                    , central_peripheral: response.data.response[0].central_peripheral
                    , coagulopathy: response.data.response[0].coagulopathy
                    , endocarditis: response.data.response[0].endocarditis
                    , hypoxia: response.data.response[0].hypoxia
                    , meningitis: response.data.response[0].meningitis
                    , metabolic_acidosis: response.data.response[0].metabolic_acidosis
                    , peritonitis: response.data.response[0].peritonitis
                    , pneumonia: response.data.response[0].pneumonia
                    , prelim_diagnosis_feeding_intolerence: response.data.response[0].prelim_diagnosis_feeding_intolerence
                    , prelim_diagnosis_gastroenteritis: response.data.response[0].prelim_diagnosis_gastroenteritis
                    , prelim_diagnosis_hypocalcemia: response.data.response[0].prelim_diagnosis_hypocalcemia
                    , prelim_diagnosis_hypoglycemia: response.data.response[0].prelim_diagnosis_hypoglycemia
                    , prelim_diagnosis_perinatal: response.data.response[0].prelim_diagnosis_perinatal
                    , pulmonary_hemorrhage: response.data.response[0].pulmonary_hemorrhage
                    , record_type: response.data.response[0].record_type
                    , seizures: response.data.response[0].seizures
                    , septic_arthritis: response.data.response[0].septic_arthritis
                    , skin_pustules: response.data.response[0].skin_pustules
                    , soft_tissue_abscess: response.data.response[0].soft_tissue_abscess
                    , thrombocytopenia: response.data.response[0].thrombocytopenia
                    , umblical_sepsis: response.data.response[0].umblical_sepsis
                    , uti: response.data.response[0].uti
                }
            });

            this.setColors();
            await AsyncStorage.setItem('babyprofileInvasive', JSON.stringify(this.state.form));
        }
        catch(ex){
            console.log(ex);
            Alert.alert('Unable to fetch baby profile details')
        }
    }

    async handleUpdate() {

        // take data and fireup update api request
        await this.setState({ form: { ...this.state.form, isCreateForm: false, is_update: true } })
        
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
                Alert.alert("Updated baby profile invasive")
                this.setState({ editable: false, editablecolor: '#eaeaea', viewForm: true, editForm: false, createForm: false });
                this.setState({ form: { ...this.state.form, isCreateForm: true, is_update: false } })
            })
            .catch(error => {
                console.log(error);
            });

        await AsyncStorage.setItem('babyprofileInvasive', JSON.stringify(this.state.form));
    }

    async editableAndColor() {

        await this.setState({ editable: !this.state.editable });

        if (this.state.editable) {
            await this.setState({ editForm: true })
        }

        this.state.editable ? await this.setState({ editablecolor: 'white' }) :
            await this.setState({ editablecolor: '#eaeaea' })
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
                                onPress={() => {
                                    this.editableAndColor();
                                }}
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

                    <View style={styles.partitionView}>
                        <View style={{ width: '50%',marginTop:-5 }} >
                            <Label style={styles.titleStyle}>Type of Record</Label>
                            <View style={[styles.inputStyle]}>
                                <Picker
                                    selectedValue={this.state.form.record_type}
                                    style={{ height: 40, width: 150, borderRadius: 10 }}
                                    mode={'dropdown'}
                                    onValueChange={(itemValue, itemIndex) => this.setState({
                                        form: { ...this.state.form, record_type: itemValue }
                                    })}
                                >
                                    <Picker.Item label="Current" value="Current" />
                                    <Picker.Item label="Historical" value="Historical" />
                                </Picker>
                            </View>
                        </View>
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
                    </View>


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
                        <View style={{ width: '45%'}}  >
                            <Label style={styles.titleStyle}>Admission Type</Label>
                            <View style={[styles.viewContainer,{marginTop:-5 }]}>
                                <Button
                                    style={[styles.buttonContainer, { backgroundColor: this.state.admissionTypeBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ form: { ...this.state.form, baby_admission_type: "Inborn" }, admissionTypeBt1: '#6572e4', admissionTypeBt2: '#eaeaea' })}
                                >
                                    <Text style={styles.textButton}>Inborn</Text></Button>

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
                    <View style={{ marginTop: 10 }}>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                style={styles.checkbox}
                                checked={this.state.NA5}
                                disabled={!this.state.editable}
                                onPress={() => this.setState({ NA5: !this.state.NA5, form: { ...this.state.form, baby_place_of_birth_name: 'NA' } })}
                            />
                            <Text style={styles.label}>Place of Birth</Text>
                        </View>
                        <TextInput
                            style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                            value={`${this.state.form.baby_place_of_birth_name}`}
                            editable={this.state.NA5 && this.state.editable}
                            onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_place_of_birth_name: value } })}
                        />
                    </View>

                    {/* pincode */}
                    <View style={{ marginTop: 10 }}>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                style={styles.checkbox}
                                checked={this.state.NA10}
                                disabled={!this.state.editable}
                                onPress={() => this.setState({ NA10: !this.state.NA10, form: { ...this.state.form, baby_place_of_birth_pin_code: 'NA' } })}
                            />
                            <Text style={styles.label}>Place of Birth (Pincode)</Text>
                        </View>
                        <TextInput
                            style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                            value={`${this.state.form.baby_place_of_birth_pin_code}`}
                            editable={this.state.NA10 && this.state.editable}
                            onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_place_of_birth_pin_code: value } })}
                        />
                    </View>


                    {/* date of birth */}
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
                            <View style={[styles.searchSection, { marginLeft: '8%' }]}>
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

                    {/* apgar score ( 1 min & 5 min) */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.ApgarScore1NA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        ApgarScore1NA: !this.state.ApgarScore1NA,
                                        form: { ...this.state.form, baby_apgar_score_one_min: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>Apgar Score ( 1 min)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={this.state.ApgarScore1NA && this.state.editable}
                                keyboardType='numeric'
                                value={`${this.state.form.baby_apgar_score_one_min}`}
                                onChangeText={(value) => this.setState({
                                    form: { ...this.state.form, baby_apgar_score_one_min: value }
                                })}
                            />

                        </View>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.ApgarScore5NA}
                                    disabled={!this.state.editable}
                                    style={styles.checkbox}
                                    onPress={() => this.setState({
                                        ApgarScore5NA: !this.state.ApgarScore5NA,
                                        form: { ...this.state.form, baby_apgar_score_five_min: 'NA' }
                                    })}
                                />
                                <Text style={styles.label}>Apgar Score ( 5 min)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={this.state.ApgarScore5NA && this.state.editable}
                                keyboardType='numeric'
                                value={`${this.state.form.baby_apgar_score_five_min}`}
                                onChangeText={(value) => this.setState({
                                    form: { ...this.state.form, baby_apgar_score_five_min: value }
                                })}
                            />
                        </View>
                    </View>

                    {/* apgar score 10m & place of delivery */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.ApgarScore10NA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        ApgarScore10NA: !this.state.ApgarScore10NA,
                                        form: { ...this.state.form, baby_apgar_score_ten_min: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>Apgar Score ( 10 min)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={this.state.ApgarScore10NA && this.state.editable}
                                keyboardType='numeric'
                                value={`${this.state.form.baby_apgar_score_ten_min}`}
                                onChangeText={(value) => this.setState({
                                    form: { ...this.state.form, baby_apgar_score_ten_min: value }
                                })}
                            />

                        </View>
                        <View style={{ width: '47%', marginTop: -5 }}>
                            <Label style={styles.titleStyle}>Place of Delivery</Label>
                            <View style={[styles.inputStyle]}>
                                <Picker
                                    selectedValue={this.state.form.record_type}
                                    style={{ height: 40, width: 150, borderRadius: 10 }}
                                    mode={'dropdown'}
                                    onValueChange={(itemValue, itemIndex) => this.setState({
                                        form: { ...this.state.form, place_of_delivery: itemValue }
                                    })}
                                >
                                    <Picker.Item label="Hospital" value="Hospital" />
                                    <Picker.Item label="Home" value="Home" />
                                </Picker>
                            </View>
                        </View>
                    </View>



                    {/* days of sepsis event and diagnosis (probable sepsis) */}
                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.dayOfSepsisEventNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        dayOfSepsisEventNA: !this.state.dayOfSepsisEventNA,
                                        form: { ...this.state.form, baby_day_of_event: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>Day of Sepsis Event</Text>
                            </View>

                            <View style={styles.searchSection}>
                                <TextInput
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    editable={this.state.dayOfSepsisEventNA && this.state.editable}
                                    value={`${this.state.form.baby_day_of_event}`}
                                    keyboardType='numeric'
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_day_of_event: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={10} color="#000" >
                                    <Text style={styles.iconText}>day</Text></Icon>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis (Probable Sepsis)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoProbableSepsisBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_condition_suspect: "Yes" },
                                        DiagnoProbableSepsisBt1: '#6572e4', DiagnoProbableSepsisBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoProbableSepsisBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_condition_suspect: "No" },
                                        DiagnoProbableSepsisBt2: '#6572e4', DiagnoProbableSepsisBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>

                    </View>

                    {/* diagnosis eos los & meningitis */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.DiagnoEOSLOSNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        DiagnoEOSLOSNA: !this.state.DiagnoEOSLOSNA,
                                        form: { ...this.state.form, baby_condition_yes_eos_los: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Diagnosis (EOS/LOS/NA)</Text>
                            </View>
                            <View style={[styles.viewContainer, { marginTop: 0 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoEosLosBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_condition_yes_eos_los: "Eos" },
                                        DiagnoEosLosBt1: '#6572e4', DiagnoEosLosBt2: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton]}>Eos</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoEosLosBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_condition_yes_eos_los: "Los" },
                                        DiagnoEosLosBt2: '#6572e4', DiagnoEosLosBt1: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton]}>Los</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis (Meningitis)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoMeningitisBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, meningitis: "Yes" },
                                        DiagnoMeningitisBt1: '#6572e4', DiagnoMeningitisBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoMeningitisBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, meningitis: "No" },
                                        DiagnoMeningitisBt2: '#6572e4', DiagnoMeningitisBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>

                    </View>

                    {/* umblical_sepsis and skin_pustules */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis (Umblical Sepsis)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoUmblicalSepsisBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, umblical_sepsis: "Yes" },
                                        DiagnoUmblicalSepsisBt1: '#6572e4', DiagnoUmblicalSepsisBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoUmblicalSepsisBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, umblical_sepsis: "No" },
                                        DiagnoUmblicalSepsisBt2: '#6572e4', DiagnoUmblicalSepsisBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis (Skin Pustules)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoSkinPustulatesBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, skin_pustules: "Yes" },
                                        DiagnoSkinPustulatesBt1: '#6572e4', DiagnoSkinPustulatesBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoSkinPustulatesBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, skin_pustules: "No" },
                                        DiagnoSkinPustulatesBt2: '#6572e4', DiagnoSkinPustulatesBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* RDS & Jaundice */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis (RDS)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoRDSBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_condition_rds_yes_no: "Yes" },
                                        DiagnoRDSBt1: '#6572e4', DiagnoRDSBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoRDSBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_condition_rds_yes_no: "No" },
                                        DiagnoRDSBt2: '#6572e4', DiagnoRDSBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis (Jaundice)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoJaundiceBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_condition_jaundice_suspect: "Yes" },
                                        DiagnoJaundiceBt1: '#6572e4', DiagnoJaundiceBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoJaundiceBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_condition_jaundice_suspect: "No" },
                                        DiagnoJaundiceBt2: '#6572e4', DiagnoJaundiceBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* LBW & TTNB */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis (LBW)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoLBWBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_condition_lbw_suspect: "Yes" },
                                        DiagnoLBWBt1: '#6572e4', DiagnoLBWBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoLBWBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_condition_lbw_suspect: "No" },
                                        DiagnoLBWBt2: '#6572e4', DiagnoLBWBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis (TTNB)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoTTNBBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_condition_ttnb_suspect: "Yes" },
                                        DiagnoTTNBBt1: '#6572e4', DiagnoTTNBBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoTTNBBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_condition_ttnb_suspect: "No" },
                                        DiagnoTTNBBt2: '#6572e4', DiagnoTTNBBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* lga/aga/sga and shock */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '50%' }} >
                            <Label style={styles.titleStyle}>Diagnosis (LGA/AGA/SGA/NA)</Label>
                            <View style={[styles.inputStyle]}>
                                <Picker
                                    selectedValue={this.state.form.baby_lga_sga_aga_suspect}
                                    style={{ height: 40, width: 150, borderRadius: 10 }}
                                    mode={'dropdown'}
                                    onValueChange={(itemValue, itemIndex) => this.setState({
                                        form: { ...this.state.form, baby_lga_sga_aga_suspect: itemValue }
                                    })}
                                >
                                    <Picker.Item label="LGA" value="LGA" />
                                    <Picker.Item label="AGA" value="AGA" />
                                    <Picker.Item label="SGA" value="SGA" />
                                    <Picker.Item label="NA" value="NA" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis (Shock)</Label>
                            <View style={[styles.viewContainer, { marginTop: -5 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoShockBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, final_diagnosis_shock: "Yes" },
                                        DiagnoShockBt1: '#6572e4', DiagnoShockBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoShockBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, final_diagnosis_shock: "No" },
                                        DiagnoShockBt2: '#6572e4', DiagnoShockBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* heart disease and anemia */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis (Congenital Heart Disease)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoHeartBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_condition_dextrocordia_suspect: "Yes" },
                                        DiagnoHeartBt1: '#6572e4', DiagnoHeartBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoHeartBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_condition_dextrocordia_suspect: "No" },
                                        DiagnoHeartBt2: '#6572e4', DiagnoHeartBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis (Anemia)</Label>
                            <View style={[styles.viewContainer, { marginTop: 3}]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoAnemiaBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_condition_anemia_suspect: "Yes" },
                                        DiagnoAnemiaBt1: '#6572e4', DiagnoAnemiaBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoAnemiaBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_condition_anemia_suspect: "No" },
                                        DiagnoAnemiaBt2: '#6572e4', DiagnoAnemiaBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* respiratory depression and hypoglycemia */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis (Perinatal Respiratory Depression)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoRespiratoryBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, final_diagnosis_perinatal_respiratory_depression: "Yes" },
                                        DiagnoRespiratoryBt1: '#6572e4', DiagnoRespiratoryBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoRespiratoryBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, final_diagnosis_perinatal_respiratory_depression: "No" },
                                        DiagnoRespiratoryBt2: '#6572e4', DiagnoRespiratoryBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis (Hypoglycemia)</Label>
                            <View style={[styles.viewContainer, { marginTop: 3 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoHypoglycemiaBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, hypoglycemia: "Yes" },
                                        DiagnoHypoglycemiaBt1: '#6572e4', DiagnoHypoglycemiaBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoHypoglycemiaBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, hypoglycemia: "No" },
                                        DiagnoHypoglycemiaBt2: '#6572e4', DiagnoHypoglycemiaBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* hypocalcemia and feeding intolerence */}

                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis (Hypocalcemia)</Label>
                            <View style={[styles.viewContainer, { marginTop: 10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoHypocalcemiaBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, hypocalcemia: "Yes" },
                                        DiagnoHypocalcemiaBt1: '#6572e4', DiagnoHypocalcemiaBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoHypocalcemiaBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, hypocalcemia: "No" },
                                        DiagnoHypocalcemiaBt2: '#6572e4', DiagnoHypocalcemiaBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis (Feeding Intolerence)</Label>
                            <View style={[styles.viewContainer, { marginTop: -5 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoFeedingIntolBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, prelim_diagnosis_feeding_intolerence: "Yes" },
                                        DiagnoFeedingIntolBt1: '#6572e4', DiagnoFeedingIntolBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoFeedingIntolBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, final_diagnosis_feeding_intolerence: "No" },
                                        DiagnoFeedingIntolBt2: '#6572e4', DiagnoFeedingIntolBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* thrombocytopenia and seizures */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis(Thrombocytopenia)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoThrombocytopeniaBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, thrombocytopenia: "Yes" },
                                        DiagnoThrombocytopeniaBt1: '#6572e4', DiagnoThrombocytopeniaBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoThrombocytopeniaBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, thrombocytopenia: "No" },
                                        DiagnoThrombocytopeniaBt2: '#6572e4', DiagnoThrombocytopeniaBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis(Seizures)</Label>
                            <View style={[styles.viewContainer, { marginTop: 3 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoSeizuresBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, seizures: "Yes" },
                                        DiagnoSeizuresBt1: '#6572e4', DiagnoSeizuresBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoSeizuresBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, seizures: "No" },
                                        DiagnoSeizuresBt2: '#6572e4', DiagnoSeizuresBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* gastroneritis and asphyxia */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis(Gastroenteritis)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoGasBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, prelim_diagnosis_gastroenteritis: "Yes" },
                                        DiagnoGasBt1: '#6572e4', DiagnoGasBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoGasBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, prelim_diagnosis_gastroenteritis: "No" },
                                        DiagnoGasBt2: '#6572e4', DiagnoGasBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis(Asphyxia)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoAsphyxiaBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, asphyxia: "Yes" },
                                        DiagnoAsphyxiaBt1: '#6572e4', DiagnoAsphyxiaBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoAsphyxiaBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, asphyxia: "No" },
                                        DiagnoAsphyxiaBt2: '#6572e4', DiagnoAsphyxiaBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* pneumonia and arthritis */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis(Pneumonia)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoPneumoniaBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, pneumonia: "Yes" },
                                        DiagnoPneumoniaBt1: '#6572e4', DiagnoPneumoniaBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoPneumoniaBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, pneumonia: "No" },
                                        DiagnoPneumoniaBt2: '#6572e4', DiagnoPneumoniaBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis(Septic Arthritis)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoSepticArthritisBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, septic_arthritis: "Yes" },
                                        DiagnoSepticArthritisBt1: '#6572e4', DiagnoSepticArthritisBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoSepticArthritisBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, septic_arthritis: "No" },
                                        DiagnoSepticArthritisBt2: '#6572e4', DiagnoSepticArthritisBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>
                    {/* Endocarditis and Peritonitis */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis(Endocarditis)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoEndocarditisBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, endocarditis: "Yes" },
                                        DiagnoEndocarditisBt1: '#6572e4', DiagnoEndocarditisBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoEndocarditisBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, endocarditis: "No" },
                                        DiagnoEndocarditisBt2: '#6572e4', DiagnoEndocarditisBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis(Peritonitis)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoPeritonitisBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, peritonitis: "Yes" },
                                        DiagnoPeritonitisBt1: '#6572e4', DiagnoPeritonitisBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoPeritonitisBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, peritonitis: "No" },
                                        DiagnoPeritonitisBt2: '#6572e4', DiagnoPeritonitisBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>
                    {/* Soft Tissue Abscess and Coagulopathy */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis(Soft Tissue Abscess)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoSoftTissueBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, soft_tissue_abscess: "Yes" },
                                        DiagnoSoftTissueBt1: '#6572e4', DiagnoSofttissueBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoSofttissueBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, soft_tissue_abscess: "No" },
                                        DiagnoSofttissueBt2: '#6572e4', DiagnoSoftTissueBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis(Coagulopathy)</Label>
                            <View style={[styles.viewContainer, { marginTop: 5 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoCoagulopathyBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, coagulopathy: "Yes" },
                                        DiagnoCoagulopathyBt1: '#6572e4', DiagnoCoagulopathyBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoCoagulopathyBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, coagulopathy: "No" },
                                        DiagnoCoagulopathyBt2: '#6572e4', DiagnoCoagulopathyBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>
                    {/* UTI and Pulmonary Hemorrhage */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis(UTI)</Label>
                            <View style={[styles.viewContainer, { marginTop: 5 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoUTIBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, uti: "Yes" },
                                        DiagnoUTIBt1: '#6572e4', DiagnoUTIBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoUTIBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, uti: "No" },
                                        DiagnoUTIBt2: '#6572e4', DiagnoUTIBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis(Pulmonary Hemorrhage)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoPulmonaryBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, pulmonary_hemorrhage: "Yes" },
                                        DiagnoPulmonaryBt1: '#6572e4', DiagnoPulmonaryBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoPulmonaryBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, pulmonary_hemorrhage: "No" },
                                        DiagnoPulmonaryBt2: '#6572e4', DiagnoPulmonaryBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>
                    {/* Bleeding Manifestation and Central Peripheral temperature difference */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis(Bleeding Manifestation)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoBleedingManifestationBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, bleeding_manifestation: "Yes" },
                                        DiagnoBleedingManifestationBt1: '#6572e4', DiagnoBleedingManifestationBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoBleedingManifestationBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, bleeding_manifestation: "No" },
                                        DiagnoBleedingManifestationBt2: '#6572e4', DiagnoBleedingManifestationBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis(Central Peripheral temperature difference)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoCentralPTBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, central_peripheral: "Yes" },
                                        DiagnoCentralPTBt1: '#6572e4', DiagnoCentralPTBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoCentralPTBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, central_peripheral: "No" },
                                        DiagnoCentralPTBt2: '#6572e4', DiagnoCentralPTBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>
                    {/* Hypoxia and Metabolic Acidosis */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Dianosis(Hypoxia)</Label>
                            <View style={[styles.viewContainer, { marginTop: 5 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoHypoxiaBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, hypoxia: "Yes" },
                                        DiagnoHypoxiaBt1: '#6572e4', DiagnoHypoxiaBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoHypoxiaBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, hypoxia: "No" },
                                        DiagnoHypoxiaBt2: '#6572e4', DiagnoHypoxiaBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diagnosis(Metabolic Acidosis)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoMetabolicAcidosisBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, metabolic_acidosis: "Yes" },
                                        DiagnoMetabolicAcidosisBt1: '#6572e4', DiagnoMetabolicAcidosisBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.DiagnoMetabolicAcidosisBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, metabolic_acidosis: "No" },
                                        DiagnoMetabolicAcidosisBt2: '#6572e4', DiagnoMetabolicAcidosisBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* diagnosis (others) */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.dia}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        DiagnosisOthersNA: !this.state.DiagnosisOthersNA,
                                        form: { ...this.state.form, baby_condition_other_if_suspect: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>Diagnosis (Other)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={this.state.DiagnosisOthersNA && this.state.editable}
                                keyboardType='numeric'
                                value={`${this.state.form.baby_condition_other_if_suspect}`}
                                onChangeText={(value) => this.setState({
                                    form: { ...this.state.form, baby_condition_other_if_suspect: value }
                                })}
                            />
                        </View>
                        <View style={{ width: '47%', marginTop: 30 }}>
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

                    {/* submit */}


                </View>
            </ScrollView >

        );
    }
}

BabyProfileInvasive.contextType = UserContext

export default BabyProfileInvasive