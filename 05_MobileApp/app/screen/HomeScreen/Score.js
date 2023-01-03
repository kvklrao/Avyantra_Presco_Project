import React, { Component } from 'react';
//import styles from '../GlobalStyling';
import {
    Container,
    Header,
    Content,
    Button,
    Text,
    Icon,
    Left,
    Right,
    Body,
    Title,
    Input,
    Item,
    Thumbnail, View, Tab, Tabs, Card, CardItem
} from "native-base";
import { Dimensions, Alert } from 'react-native';
import styles from '../../GlobalStyling';
import UploadDocument from '../UploadDocuments/UploadDocument';
import ReferralDoctor from './ReferralDoctor'
import RefferalDoctor from './ReferralDoctor';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default class Score extends Component {

    constructor(props) {
        super(props)
        this.state = {
            clickedReferralDoctor: false,
            referralDoctorEmail: ''
        }
    }

    callbackFunction = (childData) => {
        this.setState({ referralDoctorEmail: childData })
    }

    render() {
        let text = ""
        let color = ""
        if (this.props.route.params.sepsis_score > 0 && this.props.route.params.sepsis_score <= 5.0) {
            text = "LOW RISK"
            color = "#74d976"
        } else if (this.props.route.params.sepsis_score > 5.0 && this.props.route.params.sepsis_score <= 8.0) {
            text = "MEDIUM RISK"
            color = "#f9d372"
        } else if (this.props.route.params.sepsis_score > 8.0 && this.props.route.params.sepsis_score <= 10.0) {
            text = "HIGH RISK"
            color = "#f56d6d"
        } else {
            text = "Not Applicable"
            color = "#aeaeae"
        }
        return (
            <Container>
                <Header transparent style={{ backgroundColor: '#f48351' }} >
                    <Left> 
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Title style={{ fontFamily: 'Roboto_medium', color: 'white' }}>
                            {this.state.clickedReferralDoctor ? "REFERAL DOCTOR" : "SCORE"}</Title>
                    </Body>
                    <Right />
                </Header>

                <Content>
                    {this.state.clickedReferralDoctor ? <RefferalDoctor parentCallback={this.callbackFunction} /> :
                        <View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
                                <Button style={{ backgroundColor: 'white', borderColor: '#6572e4', borderWidth: 1, alignSelf: 'center', borderRadius: 5 }}>
                                    <Text style={{ color: 'black' }}>BMRN: {this.props.route.params.id}</Text></Button>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
                                <Card transparent style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                    <Text style={{ margin: 10, color: color, fontSize: 20, fontWeight: 'bold', marginTop: -15 }}>{text}</Text>
                                    <CardItem style={{
                                        backgroundColor: color, height: SCREEN_HEIGHT / 8, width: SCREEN_WIDTH / 2.5,
                                        justifyContent: 'center', borderRadius: 5
                                    }}>
                                        <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>{this.props.route.params.sepsis_score}</Text>
                                    </CardItem>
                                </Card>
                                <Card transparent style={{ flex: 1, justifyContent: 'space-between', borderColor: 'none' }}>
                                    <Button style={Styles1.ButtonStyle} ><Text uppercase={false} style={{ textAlign: 'center', fontSize: 13 }}>Download Report</Text></Button>
                                    <Button style={Styles1.ButtonStyle} onPress={() => this.setState({ clickedReferralDoctor: true })} >
                                        <Text uppercase={false} style={{ textAlign: 'center', fontSize: 13 }}>Referral Doctor Opinion</Text></Button>
                                    <Button style={Styles1.ButtonStyle} ><Text uppercase={false} style={{ textAlign: 'center', fontSize: 13 }}>Prescription Document</Text></Button>

                                </Card>
                            </View>
                            <Text style={styles.uploadHeadingText}>Score Risk Range</Text>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Card style={{ borderRadius: 20, width: '90%' }} >
                                    <CardItem>
                                        <Body>
                                            <View style={styles.viewContainer}>
                                                <Text style={[styles.buttonText, { color: '#000' }]}>Low Risk</Text>
                                                <Text style={[styles.buttonText, { color: '#000' }]}>0 - 5.0</Text>
                                                <Button style={[styles.buttonContainerScore, { backgroundColor: '#74d976', borderColor: '#fff', height: 40 }]} >
                                                </Button>
                                            </View>
                                            <View style={styles.viewContainer}>
                                                <Text style={[styles.buttonText, { color: '#000' }]}>Medium Risk</Text>
                                                <Text style={[styles.buttonText, { color: '#000' }]}>5.01 - 8.0</Text>
                                                <Button style={[styles.buttonContainerScore, { backgroundColor: '#f9d372', borderColor: '#fff', height: 40 }]} >
                                                </Button>
                                            </View>
                                            <View style={styles.viewContainer}>
                                                <Text style={[styles.buttonText, { color: '#000' }]}>High Risk</Text>
                                                <Text style={[styles.buttonText, { color: '#000' }]}>8.01 - 10.0</Text>
                                                <Button style={[styles.buttonContainerScore, { backgroundColor: '#f56d6d', borderColor: '#fff', height: 40 }]} >
                                                </Button>
                                            </View>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </View>
                        </View>}
                    <View>
                        <UploadDocument studyId={this.props.route.params.studyId}
                            doctorEmail={this.state.referralDoctorEmail} />
                    </View>
                </Content>
            </Container>
        );
    }
}

const Styles1 = {
    ButtonStyle: {
        backgroundColor: '#f48351', width: '90%', alignSelf: 'center', borderRadius: 5, marginTop: 10
    }
}