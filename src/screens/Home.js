import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from "react-native-responsive-screen";
import { useKeepAwake } from 'expo-keep-awake';
import * as ScreenOrientation from 'expo-screen-orientation';

import Header from "../components/Header";
import HeadCover from "../components/HeadCover";
import BottomCover from "../components/BottomCover";
import ChannelBar from "../components/ChannelBar";
import VideoList from "../components/VideoList";
import TitleBar from "../components/TitleBar";
import { BottomTabBar } from "@react-navigation/bottom-tabs";

function Home({navigation, route}) {

  const loading = useSelector((state) => {
    return state.fetchloading;
  });
  const uiHide = useSelector((state) => {
    return state.uiHide;
  });
  const domain = useSelector((state) => {
    return state.domain;
  });
  const token = useSelector((state) => {
    return state.token;
  });
  const dimensions = useSelector((state) => {
    return state.dimensions;
  });
  const isPortrait = useSelector((state) => {
    return state.isPortrait;
  });
  const dispatch = useDispatch();
  useKeepAwake();

  // ScreenOrientation.getOrientationAsync().then((Promise)=>console.log(Promise))
  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }
  
// console.log(isPortrait)
  useEffect(() => {
    if(uiHide ){
      navigation.setOptions({tabBarVisible:true})
    }else{
      navigation.setOptions({tabBarVisible:false})
    }
  }, [uiHide, isPortrait])
  

  useEffect(() => {
    dispatch({ type: "currentChannel", payload: {'channelId': 100, 'channelName': 'Explore' } });
    dispatch({ type: "loading", payload: true });
    if(token!==null){
      // console.log(token)
      fetch(`http://${domain}/lit/list/?format=json`, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "replace", payload: data.results });
        dispatch({ type: "loading", payload: false });
      })
      .catch(function (error) {
        console.log("error");
      });
    }else{
      fetch(`http://${domain}/lit/list/?format=json`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "replace", payload: data.results });
        dispatch({ type: "loading", payload: false });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
  }, []);
  


  const styles = StyleSheet.create({

    activityIndicator:{
        marginTop: dimensions.window.height/2,
        position: "absolute",
        alignSelf: "center",
    },
    
  })
  
  return (
    <View style={{ flex: 1, height: Dimensions.get("window").height }}>
      {loading ? (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color="red"
        />
      ) : null}
      <VideoList />
      <HeadCover />
      <BottomCover/>
      
      {uiHide && isPortrait ? <ChannelBar /> : null}
      {uiHide ? <Header /> : null}
  
    </View>
  );
}


export default React.memo(Home)