import React, { Component } from 'react';
import {
  Text,
  Icon,
  View, Card, CardItem,Button
} from "native-base";
import BabyHealthParameters from './BabyHealthProfileParameters';
import BabyProfile from './BabyProfile';
import MotherProfile from './MotherProfile'
import { Alert, ScrollView } from 'react-native';
import { AccordionList } from "accordion-collapse-react-native";
import styles from '../../GlobalStyling';
import axios from 'axios';
import Constants from "expo-constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

const dataArray = [
  { title: "Baby Profile", content: <BabyProfile /> },
  { title: "Mother Profile", content: <MotherProfile /> },
  { title: "Baby Health Parameters", content: <BabyHealthParameters /> }
];

export default class NonInvasive extends Component {

  constructor(props) {
    super(props)
  }

  navigateToScore = async () =>{

    let studyId

    if( !this.props.study_id){
      studyId = await AsyncStorage.getItem('studyId');

      if(studyId == 'NA'){
        Alert.alert('Unable to generate the score. Please save the baby profile first and then navigate back to this page.')
        return;
      }
    }
    else{
      studyId = this.props.study_id;
    }

    let url = Constants.manifest.extra.SCORE_URL + '/asha_score';
    let params = {study_id : studyId};

    try{
      let response = await axios.post(url, params);
      //this.props.navigation.pop()

      this.props.navigation.push('Score', {
        studyId: studyId,
        id: this.props.bmrNo, 
        sepsis_score: response.data.score
      })
      
    }
    catch(er){
      Alert.alert('Unable to generate the score. Please check if the parameters are filled in correctly. Thank you.')
      console.log(er);
    }
  
  }
  
  _renderHeader(item, expanded) {
    return (
      <View >

        <CardItem style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 0,
          overflow: 'hidden',
          borderColor: '#eaeaea'
        }}
          listItemPadding={0}>
          <Text style={{ fontWeight: "600" }}>
            {" "}{item.title}
          </Text>
          {expanded
            ? <Icon style={{ fontSize: 18 }} name="arrow-up" />
            : <Icon style={{ fontSize: 18 }} name="arrow-down" />}
        </CardItem>
      </View>
    );
  }

  _renderContent(item) {
    return (
      <View>
        {item.content}
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={{ marginRight: 18, marginLeft: 18, marginTop: 20, borderColor: 'pink' }}>

          <Card style={{ borderColor: '#eaeaea' }}>
            <AccordionList
              list={dataArray}
              header={this._renderHeader}
              body={this._renderContent}
            />
          </Card>
          
          <Button style={[styles.loginButton, { backgroundColor: '#afafaf' ,width:'40%'}]}
            onPress={() => this.navigateToScore()}>
            <Text style={styles.buttonText} uppercase={false}>Generate Score</Text>
          </Button>

        </View>
      </ScrollView>

    );
  }
}

