import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  AsyncStorage,
  Alert,
  Image,
  ActivityIndicator
} from "react-native";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { styles } from "../components/Styles";
import { color } from "react-native-reanimated";



function GoogleLoginScreen({navigation}) {
  const dispatch = useDispatch();
  const onStore = async (usertoken, email, first_name, profile_pic) => {
    try {
      await AsyncStorage.setItem("usertoken", usertoken);
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("first_name", first_name);
      await AsyncStorage.setItem("profile_pic", profile_pic);
    } catch (error) {
      console.log(error);
    }
  };
  const domain = useSelector((state) => {
    return state.domain;
  });

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = (googleUser) => {
    // console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(function (result) {
              
              // console.log("user signed in");
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    locale: result.additionalUserInfo.profile.locale,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now(),
                  })
                  .then(function (snapshot) {});
                {

                  fetch(`http://${domain}/api/auth/register`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      username: `${result.user.email}`,
                      email: `${result.user.email}`,
                      password: `${result.user.uid}`,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      // console.log(data)
                      if (data.username) {
                        Alert.alert(
                          `Email Already Exists!`,
                          `${data.username}!`,
                          [
                            {
                              text: "Okay",
                              onPress: () =>
                                dispatch({ type: "skipLogin", payload: false }),
                            },
                          ],
                          { cancelable: false }
                        );
                        // console.log(data.username)
                      }
                      if (data.token !== undefined) {
                        dispatch({ type: "token", payload: data.token });
                        dispatch({type:"userInfo", payload: {'email': result.user.email, 'first_name': result.additionalUserInfo.profile.given_name, 'profile_pic': result.additionalUserInfo.profile.picture}})
                        onStore(data.token, result.user.email, result.additionalUserInfo.profile.given_name, result.additionalUserInfo.profile.picture);
                      }
                    });
                }
              } else {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .update({
                    last_logged_in: Date.now(),
                  })
                  .then(function (snapshot) {});
                fetch(`http://${domain}/api/auth/login`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: `${result.user.email}`,
                    password: `${result.user.uid}`,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.token !== undefined) {
                      dispatch({ type: "token", payload: data.token });
                      onStore(data.token, result.user.email, result.additionalUserInfo.profile.given_name, result.additionalUserInfo.profile.picture);
                    }
                    if (data.non_field_errors) {
                      Alert.alert(
                        `${data.non_field_errors}!`,
                        `Authentication failed. Please check your credentials and try again!`,
                        [
                          {
                            text: "Okay",
                            onPress: () =>
                              dispatch({ type: "skipLogin", payload: false }),
                          },
                        ],
                        { cancelable: false }
                      );
                      // console.log(data.non_field_errors)
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      });
  };
  signInWithGoogleAsync = async () => {
    navigation.navigate("loading")
    try {
      const result = await Google.logInAsync({
        // behavior: "web",
        androidClientId:
          "787892906858-fat2ej1jhfdev7aoq5hlljua64mdnkup.apps.googleusercontent.com",
        androidStandaloneAppClientId:
        "787892906858-h0npkcacrl1ptuvdku6rh1f0l50gmd9k.apps.googleusercontent.com",
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        onSignIn(result);
        // console.log(result.accessToken);
      } else {
        navigation.navigate("google")
        // console.log({ cancelled: true });
      }
    } catch (e) {
      navigation.navigate("google")
      // console.log({ error: true });
    }
  };
  return (
    <View style={{flex:1}}>
      <View style={{ flex: 10, alignItems: "center", justifyContent: "center" }}>
      <Image source={require('../images/Weedio.png')} style={{height:100, width:240}} />
      <Text style={{color:'lightgrey', fontSize:15, marginTop:20}}>Sign Up with your social accounts:</Text>
      </View>
    <View style={{ flex: 10, alignItems: "center", }}>
      
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          flexDirection: "row",
          height: hp("8%"),
          width: wp("70%"),
          borderRadius: 3,
          alignItems: "center",
          justifyContent: "center",
          elevation:20,
          shadowColor: 'grey',
          borderColor: 'lightgrey',
          borderBottomWidth:3.5
        }}
        onPress={() => signInWithGoogleAsync()}
      >
        <Image source={require("../images/glogo.png")} style={{height:35, 
        width:35,marginRight:10}} />
        <Text style={{ color: "grey", fontSize:18 }}> Sign in with Google </Text>
        
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>dispatch({type:"skipLogin", payload: true})} style={{ alignContent:'flex-end', justifyContent:'flex-end', width: wp('70%')}}><Text style={{color:'white', alignContent:"flex-end", justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end', marginTop:8}}>No thanks, I'll skip</Text></TouchableOpacity>
      
      
    </View>
    </View>
  );
}

export default GoogleLoginScreen;
