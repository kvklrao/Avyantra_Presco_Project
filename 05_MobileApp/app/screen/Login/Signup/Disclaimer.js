import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, CardItem, Button, Body, CheckBox } from 'native-base';
import styles from '../../../GlobalStyling';


export default class Disclaimer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            access: false
        }
    }
    render() {
        return (
            <ScrollView>
                <View>
                    <CardItem header style={{ justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, color: '#3e3e3e', textAlign: 'center' }}
                        >DISCLAIMER</Text>
                    </CardItem>
                    <View
                        style={{
                            borderBottomColor: '#d3d3d3',
                            borderBottomWidth: 1,
                        }}
                    />
                    <View style={{ alignItems: 'center' }}>
                        <Card style={{ borderRadius: 10, width: '90%', marginTop: 15 }} bordered>
                            <CardItem header style={[styles.cardItemHeader, { backgroundColor: '#fff' }]}>
                                <Text style={styles.cardItemText}>Terms of Usage : Application Disclaimer</Text>
                            </CardItem>
                            <View
                                style={{
                                    borderBottomColor: '#d3d3d3',
                                    borderBottomWidth: 1,
                                }}
                            />
                            <CardItem>
                                <Body>
                                    <Text style={[styles.label, { fontSize: 15, textAlign: "justify" }]}>
                                        This application is not a substitute for medical advice.
                                        Users of the application should consult their healthcare
                                        professional and co-relate with other medical conditions,
                                        symptoms and test reports before making any health, medical
                                        or other decisions based upon the data contained here in.
                                </Text>
                                    <Text style={[styles.label, { fontSize: 15, textAlign: "justify" }]}>
                                        This application is intended for basic screening and educational purpose only.
                                        Persons using the data within the medical purposes should not rely solely on the
                                        accuracy of the data herein. While the data may be updated periodically, users
                                        should talk to their healthcare professional for the latest information.
                                </Text>
                                    <Text style={[styles.label, { fontSize: 15, textAlign: "justify" }]}>
                                        Any and all liability arising directly or indirectly from the use of this
                                        application is hereby disclaimed. The information herein is provided "as is" and without any
                                        warranty expressed or implied. All direct, indirect, special, incidental,
                                        consequential or punitive damages arising from any use of this application or data contained
                                        herein is disclaimed and excluded.
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        color: '#626262',
                        justifyContent: 'flex-start',
                        marginLeft: 25
                    }}>
                        <CheckBox
                            onPress={() => this.setState({ access: !this.state.access })}
                            style={[styles.checkbox]}
                            checked={this.state.access}
                        />
                        <Text style={[styles.label, { fontSize: 10 }]}>I agree to the Terms of Usage and Application Disclaimer mentioned as above.
</Text>
                    </View>
                    <View style={[styles.viewContainer, { marginTop: -25 }]}>
                        <Button style={[buttonTextStyle2, { marginTop: 40, height: 42 }]}
                            onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={[styles.buttonText]}>Back</Text>
                        </Button>
                        {this.state.access ?
                            <Button style={[buttonTextStyle2, { marginTop: 40, left: -40, height: 42 }]}
                                onPress={() => this.props.navigation.navigate('Signup')}
                            >
                                <Text style={[styles.buttonText]}>Continue</Text></Button> :
                            <Button style={[buttonTextStyle2, { marginTop: 40, left: -40, height: 42, backgroundColor: '#aeaeae' }]}
                                onPress={this.stepThreeNext} disabled
                            >
                                <Text style={[styles.buttonText, { color: '#000' }]}>Continue</Text></Button>}
                    </View>
                </View>
            </ScrollView >
        )
    }
}
const buttonTextStyle2 = {
    backgroundColor: '#f48351',
    // border: 'none',
    color: 'white',
    padding: 10,
    left: 32,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
    width: '35%',
    // marginBottom: 80,
    borderRadius: 5
};