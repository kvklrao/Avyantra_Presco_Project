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
import ModalDropdown from 'react-native-modal-dropdown';

const FEVER_UNITS = [
    'Centigrade',
    'Farhenheit'
];


class MotherProfileInvasive extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editable: true,
            viewForm: false,
            editForm: false,
            createForm: true,

            editablecolor: 'white',

            form: {
                amniotic_fluid_culture: "Yes",//done or not
                amniotic_fluid_culture_three: "",//if positive
                amniotic_fluid_culture_two: "Positive",//result
                chorioamnionitis: "Yes",
                colonisation_or_urinary_tract_infection: "Yes",
                delayed_cord_clamping: "Yes",
                gbs_infection: "Yes",
                leaking_pv: "Yes",
                maternal_blood_pressure: "",
                maternal_blood_pressure_diastolic: "",
                maternal_diabetes: "Yes",
                maternal_fever: "",//value
                maternal_fever_basic: "Yes",//present or not
                maternal_fever_duration: "",
                maternal_fever_unit: "Centigrade",
                maternal_thyroid_function: "Normal",
                maternal_thyroid_function_basic: "Hypo",
                maternal_thyroid_function_unit_basic: "",
                maternal_thyroid_function_unit_basic_unit: "mU/L",
                more_than_3_vaginal_examinations_during_labor: "Yes",
                mother_age: "",
                mother_bmi: "",
                mother_haemoglobin: "",
                mother_height: "",
                mother_height_unit: "ft",
                mother_weight: "",
                mother_weight_unit: "Kgs",
                pih: "Yes",
                rupture_of_membranes_rom: "Yes",
                rupture_of_membranes_rom_one: "PROM",
                rupture_of_membranes_rom_two: ">18 hours",
                smelly_amniotic_fluid: "Yes",
                study_id: "",
                tab_name: "maternal",
                torch_infections: "Yes",
                type_of_delivery: "Normal",
                vaginal_swab_culture: "Yes",
                vaginal_swab_culture_three: "",//organism
                vaginal_swab_culture_two: "Positive",//result

            },

            AgeNA: true,
            BmiNA: true,
            RomIfPromNA: true,
            HaemoglobinNA: true,
            FeverDurationNA: true,
            ROMIfPROMNA: true,
            vaginalSwabCultureNA: true,
            AFCultureIfPositiveNA: true,
            BPSystolicNA: true,
            BPDiastolicNA: true,


            diabetesBt1: '#6572e4',
            diabetesBt2: '#eaeaea',
            RomBt1: '#6572e4',
            RomBt2: '#eaeaea',
            romTypeBt1: '#6572e4',
            romTypeBt2: '#eaeaea',
            romTypeBt3: '#eaeaea',
            // promBt1: '#6572e4',
            // promBt2: '#eaeaea',
            deliveryBt1: '#6572e4',
            deliveryBt2: '#eaeaea',
            delayedCordClampingBt1: '#6572e4',
            delayedCordClampingBt2: '#eaeaea',
            feverPresentBt1: '#6572e4',
            feverPresentBt2: '#eaeaea',
            thyroidFunctionBt1: '#6572e4',
            thyroidFunctionBt2: '#eaeaea',
            vaginalExaminationBt1: '#6572e4',
            vaginalExaminationBt2: '#eaeaea',
            leakingPVBt1: '#6572e4',
            leakingPVBt2: '#eaeaea',
            pihBt1: '#6572e4',
            pihBt2: '#eaeaea',
            smellyAmnoiticFluidBt1: '#6572e4',
            smellyAmnoiticFluidBt2: '#eaeaea',
            chorioamnionitisBt1: '#6572e4',
            chorioamnionitisBt2: '#eaeaea',
            GBSInfectionBt1: '#6572e4',
            GBSInfectionBt2: '#eaeaea',
            urinaryTractInfectionBt1: '#6572e4',
            urinaryTractInfectionBt2: '#eaeaea',
            torchInfectionBt1: '#6572e4',
            torchInfectionBt2: '#eaeaea',
            vaginalSwabCultureDoneBt1: '#6572e4',
            vaginalSwabCultureDoneBt2: '#eaeaea',
            vaginalSwabCultureDoneBt3: '#eaeaea',
            vaginalSwabCultureResultBt1: '#6572e4',
            vaginalSwabCultureResultBt2: '#eaeaea',
            AFCultureDoneBt1: '#6572e4',
            AFCultureDoneBt2: '#eaeaea',
            AFCultureResultBt1: '#6572e4',
            AFCultureResultBt2: '#eaeaea',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editableAndColor = this.editableAndColor.bind(this);
        this.setColors = this.setColors.bind(this);
        this.loadData = this.loadData.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.forCreateForm = this.forCreateForm.bind(this);
        this.calculateBmi = this.calculateBmi.bind(this);
    }

    async calculateBmi(weight, height) {
        if (this.state.form.mother_height != height) {
            await this.setState({ form: { ...this.state.form, mother_height: height } });
        }
        if (this.state.form.mother_weight != weight) {
            await this.setState({ form: { ...this.state.form, mother_weight: weight } });
        }
        var total = this.state.form.mother_height;
        var beforeTotal = total.toString().split(".")[0];
        var afterTotal = total.toString().split(".")[1];
        if (afterTotal) {
            var conver_in_inch = (((beforeTotal * 12) + parseInt(afterTotal)) * 2.54) / 100;
        } else {
            var conver_in_inch = ((beforeTotal * 12) * 2.54) / 100;
        }
        var calculatedBMI = this.state.form.mother_weight / (conver_in_inch * conver_in_inch);
        calculatedBMI = calculatedBMI.toString().slice(0,5)

        if (this.state.form.mother_height.length > 0 && this.state.form.mother_weight.length > 0) {
            this.setState({ form: { ...this.state.form, mother_bmi: calculatedBMI } })
        } else {
            this.setState({ form: { ...this.state.form, mother_bmi: 0 } })
        }
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

    async handleSubmit() {

        var data = JSON.stringify(this.state.form);
        var userId = await AsyncStorage.getItem('userId');

        var config = {
            method: 'post',
            url: Constants.manifest.extra.URL  + '/patient/maternal/add/' + userId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(response => {
                Alert.alert('Mother Profile Form Succesfully submitted!');
                this.setState({ editable: false, viewForm: true, createForm: false, editablecolor: '#c4c4c4' });
            })
            .catch(function (error) {
                console.log(error);
            });

        await AsyncStorage.setItem('motherprofileInvasive', JSON.stringify(this.state.form));
    }

    async loadData() {

        await this.setState({ viewForm: true, createForm: false });
        await this.setState({ form: { ...this.state.form, study_id: this.context } });

        var hospitalId = await AsyncStorage.getItem('hospitalId');

        var config = {
            method: 'post',
            url: Constants.manifest.extra.URL  + '/patient/get_maternal/' + this.context + '/' + hospitalId + '/1',
            headers: {}
        };
        
        axios(config)
            .then(response => {
                
                var thisdata = response.data.response[0];
                this.setState({
                    form: {
                        ...this.state.form,

                        mother_age: thisdata.mother_age
                        , mother_weight: thisdata.mother_weight
                        , mother_height: thisdata.mother_height
                        , mother_bmi: thisdata.mother_bmi
                        , maternal_diabetes: thisdata.maternal_diabetes
                        , maternal_blood_pressure: thisdata.maternal_blood_pressure
                        , maternal_blood_pressure_diastolic: thisdata.maternal_blood_pressure_diastolic
                        , rupture_of_membranes_rom: thisdata.rupture_of_membranes_rom
                        , rupture_of_membranes_rom_one: thisdata.rupture_of_membranes_rom_one
                        , rupture_of_membranes_rom_two: thisdata.rupture_of_membranes_rom_two
                        , type_of_delivery: thisdata.type_of_delivery
                        , delayed_cord_clamping: thisdata.delayed_cord_clamping,
                        amniotic_fluid_culture: thisdata.amniotic_fluid_culture,
                        amniotic_fluid_culture_three: thisdata.amniotic_fluid_culture_three,
                        amniotic_fluid_culture_two: thisdata.amniotic_fluid_culture_two,
                        chorioamnionitis: thisdata.chorioamnionitis,
                        colonisation_or_urinary_tract_infection: thisdata.colonisation_or_urinary_tract_infection,
                        gbs_infection: thisdata.gbs_infection,
                        leaking_pv: thisdata.leaking_pv,
                        maternal_fever: thisdata.maternal_fever,
                        maternal_fever_basic: thisdata.maternal_fever_basic,
                        maternal_fever_duration: thisdata.maternal_fever_duration,
                        maternal_fever_unit: thisdata.maternal_fever_unit,
                        maternal_thyroid_function: thisdata.maternal_thyroid_function,
                        maternal_thyroid_function_basic: thisdata.maternal_thyroid_function_basic,
                        maternal_thyroid_function_unit_basic: thisdata.maternal_thyroid_function_unit_basic,
                        maternal_thyroid_function_unit_basic_unit: thisdata.maternal_thyroid_function_unit_basic_unit,
                        more_than_3_vaginal_examinations_during_labor: thisdata.more_than_3_vaginal_examinations_during_labor,
                        mother_haemoglobin: thisdata.mother_haemoglobin,
                        pih: thisdata.pih,
                        smelly_amniotic_fluid: thisdata.smelly_amniotic_fluid,
                        study_id: thisdata.study_id,
                        torch_infections: thisdata.torch_infections,
                        vaginal_swab_culture: thisdata.vaginal_swab_culture,
                        vaginal_swab_culture_three: thisdata.vaginal_swab_culture_three,
                        vaginal_swab_culture_two: thisdata.vaginal_swab_culture_two,
                    }
                })
                this.setColors();
            })
            .catch(error => {
                console.log(error);
            });
        await AsyncStorage.setItem('motherprofileInvasive', JSON.stringify(this.state.form));
    }

    async handleUpdate() {

        var data = JSON.stringify(this.state.form);

        var userId = await AsyncStorage.getItem('userId');
        var config = {
            method: 'put',
            url: Constants.manifest.extra.URL  + '/patient/update/motherProfile/' + this.context + '/' + userId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(response => {
                this.setState({ editable: false, editablecolor: '#eaeaea', viewForm: true, editForm: false, createForm: false });
                Alert.alert('Mother Profile Updated!')
            })
            .catch(function (error) {
                Alert.alert(error.response.data.errors[0].param + ' --> ' + error.response.data.errors[0].msg)
                console.log(error);
            });
        await AsyncStorage.setItem('motherprofileInvasive', JSON.stringify(this.state.form));

    }

    async editableAndColor() {

        await this.setState({ editable: !this.state.editable });

        if (this.state.editable) {
            await this.setState({ editForm: true })
        }

        this.state.editable ? await this.setState({ editablecolor: 'white' }) : await this.setState({ editablecolor: '#eaeaea' })
    }

    async setColors() {

        let colorsObj = {}

        if (this.state.form.maternal_diabetes == "Yes") {
            colorsObj = { diabetesBt1: '#6572e4', diabetesBt2: '#eaeaea' };
        } else {
            colorsObj = { diabetesBt2: '#6572e4', diabetesBt1: '#eaeaea' }
        }

        if (this.state.form.rupture_of_membranes_rom == "Yes") {
            colorsObj = {  ...colorsObj, RomBt1: '#6572e4', RomBt2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, RomBt2: '#6572e4', RomBt1: '#eaeaea' }
        }

        if (this.state.form.rupture_of_membranes_rom_one == "PROM") {
            colorsObj = {  ...colorsObj, romTypeBt1: '#6572e4', romTypeBt2: '#eaeaea', romTypeBt3: '#eaeaea' };
        } else if (this.state.form.rupture_of_membranes_rom_one == "SROM") {
            colorsObj = {  ...colorsObj, romTypeBt2: '#6572e4', romTypeBt1: '#eaeaea', romTypeBt3: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, romTypeBt3: '#6572e4', romTypeBt2: '#eaeaea', romTypeBt1: '#eaeaea' };
        }

        if (this.state.form.type_of_delivery == "Normal") {
            colorsObj = {  ...colorsObj, deliveryBt1: '#6572e4', deliveryBt2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, deliveryBt2: '#6572e4', deliveryBt1: '#eaeaea' };
        }

        if (this.state.form.delayed_cord_clamping == "Yes") {
            colorsObj = {  ...colorsObj, delayedCordClampingBt1: '#6572e4', delayedCordClampingBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, delayedCordClampingBt2: '#6572e4', delayedCordClampingBt1: '#eaeaea' };
        }

        if (this.state.form.maternal_fever_basic == "Yes") {
            colorsObj = {  ...colorsObj, feverPresentBt1: '#6572e4', feverPresentBt2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, feverPresentBt2: '#6572e4', feverPresentBt1: '#eaeaea' };
        }

        if (this.state.form.maternal_thyroid_function == "Normal") {
            colorsObj = {  ...colorsObj, thyroidFunctionBt1: '#6572e4', thyroidFunctionBt2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, thyroidFunctionBt2: '#6572e4', thyroidFunctionBt1: '#eaeaea' };
        }

        if (this.state.form.more_than_3_vaginal_examinations_during_labor == "Yes") {
            colorsObj = {  ...colorsObj, vaginalExaminationBt1: '#6572e4', vaginalExaminationBt2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, vaginalExaminationBt2: '#6572e4', vaginalExaminationBt1: '#eaeaea' };
        }

        if (this.state.form.leaking_pv == "Yes") {
            colorsObj = {  ...colorsObj, leakingPVBt1: '#6572e4', leakingPVBt2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, leakingPVBt2: '#6572e4', leakingPVBt1: '#eaeaea' };
        }

        if (this.state.form.pih == "Yes") {
            colorsObj = {  ...colorsObj, pihBt1: '#6572e4', pihBt2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, pihBt2: '#6572e4', pihBt1: '#eaeaea' };
        }

        if (this.state.form.smelly_amniotic_fluid == "Yes") {
            colorsObj = {  ...colorsObj, smellyAmnoiticFluidBt1: '#6572e4', smellyAmnoiticFluidBt2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, smellyAmnoiticFluidBt2: '#6572e4', smellyAmnoiticFluidBt1: '#eaeaea' };
        }

        if (this.state.form.chorioamnionitis == "Yes") {
            colorsObj = {  ...colorsObj, chorioamnionitisBt1: '#6572e4', chorioamnionitisBt2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, chorioamnionitisBt2: '#6572e4', chorioamnionitisBt1: '#eaeaea' };
        }

        if (this.state.form.gbs_infection == "Yes") {
            colorsObj = {  ...colorsObj, GBSInfectionBt1: '#6572e4', GBSInfectionBt2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, GBSInfectionBt2: '#6572e4', GBSInfectionBt1: '#eaeaea' };
        }

        if (this.state.form.colonisation_or_urinary_tract_infection == "Yes") {
            colorsObj = { ...colorsObj, urinaryTractInfectionBt1: '#6572e4', urinaryTractInfectionBt2: '#eaeaea' };
        } else {
            colorsObj = { ...colorsObj, urinaryTractInfectionBt2: '#6572e4', urinaryTractInfectionBt1: '#eaeaea' };
        }

        if (this.state.form.torch_infections == "Yes") {
            colorsObj = {  ...colorsObj, torchInfectionBt1: '#6572e4', torchInfectionBt2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, torchInfectionBt2: '#6572e4', torchInfectionBt1: '#eaeaea' }
        }

        if (this.state.form.vaginal_swab_culture == "Yes") {
            colorsObj = {  ...colorsObj, vaginalSwabCultureDoneBt1: '#6572e4', vaginalSwabCultureDoneBt2: '#eaeaea', vaginalSwabCultureDoneBt3: '#eaeaea' };
        } 

        if (this.state.form.vaginal_swab_culture == "No") {
            colorsObj = {  ...colorsObj, vaginalSwabCultureDoneBt2: '#6572e4', vaginalSwabCultureDoneBt1: '#eaeaea', vaginalSwabCultureDoneBt3: '#eaeaea' };
        }

        if (this.state.form.vaginal_swab_culture == "NA") {
                colorsObj = {  ...colorsObj, vaginalSwabCultureDoneBt3: '#6572e4', vaginalSwabCultureDoneBt1: '#eaeaea', vaginalSwabCultureDoneBt2: '#eaeaea' };
        }

        if (this.state.form.vaginal_swab_culture_two == "Positive") {
            colorsObj = {  ...colorsObj, vaginalSwabCultureResultBt1: '#6572e4', vaginalSwabCultureResultBt2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, vaginalSwabCultureResultBt2: '#6572e4', vaginalSwabCultureResultBt1: '#eaeaea' };
        }

        if (this.state.form.amniotic_fluid_culture == "Yes") {
            colorsObj = {  ...colorsObj, AFCultureDoneBt1: '#6572e4', AFCultureDoneBt2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, AFCultureDoneBt2: '#6572e4', AFCultureDoneBt1: '#eaeaea' };
        }

        if (this.state.form.amniotic_fluid_culture_two == "Positive") {
            colorsObj = {  ...colorsObj, AFCultureResultBt1: '#6572e4', AFCultureResultBt2: '#eaeaea' };
        } else {
            colorsObj = {  ...colorsObj, AFCultureResultBt2: '#6572e4', AFCultureResultBt1: '#eaeaea' };
        }

        await this.setState({ ...colorsObj });

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


                    {/* record id */}
                    <Label style={styles.titleStyle}>Record Id</Label>
                    <TextInput
                        style={[styles.inputStyle, { backgroundColor: '#eaeaea' }]}
                        editable={false}
                        keyboardType='numeric'
                        value={`${this.state.form.study_id}`}
                    />

                    {/* Age */}
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            checked={this.state.AgeNA}
                            disabled={!this.state.editable}
                            onPress={() => this.setState({ AgeNA: !this.state.AgeNA, form: { ...this.state.form, mother_age: 'NA' } })}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Age (Yrs)</Text>
                    </View>
                    <TextInput
                        style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                        editable={this.state.AgeNA && this.state.editable}
                        keyboardType='numeric'
                        value={`${this.state.form.mother_age}`}
                        onChangeText={(value) => this.setState({ form: { ...this.state.form, mother_age: value } })}
                    />

                    {/* weight and height */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Weight</Label>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    value={`${this.state.form.mother_weight}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.calculateBmi(value, this.state.form.mother_height)}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={10} color="#000" >
                                    <Text style={styles.iconText}>Kgs</Text></Icon>
                            </View>
                        </View>
                        <View style={{ width: '47%', }}>
                            <Label style={styles.titleStyle}>Height</Label>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    value={`${this.state.form.mother_height}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.calculateBmi(this.state.form.mother_weight, value)}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={10} color="#000" >
                                    <Text style={styles.iconText}>ft</Text></Icon>
                            </View>
                        </View>
                    </View>


                    {/* bmi and diabetes */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.BmiNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ BmiNA: !this.state.BmiNA, form: { ...this.state.form, mother_bmi: 'NA' } })}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>BMI (Number)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={false}
                                keyboardType='numeric'
                                value={`${this.state.form.mother_bmi}`}
                                //onPress={() => this.calculateBmi}
                                onChangeText={(value) => this.setState({ form: { ...this.state.form, mother_bmi: value } })}
                            />

                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Diabetes (Present)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.diabetesBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, maternal_diabetes: "Yes" },
                                        diabetesBt1: '#6572e4', diabetesBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.diabetesBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, maternal_diabetes: "No" },
                                        diabetesBt2: '#6572e4', diabetesBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* bloodpressure */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.BPSystolicNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        BPSystolicNA: !this.state.BPSystolicNA,
                                        form: { ...this.state.form, maternal_blood_pressure: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Blood Pressure(Systolic)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, maternal_blood_pressure: value } })}
                                    underlineColorAndroid="transparent"
                                    value={`${this.state.form.maternal_blood_pressure}`}
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>Systolic</Text></Icon>
                            </View>
                        </View>
                        <View style={{ width: '47%', }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.BPDiastolicNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        BPDiastolicNA: !this.state.BPDiastolicNA,
                                        form: { ...this.state.form, maternal_blood_pressure_diastolic: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Blood Pressure (Diastolic)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    value={`${this.state.form.maternal_blood_pressure_diastolic}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, maternal_blood_pressure_diastolic: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>Dystolic</Text></Icon>
                            </View>
                        </View>
                    </View>

                    {/* haemoglobin and fever */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.HaemoglobinNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        HaemoglobinNA: !this.state.HaemoglobinNA,
                                        form: { ...this.state.form, mother_haemoglobin: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Haemoglobin</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, mother_haemoglobin: value } })}
                                    underlineColorAndroid="transparent"
                                    value={`${this.state.form.mother_haemoglobin}`}
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>g/DL</Text></Icon>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Fever (Present)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.feverPresentBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, maternal_fever_basic: "Yes" },
                                        feverPresentBt1: '#6572e4', feverPresentBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.feverPresentBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, maternal_fever_basic: "No" },
                                        feverPresentBt2: '#6572e4', feverPresentBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* Fever units and Duration */}
                    <View style={[styles.partitionView, { marginBottom: 0 }]}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Fever (Units)</Label>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    value={`${this.state.form.maternal_fever}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, maternal_fever: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <ModalDropdown 
                                    disabled={!this.state.editable}
                                    options={FEVER_UNITS}
                                    defaultValue={this.state.form.maternal_fever_unit ? this.state.form.maternal_fever_unit : 'Select unit ...'}
                                    textStyle={{fontSize: 15, padding: 3, fontWeight: 'bold'}}
                                    dropdownStyle={{height: 80, width: 80, backgroundColor: 'snow', borderWidth: 2, borderRadius: 3, marginTop: -10}}
                                    dropdownTextStyle={{fontSize: 15, padding: 3, backgroundColor: 'now', fontWeight: 'bold'}}
                                    dropdownTextHighlightStyle={{backgroundColor: '#d3d3d3'}}
                                    style={{ height: 22, width: 80, borderRadius: 10, borderColor: 'lightgray' }}
                                    onSelect={(itemValue, itemIndex) => this.setState({
                                        form: { ...this.state.form, maternal_fever_unit: itemIndex }
                                    })}
                                />
                            </View>
                        </View>
                        <View style={{ width: '47%', height: 80 }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.FeverDurationNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        FeverDurationNA: !this.state.FeverDurationNA,
                                        form: { ...this.state.form, maternal_fever_duration: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Fever (Duration)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, maternal_fever_duration: value } })}
                                    underlineColorAndroid="transparent"
                                    value={`${this.state.form.maternal_fever_duration}`}
                                />
                                <Icon style={styles.searchIcon} size={30} color="#000" >
                                    <Text style={styles.iconText}>Hrs</Text></Icon>
                            </View>
                        </View>
                    </View>

                    {/* Thyroid Function and If Abnormal */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Thyroid Function</Label>
                            <View style={[styles.viewContainer, { marginTop: 0 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.thyroidFunctionBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, maternal_thyroid_function: "Normal" },
                                        thyroidFunctionBt1: '#6572e4', thyroidFunctionBt2: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton, { fontSize: 10 }]}>Normal</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.thyroidFunctionBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, maternal_thyroid_function: "Abnormal" },
                                        thyroidFunctionBt2: '#6572e4', thyroidFunctionBt1: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton, { fontSize: 9 }]}>Abnormal</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%', marginTop: -8 }}>
                            <Label style={styles.titleStyle}>Thyroid Function (If Abnormal)</Label>
                            <View style={[styles.inputStyle]}>
                                <Picker
                                    selectedValue={this.state.form.maternal_thyroid_function_basic}
                                    style={{ height: 40, width: 150, borderRadius: 10 }}
                                    mode={'dropdown'}
                                    onValueChange={(itemValue, itemIndex) => this.setState({
                                        form: { ...this.state.form, maternal_thyroid_function_basic: itemValue }
                                    })}
                                >
                                    <Picker.Item label="Hypo" value="Hypo" />
                                    <Picker.Item label="Hyper" value="Hyper" />
                                    <Picker.Item label="NA" value="NA" />
                                </Picker>
                            </View>
                        </View>
                    </View>

                    {/* Thyroid Function Unit and Vaginal Examination */}
                    <View style={styles.partitionView}>

                        <View style={{ width: '47%', height: 80,marginTop:15 }}>
                            <Text style={styles.label}>Thyroid Function (Unit)</Text>
                            <View style={[styles.searchSection]}>
                                <TextInput
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    editable={this.state.editable}
                                    value={`${this.state.form.maternal_thyroid_function_unit_basic}`}
                                    keyboardType='numeric'
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, maternal_thyroid_function_unit_basic: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>mU/L</Text></Icon>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>More than 3 Vaginal Examinations During Labor</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.vaginalExaminationBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, more_than_3_vaginal_examinations_during_labor: "Yes" },
                                        vaginalExaminationBt1: '#6572e4', vaginalExaminationBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.vaginalExaminationBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, more_than_3_vaginal_examinations_during_labor: "No" },
                                        vaginalExaminationBt2: '#6572e4', vaginalExaminationBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>




                    {/* leaking PV and PIH */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Leaking PV</Label>
                            <View style={[styles.viewContainer, { marginTop: 5 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.leakingPVBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, leaking_pv: "Yes" },
                                        leakingPVBt1: '#6572e4', leakingPVBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.leakingPVBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, leaking_pv: "No" },
                                        leakingPVBt2: '#6572e4', leakingPVBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Pregnancy-induced hypertension (PIH)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.pihBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, pih: "Yes" },
                                        pihBt1: '#6572e4', pihBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.pihBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, pih: "No" },
                                        pihBt2: '#6572e4', pihBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* rom and rom type */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={[styles.titleStyle]}>Rupture Of Membranes (ROM)</Label>
                            <View style={[styles.viewContainer, { marginTop: 0 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.RomBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, rupture_of_membranes_rom: "Yes" },
                                        RomBt1: '#6572e4', RomBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.RomBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, rupture_of_membranes_rom: "No" },
                                        RomBt2: '#6572e4', RomBt1: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%', }}>
                            <Label style={[styles.titleStyle]}>Rupture Of Membranes (Type)</Label>
                            <View style={[styles.viewContainer, { marginTop: 0 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.romTypeBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, rupture_of_membranes_rom_one: "PROM" },
                                        romTypeBt1: '#6572e4', romTypeBt2: '#eaeaea', romTypeBt3: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton, { fontSize: 8 }]}>prom</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.romTypeBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, rupture_of_membranes_rom_one: "SROM" },
                                        romTypeBt2: '#6572e4', romTypeBt1: '#eaeaea', romTypeBt3: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton, { fontSize: 8 }]}>srom</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.romTypeBt3 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, rupture_of_membranes_rom_one: "ARM" },
                                        romTypeBt3: '#6572e4', romTypeBt2: '#eaeaea', romTypeBt1: '#eaeaea'
                                    })} >
                                    <Text style={[styles.textButton, { fontSize: 8 }]}>arm</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* rom and smelly amniotic fluid */}
                    <View style={[styles.partitionView, { marginBottom: 15 }]}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.RomIfPromNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({ RomIfPromNA: !this.state.RomIfPromNA, form: { ...this.state.form, rupture_of_membranes_rom_two: 'NA' } })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Rupture Of Membranes(IF PROM)</Text>
                            </View>
                            <View style={[styles.viewContainer, { marginTop: 0 }]}>
                                <View style={[styles.inputStyle]}>
                                    <Picker
                                        selectedValue={this.state.form.rupture_of_membranes_rom_two}
                                        style={{ height: 40, width: 150, borderRadius: 10 }}
                                        mode={'dropdown'}
                                        onValueChange={(itemValue, itemIndex) => this.setState({
                                            form: { ...this.state.form, rupture_of_membranes_rom_two: itemValue }
                                        })}
                                    >
                                        <Picker.Item label="<18 hours" value="<18 hours" />
                                        <Picker.Item label=">18 hours" value=">18 hours" />
                                    </Picker>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Smelly Amniotic Fluid</Label>
                            <View style={[styles.viewContainer, { marginTop: 5 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.smellyAmnoiticFluidBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, smelly_amniotic_fluid: "Yes" },
                                        smellyAmnoiticFluidBt1: '#6572e4', smellyAmnoiticFluidBt2: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton]}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.smellyAmnoiticFluidBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, smelly_amniotic_fluid: "No" },
                                        smellyAmnoiticFluidBt2: '#6572e4', smellyAmnoiticFluidBt1: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton]}>No</Text></Button>
                            </View>
                        </View>
                    </View>
                    {/* Chorioaminonitis and GBS Infection */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Chorioamnionitis</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.chorioamnionitisBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, chorioamnionitis: "Yes" },
                                        chorioamnionitisBt1: '#6572e4', chorioamnionitisBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.chorioamnionitisBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, chorioamnionitis: "No" },
                                        chorioamnionitisBt2: '#6572e4', chorioamnionitisBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>GBS Infection</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.GBSInfectionBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, gbs_infection: "Yes" },
                                        GBSInfectionBt1: '#6572e4', GBSInfectionBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.GBSInfectionBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, gbs_infection: "No" },
                                        GBSInfectionBt2: '#6572e4', GBSInfectionBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* urinary Tract Infection and Torch Infection */}
                    <View style={[styles.partitionView, { marginBottom: 20 }]}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Urinary Tract Infection</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.urinaryTractInfectionBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, colonisation_or_urinary_tract_infection: "Yes" },
                                        urinaryTractInfectionBt1: '#6572e4', urinaryTractInfectionBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.urinaryTractInfectionBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, colonisation_or_urinary_tract_infection: "No" },
                                        urinaryTractInfectionBt2: '#6572e4', urinaryTractInfectionBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Torch Infection</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.torchInfectionBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, torch_infections: "Yes" },
                                        torchInfectionBt1: '#6572e4', torchInfectionBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.torchInfectionBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, torch_infections: "No" },
                                        torchInfectionBt2: '#6572e4', torchInfectionBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* type of delivery and delayed cord clamping */}
                    <View style={[styles.partitionView, { bottom: 20 }]}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Type Of Delivery</Label>
                            <View style={[styles.viewContainer, { marginTop: 0 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.deliveryBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, delayed_cord_clamping: "Normal" },
                                        deliveryBt1: '#6572e4', deliveryBt2: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton, { fontSize: 10 }]}>Normal</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.deliveryBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, delayed_cord_clamping: "Cesarean" },
                                        deliveryBt2: '#6572e4', deliveryBt1: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton, { fontSize: 10 }]}>Cesarean</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={[styles.titleStyle]}>Delayed Cord Clamping</Label>
                            <View style={[styles.viewContainer, { marginTop: 0 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.delayedCordClampingBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, delayed_cord_clamping: "Yes" },
                                        delayedCordClampingBt1: '#6572e4', delayedCordClampingBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.delayedCordClampingBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, delayed_cord_clamping: "No" },
                                        delayedCordClampingBt2: '#6572e4', delayedCordClampingBt1: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* Vaginal Swab Culture (Done ) and Vaginal Swab Culture Result */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Vaginal Swab Culture (Done)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.vaginalSwabCultureDoneBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, vaginal_swab_culture: "Yes" },
                                        vaginalSwabCultureDoneBt3: '#eaeaea', vaginalSwabCultureDoneBt1: '#6572e4', vaginalSwabCultureDoneBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.vaginalSwabCultureDoneBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, vaginal_swab_culture: "No" },
                                        vaginalSwabCultureDoneBt3: '#eaeaea', vaginalSwabCultureDoneBt2: '#6572e4', vaginalSwabCultureDoneBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.vaginalSwabCultureDoneBt3 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, vaginal_swab_culture: "NA" },
                                        vaginalSwabCultureDoneBt3: '#6572e4', vaginalSwabCultureDoneBt2: '#eaeaea', vaginalSwabCultureDoneBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>NA</Text>
                                </Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Vaginal Swab Culture (Result)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.vaginalSwabCultureResultBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, vaginal_swab_culture_two: "Positive" },
                                        vaginalSwabCultureResultBt1: '#6572e4', vaginalSwabCultureResultBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Positive</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.vaginalSwabCultureResultBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, vaginal_swab_culture_two: "Negative" },
                                        vaginalSwabCultureResultBt2: '#6572e4', vaginalSwabCultureResultBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>Negative</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* Vaginal Swab Culture  and AF Culture Done */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={[styles.checkboxContainer, { marginTop: 5 } ]}>
                                <CheckBox
                                    checked={this.state.ApgarScore10NA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        ApgarScore10NA: !this.state.ApgarScore10NA,
                                        form: { ...this.state.form, baby_apgar_score_ten_min: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>Vaginal Swab Culture (Organism)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { marginTop: 5, backgroundColor: this.state.editablecolor }]}
                                editable={this.state.vaginalSwabCultureNA && this.state.editable}
                                keyboardType='numeric'
                                value={`${this.state.form.vaginal_swab_culture_three}`}
                                onChangeText={(value) => this.setState({
                                    form: { ...this.state.form, vaginal_swab_culture_three: value }
                                })}
                            />

                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Amniotic Fluid Culture (Done)</Label>
                            <View style={[styles.viewContainer, { marginTop: 0 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.AFCultureDoneBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, amniotic_fluid_culture: "Yes" },
                                        AFCultureDoneBt1: '#6572e4', AFCultureDoneBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.AFCultureDoneBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, amniotic_fluid_culture: "No" },
                                        AFCultureDoneBt2: '#6572e4', AFCultureDoneBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* AF Culture result and AF culture if positive */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Amniotic Fluid Culture (Result)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.AFCultureResultBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, amniotic_fluid_culture_two: "Positive" },
                                        AFCultureResultBt1: '#6572e4', AFCultureResultBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Positive</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.AFCultureResultBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, amniotic_fluid_culture_two: "Negative" },
                                        AFCultureResultBt2: '#6572e4', AFCultureResultBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>Negative</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%',marginTop:0 }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.AFCultureIfPositiveNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        AFCultureIfPositiveNA: !this.state.AFCultureIfPositiveNA,
                                        form: { ...this.state.form, amniotic_fluid_culture_three: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>AF Culture (If Positive)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={this.state.AFCultureIfPositiveNA && this.state.editable}
                                keyboardType='numeric'
                                value={`${this.state.form.amniotic_fluid_culture_three}`}
                                onChangeText={(value) => this.setState({
                                    form: { ...this.state.form, amniotic_fluid_culture_three: value }
                                })}
                            />

                        </View>
                    </View>


                    <View style={{ width: '47%', marginLeft:'55%'}}>
                        <View style={[styles.viewContainer, { marginTop: 15 }]}>
                            {/* <Button style={[styles.buttonContainer, { backgroundColor: '#6572e4' }]}
                                    disabled={!this.state.editable}
                                    onPress={this.handleSubmit}>
                                    <Text style={[styles.textButton]}>Next</Text>
                                </Button> */}
                            {this.state.createForm &&
                                <Button onPress={this.handleSubmit} style={{ backgroundColor: '#6572e4', width: '100%', justifyContent: 'center' }}>
                                    <Text>Submit</Text></Button>
                            }
                            {/* {this.state.viewForm && !this.state.editForm &&
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
            </ScrollView>
        );
    }
}

MotherProfileInvasive.contextType = UserContext

export default MotherProfileInvasive

