import React, { Component } from 'react';
// import GetLocation from 'react-native-get-location'
import {
  AppRegistry,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Alert,
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';

import renderIf from './js/helpers/renderIf';
var InitialARScene = require('./js/ARHitTestSample');

// Array of 3d models that we use in this sample. This app switches between this these models.
var objArray = [

  require('./js/res/red_dot.png'),
  require('./js/res/green_dot.png')];

export default class ViroSample extends Component {
  constructor() {
    super();

    this._onShowObject = this._onShowObject.bind(this);
    this._renderTrackingText = this._renderTrackingText.bind(this);
    this._onTrackingInit = this._onTrackingInit.bind(this);
    this._onDisplayDialog = this._onDisplayDialog.bind(this);
    this._onLoadStart = this._onLoadStart.bind(this);
    this._onLoadEnd = this._onLoadEnd.bind(this);
    // this._showDeviceLocation = this._showDeviceLocation.bind(this);
    // this.locationInit = this._locationInit.bind(this);

    

    this.state = {
      viroAppProps: {displayObject:false, objectSource:objArray[0], yOffset:0, _onLoadEnd: this._onLoadEnd, _onLoadStart: this._onLoadStart, _onTrackingInit:this._onTrackingInit},
      trackingInitialized: false,
      isLoading: false,
      loading:true
    }
  }

  render() {
    return (
      <View style={localStyles.outer} >
        <ViroARSceneNavigator style={localStyles.arView}
          initialScene={{scene:InitialARScene, passProps:{displayObject:this.state.displayObject}}}  viroAppProps={this.state.viroAppProps}
        />

        {this._renderTrackingText()}
        {/* {this._showDeviceLocation()} */}
        {renderIf(this.state.isLoading,
          <View style={{position:'absolute', left:0, right:0, top:0, bottom:0, alignItems: 'center', justifyContent:'center'}}>
            <ActivityIndicator size='large' animating={this.state.isLoading} color='#ffffff'/>
          </View>)
        }

        <View style={{position: 'absolute',  left: 0, right: 0, bottom: 77, alignItems: 'center'}}>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._onDisplayDialog}
            underlayColor={'#00000000'} >
            <Image source={require("./js/res/avatar.png")} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Invoked when a model has started to load, we show a loading indictator.
  _onLoadStart() {
    this.setState({
      isLoading: true,
    });
  }

  // Invoked when a model has loaded, we hide the loading indictator.
  _onLoadEnd() {
    this.setState({
      isLoading: false,
    });
  }

  _renderTrackingText() {
    if(this.state.trackingInitialized) {
      
      return (<View style={{position: 'absolute', backgroundColor:"#ffffff22", left: 30, right: 30, top: 30, alignItems: 'center'}}>
        <Text style={{fontSize:12, color:"#ffffff"}}>Tracking initialized.</Text>
      </View>);
    } else {
      return (<View style={{position: 'absolute', backgroundColor:"#ffffff22", left: 30, right: 30, top:30, alignItems: 'center'}}>
        <Text style={{fontSize:12, color:"#ffffff"}}>Waiting for tracking to initialize.</Text>
        </View>);
    }
  }
  // _showDeviceLocation() {
  //   console.log("location text outside", this.state.loading);

  //     if (this.state.loading){
  //       console.log("location text inside");

  //     GetLocation.getCurrentPosition({
  //         enableHighAccuracy: true,
  //         timeout: 150000,
  //     })
  //         .then(location => {
  //             this.setState({
  //                 location,
  //                 loading:false,
  //             });
  //             // return (<View style={{position: 'absolute', backgroundColor:"#ffffff22", left: 30, right: 30, top:30, alignItems: 'center'}}>
  //             // <Text style={{fontSize:12, color:"#ffffff"}}>{location}</Text>
  //             // </View>);
  //             console.log(location);
  //         })
  //         .catch(error => {
  //         const { code, message } = error;
  //         console.warn(code, message);
  //         return;
  //     })
  //   }
  // }
  _locationInit(){
    this.setState({
      loading:true,
      location: null,
    });
  }
  _onTrackingInit() {
    this.setState({
      trackingInitialized: true,
    });
  }

  _onDisplayDialog() {
    Alert.alert(
    'Choose an object',
    'Select an object to place in the world!',
    [
      {text: 'Red Dot', onPress: () => this._onShowObject(0, "red_dot", 0)},
      {text: 'Green Dot', onPress: () => this._onShowObject(1, "green_dot", .290760)},
      {text: 'Yellow Dot', onPress: () => this._onShowObject(0, "smile_emoji", .497823)},
    ],
    );
  }

  _onShowObject(objIndex, objUniqueName, yOffset) {
    this.setState({
        viroAppProps:{...this.state.viroAppProps, displayObject: true, yOffset: yOffset, displayObjectName: objUniqueName, objectSource:objArray[objIndex]},
    });
  }
}

var localStyles = StyleSheet.create({
  outer : {
    flex : 1,
  },

  arView: {
    flex:1,
  },

  buttons : {
    height: 80,
    width: 80,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#00000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff00',
  }
});

module.exports = ViroSample
