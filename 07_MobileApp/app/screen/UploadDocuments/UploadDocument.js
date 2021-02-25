import React, { Component } from 'react';
import {
    Text, View,
    ActivityIndicator,
    Clipboard,
    Image,
    Share,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    Dimensions
} from 'react-native';
import axios from 'axios';
import styles from '../../GlobalStyling';
import { Card, CardItem, Button, Body, Content, CheckBox, Icon, Item, Input } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as Permissions from 'expo-permissions';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing";

import Modal from 'react-native-modal';
import Constants from "expo-constants";

let imageArray1 = [], imageArray2 = [], imageArray3 = [], imageArray4 = [];
let allImagesWithFileNames = {};

export default class UploadDocument extends Component {
    constructor() {
        super();
        this.state = {
            isModalVisible: false,
            image: null,
            report_type: 1,
            uploading1: false,
            uploading2: false,
            uploading3: false,
            uploading4: false,
            loading: false,
            completeLoading: null,
            checked: -1,
            checkedDiagnostic: -1,
            checkedImagings: -1,
            checkedOthers: -1,
            checkBoxColor: '#fff',
            checkBoxObj: {},
            urlToShare: ''

        }
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    async componentDidMount() {

        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);

        this.getReportsData()

    }

    onChange(i, img) {
        this.setState({ checked: i, urlToShare: img, checkedDiagnostic: -1, checkedImagings: -1, checkedOthers: -1 });
    }
    onChangeDiagnostic(j, img) {
        this.setState({ checkedDiagnostic: j, urlToShare: img, checked: -1, checkedImagings: -1, checkedOthers: -1 });
    }
    onChangeImagings(k, img) {
        this.setState({ checkedImagings: k, urlToShare: img, checkedDiagnostic: -1, checked: -1, checkedOthers: -1 });
    }
    onChangeOthers(l, img) {
        this.setState({ checkedOthers: l, urlToShare: img, checkedDiagnostic: -1, checkedImagings: -1, checked: -1 });
    }

    async getReportsData() {
        //get records of particular user
        var data = '';
        imageArray1 = []; imageArray2 = []; imageArray3 = []; imageArray4 = [];
        allImagesWithFileNames = {};
        
        var config = {
            method: 'get',
            url: Constants.manifest.extra.URL+ '/patient/getReports/' + this.props.studyId,
            headers: {},
            data: data
        };

        await axios(config)
            .then(async (response) => {
                let responseData = response.data.response;
                this.setState({ loading: true })
                for (let i = 0; i < responseData.length; i++) {

                    const url = await this.getDownloadURL(responseData[i].report_name);
                    allImagesWithFileNames[url] = responseData[i].report_name;

                    if (responseData[i].report_type == 1) {
                        await imageArray1.push(url);
                    } else if (responseData[i].report_type == 2) {
                        imageArray2.push(url);
                    }
                    else if (responseData[i].report_type == 3) {
                        imageArray3.push(url);

                    }
                    else if (responseData[i].report_type == 4) {
                        await imageArray4.push(url);
                    }

                }
                this.setState({ loading: false, completeLoading: "complete" })
                this._maybeRenderImage1()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    buttonClickOne = () => {
        this.toggleModal()
        this.setState({ report_type: 1 })
    }
    buttonClickTwo = () => {
        this.toggleModal()
        this.setState({ report_type: 2 })
    }
    buttonClickThree = () => {
        this.toggleModal()
        this.setState({ report_type: 3 })
    }
    buttonClickFour = () => {
        this.toggleModal()
        this.setState({ report_type: 4 })
    }

    callShareUriToDoctorEmail = () => {

        var data = JSON.stringify({ "link": this.state.urlToShare });

        var config = {
            method: 'post',
            url: Constants.manifest.extra.URL + '/referralDoctor/sendMail/' + this.props.doctorEmail,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                Alert.alert(response.data.message)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    _maybeRenderUploadingOverlay1 = () => {
        if (this.state.uploading1) {
            return (
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    ]}>
                    <ActivityIndicator color="#000" animating size="small" />
                </View>
            );
        }
    };
    _maybeRenderImage1 = () => {
        let { image } = this.state;
        // if (!image) {
        //     return;
        // }
        if (!imageArray1) {
            console.log("this is returned")
            return;
        }

        return (

            <View
                style={{
                    width: '120%',
                    marginLeft: -25
                }}>

                {
                    imageArray1.map((img, i) => {
                        return (
                            allImagesWithFileNames[img] && (
                                <View style={{ flex: 1, flexDirection: 'row', padding: 10, borderColor: 'grey' }}>
                                    <View>
                                        <CheckBox
                                            style={[styles.checkbox, {
                                                margin: 10, borderColor: '#6572e4'
                                                , backgroundColor: this.state.checked == i ? '#6572e4' : '#fff'
                                            }]}
                                            onPress={() => this.onChange(i, img)}
                                            checked={this.state.checked == i ? true : false}
                                        />
                                    </View>
                                    <View><Image source={{ uri: img }} style={{ width: 40, height: 40 }} /></View>
                                    <View><Text
                                        onPress={this._copyToClipboard}
                                        style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                                        {allImagesWithFileNames[img]}
                                    </Text></View>
                                    <View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'row' }}>
                                        <Button onPress={() => this._share(img)} transparent>
                                            <Icon name='share' style={{ fontSize: 20, color: '#6572e4' }} /></Button>
                                        <Button onPress={() => this.downloadImage(img)} transparent>
                                            <Icon name='download' style={{ fontSize: 20, color: '#6572e4' }} /></Button>
                                        <Button onPress={() => this.deleteRecord(img)} transparent >
                                            <Icon name='trash' style={{ fontSize: 20, color: '#6572e4' }} /></Button>
                                    </View>
                                </View>
                            )
                        )
                    })
                }
            </View >
        )

    };

    _maybeRenderUploadingOverlay2 = () => {
        if (this.state.uploading2) {
            return (
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    ]}>
                    <ActivityIndicator color="#000" animating size="small" />
                </View>
            );
        }
    };
    _maybeRenderImage2 = () => {
        let { image } = this.state;
        // if (!image) {
        //     return;
        // }
        if (!imageArray2) {
            return;
        }

        return (
            <View
                style={{
                    width: '120%',
                    marginLeft: -25
                }}>
                {
                    imageArray2.map((img, j) => {
                        return (
                            allImagesWithFileNames[img] && (
                                <View style={{ flex: 1, flexDirection: 'row', padding: 10, borderColor: 'grey' }}>
                                    <View>
                                        <CheckBox
                                            style={[styles.checkbox, {
                                                margin: 10, borderColor: '#6572e4'
                                                , backgroundColor: this.state.checkedDiagnostic == j ? '#6572e4' : '#fff'
                                            }]}
                                            onPress={() => this.onChangeDiagnostic(j, img)}
                                            checked={this.state.checkedDiagnostic == j ? true : false}
                                        // checked={this.state.checkBoxObj[i]}
                                        // onPress={() => this.passMemberID(i)}
                                        />
                                    </View>
                                    <View><Image source={{ uri: img }} style={{ width: 40, height: 40 }} /></View>
                                    <View><Text
                                        onPress={this._copyToClipboard}
                                        style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                                        {allImagesWithFileNames[img]}
                                    </Text></View>
                                    <View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'row' }}>
                                        <Button onPress={() => this._share(img)} transparent>
                                            <Icon name='share' style={{ fontSize: 20, color: '#6572e4' }} /></Button>
                                        <Button onPress={() => this.downloadImage(img)} transparent>
                                            <Icon name='download' style={{ fontSize: 20, color: '#6572e4' }} /></Button>
                                        <Button onPress={() => this.deleteRecord(img)} transparent >
                                            <Icon name='trash' style={{ fontSize: 20, color: '#6572e4' }} /></Button>
                                    </View>
                                </View>
                            )
                        )
                    })
                }
            </View >
        )

    };

    _maybeRenderUploadingOverlay3 = () => {
        if (this.state.uploading3) {
            return (
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    ]}>
                    <ActivityIndicator color="#000" animating size="small" />
                </View>
            );
        }
    };
    _maybeRenderImage3 = () => {
        let { image } = this.state;
        // if (!image) {
        //     return;
        // }
        if (!imageArray3) {
            return;
        }

        return (
            <View
                style={{
                    width: '120%',
                    marginLeft: -25
                }}>
                {
                    imageArray3.map((img, k) => {
                        return (
                            allImagesWithFileNames[img] && (
                                <View style={{ flex: 1, flexDirection: 'row', padding: 10, borderColor: 'grey' }}>
                                    <View>
                                        <CheckBox
                                            style={[styles.checkbox, {
                                                margin: 10, borderColor: '#6572e4'
                                                , backgroundColor: this.state.checkedImagings == k ? '#6572e4' : '#fff'
                                            }]}
                                            onPress={() => this.onChangeImagings(k, img)}
                                            checked={this.state.checkedImagings == k ? true : false}
                                        // checked={this.state.checkBoxObj[i]}
                                        // onPress={() => this.passMemberID(i)}
                                        />
                                    </View>
                                    <View><Image source={{ uri: img }} style={{ width: 40, height: 40 }} /></View>
                                    <View><Text
                                        onPress={this._copyToClipboard}
                                        style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                                        {allImagesWithFileNames[img]}
                                    </Text></View>
                                    <View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'row' }}>
                                        <Button onPress={() => this._share(img)} transparent>
                                            <Icon name='share' style={{ fontSize: 20, color: '#6572e4' }} /></Button>
                                        <Button onPress={() => this.downloadImage(img)} transparent>
                                            <Icon name='download' style={{ fontSize: 20, color: '#6572e4' }} /></Button>
                                        <Button onPress={() => this.deleteRecord(img)} transparent >
                                            <Icon name='trash' style={{ fontSize: 20, color: '#6572e4' }} /></Button>
                                    </View>
                                </View>
                            )
                        )
                    })
                }
            </View >
        )

    };
    _maybeRenderUploadingOverlay4 = () => {
        if (this.state.uploading4) {

            return (
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    ]}>
                    <ActivityIndicator color="#000" animating size="small" />
                </View>
            );
        }
    };
    _maybeRenderImage4 = () => {

        let { image } = this.state;
        // if (!image) {
        //     return;
        // }
        if (!imageArray4) {
            return;
        }

        return (
            <View
                style={{
                    width: '120%',
                    marginLeft: -25
                }}>
                {
                    imageArray4.map((img, l) => {
                        return (
                            allImagesWithFileNames[img] && (
                                <View style={{ flex: 1, flexDirection: 'row', padding: 10, borderColor: 'grey' }}>
                                    <View>
                                        <CheckBox
                                            style={[styles.checkbox, {
                                                margin: 10, borderColor: '#6572e4'
                                                , backgroundColor: this.state.checkedOthers == l ? '#6572e4' : '#fff'
                                            }]}
                                            onPress={() => this.onChangeOthers(l, img)}
                                            checked={this.state.checkedOthers == l ? true : false}
                                        />
                                    </View>
                                    <View><Image source={{ uri: img }} style={{ width: 40, height: 40 }} /></View>
                                    <View><Text
                                        onPress={this._copyToClipboard}
                                        style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                                        {allImagesWithFileNames[img]}
                                    </Text></View>
                                    <View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'row' }}>
                                        <Button onPress={() => this._share(img)} transparent>
                                            <Icon name='share' style={{ fontSize: 20, color: '#6572e4' }} /></Button>
                                        <Button onPress={() => this.downloadImage(img)} transparent>
                                            <Icon name='download' style={{ fontSize: 20, color: '#6572e4' }} /></Button>
                                        <Button onPress={() => this.deleteRecord(img)} transparent >
                                            <Icon name='trash' style={{ fontSize: 20, color: '#6572e4' }} /></Button>
                                    </View>
                                </View>
                            )
                        )
                    })
                }
            </View >
        )

    };

    _share = (img) => {
        Share.share({
            message: img,
            title: 'Check out this photo',
            url: img,
        });
    };

    _copyToClipboard = () => {
        Clipboard.setString(this.state.image);
        alert('Copied image URL to clipboard');
    };

    _takePhoto = async () => {
        this.toggleModal()
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            aspect: [4, 3],
            quality: 0.75
        });

        this._handleImagePicked(pickerResult);
    };

    _pickDocument = async () => {
        this.toggleModal()
        let result = await DocumentPicker.getDocumentAsync({});
       
        if (result.type !== 'cancel' ) {
            this._handleImagePicked(result);
        }
    }

    _pickImage = async () => {
        this.toggleModal()
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            aspect: [4, 3],
            quality: 0.75
        });

        this._handleImagePicked(pickerResult);
    };

    _handleImagePicked = async pickerResult => {

        try {
            
            if (this.state.report_type == 1) {
                this.setState({ uploading1: true });
            } else if (this.state.report_type == 2) {
                this.setState({ uploading2: true });
            } else if (this.state.report_type == 3) {
                this.setState({ uploading3: true });
            } else if (this.state.report_type == 4) {
                this.setState({ uploading4: true });
            }

            if (!pickerResult.cancelled) {

                let filename = Math.random().toString(36).substring(7);
                let uploadUrl = await this.uploadImageAsync(pickerResult.uri, filename);

                if(!uploadUrl){
                    alert('Upload failed. Please try with a smaller file size / lower the camera resolution.');
                }
                else{
                    
                    this.setState({ image: uploadUrl });
                    allImagesWithFileNames[uploadUrl] = filename;

                    if (this.state.report_type == 1) {
                        imageArray1.push(uploadUrl)
                    } else if (this.state.report_type == 2) {
                        imageArray2.push(uploadUrl)
                    } else if (this.state.report_type == 3) {
                        imageArray3.push(uploadUrl)
                    } else if (this.state.report_type == 4) {
                        imageArray4.push(uploadUrl)
                    }

                    alert('Upload successful :)');
                }
            }
        } catch (e) {

            alert('Upload failed, sorry :(. Server issue.');
        } finally {
            if (this.state.report_type == 1) {
                this.setState({ uploading1: false });
            } else if (this.state.report_type == 2) {
                this.setState({ uploading2: false });
            } else if (this.state.report_type == 3) {
                this.setState({ uploading3: false });
            } else if (this.state.report_type == 4) {
                this.setState({ uploading4: false });
            }
        }
    };

    getDownloadURL = async (filename) => {

        try{
            let res = await axios.post(Constants.manifest.extra.URL + '/fetch_download_url', 
                        {   file_type: 'Reports', 
                            path: this.props.studyId + "/" + filename
                        });
            
            return res.data.url;
        }
        catch(ex){
            console.log(ex);
            return null;
        }

    }

    postImageData(report_name) {

        var data = JSON.stringify({
            "report_type": this.state.report_type,
            "report_name": report_name,
        });

        var config = {
            method: 'post',
            url: Constants.manifest.extra.URL+ '/patient/addReport/' + this.props.studyId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async uploadImageAsync(uri, filename) {

        let bodyFormData = new FormData();
        
        let i = {
            uri: uri,
            type: 'multipart/form-data',
            name: filename,
        };

        bodyFormData.append('file', i);
        bodyFormData.append('file_type', 'Reports');
        bodyFormData.append('path', this.props.studyId + "/" + filename);

        try{
            await axios({
                method: 'post',
                url: Constants.manifest.extra.URL + '/upload_file',
                data: bodyFormData,
                headers: {'Content-Type': 'multipart/form-data' }
            });
        }
        catch(ex){
            console.log(ex);
            return null;
        }

        try{

            await this.postImageData(filename);
        }
        catch(ex){
            console.log(ex);
            return null;
        }

        return this.getDownloadURL(filename);

    }

    async downloadImage(img) {
        this.setState({ loading: true })
        const uri = img
        let fileUri = FileSystem.documentDirectory + allImagesWithFileNames[img] + ".jpeg"
        FileSystem.downloadAsync(uri, fileUri)
            .then(({ uri }) => {
                this.saveFile(uri);
            })
            .catch(error => {
                console.error(error);
            })
    }
    
    async saveFile(fileUri) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ loading: false })
        Alert.alert("Downloaded!")
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
        }
    }

    deleteRecord(img) {
        Alert.alert(
            'Delete Report',
            'Are you sure you want to delete ? You won’t be able to retrieve the file once it is deleted. ',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => {

                        var config = {
                            method: 'delete',
                            url: Constants.manifest.extra.URL + '/patient/deleteReport/' + allImagesWithFileNames[img],
                            headers: {},
                        };

                        axios(config)
                            .then((response) => {
                                delete allImagesWithFileNames[img];
                                this.getReportsData();

                                //console.log(allImagesWithFileNames);
                                //console.log(JSON.stringify(response.data));
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                }
            ],
            { cancelable: false }
        );
    }


    render() {
        return (
            <ScrollView>
                {/* modal for camera options */}
                <Modal isVisible={this.state.isModalVisible}
                    style={{
                        backgroundColor: '#fff',
                        padding: 20,
                        height: 400,
                        flex: 0
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text style={styles.uploadHeadingText}>Select option</Text>
                        <Button style={{
                            backgroundColor: '#c1c6f4', padding: 10, width: 300, margin: 10,
                            alignSelf: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'grey'
                        }}
                            onPress={this._pickImage}
                        ><Text style={{ color: '#fff' }}>Gallery</Text></Button>

                        <Button onPress={this._takePhoto} style={{
                            backgroundColor: '#c1c6f4', padding: 10,
                            width: 300, alignSelf: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'grey'
                        }} >
                            <Text style={{ color: '#fff' }}>
                                Camera
                            </Text>
                        </Button>

                        <Button style={{
                            backgroundColor: '#c1c6f4', padding: 10, width: 300, margin: 10,
                            alignSelf: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'grey'
                        }}
                            onPress={this._pickDocument}
                        ><Text style={{ color: '#fff' }}>Document</Text></Button>
                        <Button onPress={this.toggleModal} style={[styles.uploadDocumentButton,
                        { alignSelf: 'center', justifyContent: 'center', margin: 20 }]} >
                            <Text style={{ color: '#fff' }}>Close</Text></Button>
                    </View>
                </Modal>
                <View style={styles.partitionView}>
                    <Text style={styles.uploadHeadingText}>Upload Reports</Text>
                    <Button style={[styles.uploadDocumentButton, {
                        backgroundColor: this.props.doctorEmail == "" && this.state.urlToShare == "" ? '#eaeaea' : '#6572e4',
                        marginRight: '5%'
                    }]} onPress={this.callShareUriToDoctorEmail}>
                        <Text style={{ color: '#fff' }}>Share</Text></Button></View>
                <View style={{ alignItems: 'center' }}>
                    <Card style={{ borderRadius: 10, width: '90%', marginTop: 15 }} bordered>

                        <CardItem header style={styles.cardItemHeader}>
                            <Text style={styles.cardItemText}>Case Sheets</Text>
                            <Button style={styles.uploadDocumentButton} onPress={this.buttonClickOne}
                            >
                                <Text style={{ color: '#fff' }}>Upload</Text></Button>
                        </CardItem>
                        <CardItem>
                            {this.state.loading ? <View style={styles.preloader}>
                                <ActivityIndicator size="small" color="#9E9E9E" />
                            </View> :
                                <Body>
                                    {this._maybeRenderImage1()}
                                    {this._maybeRenderUploadingOverlay1()}
                                    <StatusBar barStyle="default" />
                                </Body>}
                        </CardItem>
                    </Card>
                    <Card style={{ width: '90%', top: -10 }} bordered>
                        <CardItem header style={styles.cardItemHeader}>
                            <Text style={styles.cardItemText}>Diagnostic Reports</Text>
                            <Button style={styles.uploadDocumentButton} onPress={this.buttonClickTwo}>
                                <Text style={{ color: '#fff' }}>Upload</Text></Button>
                        </CardItem>
                        <CardItem>
                            {this.state.loading ? <View style={styles.preloader}>
                                <ActivityIndicator size="small" color="#9E9E9E" />
                            </View> :
                                <Body>
                                    {this._maybeRenderImage2()}
                                    {this._maybeRenderUploadingOverlay2()}
                                    <StatusBar barStyle="default" />
                                </Body>}
                        </CardItem>
                    </Card>
                    <Card style={{ width: '90%', top: -20 }} bordered>
                        <CardItem header style={styles.cardItemHeader}>
                            <Text style={styles.cardItemText}>Imagings (X-Rays, CT Scans)</Text>
                            <Button style={styles.uploadDocumentButton} onPress={this.buttonClickThree}>
                                <Text style={{ color: '#fff' }}>Upload</Text></Button>
                        </CardItem>
                        <CardItem>{this.state.loading ? <View style={styles.preloader}>
                            <ActivityIndicator size="small" color="#9E9E9E" />
                        </View> :
                            <Body>
                                {this._maybeRenderImage3()}
                                {this._maybeRenderUploadingOverlay3()}
                                <StatusBar barStyle="default" />
                            </Body>}
                        </CardItem>
                    </Card>
                    <Card style={{ width: '90%', top: -30 }} bordered>
                        <CardItem header style={styles.cardItemHeader}>
                            <Text style={styles.cardItemText}>Others</Text>
                            <Button style={styles.uploadDocumentButton} onPress={this.buttonClickFour}>
                                <Text style={{ color: '#fff' }}>Upload</Text></Button>
                        </CardItem>
                        <CardItem>
                            {this.state.loading ? <View style={styles.preloader}>
                                <ActivityIndicator size="small" color="#9E9E9E" />
                            </View> :
                                <Body>
                                    {this._maybeRenderImage4()}
                                    {this._maybeRenderUploadingOverlay4()}
                                    <StatusBar barStyle="default" />
                                </Body>}
                        </CardItem>
                    </Card>
                </View>
            </ScrollView>
        )

    }
}
