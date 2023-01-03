import React, { Component } from 'react';
import {
    Container,
    Header,
    Content,
    Text,
    View, Tab, Tabs, Left, Body, Title, Button, Icon, Right
} from "native-base";
import { TextInput, BackHandler, Alert } from "react-native";
import NonInvasive from './NonInvasive';
import Invasive from './invasive/Invasive';
import { UserProvider } from '../context/studyidContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CreateNewProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            study_id: null,
            noninvasive: true,
            invasive: false,
            bmrNo: null
        }
        this.setting = this.setting.bind(this);
    }

    async setting() {
        if (typeof this.props.route.params.id === 'undefined') {
            await this.setState({ study_id: null });
        } 
        else {
            await this.setState({ study_id: null })
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.setting();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        this.props.navigation.pop();
        return true;
    };

    async componentDidUpdate(prevProps, prevState) {

        if (this.props.route.params.id != this.state.study_id) {
            await this.setState({ study_id: this.props.route.params.id, bmrNo: this.props.route.params.bmr });
        }
    }

    render() {
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
                    <Body style={{ marginLeft: '20%' }}>
                        <Title style={{ fontFamily: 'Roboto_medium', color: 'white' }}>DATA ENTRY</Title>
                    </Body>
                    <Right />
                </Header>

                <View style={{ backgroundColor: '#f48351' }}>
                    <View style={{ marginLeft: 15, marginRight: 20 }}>
                        <TextInput
                            style={Styles.inputStyle}
                            placeholder="Search BMR number "
                        />
                    </View>
                </View>


                <Content >

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 15, marginLeft: 20, marginRight: 20 }}>
                        <Button style={this.state.noninvasive ? Styles.buttonActive : Styles.buttonInactive}
                            onPress={() => this.setState({ noninvasive: true, invasive: false })}>
                            <Text style={{ color: '#6572e4' }}>Non-Invasive</Text>
                        </Button>
                        <Button style={this.state.invasive ? Styles.buttonActive : Styles.buttonInactive} onPress={() => this.setState({ invasive: true, noninvasive: false })}>
                            <Text style={{ color: 'black' }}>Invasive</Text>
                        </Button>
                    </View>


                    {this.state.bmrNo &&
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                            <Button style={{ backgroundColor: 'white', borderColor: '#6572e4', alignSelf: 'center' }}>
                                <Text style={{ color: 'black' }}>BMRN: {this.state.bmrNo}</Text>
                            </Button>
                        </View>
                    }

                    {this.state.noninvasive &&
                        <UserProvider value={this.state.study_id}>
                            <NonInvasive study_id={this.state.study_id} bmrNo={this.state.bmrNo} navigation={this.props.navigation}/>
                        </UserProvider>
                    }

                    {this.state.invasive &&
                        <UserProvider value={this.state.study_id}>
                            <Invasive study_id={this.state.study_id} bmrNo={this.state.bmrNo} navigation={this.props.navigation}/>
                        </UserProvider>
                    }
                </Content>

            </Container>
        );
    }
}

const Styles = {
    inputStyle: {
        width: '100%',
        marginTop: 0,
        marginBottom: 7,
        paddingBottom: 10,
        alignSelf: "center",
        borderColor: 'white',
        borderWidth: 1,
        paddingLeft: 10,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    buttonActive: {
        backgroundColor: '#d1d5f7',
        width: '50%',
        justifyContent: 'center',
        borderColor: '#6572e4',
        borderBottomLeftRadius: 7,
        borderTopLeftRadius: 7,
    },
    buttonInactive: {
        backgroundColor: 'white',
        width: '50%',
        justifyContent: 'center',
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7

    }
}