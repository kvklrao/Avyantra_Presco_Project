
import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import EStyleSheet from 'react-native-extended-stylesheet';


// Get height of the phone status bar
const statusBarHeight = Constants.statusBarHeight;

// Get Screen Dimensions
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

EStyleSheet.build({
  $rem: screenWidth / 380,
});
// Globalstyle sheet to store styles of all componenets
const styles = EStyleSheet.create({
  scrHeight: {
    height: screenHeight
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainer: {

    marginBottom: '10rem',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  dialogContentView: {
    paddingLeft: 18,
    paddingRight: 18,
  },
  navigationBar: {
    borderBottomColor: '#b5b5b5',
    borderBottomWidth: 0.5,
    backgroundColor: '#ffffff',
  },
  navigationTitle: {
    padding: 10,
  },
  navigationButton: {
    padding: 10,
  },
  navigationLeftButton: {
    paddingLeft: 20,
    paddingRight: 40,
  },
  navigator: {
    flex: 1,
    // backgroundColor: '#000000',
  },
  customBackgroundModal: {
    opacity: 0.5,
    backgroundColor: '#000',
  },

  checkboxNA: {
    marginLeft: 0,
    marginBottom: 0,
    paddingBottom: 0,
    marginTop: 10,
  },

  inputStyle: {
    width: '100%',
    marginTop: 2,
    marginBottom: 10,
    paddingBottom: 5,
    alignSelf: "center",
    borderColor: '#6572e4',
    borderWidth: 1,
    padding: 5,
    fontSize: 20,
    height: 45,
    paddingLeft: 10,
    borderRadius: 5
  },

  signUpContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 2,
    backgroundColor: '#fff',
    // marginTop:20,
    // height: 780,
  },

  //login screen styles
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  leftContainer: {
    // flex: 1,
    height: 300,
    backgroundColor: '#f48351',
  },
  rightContainer: {
    // flex: 1,
    height: 450,
    backgroundColor: '#fff'

  },
  loginPrescoImage: {
    alignItems: 'center',
    top: 70,
    left: 10
  },
  forgotPassword: {
    color: '#626262',
    marginBottom: 60,
    textAlign: 'left',
    color: '#6572e4'
  },
  loginButton: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#f48351',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    width: 140,
    elevation: 3,
    borderRadius: 8,
    color: '#fff'
  },
  loginText: {
    color: '#3740FE',
    marginTop: 60,
    textAlign: 'center'
  },
  buttonText: {
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    // left:30
  },
  welcomeText: {
    fontSize: 35,
    color: '#fff',
    textAlign: 'center',
    // width:'100%'
  },
  continueToLoginText: {
    fontSize: 15,
    color: '#fff',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  prefix: {
    // paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  buttonContainerSignup: {
    flex: 1,
    margin: 5,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  buttonContainerScore: {
    flex: 1,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#fff'
  },

  buttonContainer: {
    flex: 1,
    // margin:5,
    // borderWidth: 0.8,
    borderRadius: 2,
    // backgroundColor: '#ffffff',
    // borderColor: '#fff',
    marginTop: 5, justifyContent: 'center'
  },
  signupPrescoImage: {
    top: 0,
    alignItems: 'center',
    // bottom: 30,
    left: 10
  },
  inputContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    // marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
    // paddingBottom: 15,
    alignSelf: "center",
    borderColor: '#6572e4',
    width: '100%',
    height: 45,
    borderRadius: 5,
  },
  // checkBoxcontainer: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  checkboxContainer: {
    flexDirection: "row",
    color: '#626262',
  },
  checkbox: {
    alignSelf: "center",
    left: 0,
    color: '#626262',
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginTop: 10,
  },

  partitionView: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 10
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eaeaea'
  },
  searchIcon: {
    padding: 10,
    borderWidth: 1,
    color: '#eaeaea',
    fontSize: 22,
    borderColor: '#eaeaea',
  },
  input2: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    color: '#424242',
    borderColor: '#6572e4',
    borderWidth: 1,
    height: 45
  },
  textButton: {
    // color: '#3e3e3e',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center',
    // justifyContent:'center'
  },
  titleStyle: {
    color: '#3e3e3e',
    fontSize: 12,
    padding: 10,
    paddingLeft: 0
  },
  label: {
    margin: 8,
    color: '#626262',
    fontSize: 12,
  },
  iconText: {
    fontSize: 17,
    color: '#c4c4c4',
  },
  //Upload reports styles
  uploadHeadingText: {
    color: '#3e3e3e',
    fontSize: 18,
    padding: 10,
    fontWeight: 'bold',
  },
  cardItemHeader: {
    backgroundColor: '#c1c6f4',
    width: '100%',
  },
  cardItemText: {
    fontSize: 16,
    color: '#3e3e3e'
  },
  uploadDocumentButton: {
    backgroundColor: '#f39167',
    width: 120,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 'auto',
    borderRadius: 8
  },
  preview: {
    height: screenHeight,
    width: screenWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },

  alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomToolbar: {
    width: screenWidth,
    position: 'absolute',
    height: 1200,
    // bottom: -30,
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: "#FFFFFF",
  },
  captureBtnActive: {
    width: 80,
    height: 80,
  },
  captureBtnInternal: {
    width: 76,
    height: 76,
    borderWidth: 2,
    borderRadius: 76,
    backgroundColor: "red",
    borderColor: "transparent",
  },
  ButtonStyleSubscription: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    flex: 1, flexDirection: 'row',
    height: 120,
    marginTop: 15
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 15,
    height:45,
    borderRadius:8,
    borderColor: '#6572e4',
  },
  inputStylePassword: {
    flex: 1,
    fontSize:20,
    color:'#000',
    marginLeft:10
    
  },

});

export default styles;