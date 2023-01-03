import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem, View } from "native-base";
import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';
import styles from "../../GlobalStyling";
import { connect } from "react-redux";
  
class CustomDrawer extends React.Component {
    constructor(props){
        super(props);
    }


    render() {
        return(
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView {...this.props}>
                    <DrawerItemList {...this.props} />
                </DrawerContentScrollView>
                <View style={styles.statusContainer}>
                    <Text>V1.0</Text>
                    <Text>Device {this.props.isConnected? 'online': 'offline'}</Text>
                </View>
            </View>     
        )
  }
}

const mapStateToProp = (state) => {
    return {
        isConnected: state.isConnected
    }
}

export default connect(mapStateToProp)(CustomDrawer)
