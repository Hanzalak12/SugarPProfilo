/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Linking, Alert, Platform
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions, Image
} from 'react-native/Libraries/NewAppScreen';
import { WebView } from 'react-native-webview';
import { Button, Text, Footer, FooterTab  } from "native-base";
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import firebase, { Notification } from "react-native-firebase";

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: "https://scontent.fkhi5-1.fna.fbcdn.net/v/t1.15752-9/90028104_2891553754244362_8884075809518649344_n.jpg?_nc_cat=108&_nc_sid=b96e70&_nc_eui2=AeHqrAEQe824teKgg6PcEVaz-WvmLtC7tZH9dlIoLxSHKguWexmxLud6DU0XRh2S6y2NUtILRzj6wF62__nJkPQpWVyUuDYN2MOC79fiwtT9eg&_nc_ohc=4YhvjnY3FhkAX_XI9ex&_nc_ht=scontent.fkhi5-1.fna&oh=0ec78fbda00ddfdd3b2a15ac0a038071&oe=5E99F1C6"
    }
    Icon.loadFont();
  }


  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getToken();
    } else {
        this.requestPermission();
    }
  }


    //3
async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log("fcmToken", fcmToken)
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          // user has a device token
          console.log("fcmToken2", fcmToken)
          await AsyncStorage.setItem('fcmToken', fcmToken);
      }
  }
}

  //4
  async requestPermission() {
    try {
        await firebase.messaging().sendToDevice();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }


    //2
    async requestPermission() {
      try {
          await firebase.messaging().requestPermission();
          // User has authorised
          this.getToken();
      } catch (error) {
          // User has rejected permissions
          console.log('permission rejected');
      }
    }
  


  ////////////////////// Add these methods //////////////////////

  //Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  render=()=> {
    return (
      <View style={{ height: '100%' }}>
        <WebView source={{ uri: this.state.url }} style={{ marginTop: 0,height:'85%'}} />

        {/* <Image
          style={{ marginTop: 40,height:'85%'}} 
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        /> */}
        <View >
          {/* <Image source={{ uri: "https://scontent.fkhi2-1.fna.fbcdn.net/v/t1.15752-9/89973414_230813648091295_3503263385779175424_n.jpg?_nc_cat=108&_nc_sid=b96e70&_nc_eui2=AeEtZp92mIGk9t8o2r4Cfw0lk7-EvHYs2e21SQtuNUWRRrlwHhbECfxxtBMu4GqGhJFv_QYu1ZntEHtqipxmUJsABblELblGVIKdiWgM4iNUww&_nc_ohc=wyBw0Y3MDvsAX84zFms&_nc_ht=scontent.fkhi2-1.fna&oh=71b9e50b22380153865d63103848d3be&oe=5E979DAE" }}></Image> */}
        </View>
        <View >
          <Footer >
            <FooterTab style={{backgroundColor:"white"}}>
              <Button
                vertical
                active={4 === 0}
                onPress={() => { this.setState({ "url": "https://web.facebook.com/SugarSugarAZ" }) }}>
                <Icon size={30} color="red" name="facebook" />
                {/* <Text>facebook</Text> */}
              </Button>

              <Button
                vertical
                active={4 === 0}
                onPress={() => { this.setState({ "url": "https://www.instagram.com/sugarsugaraz/" }) }}>
                <Icon size={30} color="red" name="instagram" />
                {/* <Text>instagram</Text> */}
              </Button>

              <Button
                vertical
                active={4 === 0}
                onPress={() => { this.setState({ "url": "https://www.mysugarsugar.com/app_specials" }) }}>
                <Icon size={30} color="red" name="users" />
                {/* <Text>twitter</Text> */}
              </Button>

              <Button
                vertical
                active={4 === 0}
                onPress={() => { this.setState({ "url": "https://www.mysugarsugar.com/book-phoenixarcadia/" }) }}>
                <Icon size={30} color="red" name="book" />
                {/* <Text>book</Text> */}
              </Button>

              <Button
                vertical
                active={0 === 1}
                onPress={() => { Linking.openURL('tel:480-367-8427'); }}>
                <Icon size={30} color="red" name="phone" />
                {/* <Text>call</Text> */}
              </Button>
              <Button
                vertical
                active={4 === 2}
                onPress={() => { this.setState({ "url": "https://www.google.com/maps/place/16255+N+Scottsdale+Rd,+Scottsdale,+AZ+85254/@33.63513,-111.921534,14z/data=!4m13!1m7!3m6!1s0x872b7424772f86c1:0xb623a65c8fd7f9ef!2s16255+N+Scottsdale+Rd,+Scottsdale,+AZ+85254!3b1!8m2!3d33.6349503!4d-111.9210579!3m4!1s0x872b7424772f86c1:0xb623a65c8fd7f9ef!8m2!3d33.6349503!4d-111.9210579?hl=en" }) }}>
                <Icon size={30} color="red" name="map-marker" />
                {/* <Text>location</Text> */}
              </Button>
            </FooterTab>
          </Footer>
        </View>
      </View>
    );
  }
};


// export default App;

// Book: www.mysugarsugar.com/where-to-book-mobile
// Locations: www.http://www.mysugarsugar.com/find-location
// Call: 480-367-8427
// App Promotions: www.mysugarsugar.com/app_specials
// Instagram: www.Instagram.com/sugarsugaraz
// Facebook: www.Facebook.com/sugarsugaraz