import React, { Component, Fragment } from 'react';
import { Container, Header, Content, Button, Text, View, Icon, Left, Right, Card, Body, Title, CardItem, Fab } from "native-base";
import { TextInput, TouchableOpacity, ActivityIndicator, Dimensions, BackHandler, Alert } from "react-native";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { debounce, _ } from "lodash";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Picker } from 'react-native';
import Constants from "expo-constants";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const data = [
  {
    label: 'Date Created'
  },
  {
    label: 'Score Range'
  },
  {
    label: 'Ascending'
  },
  {
    label: 'Descending'
  }
];

export default class HomeScreen extends Component {

  backHandler;
  
  constructor(props) {
    super(props);
    this.state = {
      study_id: null,
      bmr: null,
      sepsis_score: null,
      dataSource: [],
      search: null,
      pageNumber: 1,
      maxPage: null,
      numRecords: 0,
      buttonActiveColor: '#c4c4c4',
      buttonDisabled: true,
      itemSelected: null,
      isLoading: false,
      active: false,
      modalVisible: false,
      dateScoreSort: "&dateSort=asc"
    },
    this.initLoad = this.initLoad.bind(this);
    this.onFormSelect = this.onFormSelect.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.searchBarText = this.searchBarText.bind(this);
    this.numberOfPages = this.numberOfPages.bind(this);
    this.sorting = this.sorting.bind(this);
    this.onChangeTextDelayed = _.debounce(this.searchBarText, 2000);

  }

  componentDidMount() {
    this.initLoad();
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  
    // Listen for screen focus event
    this.props.navigation.addListener('focus', this.initLoad);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }
  
  async componentDidUpdate(prevProps, prevState) {
    
  }

  async sorting(itemValue) {
    await this.setState({ dateScoreSort: itemValue });
    this.initLoad();
  }

  async initLoad() {

    // remove this in production *********************************
    // console.log("setting async storage for testing ");
    // await AsyncStorage.setItem('userId', "230");
    // await AsyncStorage.setItem('hospitalId', "25");
    //  **********************************************************


    await this.setState({ isLoading: true });
    
    var hospitalId = await AsyncStorage.getItem('hospitalId');
    var config = {
      method: 'get',
      url: Constants.manifest.extra.URL + '/patient/aashaBaby/' + hospitalId + '/' + this.state.pageNumber + '/10?searchText=' + this.state.search + '&hospitalType=7' + this.state.dateScoreSort,
      headers: {}
    };

    axios(config)
      .then(async response => {
        //console.log(response);
        this.setState({ dataSource: response.data.response, isLoading: false });
        this.numberOfPages();
      })
      .catch(error => {
        console.log(error);
      });

  }

  async onEndReached(val) {
    if (val == 1) {
      await this.setState({ pageNumber: this.state.pageNumber + 1 });
    } else if (val == -1) {
      if (this.state.pageNumber != 1) // this condition is to avoid going to previous on first page itself
        await this.setState({ pageNumber: this.state.pageNumber - 1 });
    } else {
      // on going to a certain page by entering the number
      await this.setState({ pageNumber: val });
    }

    this.initLoad();
  }

  async onFormSelect(value, index, bmr, sepsis_score) {

    let _score;

    if (value != this.state.study_id) {
      try{
        _score = parseFloat(sepsis_score);
        _score = Math.round((_score + Number.EPSILON) * 100) / 100
      }
      catch(e){
        _score = null;
      }

      await this.setState({
        buttonActiveColor: '#f48351', buttonDisabled: false, 
        study_id: value,
        itemSelected: index, 
        bmr: bmr, 
        sepsis_score: _score
      });
    } else {
      await this.setState({ buttonActiveColor: '#c4c4c4', buttonDisabled: true, study_id: null, itemSelected: null });
    }

  }

  async searchBarText(value) {
    await this.setState({ search: value, pageNumber: 1 });
    this.initLoad();
  }

  async numberOfPages() {
    // console.log("here in max pages")
    var hospitalId = await AsyncStorage.getItem('hospitalId');
    var config = {
      method: 'get',
      url: Constants.manifest.extra.URL + '/patient/aashaBabyCount/' + hospitalId + '?searchText=' + this.state.search + '&hospitalType=7',
      headers: {}
    };

    axios(config)
      .then(async response => {
        let numRecords = response.data.response[0].aasha_medical_count;
        let x = Math.ceil( numRecords / 10);
        this.setState({ maxPage: x, numRecords: numRecords });

      })
      .catch((error) => {
        console.log(error);
      });

  }

  onBackButtonPressAndroid = () => {
		Alert.alert(
			'Exiting App',
			'Confirm quitting the app?',
			[
				{text: 'CANCEL', style: 'cancel'},
				{text: 'QUIT', onPress: () => BackHandler.exitApp()}
			],
			{cancelable: false},
		);
		return true;
	};

  render() {
    return (
      <Container>
        <Header transparent style={{ backgroundColor: '#f48351' }} >
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body style={{ marginLeft: '20%' }}>
            <Title style={{ fontFamily: 'Roboto_medium', color: 'white' }}>DASHBOARD</Title>
          </Body>
          <Right />
        </Header>


        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }} >
          <ScrollView
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ flex: 1 }}>

              <View style={{ backgroundColor: '#f48351' }}>
                <Card style={{
                  borderTopLeftRadius: 10, borderTopRightRadius: 10,
                  marginLeft: 20, marginRight: 20,
                  marginBottom: 0,
                  borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                  paddingBottom: 0, paddingTop: 5,
                  padding: 0, border: 0, backgroundColor: 'white'
                }}>
                  <CardItem style={{
                    borderTopLeftRadius: 10, borderTopRightRadius: 10,
                    border: 0, marginBottom: 0, paddingBottom: 0,
                    borderBottomLeftRadius: 0, borderBottomRightRadius: 0
                  }}>
                    <TextInput
                      style={Styles.inputStyle}
                      placeholder="Search by BMR number "
                      onChangeText={this.onChangeTextDelayed}
                    />
                  </CardItem>
                  <View
                    style={{
                      borderBottomColor: '#6572e4',
                      borderBottomWidth: 0.5,
                      marginLeft: 15, marginRight: 15
                    }}
                  />
                </Card>
              </View>

              <View style={{ margin: 0, padding: 0, border: 0, borderTopColor: 'white', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                <Card style={{
                  backgroundColor: 'white',
                  marginLeft: 20, marginRight: 20,
                  borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
                  marginTop: 0, border: 0, borderTopRightRadius: 0
                }}>

                  <View style={Styles.ridesFriends}>
                    <View >
                      <Text style={[Styles.numbers, { color: '#626262' }]}>FILTER</Text>
                      <Button style={{ backgroundColor: '#f5f6ff', height: 20, marginTop: 3 }}>
                        <Text style={Styles.numbers}>This Month</Text>
                      </Button>
                    </View>
                    <View style={Styles.verticleLine}></View>

                    <View>
                      <Text style={[Styles.numbers, { color: '#626262' }]}>SORT BY</Text>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Button style={{ backgroundColor: '#f5f6ff', height: 20, marginTop: 3 }}>
                          {this.state.dateScoreSort == "&dateSort=asc"  &&
                            <Icon name="arrow-up" style={{ fontsize: 10, color: '#6572e4' }} />
                          }
                          {this.state.dateScoreSort == "&scoreSort=asc"  &&
                            <Icon name="arrow-up" style={{ fontsize: 10, color: '#6572e4' }} />
                          }
                          {this.state.dateScoreSort == '&dateSort=desc' &&
                            <Icon name="arrow-down" style={{ fontsize: 10, color: '#6572e4' }} />
                          }
                          {this.state.dateScoreSort == '&scoreSort=desc' &&
                            <Icon name="arrow-down" style={{ fontsize: 10, color: '#6572e4' }} />
                          }
                        </Button>

                        <Button style={{ backgroundColor: '#f5f6ff', height: 20, marginTop: 3, marginLeft: 5 }}>
                          <Picker
                            selectedValue={this.state.dateScoreSort}
                            style={{ height: 50, width: 130, color: '#6572e4', textAlign: 'center' }}
                            mode={'dropdown'}
                            onValueChange={(itemValue, itemIndex) => this.sorting(itemValue)}
                          >
                            <Picker.Item label="Date Ascending" value="&dateSort=asc" />
                            <Picker.Item label="Date Descending" value="&dateSort=desc" />
                            <Picker.Item label="Score Ascending" value="&scoreSort=asc" />
                            <Picker.Item label="Score Descending" value="&scoreSort=desc" />
                          </Picker>
                        </Button>

                      </View>
                    </View>

                  </View>
                  <View
                    style={{
                      borderBottomColor: '#6572e4',
                      borderBottomWidth: 0.5, marginRight: 15, marginLeft: 15, marginBottom: 10
                    }}
                  />
                </Card>
              </View>

              <View style={{ backgroundColor: 'white', marginLeft: 20, marginRight: 20 }}>
                <View
                  style={{
                    flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 5, height: 30,
                    justifyContent: 'space-between',
                  }}>

                  <Button
                    disabled={this.state.buttonDisabled}
                    onPress={() => {
                      this.props.navigation.navigate('Score', {
                        studyId: this.state.study_id,
                        id: this.state.bmr, 
                        sepsis_score: this.state.sepsis_score
                      })
                    }}
                    style={{ height: '100%', borderRadius: 5, backgroundColor: this.state.buttonActiveColor }}>
                    <Text style={{ fontSize: 10, padding: 0, margin: 0 }}>View Reports</Text>
                  </Button>
                  <Button
                    disabled={this.state.buttonDisabled}
                    onPress={async () => { 
                      await AsyncStorage.setItem('studyId', JSON.stringify(this.state.study_id) );
                      this.props.navigation.push('DataEntry', { id: this.state.study_id, bmr: this.state.bmr });
                    }}
                    style={{ height: '100%', borderRadius: 5, backgroundColor: this.state.buttonActiveColor }}>
                    <Text style={{ fontSize: 10, padding: 0, margin: 0 }}>View Form</Text>
                  </Button>
                  <Button
                    disabled={this.state.buttonDisabled}
                    style={{ height: '100%', borderRadius: 5, backgroundColor: this.state.buttonActiveColor }}>
                    <Text style={{ fontSize: 10 }}>View Opinion</Text>
                  </Button>
                </View>

                <Card style={{ height: 25, marginTop: 8, borderColor: '#6572e4' }}>
                  <CardItem bordered style={{ height: 25, borderColor: '#6572e4' }}>
                    <Text style={{ paddingLeft: '28%' }}>Information</Text>
                    <Text style={{ paddingLeft: '28%' }} >Score</Text>
                  </CardItem>
                </Card>

              </View>
            </View>

            {
              <View style={{ flex: 3 }}>
                <Content style={{ marginLeft: 20, marginRight: 20, marginTop: 0, backgroundColor: 'white', flex: 3 }}>

                  <FlatList
                    data={this.state.dataSource}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (

                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Card
                          style={this.state.itemSelected == index ? Styles.boxSelected : Styles.boxUnselected}
                          key={index}
                        >
                          <TouchableOpacity onPress={() => this.onFormSelect(item.study_id, index, item.baby_medical_record_number, item.sepsis_score)}>
                            {/* {local_study_id = item.study_id} */}
                            <CardItem style={this.state.itemSelected == index ? Styles.CardItemSelected : Styles.cardItemUnselected}
                            >
                              <Left style={{ paddingLeft: 0 }}><Text style={{ fontSize: 11, color: '#7882dd' }}>Date and Time</Text></Left>
                              <Body><Text style={{ fontSize: 14 }}>{item.createdAt.slice(0, 10)}</Text></Body>
                              <Right><Text style={{ fontSize: 14 }}>{item.createdAt.slice(12, 19)}</Text></Right>
                            </CardItem>

                            <CardItem style={this.state.itemSelected == index ? Styles.CardItemSelected : Styles.cardItemUnselected}>
                              <Left><Text style={{ fontSize: 11, color: '#7882dd' }}>BMR Number</Text></Left>
                              <Body><Text style={{ fontSize: 14 }}>{item.baby_medical_record_number}</Text></Body>
                              <Right></Right>
                            </CardItem>

                            <CardItem style={this.state.itemSelected == index ? Styles.CardItemSelected : Styles.cardItemUnselected}>
                              <Left><Text style={{ fontSize: 11, color: '#7882dd' }}>Mother's Name</Text></Left>
                              <Body><Text style={{ fontSize: 14 }}>{item.mother_name}</Text></Body>
                              <Right></Right>
                            </CardItem>
                          </TouchableOpacity>
                        </Card>
                        
                        <View style={{ justifyContent: 'center', marginLeft: 5 }}>

                          {item.sepsis_score && <Button
                            onPress={() => this.props.navigation.navigate('Score', {
                              sepsis_score: item.sepsis_score.slice(0, 4),
                              id: item.baby_medical_record_number, studyId: item.study_id
                            })}
                            style={{ backgroundColor: item.sepsis_score <= 5.0 ? "#74d976" : item.sepsis_score <= 8.0 ? '#f9d372' : '#f56d6d' }}
                          >
                            <Text style={{ textAlign: 'center' }}>{item.sepsis_score.slice(0, 4)}</Text>
                          </Button>
                          }

                          {!item.sepsis_score && <Button
                            onPress={() => this.props.navigation.navigate('Score', {
                              sepsis_score: "", id: item.baby_medical_record_number
                              , studyId: item.study_id
                            })}
                            style={{ backgroundColor: '#c4c4c4' }} ><Text style={{ textAlign: 'center' }}>
                              NA</Text></Button>
                          }

                        </View>
                      </View>

                    )}
                    enableEmptySections={true}
                    keyExtractor={(item, index) => index}
                    selected={this.state.itemSelected}
                  />

                </Content>
              </View>
            }

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', maxWidth: '85%' }}>
              <TouchableOpacity onPress={() => this.onEndReached(1)}
                disabled={this.state.maxPage <= this.state.pageNumber ? true : false}>
                <Text style={{ color: 'black' }}>({this.state.numRecords}) Readings</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.onEndReached(-1)}
                disabled={this.state.pageNumber == 1 ? true : false}>
                <Text style={{ color: this.state.pageNumber == 1 ? '#c4c4c4' : 'black' }}> &lt; Previous</Text>
              </TouchableOpacity>
              <Card style={{ borderColor: '#6572e4', marginBottom: 10 }}>
                <CardItem >
                  <TextInput onChangeText={(value) => this.onEndReached(value)} style={{ textAlign: 'center' }}>
                    {this.state.pageNumber}</TextInput>
                </CardItem>
              </Card>
              <TouchableOpacity onPress={() => this.onEndReached(1)}
                disabled={this.state.maxPage <= this.state.pageNumber ? true : false}>
                <Text style={{ color: this.state.maxPage <= this.state.pageNumber ? '#c4c4c4' : 'black' }}>Next {" >"}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

        </View>

        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}>
          <Icon name="add" />
          <Button style={{ backgroundColor: '#f48351' }}>
            <Icon name="book" onPress={async () => { 
              await AsyncStorage.setItem('studyId', 'NA' );
              this.props.navigation.push('DataEntry', { id: null, bmr: null}) 
            }} />
          </Button>
        </Fab>

      </Container>
    )
  }
}

const Styles = {
  inputStyle: {
    width: '100%',
    marginTop: 12,
    marginBottom: 7,
    paddingBottom: 2,
    alignSelf: 'center',
    borderColor: '#6572e4',
    borderWidth: 0.5,
    paddingLeft: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingLeft: 10

  },
  cardItemUnselected: {
    marginLeft: 0, marginBottom: 0, paddingBottom: 2, paddingLeft: 0, paddingTop: 2,
    backgroundColor: '#f5f6ff'
  },
  CardItemSelected: {
    marginLeft: 0, marginBottom: 0, paddingBottom: 2, paddingLeft: 0, paddingTop: 2,
    backgroundColor: '#ebecff'
  },
  boxUnselected: {
    width: '80%',
    borderRadius: 5,
    borderColor: 'white',
    overflow: 'hidden'
  },
  boxSelected: {
    width: '80%',
    borderRadius: 5,
    borderColor: '#6572e4',
    borderWidth: 2,
    overflow: 'hidden'
  },
  preloader: {
    left: 0,
    right: 0,
    bottom: 10,
    marginTop: 100,
    position: 'absolute',

  },
  ridesFriends: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center'
  },
  numbers: {
    fontSize: 10,
    color: '#4f5ee0',
    fontWeight: 'bold',
  },
  verticleLine: {
    height: '100%',
    width: 0.4,
    backgroundColor: '#4f5ee0',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
}