import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Container, Content, Footer, Header, Text } from 'native-base';
import { View } from 'react-native';;
import { Icon } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Sidebar({ ...props }) {
    return (
        <Container >
            <Header style={{ justifyContent: 'center', backgroundColor: '#f48351', height: 150 }}>
                <View style={{ flex: 1,alignItems:'center' }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#fefefe',fontSize:40}}>PreSco</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>

            </Header>
            <Content >
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem 
                        label="Logout" 
                        onPress={() => {
                                AsyncStorage.clear()
                                props.navigation.navigate('Login')
                            }
                        } 
                        icon = { (focused, color, size ) => <Icon color={color} size={size} name={'power'} />}
                    />
                </DrawerContentScrollView></Content>
{/* 
            <Footer
                style={{
                    height: 200, borderTopWidth: 0.5, backgroundColor: 'white',
                    borderTopColor: '#6572e4'
                }} >
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={{ flex: 1, marginLeft: 10, marginTop: 10 }}>Report a Problem</Text>
                    <Text style={{ flex: 1, marginLeft: 10, }}>FAQ's</Text>
                    <Text style={{ flex: 1, marginLeft: 10, }}>Privacy and Policy</Text>
                    <Text style={{ flex: 1, marginLeft: 10, }}>Terms and Conditions</Text>
                </View>
            </Footer> */}
        </Container>

    )
}

export default Sidebar;
