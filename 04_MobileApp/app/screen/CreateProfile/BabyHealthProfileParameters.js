import React, { Component } from 'react';
//import styles from '../GlobalStyling';
import {
    View,
    Label,
    Button, Text, CheckBox
} from "native-base";
import { TextInput, ScrollView, Alert } from 'react-native';
import styles from '../../GlobalStyling';
import axios from 'axios';
import UserContext from '../context/studyidContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";

class BabyHealthParameters extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editable: true,
            viewForm: false,
            editForm: false,
            createForm: true,

            editablecolor: 'white',
            form: {
                baby_appears: {
                    study_id: '',
                    reading_date: 'NA',
                    time_of_reading_hours: 'NA',
                    time_of_reading_minute: 'NA',
                    baby_weight_at_birth: 'NA',
                    baby_weight_at_birth_unit: 'NA',
                    baby_appearance: 'Dull', //
                    baby_skin_colour: 'NA',
                    baby_cry_sound: 'NA',
                    baby_cry_sound_status: 'NA',
                    hypotonia_muscular_response_one_min_after_birth: 'NA',
                    hypotonia_muscular_response_five_min_after_birth: 'NA',
                    excessive_sleeping: 'NA',
                    hypothermia: 'NA',
                    hypothermia_status: 'NA',
                    hypothermia_status_value: 'NA',
                    baby_feeding_status: 'Poor', //
                    baby_presence_of_convulsions: 'NA',
                    baby_jaundice: 'NA',
                    breast_feeding_initiation: 'Yes', //
                    kangaroo_mother_care: 'NA',
                    umbilical_discharge: 'NA',
                    reading: 'R1'
                },
                baby_resp: {
                    study_id: '',
                    groaning: 'NA',
                    grunting: 'NA',
                    stridor: 'NA',
                    retraction: 'Yes', //
                    fast_breathing: 'Yes', //
                    oxygen_saturation: 'NA',
                    breathing_rate: 'NA',
                    baby_chest_indrawing: 'Yes', //
                    x_ray_result: 'NA',
                    x_ray_status_done: 'NA',
                    x_ray_status: 'NA',
                    x_ray_diagnosis_any_other: '',
                    apnea_diagnosis: 'NA',
                    apnea_status: 'NA',
                    baby_respiratory_support: '[{"id":7,"itemName":"NA"}]',
                    baby_respiratory_support_if_yes: 'NA',
                    reading: 'R1',
                    tab_name: 'baby_resp_add'
                },
                baby_cv: {
                    study_id: '',
                    heart_rate: 'NA',
                    urine_output: 'Low', //
                    baby_blood_pressure_mean_arterial_bp: '', //
                    baby_blood_pressure_upper_limb: '', //
                    baby_blood_pressure_lower_limb: '', //
                    capillary_refill_unit: 'NA',
                    low_peripheral_pulse_volume: 'NA',
                    cool_peripheries: 'NA',
                    two_d_echo_done: 'NA',
                    two_d_echo_done_if_yes: 'NA',
                    baby_on_ionotropes: 'NA',
                    central_line: 'NA',
                    skin_pustules: 'NA',
                    infusion_of_blood_products: 'NA',
                    reading: 'R1'
                },
                baby_cns: {
                    study_id: '',
                    features_of_encephalopathy: 'NA',
                    seizures: 'NA',
                    abnormal_movements_like_tonic_posturing: 'NA',
                    af_bulge: 'NA',
                    tab_name: 'baby_cns_add',
                    reading: 'R1'
                },
                baby_git: {
                    study_id: '',
                    abdominal_dystension: 'Yes', //
                    frequency_of_stools: 'NA', //
                    diarrhea: 'NA',
                    vomiting: 'Yes', //
                    feeding_intolerance: 'NA',
                    baby_movement: 'Yes', //
                    reading: 'R1',
                    tab_name: 'baby_git'
                },
                baby_investigation: {
                    study_id: '',
                    baby_thyroid_status: 'NA',
                    baby_thyroid_result: 'NA',
                    baby_blood_glucose: 'NA',
                    baby_haemoglobin_levels: 'NA',
                    baby_c_reactive_protien_levels: 'NA',
                    micro_esr: 'NA',
                    baby_procalcitonin_levels: 'NA',
                    total_leucocute_count_unit: 'NA',
                    total_leucocute_count: 'NA',
                    absolute_neutrophil_count: 'NA',
                    absolute_neutrophil_count_unit: 'NA',
                    immature_to_mature_neutrophil_ratios: 'NA',
                    thrombocytopenia_unit: 'NA',
                    thrombocytopenia: 'NA',
                    urine_rest_for_pus_cells: 'NA',
                    urine_culture_test: 'NA',
                    blood_culture_report: 'NA',
                    gram_positive_bacteria: '[{"id":7,"itemName":"NA"}]',
                    gram_positive_bacteria_if_other: '',
                    gram_negative_bacteria: '[{"id":13,"itemName":"NA"}]',
                    gram_negative_bacteria_if_other: '',
                    fungi: '[{"id":5,"itemName":"NA"}]',
                    other_organism: 'Normal Orophayngeal flora',
                    antibiotic_status_resisitant: 'NA',
                    antibiotic_status_intermediate: 'NA',
                    antibiotic_status_value: 'NA',
                    sodium: 'NA',
                    potassium: 'NA',
                    chlorine: 'NA',
                    calcium: 'NA',
                    phosphate: 'NA',
                    magnesium: 'NA',
                    urea: 'NA',
                    creatinine: 'NA',
                    lactate_levels: 'NA',
                    bilirubin_levels: 'NA',
                    cord_ph: 'NA',
                    arrhythmia: 'NA',
                    csf_culture: 'NA',
                    csf_culture_tsb_value: 'NA',
                    reading: 'R1',
                    tab_name: 'final'
                },
                baby_antibiotic: {
                    study_id: '',
                    antibiotic_given: 'NA',
                    date_of_administration_of_antiobiotic: 'NA',
                    time_of_administration_of_antiobiotic_hours: 'NA',
                    time_of_administration_of_antiobiotic_minute: 'NA',
                    antibiotic_name: 'NA',
                    antibiotic_name_if_other: 's',
                    date_of_blood_samples_sent_for_culture_test: 'NA',
                    time_of_blood_samples_sent_for_culture_test_hours: 'NA',
                    time_of_blood_samples_sent_for_culture_test_minute: 'NA',
                    blood_sample_taken_prior_to_antiobiotic_administration: 'NA',
                    reading: 'R1'
                },
                baby_final: {
                    study_id: '',
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
                    reading: 'R1',
                    tab_name: 'genral'
                }
            },
            appearanceBt1: '#6572e4',
            appearanceBt2: '#eaeaea',
            appearanceBt3: '#eaeaea',
            breastFeedingBt1: '#6572e4',
            breastFeedingBt2: '#eaeaea',
            feedingStatusBt1: '#6572e4',
            feedingStatusBt2: '#eaeaea',
            feedingStatusBt3: '#eaeaea',
            urineOutputBt1: '#6572e4',
            urineOutputBt2: '#eaeaea',
            urineOutputBt3: '#eaeaea',
            vomitingBt1: '#6572e4',
            vomitingBt2: '#eaeaea',
            abdominalDistensionBt1: '#6572e4',
            abdominalDistensionBt2: '#eaeaea',
            babyMovementBt1: '#6572e4',
            babyMovementBt2: '#eaeaea',
            retractionBt1: '#6572e4',
            retractionBt2: '#eaeaea',
            fastBreathingBt1: '#6572e4',
            fastBreathingBt2: '#eaeaea',
            chestInDrawingBt1: '#6572e4',
            chestInDrawingBt2: '#eaeaea',

            BPSysytolicNA: true,
            BPDiastolicNA: true,
            BPMeanArterialNA: true,
            frequencyOfStoolsNA: true,

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editableAndColor = this.editableAndColor.bind(this);
        this.setColors = this.setColors.bind(this);
        this.loadData = this.loadData.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

        this.forCreateForm = this.forCreateForm.bind(this);
    }

    componentDidMount = () => {

        // if in view mode
        if (this.context != null) {

            //load blank data just in case.
            this.forCreateForm();
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

        await this.setState({
            form: {
                ...this.state.form,
                baby_appears: {
                    ...this.state.form.baby_appears,
                    study_id: studyId
                },
                baby_resp: {
                    ...this.state.form.baby_resp,
                    study_id: studyId
                },
                baby_cv: {
                    ...this.state.form.baby_cv,
                    study_id: studyId
                },
                baby_git: {
                    ...this.state.form.baby_git,
                    study_id: studyId
                },
                baby_cns: {
                    ...this.state.form.baby_cns,
                    study_id: studyId,
                },
                baby_antibiotic: {
                    ...this.state.form.baby_antibiotic,
                    study_id: studyId
                },
                baby_investigation: {
                    ...this.state.form.baby_investigation,
                    study_id: studyId
                },
                baby_final: {
                    ...this.state.form.baby_final,
                    study_id: studyId
                }
            }
        })
    }

    async handleSubmit(showMessage=true) {
        var data1 = JSON.stringify(this.state.form);
        const userId = await AsyncStorage.getItem('userId');

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
                
                if(response.data && response.data.message && response.data.error){
                    Alert.alert(response.data.message)
                }
                else{
                    if(showMessage){
                        Alert.alert('Baby Health Parameeters successfully updated / submitted!');
                    }
                }   
                
                this.setState({ editable: false, viewForm: true, createForm: false, editablecolor: '#c4c4c4' });
            })
            .catch(function (error) {
                Alert.alert(error.response.data.message)
                console.log(error);
                Alert.alert('Unable to save the data');
            });
    }


    async loadData() {

        await this.setState({ viewForm: true, createForm: false });

        var config = {
            method: 'get',
            url: Constants.manifest.extra.URL  + '/hospitalStaff/aasha/' + this.context,
            headers: {}
        };

        axios(config)
            .then(response => {

                var thisdata = response.data.response[0];
                
                if(!thisdata){
                    this.handleSubmit(false); // Just save the profile / create it to be on the safe side.
                    return;
                }
                
                this.setState({
                    form: {
                        ...this.state.form,
                        baby_appears: {
                            ...this.state.form.baby_appears,
                            baby_appearance: thisdata.baby_appearance,
                            baby_feeding_status: thisdata.baby_feeding_status,
                            breast_feeding_initiation: thisdata.breast_feeding_initiation,
                            study_id: this.context
                        },
                        baby_resp: {
                            ...this.state.form.baby_resp,
                            retraction: thisdata.retraction,
                            fast_breathing: thisdata.fast_breathing,
                            baby_chest_indrawing: thisdata.baby_chest_indrawing,
                            study_id: this.context
                        },
                        baby_cv: {
                            ...this.state.form.baby_cv,
                            urine_output: thisdata.urine_output,
                            baby_blood_pressure_mean_arterial_bp: thisdata.baby_blood_pressure_mean_arterial_bp,
                            baby_blood_pressure_upper_limb: thisdata.baby_blood_pressure_upper_limb,
                            baby_blood_pressure_lower_limb: thisdata.baby_blood_pressure_lower_limb,
                            study_id: this.context
                        },
                        baby_git: {
                            ...this.state.form.baby_git,
                            abdominal_dystension: thisdata.abdominal_dystension,
                            frequency_of_stools: thisdata.frequency_of_stools,
                            vomiting: thisdata.vomiting,
                            baby_movement: thisdata.baby_movement,
                            study_id: this.context
                        },
                        baby_cns: {
                            ...this.state.form.baby_cns,
                            study_id: this.context
                        },
                        baby_antibiotic: {
                            ...this.state.form.baby_antibiotic,
                            study_id: this.context
                        },
                        baby_investigation: {
                            ...this.state.form.baby_investigation,
                            study_id: this.context
                        },
                        baby_final: {
                            ...this.state.form.baby_final,
                            study_id: this.context
                        }
                    }
                })
                this.setColors();
            })
            .catch(error => {
                console.log(error);
                Alert.alert('Baby health parameters has not been saved yet. Please do so.')
            });
    }

    handleUpdate() {
        this.handleSubmit();
    }

    async editableAndColor() {

        await this.setState({ editable: !this.state.editable });

        if (this.state.editable) {
            await this.setState({ editForm: true })
        }

        this.state.editable ? await this.setState({ editablecolor: 'white' }) : await this.setState({ editablecolor: '#eaeaea' })
    }



    async setColors() {

        if (this.state.form.baby_appears.baby_appearance == "Dull") {
            await this.setState({ appearanceBt1: '#6572e4', appearanceBt2: '#eaeaea', appearanceBt3: '#eaeaea' });
        } else if (this.state.form.baby_appears.baby_appearance == "Lethargic") {
            await this.setState({ appearanceBt2: '#6572e4', appearanceBt1: '#eaeaea', appearanceBt3: '#eaeaea' });
        } else {
            await this.setState({ appearanceBt3: '#6572e4', appearanceBt2: '#eaeaea', appearanceBt1: '#eaeaea' })
        }

        if (this.state.form.baby_appears.breast_feeding_initiation == "Yes") {
            await this.setState({ breastFeedingBt1: '#6572e4', breastFeedingBt2: '#eaeaea' });
        } else {
            await this.setState({ breastFeedingBt2: '#6572e4', breastFeedingBt1: '#eaeaea' })
        }

        if (this.state.form.baby_appears.baby_feeding_status == "Poor") {
            await this.setState({ feedingStatusBt1: '#6572e4', feedingStatusBt2: '#eaeaea', feedingStatusBt3: '#eaeaea' });
        } else if (this.state.form.baby_appears.baby_feeding_status == "Normal") {
            await this.setState({ feedingStatusBt2: '#6572e4', feedingStatusBt1: '#eaeaea', feedingStatusBt3: '#eaeaea' });
        } else {
            await this.setState({ feedingStatusBt3: '#6572e4', feedingStatusBt2: '#eaeaea', feedingStatusBt1: '#eaeaea' })
        }

        if (this.state.form.baby_cv.urine_output == "Low") {
            await this.setState({ urineOutputBt1: '#6572e4', urineOutputBt2: '#eaeaea', urineOutputBt3: '#eaeaea' });
        } else if (this.state.form.baby_cv.urine_output == "High") {
            await this.setState({ urineOutputBt2: '#6572e4', urineOutputBt1: '#eaeaea', urineOutputBt3: '#eaeaea' });
        } else {
            await this.setState({ urineOutputBt3: '#6572e4', urineOutputBt1: '#eaeaea', urineOutputBt2: '#eaeaea' })
        }

        if (this.state.form.baby_git.vomiting == "Yes") {
            await this.setState({ vomitingBt1: '#6572e4', vomitingBt2: '#eaeaea' });
        } else {
            await this.setState({ vomitingBt2: '#6572e4', vomitingBt1: '#eaeaea' })
        }

        if (this.state.form.baby_git.abdominal_dystension == "Yes") {
            await this.setState({ abdominalDistensionBt1: '#6572e4', abdominalDistensionBt2: '#eaeaea' });
        } else {
            await this.setState({ abdominalDistensionBt2: '#6572e4', abdominalDistensionBt1: '#eaeaea' })
        }

        if (this.state.form.baby_git.baby_movement == "Yes") {
            await this.setState({ babyMovementBt1: '#6572e4', babyMovementBt2: '#eaeaea' });
        } else {
            await this.setState({ babyMovementBt2: '#6572e4', babyMovementBt1: '#eaeaea' })
        }

        if (this.state.form.baby_resp.retraction == "Yes") {
            await this.setState({ retractionBt1: '#6572e4', retractionBt2: '#eaeaea' });
        } else {
            await this.setState({ retractionBt2: '#6572e4', retractionBt1: '#eaeaea' })
        }

        if (this.state.form.baby_resp.fast_breathing == "Yes") {
            await this.setState({ fastBreathingBt1: '#6572e4', fastBreathingBt2: '#eaeaea' });
        } else {
            await this.setState({ fastBreathingBt2: '#6572e4', fastBreathingBt1: '#eaeaea' })
        }

        if (this.state.form.baby_resp.baby_chest_indrawing == "Yes") {
            await this.setState({ chestInDrawingBt1: '#6572e4', chestInDrawingBt2: '#eaeaea' });
        } else {
            await this.setState({ chestInDrawingBt2: '#6572e4', chestInDrawingBt1: '#eaeaea' })
        }

    }

    render() {
        return (
            <ScrollView>
                <View padder>

                    {/* edit checkbox */}
                    <View style={{
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
                        <Text style={styles.label}>Edit</Text>
                    </View>

                    {/* record id  */}
                    <Label style={styles.titleStyle}>Record Id</Label>
                    <TextInput
                        style={[styles.inputStyle, { backgroundColor: '#eaeaea' }]}
                        editable={false}
                        keyboardType='numeric'
                        value={`${this.state.form.baby_cns.study_id}`}
                    />

                    {/* Appearance */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '100%' }}>
                            <Label style={[styles.titleStyle]}>Appearance</Label>
                            <View style={[styles.viewContainer, { marginTop: 0 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.appearanceBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_appears: { ...this.state.form.baby_appears, baby_appearance: "Dull" } },
                                        appearanceBt1: '#6572e4', appearanceBt2: '#eaeaea', appearanceBt3: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton]}>Dull</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.appearanceBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_appears: { ...this.state.form.baby_appears, baby_appearance: "Lethargic" } },
                                        appearanceBt2: '#6572e4', appearanceBt1: '#eaeaea', appearanceBt3: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton]}>Lethargic</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.appearanceBt3 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_appears: { ...this.state.form.baby_appears, baby_appearance: "Normal" } },
                                        appearanceBt3: '#6572e4', appearanceBt2: '#eaeaea', appearanceBt1: '#eaeaea'
                                    })}  >
                                    <Text style={[styles.textButton]}>Normal</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* Breast feeding & feeding status */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={[styles.titleStyle]}>Breast Feeding Intiation</Label>
                            <View style={[styles.viewContainer, { marginTop: 0 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.breastFeedingBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_appears: { ...this.state.form.baby_appears, breast_feeding_initiation: "Yes" } },
                                        breastFeedingBt1: '#6572e4', breastFeedingBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.breastFeedingBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_appears: { ...this.state.form.baby_appears, breast_feeding_initiation: "No" } },
                                        breastFeedingBt2: '#6572e4', breastFeedingBt1: '#eaeaea'
                                    })} >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={[styles.titleStyle]}>Feeding Status</Label>
                            <View style={[styles.viewContainer, { marginTop: 0 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.feedingStatusBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_appears: { ...this.state.form.baby_appears, baby_feeding_status: "Poor" } },
                                        feedingStatusBt1: '#6572e4', feedingStatusBt2: '#eaeaea', feedingStatusBt3: '#eaeaea'
                                    })} >
                                    <Text style={[styles.textButton, { fontSize: 8 }]}>Poor</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.feedingStatusBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_appears: { ...this.state.form.baby_appears, baby_feeding_status: "Normal" } },
                                        feedingStatusBt2: '#6572e4', feedingStatusBt1: '#eaeaea', feedingStatusBt3: '#eaeaea'
                                    })} >
                                    <Text style={[styles.textButton, { fontSize: 8 }]}>Normal</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.feedingStatusBt3 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_appears: { ...this.state.form.baby_appears, baby_feeding_status: "No Feeding" } },
                                        feedingStatusBt3: '#6572e4', feedingStatusBt1: '#eaeaea', feedingStatusBt2: '#eaeaea'
                                    })} >
                                    <Text style={[styles.textButton, { fontSize: 8 }]}>No Feeding</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* Bp systolic & Dystolic */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.BPSysytolicNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        BPSysytolicNA: !this.state.BPSysytolicNA,
                                        form: { ...this.state.form, baby_cv: { ...this.state.form.baby_cv, baby_blood_pressure_upper_limb: 'NA' } }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>BP (Systolic)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={this.state.BPSysytolicNA && this.state.editable}
                                keyboardType='numeric'
                                value={this.state.form.baby_cv.baby_blood_pressure_upper_limb}
                                onChangeText={(value) => this.setState({
                                    form: { ...this.state.form, baby_cv: { ...this.state.form.baby_cv, baby_blood_pressure_upper_limb: value } }
                                })}
                            />

                        </View>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.BPDiastolicNA}
                                    disabled={!this.state.editable}
                                    style={styles.checkbox}
                                    onPress={() => this.setState({
                                        BPDiastolicNA: !this.state.BPDiastolicNA,
                                        form: { ...this.state.form, baby_cv: { ...this.state.form.baby_cv, baby_blood_pressure_lower_limb: 'NA' } }
                                    })}
                                />
                                <Text style={styles.label}>BP (Diastolic)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={this.state.BPDiastolicNA && this.state.editable}
                                keyboardType='numeric'
                                value={this.state.form.baby_cv.baby_blood_pressure_lower_limb}
                                onChangeText={(value) => this.setState({
                                    form: { ...this.state.form, baby_cv: { ...this.state.form.baby_cv, baby_blood_pressure_lower_limb: value } }
                                })}
                            />
                        </View>
                    </View>



                    {/* Bp mean arterial & urine output */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.BPMeanArterialNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        BPMeanArterialNA: !this.state.BPMeanArterialNA,
                                        form: { ...this.state.form, baby_cv: { ...this.state.form.baby_cv, baby_blood_pressure_mean_arterial_bp: 'NA' } }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>BP (Mean Arterial)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={this.state.BPSysytolicNA && this.state.editable}
                                keyboardType='numeric'
                                value={this.state.form.baby_cv.baby_blood_pressure_mean_arterial_bp}
                                onChangeText={(value) => this.setState({
                                    form: { ...this.state.form, baby_cv: { ...this.state.form.baby_cv, baby_blood_pressure_mean_arterial_bp: value } }
                                })}
                            />

                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={[styles.titleStyle]}>Urine Output</Label>
                            <View style={[styles.viewContainer, { marginTop: 0 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.urineOutputBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_appears: { ...this.state.form.baby_appears, urine_output: "Low" } },
                                        urineOutputBt1: '#6572e4', urineOutputBt2: '#eaeaea', urineOutputBt3: '#eaeaea'
                                    })} >
                                    <Text style={[styles.textButton, { fontSize: 8 }]}>Low</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.urineOutputBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_appears: { ...this.state.form.baby_appears, urine_output: "High" } },
                                        urineOutputBt2: '#6572e4', urineOutputBt1: '#eaeaea', urineOutputBt3: '#eaeaea'
                                    })} >
                                    <Text style={[styles.textButton, { fontSize: 8 }]}>High</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.urineOutputBt3 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_appears: { ...this.state.form.baby_appears, urine_output: "Normal" } },
                                        urineOutputBt3: '#6572e4', urineOutputBt1: '#eaeaea', urineOutputBt2: '#eaeaea'
                                    })} >
                                    <Text style={[styles.textButton, { fontSize: 8 }]}>Normal</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* Frequency of stools & vomiting */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.frequencyOfStoolsNA}
                                    disabled={!this.state.editable}
                                    style={styles.checkbox}
                                    onPress={() => this.setState({
                                        frequencyOfStoolsNA: !this.state.frequencyOfStoolsNA,
                                        form: { ...this.state.form, baby_git: { ...this.state.form.baby_git, frequency_of_stools: 'NA' } }
                                    })}
                                />
                                <Text style={styles.label}>Frequency Stools</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={this.state.frequencyOfStoolsNA && this.state.editable}
                                keyboardType='numeric'
                                value={this.state.form.baby_git.frequency_of_stools}
                                onChangeText={(value) => this.setState({
                                    form: { ...this.state.form, baby_git: { ...this.state.form.baby_git, frequency_of_stools: value } }
                                })}
                            />

                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Vomiting</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.vomitingBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_git: { ...this.state.form.baby_git, vomiting: "Yes" } },
                                        vomitingBt1: '#6572e4', vomitingBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.vomitingBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_git: { ...this.state.form.baby_git, vomiting: "No" } },
                                        vomitingBt2: '#6572e4', vomitingBt1: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* Abdominal distension & baby movement */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={[styles.titleStyle]}>Abdominal Distension</Label>
                            <View style={[styles.viewContainer, { marginTop: 15 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.abdominalDistensionBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_git: { ...this.state.form.baby_git, abdominal_dystension: "Yes" } },
                                        abdominalDistensionBt1: '#6572e4', abdominalDistensionBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.abdominalDistensionBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_git: { ...this.state.form.baby_git, abdominal_dystension: "No" } },
                                        abdominalDistensionBt2: '#6572e4', abdominalDistensionBt1: '#eaeaea'
                                    })} >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={[styles.titleStyle]}>Baby Movement with Stimulation</Label>
                            <View style={[styles.viewContainer, { marginTop: 0 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.babyMovementBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_git: { ...this.state.form.baby_git, baby_movement: "Yes" } },
                                        babyMovementBt1: '#6572e4', babyMovementBt2: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton]}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.babyMovementBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_git: { ...this.state.form.baby_git, baby_movement: "No" } },
                                        babyMovementBt2: '#6572e4', babyMovementBt1: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton]}>No</Text>
                                </Button>
                            </View>
                        </View>
                    </View>


                    {/* Retraction & Fast Breathing */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={[styles.titleStyle]}>Retraction</Label>
                            <View style={[styles.viewContainer, { marginTop: 0 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.retractionBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_resp: { ...this.state.form.baby_resp, retraction: "Yes" } },
                                        retractionBt1: '#6572e4', retractionBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.retractionBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_resp: { ...this.state.form.baby_resp, retraction: "No" } },
                                        retractionBt2: '#6572e4', retractionBt1: '#eaeaea'
                                    })} >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={[styles.titleStyle]}>Fast Breathing</Label>
                            <View style={[styles.viewContainer, { marginTop: 0 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.fastBreathingBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_resp: { ...this.state.form.baby_resp, fast_breathing: "Yes" } },
                                        fastBreathingBt1: '#6572e4', fastBreathingBt2: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton]}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.fastBreathingBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_resp: { ...this.state.form.baby_resp, fast_breathing: "No" } },
                                        fastBreathingBt2: '#6572e4', fastBreathingBt1: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton]}>No</Text>
                                </Button>
                            </View>
                        </View>
                    </View>

                    {/* chest indrawing */}

                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={[styles.titleStyle]}>Chest In-drawing</Label>
                            <View style={[styles.viewContainer, { marginTop: 0 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.chestInDrawingBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_resp: { ...this.state.form.baby_resp, baby_chest_indrawing: "Yes" } },
                                        chestInDrawingBt1: '#6572e4', chestInDrawingBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.chestInDrawingBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_resp: { ...this.state.form.baby_resp, baby_chest_indrawing: "No" } },
                                        chestInDrawingBt2: '#6572e4', chestInDrawingBt1: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%', }}>
                            <View style={[styles.viewContainer, { marginTop: 40 }]}>
                                {this.state.createForm &&
                                    <Button onPress={this.handleSubmit} style={{ backgroundColor: '#6572e4', width: '100%', justifyContent: 'center' }}>
                                        <Text>Submit</Text></Button>
                                }
                                {/* {this.state.viewForm && !this.state.editForm &&
                                    <Button style={{ backgroundColor: '#6572e4', width: '100%', justifyContent: 'center' }}>
                                        <Text>Ok</Text></Button>
                                } */}
                                {this.state.editForm &&
                                    <Button onPress={this.handleUpdate} style={{ backgroundColor: '#6572e4', width: '100%', justifyContent: 'center' }}>
                                        <Text>Update</Text></Button>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

        );
    }
}

BabyHealthParameters.contextType = UserContext

export default BabyHealthParameters

