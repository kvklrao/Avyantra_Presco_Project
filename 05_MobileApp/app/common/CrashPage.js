import React, { Component } from 'react';
import styles from '../GlobalStyling';
import { Button, Header, Container, Left, Content, Icon, Right, View, Text, Body, Title } from 'native-base';

// A screen to show when the App crashes
export default class CrashScreen extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return(
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}
                        >
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Crash Screen</Title>
                    </Body>
                </Header>
                <Content>
                    <View style={styles.container}>
                        <Text>App Crashed due to unknown reasons.</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}

