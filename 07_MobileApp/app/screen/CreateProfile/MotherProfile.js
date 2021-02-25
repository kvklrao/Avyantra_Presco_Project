import React, { Component } from 'react';
import {
    CheckBox, Text, View,
    Content,
    Label, Button, Icon, Container
} from "native-base";
import { TextInput, ScrollView, Alert } from 'react-native';
import styles from '../../GlobalStyling';
import axios from 'axios';
import UserContext from '../context/studyidContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";

class MotherProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editable: true,
            viewForm: false,
            editForm: false,
            createForm: true,

            editablecolor: 'white',

            form: {
                amniotic_fluid_culture: "",
                amniotic_fluid_culture_three: "",
                amniotic_fluid_culture_two: "",
                chorioamnionitis: "NA",
                colonisation_or_urinary_tract_infection: "NA",
                delayed_cord_clamping: "Yes",
                gbs_infection: "NA",
                leaking_pv: "NA",
                maternal_blood_pressure: "",
                maternal_blood_pressure_diastolic: "",
                maternal_diabetes: "Yes",
                maternal_fever: "NA",
                maternal_fever_basic: "NA",
                maternal_fever_duration: "NA",
                maternal_fever_unit: "NA",
                maternal_thyroid_function: "NA",
                maternal_thyroid_function_basic: "NA",
                maternal_thyroid_function_unit_basic: "NA",
                maternal_thyroid_function_unit_basic_unit: "NA",
                more_than_3_vaginal_examinations_during_labor: "NA",
                mother_age: "",
                mother_bmi: "",
                mother_haemoglobin: "NA",
                mother_height: "",
                mother_height_unit: "ft",
                mother_weight: "",
                mother_weight_unit: "Kgs",
                pih: "NA",
                rupture_of_membranes_rom: "Yes",
                rupture_of_membranes_rom_one: "PROM",
                rupture_of_membranes_rom_two: "<18 hours",
                smelly_amniotic_fluid: "NA",
                study_id: "",
                tab_name: "maternal",
                torch_infections: "NA",
                type_of_delivery: "Normal",
                vaginal_swab_culture: "NA",
                vaginal_swab_culture_three: "NA",
                vaginal_swab_culture_two: "NA",

            },

            AgeNA: true,
            BmiNA: true,
            RomIfPromNA: true,

            diabetesBt1: '#6572e4',
            diabetesBt2: '#eaeaea',
            RomBt1: '#6572e4',
            RomBt2: '#eaeaea',
            romTypeBt1: '#6572e4',
            romTypeBt2: '#eaeaea',
            romTypeBt3: '#eaeaea',
            promBt1: '#6572e4',
            promBt2: '#eaeaea',
            deliveryBt1: '#6572e4',
            deliveryBt2: '#eaeaea',
            delayedCordClampingBt1: '#6572e4',
            delayedCordClampingBt2: '#eaeaea'
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
            url: Constants.manifest.extra.URL + '/patient/maternal/add/' + userId,
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
        await AsyncStorage.setItem('motherprofileNonInvasive', JSON.stringify(this.state.form));
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

                if(!thisdata){
                    Alert.alert('You have not saved the Mother Profile yet. Please do so.')
                }

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
                        , delayed_cord_clamping: thisdata.delayed_cord_clamping

                    }
                })
                this.setColors();
            })
            .catch(error => {
                console.log(error);
            });
        await AsyncStorage.setItem('motherprofileNonInvasive', JSON.stringify(this.state.form));
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
                Alert.alert('Mother Profile Updated Succesfully!');
            })
            .catch(function (error) {
                console.log(error);
            });
        await AsyncStorage.setItem('motherprofileNonInvasive', JSON.stringify(this.state.form));
    }

    async editableAndColor() {

        await this.setState({ editable: !this.state.editable });

        if (this.state.editable) {
            await this.setState({ editForm: true })
        }

        this.state.editable ? await this.setState({ editablecolor: 'white' }) : await this.setState({ editablecolor: '#eaeaea' })
    }


    async setColors() {
        if (this.state.form.maternal_diabetes == "Yes") {
            await this.setState({ diabetesBt1: '#6572e4', diabetesBt2: '#eaeaea' });
        } else {
            await this.setState({ diabetesBt2: '#6572e4', diabetesBt1: '#eaeaea' })
        }

        if (this.state.form.rupture_of_membranes_rom == "Yes") {
            await this.setState({ RomBt1: '#6572e4', RomBt2: '#eaeaea' });
        } else {
            await this.setState({ RomBt2: '#6572e4', RomBt1: '#eaeaea' })
        }

        if (this.state.form.rupture_of_membranes_rom_one == "PROM") {
            await this.setState({ romTypeBt1: '#6572e4', romTypeBt2: '#eaeaea', romTypeBt3: '#eaeaea' });
        } else if (this.state.form.rupture_of_membranes_rom_one == "SROM") {
            await this.setState({ romTypeBt2: '#6572e4', romTypeBt1: '#eaeaea', romTypeBt3: '#eaeaea' });
        } else {
            await this.setState({ romTypeBt3: '#6572e4', romTypeBt2: '#eaeaea', romTypeBt1: '#eaeaea' })
        }

        if (this.state.form.rupture_of_membranes_rom_two == "<18 hours") {
            await this.setState({ promBt1: '#6572e4', promBt2: '#eaeaea' });
        } else {
            await this.setState({ promBt2: '#6572e4', promBt1: '#eaeaea' })
        }

        if (this.state.form.type_of_delivery == "Normal") {
            await this.setState({ deliveryBt1: '#6572e4', deliveryBt2: '#eaeaea' });
        } else {
            await this.setState({ deliveryBt2: '#6572e4', deliveryBt1: '#eaeaea' })
        }

        if (this.state.form.delayed_cord_clamping == "Yes") {
            await this.setState({ delayedCordClampingBt1: '#6572e4', delayedCordClampingBt2: '#eaeaea' });
        } else {
            await this.setState({ delayedCordClampingBt2: '#6572e4', delayedCordClampingBt1: '#eaeaea' })
        }

    }


    render() {
        return (
            <ScrollView>
                <View padder>

                    {/* edit checkbox */}
                    {this.state.viewForm &&
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
                    }

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
                                style={[styles.inputStyle, { backgroundColor: '#c4c4c4' }]}
                                editable={false}
                                keyboardType='numeric'
                                value={`${this.state.form.mother_bmi}`}
                                // onPress={this.calculateBmi()}
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
                            <Label style={styles.titleStyle}>Blood Pressure </Label>
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
                            <Label style={styles.titleStyle}>Blood Pressure </Label>
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

                    {/* prom and type of delivery */}
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
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.promBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, rupture_of_membranes_rom_two: "<18 Hours" },
                                        promBt1: '#6572e4', promBt2: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton, { fontSize: 8 }]}> less than 18 Hours</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.promBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, rupture_of_membranes_rom_two: ">18 Hours" },
                                        promBt2: '#6572e4', promBt1: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton, { fontSize: 8 }]}> greater than 18 Hours</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Type Of Delivery</Label>
                            <View style={[styles.viewContainer, { marginTop: 10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.deliveryBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, type_of_delivery: "Normal" },
                                        deliveryBt1: '#6572e4', deliveryBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Normal</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.deliveryBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, type_of_delivery: "Cesarean" },
                                        deliveryBt2: '#6572e4', deliveryBt1: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton, { fontSize: 10 }]}>Cesarean</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* delayed cord clamping */}
                    <View style={[styles.partitionView, { bottom: 20 }]}>
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

                        <View style={{ width: '47%', }}>
                            <View style={[styles.viewContainer, { marginTop: 40 }]}>

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


                </View>
            </ScrollView>
        );
    }
}

MotherProfile.contextType = UserContext

export default MotherProfile

