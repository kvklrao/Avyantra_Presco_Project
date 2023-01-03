import React, { Component } from 'react';
import styles from '../../../GlobalStyling';
import {

    Button,
    Text,
    Icon,
    Item, Label,
    View, Tab, CheckBox, ListItem
} from "native-base";
import { TextInput, ScrollView, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import UserContext from '../../context/studyidContext';
import { Picker } from 'react-native';
import { MultipleSelectPicker } from 'react-native-multi-select-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";
import ModalDropdown from 'react-native-modal-dropdown';

const CU_MM = [
    'NA',
    'cu mm'
];

const CU_MM_COUNT = [
    'NA',
    'Count',
    'cu mm'
];

const items = [
    { label: 'Coagulase negative Staphylococci', value: '1' },
    { label: 'Cocci', value: '2' },
    { label: 'Staphylococcus aureus', value: '3' },
    { label: 'Staphylococcus epidermidis', value: '4' },
    { label: 'Staphylococcus hominis hominis', value: '5' },
    { label: 'Others', value: '6' },
]

const itemsGNB = [
    { label: 'Acinetobacter baumanii', value: '1' },
    { label: 'Acinetobacter haemolyticus', value: '2' },
    { label: 'urkholderia cepacia', value: '3' },
    { label: 'E Coli', value: '4' },
    { label: 'Enterobacter spp', value: '5' },
    { label: 'Klebsiella_spp_10_5_CFU_ml', value: '6' },
    { label: 'Klebsiella pneumoniae', value: '7' },
    { label: 'Non fermenting Gram negative bacilli', value: '8' },
    { label: 'Pseudomonas aeruginosa', value: '9' },
    { label: 'Skin flora', value: '10' },
    { label: 'Sphingomonas paucimobilis', value: '11' },
    { label: 'Candida Pelliculosa', value: '12' },
    { label: 'Others', value: '13' },

]

const itemsFungi = [
    { label: 'Candida auris', value: '1' },
    { label: 'Candida non albicans spp', value: '2' },
    { label: 'Candida spp', value: '3' },
    { label: 'Candida Tropicalis', value: '4' },
    { label: 'Candida Pelliculosa', value: '5' },
]

const itemsAntibiotic = [
    { label: 'Amoxyclav', value: '1' },
    { label: 'Amikacin', value: '2' },
    { label: 'Amphotericin B', value: '3' },
    { label: 'Ampicillin', value: '4' },
    { label: 'Aztreonam', value: '5' },
    { label: 'Caspofungin', value: '6' },
    { label: 'Cefepime', value: '7' },
    { label: 'cefixime', value: '8' },
    { label: 'Cefuroxime Axetil', value: '9' },
    { label: 'Cephepime', value: '10' },
    { label: 'Cephoperazone', value: '11' },
    { label: 'Ciprofloxacin', value: '12' },
    { label: 'Clavulanic acid', value: '13' },
    { label: 'Clindamycin', value: '14' },
    { label: 'Colistin', value: '15' },
    { label: 'Comoxicillin', value: '16' },
    { label: 'Cotrimoxazole', value: '17' },
    { label: 'Erythromycin', value: '18' },
    { label: 'Fluconazole', value: '19' },
    { label: 'Gentamicin', value: '20' },
    { label: 'Imipenem', value: '21' },
    { label: 'Levofloxacin', value: '22' },
    { label: 'Linezolid', value: '23' },
    { label: 'Meropenem', value: '24' },
    { label: 'Micafungin', value: '25' },
    { label: 'Netilmicin', value: '26' },
    { label: 'Ofloxacin', value: '27' },
    { label: 'Oxacillin', value: '28' },
    { label: 'Pencillin', value: '29' },
    { label: 'Piperacillin', value: '30' },
    { label: 'PolymyzinB', value: '31' },
    { label: 'Sulbactam', value: '32' },
    { label: 'Sulfamethoxazole', value: '33' },
    { label: 'Tazobactam', value: '34' },
    { label: 'Tetracycline', value: '35' },
    { label: 'Tigecycline', value: '36' },
    { label: 'Tobramycin', value: '37' },
    { label: 'Trimethoprim', value: '38' },
    { label: 'Vancomycin', value: '39' },
    { label: 'Voriconalzole', value: '40' },
    { label: 'Tericoplanin', value: '41' },
    { label: 'Cloxacillin', value: '42' },
    { label: 'Methicillin', value: '43' },
    { label: 'Cefotaxime', value: '44' },
    { label: 'Ceftriazone', value: '45' },
    { label: 'Chloranpenicol', value: '46' },
    { label: 'Teicoplanin', value: '47' },
    { label: 'Ceftazibime', value: '48' },
    { label: 'Chlorampenicol', value: '49' },
    { label: 'Nalidic acid', value: '50' },
    { label: 'Nitrofuranton', value: '51' },
    { label: 'Norfloxacin', value: '52' }
]


class BabyInvestigations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editable: true,
            viewForm: false,
            editForm: false,
            createForm: true,

            editablecolor: 'white',

            selectedItemsGPB: [],
            selectedItemsGNB: [],
            selectedItemsFungi: [],
            selectedItemsAS: [],
            selectedItemsAR: [],
            selectedItemsAI: [],
            isShownPicker: false,
            isShownPickerGNB: false,
            isShownPickerFungi: false,
            isShownPickerAS: false,
            isShownPickerAR: false,
            isShownPickerAI: false,

            form: {
                absolute_neutrophil_count: "0",
                absolute_neutrophil_count_unit: "",
                activated_partial_prothrombine_type: "",
                antibiotic_status: null,
                antibiotic_status_intermediate: "[]",
                antibiotic_status_resisitant: "[]",
                antibiotic_status_value: "[]",
                arrhythmia: "Yes",
                baby_blood_glucose: "",
                baby_c_reactive_protien_levels: "",
                baby_c_reactive_protien_result: "Positive",
                baby_haemoglobin_levels: "",
                baby_procalcitonin_levels: "",
                baby_thyroid_result: "",
                baby_thyroid_status: "Normal",
                bilirubin_levels: "",
                blood_culture_report: "Positive",
                calcium: "",
                chlorine: "",
                cord_ph: "",
                //createdAt: "",
                creatinine: "",
                csf_culture: "Normal",
                csf_culture_tsb_value: "",
                fungi: "[]",
                gram_negative_bacteria: "",
                gram_negative_bacteria_if_other: "",
                gram_positive_bacteria: "",
                gram_positive_bacteria_if_other: "",
                // hospital_branch_id: "",
                hospital_id: "",
                hospital_name: "Aasha",
                immature_to_mature_neutrophil_ratios: "High",
                lactate_levels: "",
                magnesium: "",
                micro_esr: "",
                other_organism: "",
                phosphate: "",
                potassium: "",
                prothrombin_type: "",
                reading: "R1",
                sodium: "",
                study_id: "",
                thrombocytopenia: "0",
                thrombocytopenia_unit: "",
                total_leucocute_count: "0",
                total_leucocute_count_unit: "",
                updatedAt: "",
                urea: "NA",
                urine_culture_test: "Positive",
                urine_rest_for_pus_cells: "Positive",
            },
            ThyroidResultNA: true,
            BloodGlucoseNA: true,
            HaemoglobinLevelNA: true,
            CReactivePoteinLevelNA: true,
            MicroESRNA: true,
            ProcalcitoninNA: true,
            ProthrombinTypeNA: true,
            ActivatedPartialProthrombinNA: true,
            AntibioticStatusSensitiveNA: true,
            AntibioticStatusResisitantNA: true,
            AntibioticStatusIntermediateNA: true,
            sodiumNA: true,
            potassiumNA: true,
            ChlorideNA: true,
            CalciumNA: true,
            PhosphateNA: true,
            MagnesiumNA: true,
            UreaNA: true,
            CreatinineNA: true,
            LactatelevelNA: true,
            BilirubinLevelNA: true,
            CordpHNA: true,
            TSBValueNA: true,

            thyroidStatusBt1: '#6572e4',
            thyroidStatusBt2: '#eaeaea',
            immatureTomatureNeutrophilBt1: '#6572e4',
            immatureTomatureNeutrophilBt2: '#eaeaea',
            cReactiveProteinResultBt1: '#6572e4',
            cReactiveProteinResultBt2: '#eaeaea',
            urineTestForPusCellsBt1: '#6572e4',
            urineTestForPusCellsBt2: '#eaeaea',
            urineCultureTestBt1: '#6572e4',
            urineCultureTestBt2: '#eaeaea',
            ECGArrhythmiaBt1: '#6572e4',
            ECGArrhythmiaBt2: '#eaeaea',
            CSFCultureValueBt1: '#6572e4',
            CSFCultureValueBt2: '#eaeaea',

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.editableAndColor = this.editableAndColor.bind(this);
        this.setColors = this.setColors.bind(this);
        this.loadData = this.loadData.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.forCreateForm = this.forCreateForm.bind(this);
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

        if(elems == 'NA'){
            return selectedVals;
        }

        for (let i = 0; i < elems.length; i++) {
            const obj = elems[i];
            if(obj.hasOwnProperty('id') && obj.hasOwnProperty('itemValue')){
                const newKeys = { itemValue: "label", id: "value" }; 
                const renamedObj = this.renameKeys(obj, newKeys);
                selectedVals.push(renamedObj);
            }
        }

        return selectedVals
    }

    selectedValuesGPB = (ele) =>{
        let temp_gpb = []
        this.setState({ selectedItemsGPB: ele })
        for (let i = 0; i < ele.length; i++) {
            const obj = ele[i];
            const newKeys = { label: "itemValue", value: "id" };
            const renamedObj = this.renameKeys(obj, newKeys);
            temp_gpb.push(renamedObj)
        }
        this.setState({ form: { ...this.state.form, gram_positive_bacteria: temp_gpb } })
    }

    selectedValuesGNB = (ele) =>{
        let temp_gnb = []
        this.setState({ selectedItemsGNB: ele })
        for (let i = 0; i < ele.length; i++) {
            const obj = ele[i];
            const newKeys = { label: "itemValue", value: "id" };
            const renamedObj = this.renameKeys(obj, newKeys);
            temp_gnb.push(renamedObj)
        }
        this.setState({ form: { ...this.state.form, gram_negative_bacteria: temp_gnb } })
    }

    selectedValuesFungi = (ele) =>{
        let temp = []
        this.setState({ selectedItemsFungi: ele })
        for (let i = 0; i < ele.length; i++) {
            const obj = ele[i];
            const newKeys = { label: "itemValue", value: "id" };
            const renamedObj = this.renameKeys(obj, newKeys);
            temp.push(renamedObj)
        }
        this.setState({ form: { ...this.state.form, fungi: temp } })
    }

    selectedValuesAS(ele) {
        let temp = []
        this.setState({ selectedItemsAS: ele })
        for (let i = 0; i < ele.length; i++) {
            const obj = ele[i];
            const newKeys = { label: "itemValue", value: "id" };
            const renamedObj = this.renameKeys(obj, newKeys);
            temp.push(renamedObj)
        }
        this.setState({ form: { ...this.state.form, antibiotic_status_value: temp } })
    }

    selectedValuesAR(ele) {
        let temp = []
        this.setState({ selectedItemsAR: ele })
        for (let i = 0; i < ele.length; i++) {
            const obj = ele[i];
            const newKeys = { label: "itemValue", value: "id" };
            const renamedObj = this.renameKeys(obj, newKeys);
            temp.push(renamedObj)
        }
        this.setState({ form: { ...this.state.form, antibiotic_status_resisitant: temp } })
    }

    selectedValuesAI(ele) {
        let temp = []
        this.setState({ selectedItemsAI: ele })
        for (let i = 0; i < ele.length; i++) {
            const obj = ele[i];
            const newKeys = { label: "itemValue", value: "id" };
            const renamedObj = this.renameKeys(obj, newKeys);
            temp.push(renamedObj)
        }
        this.setState({ form: { ...this.state.form, antibiotic_status_intermediate: temp } })
    }

    async setColors() {

        // set the background color of buttons acccording to state
        if (this.state.form.baby_thyroid_status == "Normal") {
            await this.setState({ thyroidStatusBt1: '#6572e4', thyroidStatusBt2: '#eaeaea' });
        } else {
            await this.setState({ thyroidStatusBt2: '#6572e4', thyroidStatusBt1: '#eaeaea' })
        }

        if (this.state.form.immature_to_mature_neutrophil_ratios == "High") {
            await this.setState({ immatureTomatureNeutrophilBt1: '#6572e4', immatureTomatureNeutrophilBt2: '#eaeaea' });
        } else {
            await this.setState({ immatureTomatureNeutrophilBt2: '#6572e4', immatureTomatureNeutrophilBt1: '#eaeaea' })
        }

        if (this.state.form.baby_c_reactive_protien_result == "Positive") {
            await this.setState({ immatureTomatureNeutrophilBt1: '#6572e4', immatureTomatureNeutrophilBt2: '#eaeaea' });
        } else {
            await this.setState({ immatureTomatureNeutrophilBt2: '#6572e4', immatureTomatureNeutrophilBt1: '#eaeaea' })
        }

        if (this.state.form.urine_rest_for_pus_cells == "Positive") {
            await this.setState({ urineTestForPusCellsBt1: '#6572e4', urineTestForPusCellsBt2: '#eaeaea' });
        } else {
            await this.setState({ urineTestForPusCellsBt2: '#6572e4', urineTestForPusCellsBt1: '#eaeaea' })
        }

        if (this.state.form.urine_culture_test == "Positive") {
            await this.setState({ urineCultureTestBt1: '#6572e4', urineCultureTestBt2: '#eaeaea' });
        } else {
            await this.setState({ urineCultureTestBt2: '#6572e4', urineCultureTestBt1: '#eaeaea' })
        }

        if (this.state.form.arrhythmia == "Yes") {
            await this.setState({ ECGArrhythmiaBt1: '#6572e4', ECGArrhythmiaBt2: '#eaeaea' });
        } else {
            await this.setState({ ECGArrhythmiaBt2: '#6572e4', ECGArrhythmiaBt1: '#eaeaea' })
        }

        if (this.state.form.csf_culture == "Normal") {
            await this.setState({ CSFCultureValueBt1: '#6572e4', CSFCultureValueBt2: '#eaeaea' });
        } else {
            await this.setState({ CSFCultureValueBt2: '#6572e4', CSFCultureValueBt1: '#eaeaea' })
        }

    }


    async handleSubmit(event) {

        event.preventDefault();

        await AsyncStorage.setItem('babyinvestigation', JSON.stringify(this.state.form))
            .then(() => {
                console.log('baby investigation data saved 1');
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

    async loadData() {

        await this.setState({ viewForm: true, createForm: false });
        await this.setState({ form: { ...this.state.form, study_id: this.context } });

        var hospitalId = await AsyncStorage.getItem('hospitalId');
        var config = {
            method: 'get',
            url: Constants.manifest.extra.URL  + '/patient/baby_investigation/' + this.context + '/' + hospitalId + '/1/R1',
            headers: {}
        };
        
        try{
            let response = await axios(config);
            var thisdata = response.data.response[0];
            var selectedItemsAI = [], selectedItemsAR = [], antibiotic_status_intermediate = 'NA', antibiotic_status_resisitant = 'NA',
                selectedItemsAS = [], antibiotic_status_value = 'NA', gram_negative_bacteria = 'NA', selectedItemsGNB=[], gram_positive_bacteria = 'NA',
                selectedItemsGPB = [];
            
            if(!thisdata){
                Alert.alert('You have not saved the Baby Investigations data yet. Please do so.')
            }

            var fungi = JSON.parse(thisdata.fungi)
            var selectedItemsFungi = this.populateSelectedValues(fungi);

            try{
                gram_negative_bacteria = JSON.parse(thisdata.gram_negative_bacteria);
                selectedItemsGNB = this.populateSelectedValues(gram_negative_bacteria);
            }
            catch{
                ;;
            }
   
            try{
                gram_positive_bacteria = JSON.parse(thisdata.gram_positive_bacteria);
                selectedItemsGPB = this.populateSelectedValues(gram_positive_bacteria);
            }
            catch{
                ;;
            }

            try{
                antibiotic_status_intermediate = JSON.parse(thisdata.antibiotic_status_intermediate)
                selectedItemsAI = this.populateSelectedValues(antibiotic_status_intermediate);
            }
            catch{
                ;;
            }

            try{
                antibiotic_status_resisitant = JSON.parse(thisdata.antibiotic_status_resisitant)
                selectedItemsAR = this.populateSelectedValues(antibiotic_status_resisitant);
            }
            catch{
                ;;
            }

            try{
                antibiotic_status_value = JSON.parse(thisdata.antibiotic_status_value)
                selectedItemsAS = this.populateSelectedValues(antibiotic_status_value);
            }
            catch{
                ;;
            }

            this.setState({
                selectedItemsFungi: selectedItemsFungi, 
                selectedItemsAI: selectedItemsAI,
                selectedItemsAR: selectedItemsAR,
                selectedItemsAS: selectedItemsAS,
                selectedItemsGNB : selectedItemsGNB,
                selectedItemsGPB : selectedItemsGPB,
                form: {
                    ...this.state.form,
                    absolute_neutrophil_count: thisdata.absolute_neutrophil_count,
                    absolute_neutrophil_count_unit: thisdata.absolute_neutrophil_count_unit,
                    activated_partial_prothrombine_type: thisdata.activated_partial_prothrombine_type,
                    antibiotic_status: thisdata.antibiotic_status,
                    antibiotic_status_intermediate: antibiotic_status_intermediate,
                    antibiotic_status_resisitant: antibiotic_status_resisitant,
                    antibiotic_status_value: antibiotic_status_value,
                    arrhythmia: thisdata.arrhythmia,
                    baby_blood_glucose: thisdata.baby_blood_glucose,
                    baby_c_reactive_protien_levels: thisdata.baby_c_reactive_protien_levels,
                    baby_c_reactive_protien_result: thisdata.baby_c_reactive_protien_result,
                    baby_haemoglobin_levels: thisdata.baby_haemoglobin_levels,
                    baby_procalcitonin_levels: thisdata.baby_procalcitonin_levels,
                    baby_thyroid_result: thisdata.baby_thyroid_result,
                    baby_thyroid_status: thisdata.baby_thyroid_status,
                    bilirubin_levels: thisdata.bilirubin_levels,
                    blood_culture_report: thisdata.blood_culture_report,
                    calcium: thisdata.calcium,
                    chlorine: thisdata.chlorine,
                    cord_ph: thisdata.cord_ph,
                    // createdAt: "",
                    creatinine: thisdata.creatinine,
                    csf_culture: thisdata.csf_culture,
                    csf_culture_tsb_value: thisdata.csf_culture_tsb_value,
                    fungi: fungi,
                    gram_negative_bacteria: gram_negative_bacteria,
                    gram_negative_bacteria_if_other: thisdata.gram_negative_bacteria_if_other,
                    gram_positive_bacteria: gram_positive_bacteria,
                    gram_positive_bacteria_if_other: thisdata.gram_positive_bacteria_if_other,
                    // hospital_branch_id: "",
                    // hospital_id: "",
                    // hospital_name: null,
                    immature_to_mature_neutrophil_ratios: thisdata.immature_to_mature_neutrophil_ratios,
                    lactate_levels: thisdata.lactate_levels,
                    magnesium: thisdata.magnesium,
                    micro_esr: thisdata.micro_esr,
                    other_organism: thisdata.other_organism,
                    phosphate: thisdata.phosphate,
                    potassium: thisdata.potassium,
                    prothrombin_type: thisdata.prothrombin_type,
                    reading: "R1",
                    sodium: thisdata.sodium,
                    thrombocytopenia: thisdata.thrombocytopenia,
                    thrombocytopenia_unit: thisdata.thrombocytopenia_unit,
                    total_leucocute_count: thisdata.total_leucocute_count,
                    total_leucocute_count_unit: thisdata.total_leucocute_count_unit,
                    //updatedAt: "",
                    urea: thisdata.urea,
                    urine_culture_test: thisdata.urine_culture_test,
                    urine_rest_for_pus_cells: thisdata.urine_rest_for_pus_cells,
                }
            })

            this.setColors();

        }
        catch(error){
            console.log(error);
            Alert.alert('Unable to fetch data. Please check if mobile data is available.')
        }

        await AsyncStorage.setItem('babyinvestigation', JSON.stringify(this.state.form))
            .then(() => {
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async handleUpdate() {

        // take data and fireup update api request)

        var data = JSON.stringify(this.state.form);
        var apiData = JSON.parse(data); // We need to transform some of the data before calling the API. Copy to a new var, so as not to modify the state.
        apiData['fungi'] = JSON.stringify(apiData['fungi']);
                        
        try{
            apiData['antibiotic_status_intermediate'] = JSON.stringify(apiData['antibiotic_status_intermediate']);
        }
        catch{
            ;;
        }

        try{
            apiData['antibiotic_status_resisitant'] = JSON.stringify(apiData['antibiotic_status_resisitant']);
        }
        catch{
            ;;
        }

        try{
            apiData['antibiotic_status_value'] = JSON.stringify(apiData['antibiotic_status_value']);
        }
        catch{
            ;;
        }

        try{
            apiData['gram_negative_bacteria'] = JSON.stringify(apiData['gram_negative_bacteria']);
        }
        catch{
            ;;
        }

        try{
            apiData['gram_positive_bacteria'] = JSON.stringify(apiData['gram_positive_bacteria']);
        }
        catch{
            ;;
        }

        var userId = await AsyncStorage.getItem('userId');
        var config = {
            method: 'put',
            url: Constants.manifest.extra.URL  + '/patient/update/baby_investigation/' + this.context + '/R1/' + userId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: apiData
        };

        let res;

        try{
            res = await axios(config);
            Alert.alert("Updated Baby Investigation data")
            this.setState({ editable: false, editablecolor: '#eaeaea', editForm: false, viewForm: true, createForm: false });
        }
        catch(error){
            Alert.alert(error.response.data.errors[0].param + ' --> ' + error.response.data.errors[0].msg)
            console.log(error.response);
        }

        await AsyncStorage.setItem('babyinvestigation', JSON.stringify(this.state.form));
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

                    {/* Thyroid Status */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '100%', marginBottom: 10 }}>
                            <Label style={styles.titleStyle}>Thyroid Status</Label>
                            <View style={[styles.viewContainer]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.thyroidStatusBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_thyroid_status: "Normal" },
                                        thyroidStatusBt1: '#6572e4', thyroidStatusBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Normal</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.thyroidStatusBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_thyroid_status: "Abnormal" },
                                        thyroidStatusBt2: '#6572e4', thyroidStatusBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>Abnormal</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* Thyroid Result and Blood Glucose */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.ThyroidResultNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        ThyroidResultNA: !this.state.ThyroidResultNA,
                                        form: { ...this.state.form, baby_thyroid_result: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Thyroid Result (Units)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_thyroid_result: value } })}
                                    underlineColorAndroid="transparent"
                                    value={`${this.state.form.baby_thyroid_result}`}
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>mlU/L</Text></Icon>
                            </View>
                        </View>
                        <View style={{ width: '47%', }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.BloodGlucoseNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        BloodGlucoseNA: !this.state.BloodGlucoseNA,
                                        form: { ...this.state.form, baby_blood_glucose: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Blood Glucose (Level)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    value={`${this.state.form.baby_blood_glucose}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_blood_glucose: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>mg/dL</Text></Icon>
                            </View>
                        </View>
                    </View>

                    {/* Haemoglobin Level and C-Reactive Protein Level */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.HaemoglobinLevelNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        HaemoglobinLevelNA: !this.state.HaemoglobinLevelNA,
                                        form: { ...this.state.form, baby_haemoglobin_levels: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Haemoglobin Level (Units)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_haemoglobin_levels: value } })}
                                    underlineColorAndroid="transparent"
                                    value={`${this.state.form.baby_haemoglobin_levels}`}
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>g/dL</Text></Icon>
                            </View>
                        </View>
                        <View style={{ width: '47%', }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.CReactivePoteinLevelNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        CReactivePoteinLevelNA: !this.state.CReactivePoteinLevelNA,
                                        form: { ...this.state.form, baby_c_reactive_protien_levels: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>C-Reactive Protien Level</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    value={`${this.state.form.baby_c_reactive_protien_levels}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_c_reactive_protien_levels: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>mg/l</Text></Icon>
                            </View>
                        </View>
                    </View>

                    {/* C REactive Protein Result and Micro ESR */}

                    <View style={styles.partitionView}>

                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>C-Reactive Protien Result</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.cReactiveProteinResultBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_c_reactive_protien_result: "Positive" },
                                        cReactiveProteinResultBt1: '#6572e4', cReactiveProteinResultBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Positive</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.cReactiveProteinResultBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, baby_c_reactive_protien_result: "Negative" },
                                        cReactiveProteinResultBt2: '#6572e4', cReactiveProteinResultBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>Negative</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%', height: 80 }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.MicroESRNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        MicroESRNA: !this.state.MicroESRNA,
                                        form: { ...this.state.form, micro_esr: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Micro ESR</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, micro_esr: value } })}
                                    underlineColorAndroid="transparent"
                                    value={`${this.state.form.micro_esr}`}
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>mm/hr</Text></Icon>
                            </View>
                        </View>
                    </View>

                    {/* Procalcitionin and prothrombin Type*/}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%', height: 80 }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.ProcalcitoninNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        ProcalcitoninNA: !this.state.ProcalcitoninNA,
                                        form: { ...this.state.form, baby_procalcitonin_levels: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Procalcitonin Level</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, baby_procalcitonin_levels: value } })}
                                    underlineColorAndroid="transparent"
                                    value={`${this.state.form.baby_procalcitonin_levels}`}
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>ng/mL</Text></Icon>
                            </View>
                        </View>
                        <View style={{ width: '47%', marginTop: -10 }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.ProthrombinTypeNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        ProthrombinTypeNA: !this.state.ProthrombinTypeNA,
                                        form: { ...this.state.form, prothrombin_type: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Prothrombin Type(PT) (Time)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    value={`${this.state.form.prothrombin_type}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, prothrombin_type: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>second</Text></Icon>
                            </View>
                        </View>
                    </View>

                    {/* Activated Partial Prothrombin and Total Lecuocytes count */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%', marginTop: 5 }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.ActivatedPartialProthrombinNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        ActivatedPartialProthrombinNA: !this.state.ActivatedPartialProthrombinNA,
                                        form: { ...this.state.form, activated_partial_prothrombine_type: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>Apgar Score ( 10 min)</Text>
                            </View>
                            <TextInput
                                style={[styles.inputStyle, { backgroundColor: this.state.editablecolor }]}
                                editable={this.state.ActivatedPartialProthrombinNA && this.state.editable}
                                keyboardType='numeric'
                                value={`${this.state.form.activated_partial_prothrombine_type}`}
                                onChangeText={(value) => this.setState({
                                    form: { ...this.state.form, activated_partial_prothrombine_type: value }
                                })}
                            />

                        </View>
                        <View style={{ width: '47%', height: 80 }}>
                            <Label style={styles.titleStyle}>Total Leucocytes Count</Label>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    value={`${this.state.form.total_leucocute_count}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, total_leucocute_count: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <ModalDropdown 
                                    disabled={!this.state.editable}
                                    options={CU_MM}
                                    defaultValue={this.state.form.total_leucocute_count_unit ? this.state.form.total_leucocute_count_unit : 'Select unit ...'}
                                    textStyle={{fontSize: 15, padding: 3, fontWeight: 'bold'}}
                                    dropdownStyle={{height: 80, width: 80, backgroundColor: 'snow', borderWidth: 2, borderRadius: 3, marginTop: -10}}
                                    dropdownTextStyle={{fontSize: 15, padding: 3, backgroundColor: 'now', fontWeight: 'bold'}}
                                    dropdownTextHighlightStyle={{backgroundColor: '#d3d3d3'}}
                                    style={{ height: 22, width: 80, borderRadius: 10, borderColor: 'lightgray' }}
                                    onSelect={(itemValue, itemIndex) => this.setState({
                                        form: { ...this.state.form, total_leucocute_count_unit: itemIndex }
                                    })}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Absolute Neutrophil Count and Immature to mature neutrophil ratios > 0.2 */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%', height: 80, marginTop: 3 }}>
                            <Label style={styles.titleStyle}>Absolute Neutrophil Count</Label>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    value={`${this.state.form.absolute_neutrophil_count}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, absolute_neutrophil_count: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <ModalDropdown 
                                    options={CU_MM}
                                    disabled={!this.state.editable}
                                    defaultValue={this.state.form.absolute_neutrophil_count_unit ? this.state.form.absolute_neutrophil_count_unit : 'Select unit ...'}
                                    textStyle={{fontSize: 15, padding: 3, fontWeight: 'bold'}}
                                    dropdownStyle={{height: 80, width: 80, backgroundColor: 'snow', borderWidth: 2, borderRadius: 3, marginTop: -10}}
                                    dropdownTextStyle={{fontSize: 15, padding: 3, backgroundColor: 'now', fontWeight: 'bold'}}
                                    dropdownTextHighlightStyle={{backgroundColor: '#d3d3d3'}}
                                    style={{ height: 22, width: 80, borderRadius: 10, borderColor: 'lightgray' }}
                                    onSelect={(itemValue, itemIndex) => this.setState({
                                        form: { ...this.state.form, absolute_neutrophil_count_unit: itemIndex }
                                    })}
                                />
                            </View>
                        </View>
                        <View style={{ width: '47%' ,marginTop:-10}}>
                            <Label style={styles.titleStyle}>Immature to mature neutrophil ratios greater than 0.2</Label>
                            <View style={[styles.viewContainer,{marginTop:-5}]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.immatureTomatureNeutrophilBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, immature_to_mature_neutrophil_ratios: "High" },
                                        immatureTomatureNeutrophilBt1: '#6572e4', immatureTomatureNeutrophilBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>High</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.immatureTomatureNeutrophilBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, immature_to_mature_neutrophil_ratios: "Normal" },
                                        immatureTomatureNeutrophilBt2: '#6572e4', immatureTomatureNeutrophilBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>Normal</Text></Button>
                            </View>
                        </View>
                    </View>
                    {/* Thrombocytopenia and Urine test for pus cells */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%', height: 80, marginTop: 0 }}>
                            <Label style={styles.titleStyle}>Thrombocytopenia (Platelet Count)</Label>
                            <View style={[styles.searchSection]}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    value={`${this.state.form.thrombocytopenia}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, thrombocytopenia: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <ModalDropdown 
                                    options={CU_MM_COUNT}
                                    disabled={!this.state.editable}
                                    defaultValue={this.state.form.thrombocytopenia_unit ? this.state.form.thrombocytopenia_unit : 'Select unit ...'}
                                    textStyle={{fontSize: 15, padding: 3, fontWeight: 'bold'}}
                                    dropdownStyle={{height: 120, width: 80, backgroundColor: 'snow', borderWidth: 2, borderRadius: 3, marginTop: -10}}
                                    dropdownTextStyle={{fontSize: 15, padding: 3, backgroundColor: 'now', fontWeight: 'bold'}}
                                    dropdownTextHighlightStyle={{backgroundColor: '#d3d3d3'}}
                                    style={{ height: 22, width: 80, borderRadius: 10, borderColor: 'lightgray' }}
                                    onSelect={(itemValue, itemIndex) => this.setState({
                                        form: { ...this.state.form, thrombocytopenia_unit: itemIndex }
                                    })}
                                />
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Urine test for Pus Cells</Label>
                            <View style={[styles.searchSection, {marginTop: -5, height: 45 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.urineTestForPusCellsBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, urine_rest_for_pus_cells: "Positive" },
                                        urineTestForPusCellsBt1: '#6572e4', urineTestForPusCellsBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Positive</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.urineTestForPusCellsBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, urine_rest_for_pus_cells: "Negative" },
                                        urineTestForPusCellsBt2: '#6572e4', urineTestForPusCellsBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>Negative</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* Urine Culture Test and Blood Culture Report */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Urine culture test</Label>
                            <View style={[styles.searchSection]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.urineCultureTestBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, urine_culture_test: "Positive" },
                                        urineCultureTestBt1: '#6572e4', urineCultureTestBt2: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton, { fontSize: 10 }]}>Positive</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.urineCultureTestBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, urine_culture_test: "Negative" },
                                        urineCultureTestBt2: '#6572e4', urineCultureTestBt1: '#eaeaea'
                                    })}>
                                    <Text style={[styles.textButton, { fontSize: 9 }]}>Negative</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>Blood Culture Report</Label>
                            <View style={[styles.inputStyle]}>
                                <Picker
                                    selectedValue={this.state.form.blood_culture_report}
                                    style={{ height: 40, width: 150, borderRadius: 10 }}
                                    mode={'dropdown'}
                                    onValueChange={(itemValue, itemIndex) => this.setState({
                                        form: { ...this.state.form, blood_culture_report: itemValue }
                                    })}
                                >
                                    <Picker.Item label="Positive" value="Positive" />
                                    <Picker.Item label="Negative" value="Negative" />
                                    <Picker.Item label="NA" value="NA" />
                                </Picker>
                            </View>
                        </View>
                    </View>

                    {/* Gram Positive Bacteria and other */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '100%' }}>
                            <Label style={styles.titleStyle}>Gram Positive Bacteria</Label>
                            <Button iconRight light
                                disabled={!this.state.editable}
                                onPress={() => {
                                    this.setState({
                                        isShownPicker: !this.state.isShownPicker, isShownPickerGNB: false,
                                        isShownPickerFungi: false, isShownPickerAS: false, isShownPickerAR: false, isShownPickerAI: false
                                    })
                                }}
                                style={{
                                    width: '100%', backgroundColor: this.state.editablecolor,
                                    borderColor: '#6572e4', borderWidth: 1, alignItems: 'center', justifyContent: 'center'
                                }}>
                                {(this.state.selectedItemsGPB.length == 0) ? <Text>Select</Text> :
                                    <Text>{(this.state.selectedItemsGPB || []).map((item, index) => {
                                        return <Text key={index} style={{ backgroundColor: '#aeaeae' }}>
                                            {item.label}{" "}
                                        </Text>
                                    })}</Text>}
                                {this.state.isShownPicker ? <Icon name='close' /> : <Icon name='arrow-down' />}
                            </Button>

                            {this.state.isShownPicker ?
                                <MultipleSelectPicker
                                    items={items}
                                    onSelectionsChange={(ele) => { this.selectedValuesGPB(ele) }}
                                    selectedItems={this.state.selectedItemsGPB}
                                    buttonStyle={{ height: 100, justifyContent: 'left', alignItems: 'left' }}
                                    checkboxStyle={{ height: 20, width: 20 }}
                                />
                                : null
                            }
                        </View>
                    </View>

                    <View style={styles.partitionView}>
                        <View style={{ width: '100%', }}>
                            <Label style={styles.titleStyle}>Gram Positive Bacteria (Other)</Label>
                            <View style={styles.searchSection}>
                                <TextInput
                                    editable={this.state.editable}
                                    value={`${this.state.form.gram_positive_bacteria_if_other}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, gram_positive_bacteria_if_other: value } })}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        </View>
                    </View>


                    {/* Gram Negative Bacteria and Other */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '100%' }}>
                            <Label style={styles.titleStyle}>Gram Negative Bacteria</Label>
                            <Button iconRight light
                                disabled={!this.state.editable}
                                onPress={() => {
                                    this.setState({
                                        isShownPickerGNB: !this.state.isShownPickerGNB,
                                        isShownPicker: false, isShownPickerFungi: false
                                        , isShownPickerAS: false, isShownPickerAR: false, isShownPickerAI: false
                                    })
                                }}
                                style={{
                                    width: '100%', backgroundColor: this.state.editablecolor,
                                    borderColor: '#6572e4', borderWidth: 1, alignItems: 'center', justifyContent: 'center'
                                }}>
                                {(this.state.selectedItemsGNB.length == 0) ? <Text>Select</Text> :
                                    <Text>{(this.state.selectedItemsGNB || []).map((item1, index1) => {
                                        return <Text key={index1} style={{ backgroundColor: '#aeaeae' }}>
                                            {item1.label}{" "}
                                        </Text>
                                    })}</Text>}
                                {this.state.isShownPickerGNB ? <Icon name='close' /> : <Icon name='arrow-down' />}
                            </Button>

                            {this.state.isShownPickerGNB ? <MultipleSelectPicker
                                items={itemsGNB}
                                onSelectionsChange={(ele) => { this.selectedValuesGNB(ele) }}
                                selectedItems={this.state.selectedItemsGNB}
                                buttonStyle={{ height: 100, justifyContent: 'left', alignItems: 'left' }}
                                checkboxStyle={{ height: 20, width: 20 }}
                            />
                                : null
                            }
                        </View>
                    </View>

                    <View style={styles.partitionView}>
                        <View style={{ width: '100%', }}>
                            <Label style={styles.titleStyle}>Gram Negative Bacteria (Other)</Label>
                            <View style={styles.searchSection}>
                                <TextInput
                                    editable={this.state.editable}
                                    value={`${this.state.form.gram_negative_bacteria_if_other}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, gram_negative_bacteria_if_other: value } })}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        </View>
                    </View>


                    {/* Fungi Other Organism */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '100%' }}>
                            <Label style={styles.titleStyle}>Fungi</Label>
                            <Button iconRight light
                                disabled={!this.state.editable}
                                onPress={() => {
                                    this.setState({
                                        isShownPickerFungi: !this.state.isShownPickerFungi, isShownPickerGNB: false,
                                        isShownPicker: false, isShownPickerAS: false, isShownPickerAR: false, isShownPickerAI: false
                                    })
                                }}
                                style={{
                                    width: '100%', backgroundColor: this.state.editablecolor,
                                    borderColor: '#6572e4', borderWidth: 1, alignItems: 'center', justifyContent: 'center'
                                }}>
                                {(this.state.selectedItemsFungi.length == 0) ? <Text>Select</Text> :
                                    <Text>{(this.state.selectedItemsFungi || []).map((item, index) => {
                                        return <Text key={index} style={{ backgroundColor: '#aeaeae' }}>
                                            {item.label}{" "}
                                        </Text>
                                    })}</Text>}
                                {this.state.isShownPickerFungi ? <Icon name='close' /> : <Icon name='arrow-down' />}
                            </Button>

                            {this.state.isShownPickerFungi ?
                                <MultipleSelectPicker
                                    items={itemsFungi}
                                    onSelectionsChange={(ele) => { this.selectedValuesFungi(ele) }}
                                    selectedItems={this.state.selectedItemsFungi}
                                    buttonStyle={{ height: 100, justifyContent: 'left', alignItems: 'left' }}
                                    checkboxStyle={{ height: 20, width: 20 }}
                                />
                                : null
                            }
                        </View>
                    </View>

                    <View style={{ width: '100%' }}>
                        <Label style={styles.titleStyle}>Other Organism</Label>
                        <View style={[styles.inputStyle]}>
                            <Picker
                                selectedValue={this.state.form.other_organism}
                                style={{ height: 40, width: 300, borderRadius: 10 }}
                                mode={'dropdown'}
                                onValueChange={(itemValue, itemIndex) => this.setState({
                                    form: { ...this.state.form, other_organism: itemValue }
                                })}
                            >
                                <Picker.Item label="Normal Orophayngeal flora" value="Normal Orophayngeal flora" />
                                <Picker.Item label="Others" value="Others" />
                                <Picker.Item label="NA" value="NA" />
                            </Picker>
                        </View>
                    </View>

                    {/* Antibiotic Status Sensitive and Resistant */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '100%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.AntibioticStatusSensitiveNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        AntibioticStatusSensitiveNA: !this.state.AntibioticStatusSensitiveNA,
                                        form: { ...this.state.form, antibiotic_status_value: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Antibiotic Status (Sensitive)</Text>
                            </View>
                            <Button iconRight light
                                disabled={!this.state.editable || !this.state.AntibioticStatusSensitiveNA}
                                onPress={() => {
                                    this.setState({
                                        isShownPickerAS: !this.state.isShownPickerAS, isShownPickerGNB: false,
                                        isShownPicker: false, isShownPickerAR: false, isShownPickerAI: false, isShownPickerFungi: false
                                    })
                                }}
                                style={{
                                    width: '100%', backgroundColor: this.state.editablecolor,
                                    borderColor: '#6572e4', borderWidth: 1, alignItems: 'center', justifyContent: 'center'
                                }}>
                                {(this.state.selectedItemsAS.length == 0) ? <Text>Select</Text> :
                                    <Text>{(this.state.selectedItemsAS || []).map((item, index) => {
                                        return <Text key={index} style={{ backgroundColor: '#aeaeae' }}>
                                            {item.label}{" "}
                                        </Text>
                                    })}</Text>}
                                {this.state.isShownPickerAS ? <Icon name='close' /> : <Icon name='arrow-down' />}
                            </Button>

                            {this.state.isShownPickerAS ?
                                <MultipleSelectPicker
                                    items={itemsAntibiotic}
                                    onSelectionsChange={(ele) => { this.selectedValuesAS(ele) }}
                                    selectedItems={this.state.selectedItemsAS}
                                    buttonStyle={{ height: 100, justifyContent: 'left', alignItems: 'left' }}
                                    checkboxStyle={{ height: 20, width: 20 }}
                                />
                                : null
                            }
                        </View>
                    </View>
                    <View style={styles.partitionView}>
                        <View style={{ width: '100%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.AntibioticStatusResisitantNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        AntibioticStatusResisitantNA: !this.state.AntibioticStatusResisitantNA,
                                        form: { ...this.state.form, antibiotic_status_resisitant: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Antibiotic Status (Resisitant)</Text>
                            </View>
                            <Button iconRight light
                                disabled={!this.state.editable || !this.state.AntibioticStatusResisitantNA}
                                onPress={() => {
                                    this.setState({
                                        isShownPickerAR: !this.state.isShownPickerAR, isShownPickerGNB: false,
                                        isShownPicker: false, isShownPickerFungi: false, isShownPickerAS: false, isShownPickerAI: false
                                    })
                                }}
                                style={{
                                    width: '100%', backgroundColor: this.state.editablecolor,
                                    borderColor: '#6572e4', borderWidth: 1, alignItems: 'center', justifyContent: 'center'
                                }}>
                                {(this.state.selectedItemsAR.length == 0) ? <Text>Select</Text> :
                                    <Text>{(this.state.selectedItemsAR || []).map((item, index) => {
                                        return <Text key={index} style={{ backgroundColor: '#aeaeae' }}>
                                            {item.label}{" "}
                                        </Text>
                                    })}</Text>}
                                {this.state.isShownPickerAR ? <Icon name='close' /> : <Icon name='arrow-down' />}
                            </Button>

                            {this.state.isShownPickerAR ?
                                <MultipleSelectPicker
                                    items={itemsAntibiotic}
                                    onSelectionsChange={(ele) => { this.selectedValuesAR(ele) }}
                                    selectedItems={this.state.selectedItemsAR}
                                    buttonStyle={{ height: 100, justifyContent: 'left', alignItems: 'left' }}
                                    checkboxStyle={{ height: 20, width: 20 }}
                                />
                                : null
                            }
                        </View>
                    </View>

                    {/* Antibiotic Status Intermediate and Sodium  */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '100%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.AntibioticStatusIntermediateNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        AntibioticStatusIntermediateNA: !this.state.AntibioticStatusIntermediateNA,
                                        form: { ...this.state.form, antibiotic_status_intermediate: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Antibiotic Status (Intermediate)</Text>
                            </View>
                            <Button iconRight light
                                disabled={!this.state.editable || !this.state.AntibioticStatusIntermediateNA}
                                onPress={() => {
                                    this.setState({
                                        isShownPickerAI: !this.state.isShownPickerAI, isShownPickerGNB: false,
                                        isShownPicker: false, isShownPickerAR: false, isShownPickerAS: false, isShownPickerFungi: false
                                    })
                                }}
                                style={{
                                    width: '100%', backgroundColor: this.state.editablecolor,
                                    borderColor: '#6572e4', borderWidth: 1, alignItems: 'center', justifyContent: 'center'
                                }}>
                                {(this.state.selectedItemsAI.length == 0) ? <Text>Select</Text> :
                                    <Text>{(this.state.selectedItemsAI || []).map((item, index) => {
                                        return <Text key={index} style={{ backgroundColor: '#aeaeae' }}>
                                            {item.label}{" "}
                                        </Text>
                                    })}</Text>}
                                {this.state.isShownPickerAI ? <Icon name='close' /> : <Icon name='arrow-down' />}
                            </Button>

                            {this.state.isShownPickerAI ?
                                <MultipleSelectPicker
                                    items={itemsAntibiotic}
                                    onSelectionsChange={(ele) => { this.selectedValuesAI(ele) }}
                                    selectedItems={this.state.selectedItemsAI}
                                    buttonStyle={{ height: 100, justifyContent: 'left', alignItems: 'left' }}
                                    checkboxStyle={{ height: 20, width: 20 }}
                                />
                                : null
                            }
                        </View>
                    </View>
                    <View style={{ width: '100%' }}>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                checked={this.state.sodiumNA}
                                disabled={!this.state.editable}
                                onPress={() => this.setState({
                                    sodiumNA: !this.state.sodiumNA,
                                    form: { ...this.state.form, sodium: 'NA' }
                                })}
                                style={styles.checkbox}
                            />
                            <Text style={[styles.label]}>Sodium (Na) (Units)</Text>
                        </View>
                        <View style={styles.searchSection}>
                            <TextInput
                                keyboardType='numeric'
                                editable={this.state.editable}
                                style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                onChangeText={(value) => this.setState({ form: { ...this.state.form, sodium: value } })}
                                underlineColorAndroid="transparent"
                                value={`${this.state.form.sodium}`}
                            />
                            <Icon style={styles.searchIcon} size={20} color="#000" >
                                <Text style={styles.iconText}>mEq/L</Text></Icon>
                        </View>
                    </View>

                    {/* Potassium And Chloride */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.potassiumNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        potassiumNA: !this.state.potassiumNA,
                                        form: { ...this.state.form, potassium: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Potassium (K) (Units)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, potassium: value } })}
                                    underlineColorAndroid="transparent"
                                    value={`${this.state.form.potassium}`}
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>mEq/L</Text></Icon>
                            </View>
                        </View>
                        <View style={{ width: '47%', }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.ChlorideNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        ChlorideNA: !this.state.ChlorideNA,
                                        form: { ...this.state.form, chlorine: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Chloride (Units)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    value={`${this.state.form.chlorine}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, chlorine: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>mEq/L</Text></Icon>
                            </View>
                        </View>
                    </View>

                    {/* Calcium and Phosphate */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.CalciumNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        CalciumNA: !this.state.CalciumNA,
                                        form: { ...this.state.form, calcium: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Calcium (Ca) (Units)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, calcium: value } })}
                                    underlineColorAndroid="transparent"
                                    value={`${this.state.form.calcium}`}
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>mmol/L</Text></Icon>
                            </View>
                        </View>
                        <View style={{ width: '47%', }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.PhosphateNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        PhosphateNA: !this.state.PhosphateNA,
                                        form: { ...this.state.form, phosphate: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Phosphate (PO4) (Units)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    value={`${this.state.form.phosphate}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, phosphate: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>mmol/L</Text></Icon>
                            </View>
                        </View>
                    </View>

                    {/* Magnesium and Urea */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.MagnesiumNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        MagnesiumNA: !this.state.MagnesiumNA,
                                        form: { ...this.state.form, magnesium: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Magnesium (Mg) (Units)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, magnesium: value } })}
                                    underlineColorAndroid="transparent"
                                    value={`${this.state.form.magnesium}`}
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>mmol/L</Text></Icon>
                            </View>
                        </View>
                        <View style={{ width: '47%', }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.UreaNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        UreaNA: !this.state.UreaNA,
                                        form: { ...this.state.form, urea: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Urea (Units)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    value={`${this.state.form.urea}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, urea: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>mmol/L</Text></Icon>
                            </View>
                        </View>
                    </View>

                    {/* Creatinine and Lactate Level */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.CreatinineNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        CreatinineNA: !this.state.CreatinineNA,
                                        form: { ...this.state.form, creatinine: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Creatinine (mg/dL)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, creatinine: value } })}
                                    underlineColorAndroid="transparent"
                                    value={`${this.state.form.creatinine}`}
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>mmol/L</Text></Icon>
                            </View>
                        </View>
                        <View style={{ width: '47%', }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.LactatelevelNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        LactatelevelNA: !this.state.LactatelevelNA,
                                        form: { ...this.state.form, lactate_levels: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Lactate level (Units)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    value={`${this.state.form.lactate_levels}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, lactate_levels: value } })}
                                    underlineColorAndroid="transparent"
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>mmol/L</Text></Icon>
                            </View>
                        </View>
                    </View>

                    {/* Bilurubin and CordpH */}

                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.BilirubinLevelNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        BilirubinLevelNA: !this.state.BilirubinLevelNA,
                                        form: { ...this.state.form, bilirubin_levels: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Bilirubin level (Units)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, bilirubin_levels: value } })}
                                    underlineColorAndroid="transparent"
                                    value={`${this.state.form.bilirubin_levels}`}
                                />
                                <Icon style={styles.searchIcon} size={20} color="#000" >
                                    <Text style={styles.iconText}>mg/dL</Text></Icon>
                            </View>
                        </View>
                        <View style={{ width: '47%', }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.CordpHNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        CordpHNA: !this.state.CordpHNA,
                                        form: { ...this.state.form, cord_ph: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>Cord pH (Value)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    value={`${this.state.form.cord_ph}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, cord_ph: value } })}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        </View>
                    </View>

                    {/* ECG- Arrythmia and CSF Culture Value */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>ECG - Arrhythmia (Present)</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.ECGArrhythmiaBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, umblical_sepsis: "Yes" },
                                        ECGArrhythmiaBt1: '#6572e4', arrhythmia: '#eaeaea', ECGArrhythmiaBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Yes</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.ECGArrhythmiaBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, arrhythmia: "No" },
                                        ECGArrhythmiaBt2: '#6572e4', ECGArrhythmiaBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>No</Text></Button>
                            </View>
                        </View>
                        <View style={{ width: '47%' }}>
                            <Label style={styles.titleStyle}>CSF Culture Value</Label>
                            <View style={[styles.viewContainer, { marginTop: -10 }]}>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.CSFCultureValueBt1 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, csf_culture: "Normal" },
                                        CSFCultureValueBt1: '#6572e4', CSFCultureValueBt2: '#eaeaea'
                                    })}>
                                    <Text style={styles.textButton}>Normal</Text>
                                </Button>
                                <Button style={[styles.buttonContainer, { backgroundColor: this.state.CSFCultureValueBt2 }]}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        form: { ...this.state.form, csf_culture: "Abnormal" },
                                        CSFCultureValueBt2: '#6572e4', CSFCultureValueBt1: '#eaeaea'
                                    })}
                                >
                                    <Text style={styles.textButton}>Abnormal</Text></Button>
                            </View>
                        </View>
                    </View>

                    {/* TSB Value (mg/dl) */}
                    <View style={styles.partitionView}>
                        <View style={{ width: '47%', }}>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    checked={this.state.TSBValueNA}
                                    disabled={!this.state.editable}
                                    onPress={() => this.setState({
                                        TSBValueNA: !this.state.TSBValueNA,
                                        form: { ...this.state.form, csf_culture_tsb_value: 'NA' }
                                    })}
                                    style={styles.checkbox}
                                />
                                <Text style={[styles.label]}>TSB Value (mg/dl) (Value)</Text>
                            </View>
                            <View style={styles.searchSection}>
                                <TextInput
                                    keyboardType='numeric'
                                    editable={this.state.editable}
                                    value={`${this.state.form.csf_culture_tsb_value}`}
                                    style={[styles.input2, { backgroundColor: this.state.editablecolor }]}
                                    onChangeText={(value) => this.setState({ form: { ...this.state.form, csf_culture_tsb_value: value } })}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        </View>
                        <View style={{ width:'47%',marginTop:30 }}>
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
        )
    }
}

BabyInvestigations.contextType = UserContext

export default BabyInvestigations;